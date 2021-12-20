const { spawn } = require('child_process');

const puppeteer = require('puppeteer');

const version = process.argv[2];
const verbose = process.argv.includes('--verbose');

const port = '9798';
const cp = spawn('python3', ['-m', 'http.server', port]);
if (verbose) {
  cp.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  cp.stderr.on('data', (data) => {
    console.warn(data.toString());
  });
}

if (!version) {
  console.log('test is required argument (try coldbrew.html or pyodide.html)');
  process.exit(1);
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      // Required for coldbrew
      args: ['--enable-features=SharedArrayBuffer'],
    });
    const page = await browser.newPage();

    if (verbose) {
      page.on('console', (d) => console.log(d));
    }

    ['error', 'pageerror'].forEach(typ => {
      page.on(typ, (e) => {
	console.error(e);
	process.exit(1);
      });
    });

    const start = new Date();
    await page.goto(`http://localhost:${port}/${version}`, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });
    const end = new Date();
    console.log((end - start) / 1000);

    await browser.close();
  } finally {
    process.kill(cp.pid);
  }
})();
