import { expect, test as it } from "@playwright/test";
import { projects } from "@/data/projects";

it("should show all projects in a grid with no carousel controls", async ({
  page,
}) => {
  await page.goto("/");

  for (const project of projects) {
    await expect(
      page.getByRole("heading", { name: project.title }),
    ).toBeVisible();
  }

  await expect(
    page.getByRole("button", { name: /next slide|previous slide/i }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("link", { name: "Take me to the project" }).first(),
  ).toHaveAttribute("href", "https://dinas-lab.vercel.app/");
  await expect(
    page.getByRole("link", { name: "View DiNAs Lab GitHub repository" }),
  ).toHaveAttribute("href", "https://github.com/cbussick/cb-masterthesis");
  await expect(
    page.getByRole("link", { name: "Infinite loop 👀" }),
  ).toHaveAttribute("href", "https://cbussick.dev");
});
