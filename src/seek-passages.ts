import type {
	PassageAndFums,
	PassageOptions,
	PassageWithDetails,
	Reference,
} from "ephrem";

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

	const passages: PassageAndFums[] = [];

	for (const referenceWithoutBible of referencesWithoutBible) {
		const reference: Reference = {
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
		const reference: Reference = {
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
