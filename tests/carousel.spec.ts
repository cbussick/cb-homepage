import { expect, test as it } from "@playwright/test";

it("should navigate and loop through carousel slides", async ({ page }) => {
  await page.goto("/");

  const nextButton = page.getByRole("button", { name: "Next slide" });
  const prevButton = page.getByRole("button", { name: "Previous slide" });
  const track = page.getByTestId("carousel-track");

  async function activeSlideIndex() {
    return track.evaluate((el) => {
      const match = getComputedStyle(el).transform.match(
        /matrix\(1, 0, 0, 1, (-?[\d.]+), 0\)/,
      );
      const x = match ? parseFloat(match[1]) : 0;
      const slideWidth = (el.parentElement as HTMLElement).clientWidth;
      return Math.round(-x / slideWidth) + 0;
    });
  }

  await expect.poll(activeSlideIndex).toBe(0);

  await nextButton.click();
  await expect.poll(activeSlideIndex).toBe(1);

  await prevButton.click();
  await expect.poll(activeSlideIndex).toBe(0);

  await nextButton.click();
  await nextButton.click();
  await nextButton.click();
  await expect.poll(activeSlideIndex).toBe(3);

  await nextButton.click();
  await expect.poll(activeSlideIndex).toBe(0);

  await expect(
    page.getByRole("heading", { name: "Protégé-Chat" }),
  ).toBeAttached();
  await expect(
    page.getByRole("link", { name: "Take me to the project" }).first(),
  ).toHaveAttribute("href", "https://dinas-lab.vercel.app/");
});
