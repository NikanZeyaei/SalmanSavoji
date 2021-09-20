"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botStart = void 0;
const grammy_1 = require("grammy");
const axios_1 = __importDefault(require("axios"));
const ghazalParser_1 = require("./functions/ghazalParser");
const bot = new grammy_1.Bot('‌BOT_TOKEN');
bot.command('ghazal', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get('https://salmansavoji.herokuapp.com/api');
        const post = data.data;
        const result = (0, ghazalParser_1.ghazalParser)(post);
        ctx.reply(result, {
            reply_markup: new grammy_1.InlineKeyboard()
                .text('شعر جدید', 'newPost')
                .row()
                .url('لینک گنجور', `${post.url}`)
                .row()
                .switchInline('ارسال غزل جدید به دیگران'),
        });
    }
    catch (error) {
        console.log(error);
    }
}));
bot.command('start', (ctx) => {
    try {
        ctx.reply('درود فراوان!' +
            '\n' +
            'برای شروع /ghazal را ارسال کنید یا روی دکمه‌ی پایین بزنید', {
            reply_markup: new grammy_1.InlineKeyboard()
                .text('ارسال شعر', 'newPost')
                .row()
                .switchInline('ارسال شعر به دیگران'),
        });
    }
    catch (error) {
        console.log(error);
    }
});
bot.callbackQuery('newPost', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get('https://salmansavoji.herokuapp.com/api');
        const post = data.data;
        const result = (0, ghazalParser_1.ghazalParser)(post);
        ctx.reply(result, {
            reply_markup: new grammy_1.InlineKeyboard()
                .text('شعر جدید', 'newPost')
                .row()
                .url('لینک گنجور', `${post.url}`)
                .row()
                .switchInline('ارسال غزل به دیگران'),
        });
        yield ctx.answerCallbackQuery();
    }
    catch (error) {
        console.log(error);
    }
}));
bot.inlineQuery(/(.*?)/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get('https://salmansavoji.herokuapp.com/api');
        const post = data.data;
        const result = (0, ghazalParser_1.ghazalParser)(post);
        yield ctx.answerInlineQuery([
            {
                type: 'article',
                id: 'post',
                title: 'غزل جدید',
                input_message_content: {
                    message_text: result +
                        '\n\n' +
                        '✅ ' +
                        'برای استفاده‌ی ساده‌تر بنده را در گروه خود اضافه کنید.',
                },
                reply_markup: new grammy_1.InlineKeyboard()
                    .url('لینک گنجور', `${post.url}`)
                    .row()
                    .switchInline('ارسال غزل به دیگران'),
                description: '📚 ' + post.title,
            },
        ], { cache_time: 0 });
    }
    catch (error) {
        console.log(error);
    }
}));
bot.on(':new_chat_members:me', (ctx) => {
    ctx.reply('تشکر فراوان که بنده را به گروهتان اضافه کردید!' +
        '\n\n' +
        'برای شروع به استفاده دکمه‌ی زیر را بفشارید!', {
        reply_markup: new grammy_1.InlineKeyboard().text('ارسال شعر', 'newPost'),
    });
});
const botStart = () => {
    bot.start();
};
exports.botStart = botStart;
