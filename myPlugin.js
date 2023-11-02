const fs = require('fs');
const path = require('path');

async function buildWebComponent() {
	// Access the compiled output
	const folderPath = './build';
	const jsPath = './js/main.js'; // Replace with your actual output path
	const cssPath = './css/main.css'; // Replace with your actual output path
	const bundlePath = './bundle.js'; // Replace with your actual output jsFile

	const jsOutput = path.join(folderPath, jsPath);
	const cssContent = path.join(folderPath, cssPath);
	const outputFileContent = fs.readFileSync(jsOutput, 'utf8');

	// Write the modified output back to the file
	fs.writeFileSync(outputFileContent.replace('"css_to_replace"', `'${cssContent}'`), bundlePath, 'utf8');

	console.log('Web component build completed successfully.');
}

buildWebComponent();
