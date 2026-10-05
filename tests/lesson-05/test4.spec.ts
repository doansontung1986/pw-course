import { expect, Locator, test } from "@playwright/test";

test("Test 4 - Add notes and search by title", async ({ page }) => {
  const NUMBER_OF_NOTES = 10;
  await page.goto("https://material.playwrightvn.com/");

  await page.getByRole("link", { name: "Bài học 4: Personal notes" }).click();

  const searchNotesField: Locator = page.getByPlaceholder("Search notes...");
  const titleField: Locator = page.getByPlaceholder("Enter note title");
  const contentField: Locator = page.getByPlaceholder("Enter note content");
  const addNoteBtn: Locator = page.getByRole("button", { name: "Add Note" });
  const notes = page.locator("#notes-list li");

  for (let i = 1; i <= NUMBER_OF_NOTES; i++) {
    await titleField.fill(`Note ${i}`);
    await contentField.fill(`Test note ${i}`);
    await addNoteBtn.click();
  }

  await expect(notes).toHaveCount(NUMBER_OF_NOTES);

  await expect(page.getByText("Total Notes:")).toHaveText(
    new RegExp(`Total Notes:\\s*${NUMBER_OF_NOTES}$`),
  );

  for (let i = 1; i <= NUMBER_OF_NOTES; i++) {
    await searchNotesField.fill(`Note ${i}`);
    const note = notes.filter({
      has: page.getByText(`Note ${i}`, { exact: true }),
    });

    await expect(note).toContainText(await searchNotesField.inputValue());
  }
});
