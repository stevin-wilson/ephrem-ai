// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";

// – – – – – – – – – –
const punctuationRegex = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

// – – – – – – – – – –
export type OpenAIModels = "gpt-4o-mini" | "gpt-3.5-turbo" | "gpt-4" | "gpt-4o";

// – – – – – – – – – –
export interface ReferenceWithoutBible {
	bookId: string; // Must be a USFM Book Identifier. Consider deuterocanonical books when applicable
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
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

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
	openAIModel: OpenAIModels = "gpt-4o-mini",
	maxReferenceCount = 5,
) => {
	return openai.chat.completions.create({
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
export const isValidStringOrUndefined = (
	value: string | undefined,
): boolean => {
	if (value === undefined) {
		return true;
	} else if (punctuationRegex.test(value)) {
		// Test if the string contains any punctuation characters
		return false;
	} else {
		// Check if the value is not a number or is a non-negative integer
		const parsedNumber = Number(value);
		return (
			isNaN(parsedNumber) ||
			(Number.isInteger(parsedNumber) && parsedNumber > 0)
		);
	}
};

// – – – – – – – – – –
export const hasValidChapterSyntax = (input: any): boolean => {
	// Chapter Start
	if (!("chapterStart" in input)) {
		return false;
	}

	if (input.chapterStart === undefined) {
		return false;
	}

	if (typeof input.chapterStart !== "string") {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (!isValidStringOrUndefined(input.chapterStart)) {
		return false;
	}

	// Chapter End
	if (!("chapterEnd" in input)) {
		return true;
	}

	if (input.chapterEnd === undefined) {
		return true;
	}

	if (typeof input.chapterEnd !== "string") {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return isValidStringOrUndefined(input.chapterEnd);
};

// – – – – – – – – – –
export const hasValidVerseSyntax = (input: any): boolean => {
	// Chapter Start
	if (!("verseStart" in input)) {
		return false;
	}

	if (input.verseStart !== undefined && typeof input.verseStart !== "string") {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (!isValidStringOrUndefined(input.verseStart)) {
		return false;
	}

	// Chapter End
	if (!("verseEnd" in input)) {
		return true;
	}

	if (input.verseEnd === undefined) {
		return true;
	}

	if (typeof input.verseEnd !== "string") {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return isValidStringOrUndefined(input.verseEnd);
};

// – – – – – – – – – –
export const hasValidReferenceWithoutBibleSyntax = (input: any) => {
	if (input.book === undefined) {
		return false;
	}

	if (typeof input.book !== "string") {
		return false;
	}

	if (!hasValidChapterSyntax(input)) {
		return false;
	}

	if (!hasValidVerseSyntax(input)) {
		return false;
	}

	return true;
};

// – – – – – – – – – –
export const isReferencesWithoutBibleResponse = (input: any): boolean => {
	if (typeof input !== "string") {
		// The input is a string. Exiting the function.
		return false;
	}

	if (!input.trim()) {
		//The input is either empty or only contains whitespace. Exiting the function.
		return false;
	}

	let candidate: any;
	try {
		candidate = JSON.parse(input);
	} catch {
		// Failed to parse the input as JSON. Exiting the function.
		return false;
	}

	if (candidate.referencesWithoutBible === undefined) {
		// The property "referencesWithoutBible" is not present in the input. Exiting the function.
		return false;
	}

	if (!Array.isArray(candidate.referencesWithoutBible)) {
		// The property "referencesWithoutBible" is not an array. Exiting the function.
		return false;
	}

	for (const referenceWithoutBible of candidate.referencesWithoutBible) {
		if (!hasValidReferenceWithoutBibleSyntax(referenceWithoutBible)) {
			// The "referencesWithoutBible" property has invalid reference syntax. Exiting the function.
			return false;
		}
	}

	return true;
};

// – – – – – – – – – –
const isValidOpenAiResponse = (response: any): boolean => {
	if (!response?.choices?.length) {
		return false;
	}
	if (response.choices[0].finish_reason === "length") {
		return false;
	}
	const result = response.choices[0].message.content?.trim();

	return isReferencesWithoutBibleResponse(result);
};

// – – – – – – – – – –
const parseOpenAiResponse = (response: any): ReferencesWithoutBibleResponse => {
	// if (!isValidOpenAiResponse(response)) {
	//   throw new Error;
	// }

	const result = response.choices[0].message.content?.trim() as string;

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
	try {
		const response = await createChatCompletions(
			description,
			openAIModel,
			maxReferenceCount,
		);
		return parseOpenAiResponse(response).referencesWithoutBible;
	} catch (error) {
		// Check if error has a message property.
		if (error instanceof Error) {
			throw new Error();
		}

		// If the error doesn't have a message property, fall back to throwing a general error.
		throw new Error();
	}
};

// – – – – – – – – – –
await getReferencesFromDescription("The Creation of the world")
	.then(console.log)
	.catch(console.error);
