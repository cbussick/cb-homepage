import { expect, test as it } from "@playwright/test";

it("should load with expected content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Christopher Bussick");
  await expect(page.getByRole("heading", { name: /Hey/ })).toBeVisible();
  await expect(page.getByAltText("Me and Bruno")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "bussick.christopher@gmail.com" }),
  ).toHaveAttribute("href", "mailto:bussick.christopher@gmail.com");
});
