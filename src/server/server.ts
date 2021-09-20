import express from 'express';
import fs from 'fs';
import path from 'path';
import { post } from '../types/post';

const app = express();

app.use('/static', express.static(path.join(__dirname, 'posts')));

app.get('/api', (req, res) => {
  try {
    const index = Math.floor(Math.random() * 387) + 1;
    const post: post = JSON.parse(
      fs.readFileSync(`./posts/${index}.json`).toString(),
    );
    res.send(post);
  } catch (error) {
    console.log(error);
    res.send('API Error. Please try again later');
  }
});

app.get('/api/:number', (req, res) => {
  try {
    const post: post = JSON.parse(
      fs.readFileSync(`./posts/${req.params.number}.json`).toString(),
    );
    res.send(post);
  } catch (error) {
    console.log(error);
    res.send('Error! The number should be between 1 and 387');
  }
});

app.use('*', (req, res) => {
  res.send('Not found. Try /api');
});

export const server = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};
