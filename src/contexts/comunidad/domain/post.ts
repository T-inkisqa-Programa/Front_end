export type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  minutesAgo: number;
  tag: string;
  content: string;
  isQuote: boolean;
  likes: number;
  comments: number;
  saved: boolean;
  isMine: boolean;
};
