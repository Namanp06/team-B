const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const CodeGen = require('swagger-js-codegen').CodeGen;

const specFile = require.resolve('./api-swagger.json');
const swagger = JSON.parse(fs.readFileSync(specFile, 'UTF-8'));
const reactjsSourceCode = CodeGen.getReactCode({
    className: 'UiApiUtils',
    swagger
});

fs.writeFile('index.js', reactjsSourceCode, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('Code generated and saved in main ' + chalk.green('index.js'));
});
