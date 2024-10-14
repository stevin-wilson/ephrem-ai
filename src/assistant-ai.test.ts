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
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			process.env.OPENAI_API_KEY!,
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
});
