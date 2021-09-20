import { beyt } from '../../types/beyt';
import { post } from '../../types/post';

export const ghazalParser = (post: post) => {
  let result = '📚 ';
  result += post.title + '\n\n\n';
  post.abyat.forEach((beyt: beyt) => {
    result += beyt.m1 + '\t\t\t\t\t' + beyt.m2 + '\n\n';
  });
  return result;
};
