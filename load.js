const { spawn } = require('child_process');

const puppeteer = require('puppeteer');

const port = '9798';
const cp = spawn('python3', ['-m', 'http.server', port]);
cp.stdout.on('data', (data) => {
  console.log(data.toString());
});

cp.stderr.on('data', (data) => {
  console.warn(data.toString());
});

const version = process.argv[2];
if (!version) {
  console.log('test is required argument (try coldbrew.html or pyodide.html)');
  process.exit(1);
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--enable-features=SharedArrayBuffer'],
    });
    const page = await browser.newPage();

    //page.on('console', (d) => console.log(d));

    ['error', 'pageerror'].forEach(typ => {
      page.on(typ, (e) => {
	console.error(e);
      });
    });

    const start = new Date();
    await page.goto(`http://localhost:${port}/${version}`, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });
    const end = new Date();
    console.log(end - start);

    await browser.close();
  } finally {
    process.kill(cp.pid);
  }
})();
