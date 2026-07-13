import { expect, test as it } from "@playwright/test";

it("should show all projects in a grid with no carousel controls", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Protégé-Chat" }),
  ).toBeAttached();
  await expect(page.getByRole("heading", { name: "DiNAs Lab" })).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "VR Office Exercises" }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "Virtual Boxing Simulator" }),
  ).toBeAttached();

  await expect(
    page.getByRole("button", { name: /next slide|previous slide/i }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("link", { name: "Take me to the project" }).first(),
  ).toHaveAttribute("href", "https://dinas-lab.vercel.app/");
  await expect(
    page.getByRole("link", { name: "View DiNAs Lab GitHub repository" }),
  ).toHaveAttribute("href", "https://github.com/cbussick/cb-masterthesis");
});
