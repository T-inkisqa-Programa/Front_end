export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; uri: string }
  | { type: 'quote'; text: string };

export type Article = {
  id: string;
  title: string;
  author: string;
  image: string;
  readTime: string;
  contentType: string;
  category: string;
  saved: boolean;
  authorPhoto: string;
  authorRole: string;
  audioMinutes: number;
  blocks: ArticleBlock[];
};
