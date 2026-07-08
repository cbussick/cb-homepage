import { expect, test as it } from "@playwright/test";

it.describe("reveal-on-scroll", () => {
  it("should reveal a project card only after it scrolls into view", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page
      .getByRole("heading", { name: "Virtual Boxing Simulator" })
      .locator("xpath=ancestor::article");

    await expect(card).toHaveCSS("opacity", "0");
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
  });

  it("should not re-hide a card after scrolling away from it", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page
      .getByRole("heading", { name: "Virtual Boxing Simulator" })
      .locator("xpath=ancestor::article");

    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");

    await page.locator("#hero > div").scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
  });

  it.describe("reduced motion", () => {
    it("should shorten, not remove, the reveal transition", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.locator("#hero > div")).toHaveCSS(
        "transition-duration",
        "0.1s",
      );
    });
  });

  it.describe("no motion preference", () => {
    it.use({ contextOptions: { reducedMotion: "no-preference" } });

    it("should use the full reveal transition duration", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("#hero > div")).toHaveCSS(
        "transition-duration",
        "0.6s, 0.6s",
      );
    });
  });
});
