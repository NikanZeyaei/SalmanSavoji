import { Bot, InlineKeyboard } from 'grammy';
import axios from 'axios';
import { ghazalParser } from './functions/ghazalParser';
import { post } from '../types/post';

const bot = new Bot('‌BOT_TOKEN');

bot.command('ghazal', async (ctx) => {
  try {
    const data = await axios.get('https://salmansavoji.herokuapp.com/api');
    const post: post = data.data;
    const result = ghazalParser(post);
    ctx.reply(result, {
      reply_markup: new InlineKeyboard()
        .text('شعر جدید', 'newPost')
        .row()
        .url('لینک گنجور', `${post.url}`)
        .row()
        .switchInline('ارسال غزل جدید به دیگران'),
    });
  } catch (error) {
    console.log(error);
  }
});

bot.command('start', (ctx) => {
  try {
    ctx.reply(
      'درود فراوان!' +
        '\n' +
        'برای شروع /ghazal را ارسال کنید یا روی دکمه‌ی پایین بزنید',
      {
        reply_markup: new InlineKeyboard()
          .text('ارسال شعر', 'newPost')
          .row()
          .switchInline('ارسال شعر به دیگران'),
      },
    );
  } catch (error) {
    console.log(error);
  }
});

bot.callbackQuery('newPost', async (ctx) => {
  try {
    const data = await axios.get('https://salmansavoji.herokuapp.com/api');
    const post: post = data.data;
    const result = ghazalParser(post);
    ctx.reply(result, {
      reply_markup: new InlineKeyboard()
        .text('شعر جدید', 'newPost')
        .row()
        .url('لینک گنجور', `${post.url}`)
        .row()
        .switchInline('ارسال غزل به دیگران'),
    });
    await ctx.answerCallbackQuery();
  } catch (error) {
    console.log(error);
  }
});

bot.inlineQuery(/(.*?)/, async (ctx) => {
  try {
    const data = await axios.get('https://salmansavoji.herokuapp.com/api');
    const post: post = data.data;
    const result = ghazalParser(post);
    await ctx.answerInlineQuery(
      [
        {
          type: 'article',
          id: 'post',
          title: 'غزل جدید',
          input_message_content: {
            message_text:
              result +
              '\n\n' +
              '✅ ' +
              'برای استفاده‌ی ساده‌تر بنده را در گروه خود اضافه کنید.',
          },
          reply_markup: new InlineKeyboard()
            .url('لینک گنجور', `${post.url}`)
            .row()
            .switchInline('ارسال غزل به دیگران'),
          description: '📚 ' + post.title,
        },
      ],
      { cache_time: 0 }, // one month in seconds
    );
  } catch (error) {
    console.log(error);
  }
});

bot.on(':new_chat_members:me', (ctx) => {
  ctx.reply(
    'تشکر فراوان که بنده را به گروهتان اضافه کردید!' +
      '\n\n' +
      'برای شروع به استفاده دکمه‌ی زیر را بفشارید!',
    {
      reply_markup: new InlineKeyboard().text('ارسال شعر', 'newPost'),
    },
  );
});

export const botStart = () => {
  bot.start();
};
