import fs from 'fs';
import path from 'path';

interface IPostService {
  path: string;
  getFilesPaths: () => string[];
  getPost: (slug: string) => string;
}

export const postService: IPostService = {
  path: 'markdown/posts',
  getFilesPaths() {
    return fs.readdirSync(path.join(this.path));
  },
  getPost(slug) {
    return fs.readFileSync(path.join(this.path, `${slug}.md`)).toString();
  },
};
