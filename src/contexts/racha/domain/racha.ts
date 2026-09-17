export type RachaDia = {
  id: string;
  label: string;
  active: boolean;
  isToday?: boolean;
};

export type Racha = {
  current: number;
  best: number;
  totalDays: number;
  days: RachaDia[];
  message: string;
};