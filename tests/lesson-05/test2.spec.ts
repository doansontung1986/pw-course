import { expect, Locator, test } from "@playwright/test";

test("Test 2 - Add multiple products to cart and verify totals", async ({
  page,
}) => {
  const products = [
    {
      productName: "Product 1",
      price: 10,
      expectedQuantity: 2,
      expectedTotal: "$20",
    },
    {
      productName: "Product 2",
      price: 20,
      expectedQuantity: 3,
      expectedTotal: "$60",
    },
    {
      productName: "Product 3",
      price: 30,
      expectedQuantity: 1,
      expectedTotal: "$30",
    },
  ];

  const convertCurrency = (n: number) => `$${n.toFixed(2)}`;

  await page.goto("https://material.playwrightvn.com/");

  await page.getByRole("link", { name: "Bài học 2: Product page" }).click();

  await expect(
    page.getByRole("heading", { name: "Simple E-commerce" }),
  ).toBeVisible();

  // Add to cart cho từng product
  for (const product of products) {
    const card: Locator = page
      .locator(".products .product")
      .filter({ has: page.getByText(product.productName, { exact: true }) });

    for (let i = 0; i < product.expectedQuantity; i++) {
      await card.getByRole("button", { name: "Add to Cart" }).click();
    }
  }

  let totalPrice: number = 0;

  for (const product of products) {
    const cell: Locator = page
      .locator("table tbody#cart-items tr")
      .filter({ has: page.getByText(product.productName, { exact: true }) })
      .locator("td");
    const productPriceTotal = product.price * product.expectedQuantity;
    totalPrice += productPriceTotal;

    await expect(cell.nth(0)).toHaveText(product.productName);
    await expect(cell.nth(1)).toHaveText(
      String(convertCurrency(product.price)),
    );
    await expect(cell.nth(2)).toHaveText(String(product.expectedQuantity));
    await expect(cell.nth(3)).toHaveText(
      String(convertCurrency(productPriceTotal)),
    );
  }

  await expect(page.locator(".total-price")).toHaveText(
    String(convertCurrency(totalPrice)),
  );
});
