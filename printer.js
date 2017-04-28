var chalk = require('chalk');
var _ = require('lodash');
var log = console.log;

function dash(x) {
    return _.range(x).map(() => '-').join('');
}

function header(title, file) {
    var fill = 60 - (title.length + file.length + 2);
    return `${title} ${dash(fill)} ${file}`
}

function codeBlock({ line, src }) {
    return `${line} | ${src}`;
}

function error({ heading, file, code, msg1, msg2 }) {
    var err = msg => log(chalk.red(msg));

    log();
    err(header(heading, file));
    log();
    err(' ' + msg1);
    log();
    err(' ' + codeBlock(code));
    log();
    err(' ' + msg2);
    log();
}

module.exports = {
    error: error,
};
