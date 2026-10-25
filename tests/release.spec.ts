import { test, expect } from "@playwright/test";
test("release demo: authored chat, call, cross-app event, ending and mobile layout", async ({
  page,
  request,
}) => {
  const response = await request.get("/work.json");
  const work = await response.json();
  expect(work.id).toBe("template-demo");
  expect(work.nodes).toHaveLength(3);
  expect(
    (await request.get("/test-work.json")).headers()["content-type"],
  ).not.toContain("application/json");
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "轻触解锁" }).waitFor();
  await page
    .locator(".phone-screen")
    .screenshot({ path: "docs/images/lock.png" });
  await page.getByRole("button", { name: "轻触解锁" }).click();
  await expect(page.locator(".lock-screen")).toHaveCount(0);
  await expect(page.locator(".interactive-home")).toHaveCSS("opacity", "1");
  await page
    .locator(".phone-screen")
    .screenshot({ path: "docs/images/home.png" });
  await page.getByRole("button", { name: "打开设置", exact: true }).click();
  await expect(page.getByRole("switch", { name: "飞行模式" })).toBeVisible();
  await expect(page.locator(".app-screen:not([inert])")).toHaveCSS(
    "transform",
    "none",
  );
  await page
    .locator(".phone-screen")
    .screenshot({ path: "docs/images/settings.png" });
  await page.getByRole("button", { name: "返回桌面", exact: true }).click();
  async function open(name: string) {
    await page
      .getByRole("button", { name: "打开App Store", exact: true })
      .click();
    await page.getByPlaceholder("搜索全部App").fill(name);
    await page
      .locator(".runtime-library-row")
      .getByRole("button", { name: "打开", exact: true })
      .click();
    await expect(page.locator(".app-screen:not([inert])")).toHaveCSS(
      "transform",
      "none",
    );
  }
  await open("KakaoTalk");
  await page.locator(".kzkcr").click();
  await page
    .locator(".phone-screen")
    .screenshot({ path: "docs/images/chat.png" });
  await page
    .getByRole("button", {
      name: "轻触这条消息，体验一次模拟来电。",
      exact: true,
    })
    .click();
  await expect(page.locator(".incoming-call-screen")).toBeVisible();
  await page.getByRole("button", { name: "接听", exact: false }).click();
  await page.getByRole("button", { name: "挂断", exact: false }).click();
  await page.getByRole("button", { name: "返回桌面", exact: true }).click();
  await open("Instagram");
  await expect(
    page.getByText("你已完成通话联动。轻触这条动态，完成演示。", {
      exact: false,
    }),
  ).toBeVisible();
  await page
    .getByText("你已完成通话联动。轻触这条动态，完成演示。", { exact: false })
    .click();
  await expect(page.getByText("演示完成", { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 393, height: 852 });
  await page.screenshot({ path: "outputs/release/mobile-demo.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
