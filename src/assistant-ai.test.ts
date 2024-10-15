import { describe, expect, it } from "vitest";

// – – – – – – – – – –
import {
	getReferencesFromDescription,
	ReferenceWithoutBible,
} from "./assistant-ai.js";

describe("seek passage", () => {
	it("confirm ability to produce reference", async () => {
		const result = await getReferencesFromDescription(
			"The creation of the world",
		);

		const expectedReferences: ReferenceWithoutBible[] = [
			{
				bookId: "GEN",
				chapterEnd: "2",
				chapterStart: "1",
				verseEnd: "3",
				verseStart: "1",
			},
		];

		expect(result).toStrictEqual(expectedReferences);
	});

	it("confirm ability to work with query in malayalam", async () => {
		const result = await getReferencesFromDescription("യേശു ലാസറിനെ ഉയർത്തി");

		const expectedReferences: ReferenceWithoutBible[] = [
			{
				bookId: "JHN",
				chapterStart: "11",
				verseEnd: "44",
				verseStart: "1",
			},
		];

		expect(result).toStrictEqual(expectedReferences);
	});
});
