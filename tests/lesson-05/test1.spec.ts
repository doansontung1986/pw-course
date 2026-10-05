import { expect, Locator, test } from "@playwright/test";

test("Test 1 - Register user with full information successfully", async ({
  page,
}) => {
  const user = {
    username: "tung.doan",
    email: "tung.doan@example.com",
    gender: "male",
    hobbies: ["reading", "traveling"],
    interests: ["technology", "science"],
    country: "Australia",
    dob: "1990-01-01",
    filePath: "data/dashboard_logo.png",
    biography: "I'm an Automation QA",
  };

  await page.goto("https://material.playwrightvn.com/");

  await page
    .getByRole("link", { name: "Bài học 1: Register Page (có đủ các element)" })
    .click();

  await expect(
    page.getByRole("heading", { name: "User Registration" }),
  ).toBeVisible();

  await page.getByRole("textbox", { name: "Username" }).fill(user.username);

  await page.getByRole("textbox", { name: "Email" }).fill(user.email);

  await page.getByRole("radio", { name: "Male", exact: true }).check();

  await page.getByRole("checkbox", { name: "Reading" }).check();

  await page.getByRole("checkbox", { name: "Traveling" }).check();

  await page
    .getByRole("listbox", { name: "Interests" })
    .selectOption(["technology", "science"]);

  await page
    .getByRole("combobox", { name: "Country" })
    .selectOption(user.country);

  await page.getByLabel("Date of Birth:").fill(user.dob);

  await page.getByLabel("Profile Picture:").setInputFiles(user.filePath);

  await page.getByRole("textbox", { name: "Biography" }).fill(user.biography);

  await page.getByRole("button", { name: "Register" }).click();

  const userRow: Locator = page
    .locator("#userTable tbody tr")
    .filter({ has: page.getByText(user.username, { exact: true }) });

  const userInfo: Locator = userRow.locator("td");
  await expect(userInfo.nth(1)).toHaveText(user.username);
  await expect(userInfo.nth(2)).toHaveText(user.email);
  await expect(userInfo.nth(3)).toContainText(user.gender);
  for (const hobby of user.hobbies) {
    await expect(userInfo.nth(3)).toContainText(hobby, { ignoreCase: true });
  }
  await expect(userInfo.nth(3)).toContainText(user.dob);
  await expect(userInfo.nth(3)).toContainText(user.country, {
    ignoreCase: true,
  });
  await expect(userInfo.nth(3)).toContainText(user.biography, {
    ignoreCase: true,
  });
});
