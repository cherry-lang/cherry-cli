var program = require('commander');
var exec = require('child_process').exec;
var printer = require('./printer');

function errorToString(error) {
    switch(error.tag) {
    case 'TypeMismatch':
        return `I expected\n\n\t${error.expected}\n\n but instead I got\n\n\t${error.got}`;

    case 'UnboundError':
        return `It seems like "${error.got}" is not defined.`;

    case 'UndefinedError':
        return `The type "${error.got}" was never defined.`;
    }
}
function compile(file) {
    exec(`${__dirname}/bin/cherry ${file}`, (err, stdout, stderr) => {
        if (!err) {
            console.log(stdout);
        } else {
            var error = JSON.parse(JSON.parse(stdout));

            printer.error({
                heading: error.tag,
                msg1: "Ops... there's something wrong with your code.",
                msg2: errorToString(error),
                file: error.context.file,
                code: {
                    line: error.context.line,
                    src: error.context.srcLine,
                },
            });
        }
    });
}

program
    .arguments('<file>')
    .action(compile)
    .parse(process.argv);
