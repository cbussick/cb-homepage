import { expect, test as it } from "@playwright/test";

it.describe("desktop navigation", () => {
  it.use({ viewport: { width: 1280, height: 900 } });

  it("should point nav links to the right places", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "#projects",
    );
    await expect(page.getByRole("link", { name: "Reach out" })).toHaveAttribute(
      "href",
      "#reach-out",
    );
    await expect(page.getByRole("link", { name: "Me on GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });
});

it.describe("mobile drawer", () => {
  it.use({ viewport: { width: 375, height: 700 } });

  it("should open, close on Escape, and close on link click", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "Toggle navigation menu",
    });
    const dialog = page.locator("dialog");

    await trigger.click();
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await trigger.click();
    await dialog.getByRole("link", { name: "Projects" }).click();
    await expect(dialog).toBeHidden();
  });

  it("should close on close-button click", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "Toggle navigation menu",
    });
    const dialog = page.locator("dialog");

    await trigger.click();
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Close navigation menu" }).click();
    await expect(dialog).toBeHidden();
  });
});
