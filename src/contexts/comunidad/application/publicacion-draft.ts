export type PublicacionDraft = {
  media: string | null;
  people: string[];
  feeling: string;
  activity: string;
  location: string;
  text: string;
};

export const publicacionDraft: PublicacionDraft = {
  media: null,
  people: [],
  feeling: '',
  activity: '',
  location: '',
  text: '',
};
