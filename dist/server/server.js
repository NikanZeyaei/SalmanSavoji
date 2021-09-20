"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'posts')));
app.get('/api', (req, res) => {
    try {
        const index = Math.floor(Math.random() * 387) + 1;
        const post = JSON.parse(fs_1.default.readFileSync(`./posts/${index}.json`).toString());
        res.send(post);
    }
    catch (error) {
        console.log(error);
        res.send('API Error. Please try again later');
    }
});
app.get('/api/:number', (req, res) => {
    try {
        const post = JSON.parse(fs_1.default.readFileSync(`./posts/${req.params.number}.json`).toString());
        res.send(post);
    }
    catch (error) {
        console.log(error);
        res.send('Error! The number should be between 1 and 387');
    }
});
app.use('*', (req, res) => {
    res.send('Not found. Try /api');
});
const server = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
};
exports.server = server;
