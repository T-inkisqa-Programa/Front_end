export type TestimonioComment = {
  id: string;
  age: number;
  time: string;
  text: string;
};

export type Testimonio = {
  id: string;
  age: number;
  time: string;
  title: string;
  text: string;
  likes: number;
  saved: boolean;
  mood?: { label: string; emoji: string; color: string };
  comments: TestimonioComment[];
};
