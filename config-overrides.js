require('dotenv').config();

const fs = require('fs');
const path = require('path');

const Handlebars = require('handlebars');

const readline = require('readline');

async function getFirstLine(pathToFile) {
  const readable = fs.createReadStream(pathToFile, 'utf8');
  const reader = readline.createInterface({ input: readable });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });
  readable.close();
  return line;
}

//var uniqid = require('uniqid');
//const FileManagerPlugin = require('filemanager-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');
//const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: function (config, env) {
    console.log('env', env);

    if (env !== 'production') {
      return config;
    }
    config.entry = './src/index_build.js';
    /*
		const buildHash = uniqid();
*/

    config.output.filename = './static/js/main.js';
    config.output.publicPath = '';


    /*
		config.output.chunkFilename = `js/[id].bundle.js?v=${buildHash}`;
		config.plugins.push(
			new FileManagerPlugin({
				onEnd: {
					copy: [{ source: '../ MyApp/build', destination: '../MyApp/app' }]
				}
			})
		);

		config.plugins.push(new HtmlWebPackPlugin());
		*/
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/main.css',
      })
    );

    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', async (compilation) => {
          const { emittedAssets } = compilation;

          const folderPath = './build/static';
          const jsPath = './js/main.js'; // Replace with your actual output path
          const cssPath = './css/main.css'; // Replace with your actual output path
          const bundlePath = `${folderPath}/bundle.js`; // Replace with your actual output jsFile

          const jsOutput = path.join(folderPath, jsPath);
          const cssOutput = path.join(folderPath, cssPath);
          const outputFileContent = fs.readFileSync(jsOutput, 'utf8');
          const cssContent = await getFirstLine(cssOutput);

          const template = Handlebars.compile(outputFileContent);

          let contents = template({ css_to_replace: `'${cssContent}'` });
          contents = contents.replace(`"'.`, `'.`).replace(`'";`, `';`);

          fs.writeFile(bundlePath, contents, 'utf8', (err) => {
            if (err) {
              return console.error(
                `Autsch! Failed to store template: ${err.message}.`
              );
            }

            console.log('Saved template!');
          });

          console.log('Web component build completed successfully.');
        });
      },
    });
    return config;
  },
};
