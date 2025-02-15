export interface Board {
  id: string;
  title: string;
  duration: {
    startDate: string;
    endDate: string;
  };
  priority: string;
}
