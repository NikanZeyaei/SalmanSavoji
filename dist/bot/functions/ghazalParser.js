"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ghazalParser = void 0;
const ghazalParser = (post) => {
    let result = '📚 ';
    result += post.title + '\n\n\n';
    post.abyat.forEach((beyt) => {
        result += beyt.m1 + '\t\t\t\t\t' + beyt.m2 + '\n\n';
    });
    return result;
};
exports.ghazalParser = ghazalParser;
