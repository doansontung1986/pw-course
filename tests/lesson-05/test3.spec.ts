import { expect, test } from "@playwright/test";

test("Test 3 - Add multiple TODO tasks", async ({ page }) => {
  const NUMBER_OF_TASKS = 100;
  await page.goto("https://material.playwrightvn.com/");

  await page.getByRole("link", { name: "Bài học 3: Todo page" }).click();

  for (let i = 1; i <= NUMBER_OF_TASKS; i++) {
    await page.getByPlaceholder("Enter a new task").fill(`Todo ${i}`);
    await page.getByRole("button", { name: "Add Task" }).click();
  }

  await expect(page.locator("#task-list li")).toHaveCount(NUMBER_OF_TASKS);

  page.on("dialog", async (dialog) => dialog.accept());

  for (let i = 2; i <= NUMBER_OF_TASKS; i += 2) {
    const task = page
      .locator("#task-list li")
      .filter({ has: page.getByText(`Todo ${i}`, { exact: true }) });

    await task.getByRole("button", { name: "Delete" }).click();
  }

  await expect(page.locator("#task-list li")).toHaveCount(NUMBER_OF_TASKS / 2);

  for (let i = 0; i <= NUMBER_OF_TASKS; i++) {
    const task = page
      .locator("#task-list li")
      .filter({ has: page.getByText(`Todo ${i}`, { exact: true }) });
    await expect(task).toHaveCount(i % 2 === 0 ? 0 : 1);
  }
});
