import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: { width: 1920, height: 1000 },
    userDataDir: "temporary",
  });
  const page = await browser.newPage();

  // your code here
  await page.goto("https://duckduckgo.com", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector("#searchbox_input");
  await page.type("#searchbox_input", "Bangladesh");
  await page.click('[aria-label="Search"]');
  await page.waitForSelector(`[data-testid="result-title-a"]`);

  const result = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(`[data-testid="result-title-a"]`)
    ).map((el) => el.textContent);
  });

  console.log({ result });

  //   await page.screenshot({ path: "CoutryNameSearch.png" });
  console.log(result);

  await browser.close();
})();
