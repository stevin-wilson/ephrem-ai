import {
	getBibleAbbreviationsFilepath,
	getBibleIdFromAbbreviation,
	getPassageFromReference,
	UnknownBibleAbbreviationError,
} from "ephrem";

import { getReferencesFromDescription, OpenAIModels } from "./assistant-ai.js";

// – – – – – – – – – –
export interface PassageOptions {
	readonly contentType?: "html" | "json" | "text";
	readonly includeChapterNumbers?: boolean;
	readonly includeNotes?: boolean;
	readonly includeTitles?: boolean;
	readonly includeVerseNumbers?: boolean;
	readonly includeVerseSpans?: boolean;
}

// – – – – – – – – – –
export interface PassageResponse {
	readonly content: string;
	readonly copyright: string;
	readonly id: string;

	readonly [key: string]: unknown;

	readonly reference: string;
}

// – – – – – – – – – –
export interface FumsResponse {
	readonly fums: string;

	readonly [key: string]: unknown;
}

// – – – – – – – – – –
export interface PassageAndFumsResponse {
	readonly data: PassageResponse;
	readonly meta: FumsResponse;

	readonly [key: string]: unknown;
}

// – – – – – – – – – –
export const seekPassages = async (
	description: string,
	bibleAbbreviation: string,
	passageOptions: PassageOptions,
	apiBibleKey: string,
	openAiApiKey: string,
	openAIModel?: OpenAIModels,
	maxReferenceCount?: number,
) => {
	const referencesWithoutBible = await getReferencesFromDescription(
		description,
		openAiApiKey,
		openAIModel,
		maxReferenceCount,
	);

	const bibleId = await getBibleIdFromAbbreviation(bibleAbbreviation);

	if (bibleId === undefined) {
		throw new UnknownBibleAbbreviationError(
			bibleAbbreviation,
			getBibleAbbreviationsFilepath(),
		);
	}

	const passages: PassageAndFumsResponse[] = [];

	for (const referenceWithoutBible of referencesWithoutBible) {
		const reference = {
			...referenceWithoutBible,
			bibleId,
		};
		const passage = await getPassageFromReference(
			reference,
			passageOptions,
			apiBibleKey,
		);
		passages.push(passage);
	}

	return passages;
};
