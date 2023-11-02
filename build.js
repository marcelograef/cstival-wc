const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

async function buildWebComponent() {

	const compiler = webpack(webpackConfig); // Create a Webpack compiler instance

	// Run the compilation
	compiler.run((err, stats) => {
		if (err) {
			console.error(err);
			return;
		}


		// Access the compiled output
		const outputPath = './dist'; // Replace with your actual output path
		const jsFile = 'bundle.js'; // Replace with your actual output jsFile
		const cssFile = 'main.css'; // Replace with your actual output jsFile

		// Create the output directory if it doesn't exist
		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath, { recursive: true });
		}

		const outputFilePath = path.join(outputPath, jsFile);
		const cssContent = path.join(outputPath, cssFile);
		const outputFileContent = fs.readFileSync(outputFilePath, 'utf8');



		// Write the modified output back to the file
		fs.writeFileSync(outputFileContent.replace('css_to_replace', cssContent), 'bundle.js', 'utf8');

		console.log('Web component build completed successfully.');
	});
}

buildWebComponent();
