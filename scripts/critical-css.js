const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const critical = await import('critical');
    const buildDir = path.resolve(__dirname, '../.next');
    const htmlPath = path.resolve(buildDir, 'server/app/index.html');

    if (!fs.existsSync(htmlPath)) {
      console.error(`HTML file not found at ${htmlPath}. Skipping critical CSS generation.`);
      return;
    }

    console.log(`Found HTML file at: ${htmlPath}. Preparing to generate critical CSS...`);

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const modifiedHtmlContent = htmlContent.replace(/\/_next\//g, '');

    console.log('Asset paths modified. Generating critical CSS...');

    await critical.generate({
      inline: true,
      base: buildDir,
      html: modifiedHtmlContent,
      target: {
        html: htmlPath,
      },
      width: 1300,
      height: 900,
      // Pass puppeteer options to the underlying Penthouse library
      penthouse: {
        puppeteer: {
          args: ['--no-sandbox'],
        },
      },
    });

    console.log('Critical CSS inlined successfully.');

  } catch (error) {
    console.error('Error generating critical CSS:', error);
    process.exit(1);
  }
})();
