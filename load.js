const puppeteer = require('puppeteer');

const version = process.argv[2];
if (!version) {
  console.log();
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const start = new Date();
  await page.goto('file:/' + __dirname + '/' + version, {
    awaitUntil: ['load', 'domcontentloaded', 'networkidle0'],
  });
  const end = new Date();
  console.log(end - start);

  await browser.close();
})();
