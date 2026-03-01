const { chromium } = require('playwright');

const urls = [
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=6',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=7',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=8',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=9',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=10',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=11',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=12',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=13',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=14',
    'https://sanand0.github.io/tdsdata/js%5Ftable/?seed=15'
];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let grandTotal = 0;

    for (let url of urls) {
        await page.goto(url);
        await page.waitForSelector('table');

        const numbers = await page.$$eval('table td', (cells) =>
            cells
                .map(cell => parseFloat(cell.innerText))
                .filter(num => !isNaN(num))
        );

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        console.log(`Sum for ${url}: ${sum}`);

        grandTotal += sum;
    }

    console.log("FINAL TOTAL:", grandTotal);

    await browser.close();
})();
