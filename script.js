const { chromium } = require('playwright');

async function scrapeAndSum(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const numbers = await page.$$eval('table td', (cells) =>
        cells.map((cell) => parseFloat(cell.innerText)).filter((num) => !isNaN(num))
    );

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log(`Sum for ${url}:`, sum);

    await browser.close();
}

const urls = [
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=6',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=7',
    // Add other URLs here...
];

(async () => {
    for (let url of urls) {
        await scrapeAndSum(url);
    }
})();
