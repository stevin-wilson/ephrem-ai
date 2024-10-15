import {
	BibleNotAvailableError,
	BookIdNotFoundError,
	getBibleAbbreviationsFilepath,
	getBibleDetails,
	getBibleIdFromAbbreviation,
	getBookDetails,
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
export type ScriptDirection = "LTR" | "RTL";

// – – – – – – – – – –
export interface Language {
	readonly id: string;
	readonly name: string;
	readonly nameLocal: string;
	readonly script: string;
	readonly scriptDirection: ScriptDirection;
}

// – – – – – – – – – –
export interface BibleResponse {
	readonly abbreviation: string;
	readonly abbreviationLocal: string;
	readonly dblId: string;
	readonly description: string;
	readonly descriptionLocal: string;
	readonly id: string;
	readonly language: Language;
	readonly name: string;
	readonly nameLocal: string;

	readonly [key: string]: unknown;
}

// – – – – – – – – – –
export interface Book {
	readonly abbreviation: string;
	readonly bibleId: string;
	readonly id: string;
	readonly name: string;
	readonly nameLong: string;
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
export interface PassageWithDetails {
	readonly bible: BibleResponse;
	readonly book: Book;
	readonly fums: FumsResponse;
	readonly passage: PassageResponse;
}

// – – – – – – – – – –
export const seekPassages = async (
	description: string,
	bibleAbbreviation: string,
	passageOptions: PassageOptions,
	openAIModel?: OpenAIModels,
	maxReferenceCount?: number,
) => {
	const referencesWithoutBible = await getReferencesFromDescription(
		description,
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
		const passage = await getPassageFromReference(reference, passageOptions);
		passages.push(passage);
	}

	return passages;
};

// – – – – – – – – – –
/**
 * Fetches passages with detailed information based on a description and Bible abbreviation.
 * @param description The description to generate references from.
 * @param bibleAbbreviation The abbreviation of the Bible to use.
 * @param passageOptions Options for fetching the passage.
 * @param [openAIModel] The OpenAI model to use (optional).
 * @param [maxReferenceCount] The maximum number of references to fetch (optional).
 * @returns - A promise that resolves to an array of passages with details.
 * @throws {UnknownBibleAbbreviationError} - If the Bible abbreviation is not found.
 * @throws {BibleNotAvailableError} - If the Bible details are not available.
 * @throws {BookIdNotFoundError} - If the book ID is not found in the Bible.
 */
export const seekPassagesWithDetails = async (
	description: string,
	bibleAbbreviation: string,
	passageOptions: PassageOptions,
	openAIModel?: OpenAIModels,
	maxReferenceCount?: number,
): Promise<PassageWithDetails[]> => {
	const referencesWithoutBible = await getReferencesFromDescription(
		description,
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

	const bible = await getBibleDetails(bibleId);

	if (bible === undefined) {
		throw new BibleNotAvailableError(bibleId);
	}

	const passages: PassageWithDetails[] = [];
	for (const referenceWithoutBible of referencesWithoutBible) {
		const reference = {
			...referenceWithoutBible,
			bibleId,
		};

		const book = await getBookDetails(reference.bookId, reference.bibleId);
		if (book === undefined) {
			throw new BookIdNotFoundError(reference.bookId, reference.bibleId);
		}

		const passage = await getPassageFromReference(reference, passageOptions);

		const passageWithDetails: PassageWithDetails = {
			bible,
			book,
			fums: passage.meta,
			passage: passage.data,
		};
		passages.push(passageWithDetails);
	}

	return passages;
};
