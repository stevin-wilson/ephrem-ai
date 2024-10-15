// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { BOOK_IDs } from "ephrem";
import OpenAI from "openai";

import { BaseEphremAiError } from "./utils.js";

// – – – – – – – – – –
export type OpenAIModels = "gpt-3.5-turbo" | "gpt-4" | "gpt-4o" | "gpt-4o-mini";

// – – – – – – – – – –
export interface ReferenceWithoutBible {
	bookId: keyof typeof BOOK_IDs; // Must be a USFM Book Identifier. Consider deuterocanonical books when applicable
	chapterEnd?: string; // if verseEnd and verseStart are in different chapters
	chapterStart: string;
	verseEnd?: string; // if verseEnd is different from verseStart or chapterStart != chapterEnd
	verseStart?: string;
}

// – – – – – – – – – –
export interface ReferencesWithoutBibleResponse {
	referencesWithoutBible: ReferenceWithoutBible[];
}

// – – – – – – – – – –
export class OpenAiApiKeyNotFoundError extends BaseEphremAiError {
	constructor() {
		super("OpenAI API key not found. Please provide a valid API key.");
		this.name = "OpenAiApiKeyNotFoundError";
		this.context = {};
	}
}

// – – – – – – – – – –
export const hasOpenAiApiKey = (): boolean => {
	return process.env.OPENAI_API_KEY !== undefined;
};

// – – – – – – – – – –
export class InvalidOpenAiResponse extends BaseEphremAiError {
	public context: {
		description: string;
	};

	constructor(description: string, message?: string) {
		message ||= `Unexpected response from OpenAI. Please modify the description and try again.`;

		super(message);
		this.name = "InvalidOpenAiResponse";
		this.context = {
			description,
		};
	}
}

// – – – – – – – – – –
const getSystemMessage = (maxReferenceCount: number) => `
You are a NodeJS package and I expect your response to be a JSON string of ReferencesWithoutBibleResponse. 

"""typescript
export interface ReferencesWithoutBibleResponse {
  referencesWithoutBible: ReferenceWithoutBible[];
}
"""

Each 'ReferenceWithoutBible' object represents a passage from the Bible.

"""typescript
interface ReferenceWithoutBible {
  bookId: string; // must be a USFM Book Identifier. Consider deuterocanonical books when applicable
  chapterStart: string;
  verseStart?: string;
  chapterEnd?: string; // if verseEnd and verseStart are in different chapters
  verseEnd?: string; // if verseEnd is different from verseStart or chapterStart != chapterEnd
}

"""

Learn from these examples. The output is a string that can be parsed to 'ReferencesWithoutBibleResponse':
- query: "The Creation of the world"
  response: "{referencesWithoutBible: [{ book: 'GEN', chapterStart: '1', verseStart: '1', chapterEnd: '2', verseEnd: '3' }]}"
- query: "Jesus turns water to wine"
  response: "{referencesWithoutBible: [{ book: 'JHN', chapterStart: '2', verseStart: '1', verseEnd: '11' }]}"
- query: "യേശു വെള്ളം വീഞ്ഞാക്കി മാറ്റി"
  response: "{referencesWithoutBible: [{ book: 'JHN', chapterStart: '2', verseStart: '1', verseEnd: '11' }]}"
- query: "US elections and role of religion"
  response: "{referencesWithoutBible: []}"

Instructions:
- Provide up to ${maxReferenceCount} relevant, non-overlapping, and distinct passages.
- If there is no verbatim match, provide passages that metaphorically or thematically match the query.
- Respond with a plain JSON string of ReferencesWithoutBibleResponse without any additional text or labels.
- Return an empty JSON array if the query is irrelevant, inaccurate, or antithetical to the Bible.
- Ensure consistent output across multiple requests.
- If the user query is not in English, translate it to English first before identifying the passages.
- Only provide a plain JSON string of ReferencesWithoutBibleResponse in the response, without any explanations or additional text.`;

// – – – – – – – – – –
const getUserMessage = (description: string) => {
	if (!description) {
		throw new Error("Description cannot be empty.");
	}

	return `Please provide a response for the following event or theme: "${description}". Respond with an array of ReferenceWithoutBible objects.`;
};

// – – – – – – – – – –
const createChatCompletions = async (
	description: string,
	openAiClient: OpenAI,
	openAIModel: OpenAIModels = "gpt-4o-mini",
	maxReferenceCount = 5,
) => {
	return openAiClient.chat.completions.create({
		max_tokens: maxReferenceCount * 50,
		messages: [
			{ content: getSystemMessage(maxReferenceCount), role: "system" },
			{ content: getUserMessage(description), role: "user" },
		],
		model: openAIModel,
		response_format: { type: "json_object" },
		seed: 3,
		temperature: 1e-9,
	});
};

// – – – – – – – – – –
const parseOpenAiResponse = (
	response: OpenAI.ChatCompletion,
): ReferencesWithoutBibleResponse => {
	const result = response.choices[0].message.content?.trim();

	if (!result) {
		throw new Error("The OpenAI response is empty.");
	}

	try {
		return JSON.parse(result) as ReferencesWithoutBibleResponse;
	} catch {
		throw new Error(
			"An error occurred while parsing the OpenAI response. Please ensure that the response is valid JSON.",
		);
	}
};

// – – – – – – – – – –
export const getReferencesFromDescription = async (
	description: string,
	openAIModel?: OpenAIModels,
	maxReferenceCount?: number,
): Promise<ReferenceWithoutBible[]> => {
	if (!hasOpenAiApiKey()) {
		throw new OpenAiApiKeyNotFoundError();
	}

	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	try {
		const response = await createChatCompletions(
			description,
			openai,
			openAIModel,
			maxReferenceCount,
		);
		return parseOpenAiResponse(response).referencesWithoutBible;
	} catch (error) {
		let message: string | undefined = undefined;
		if (error instanceof Error) {
			message = error.message;
		}
		throw new InvalidOpenAiResponse(description, message);
	}
};
