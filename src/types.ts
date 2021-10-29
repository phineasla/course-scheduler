export type Size = { value: number; unit: string };
export type CourseInfo = {
  id: string;
  name: string;
  color: string;
  [key: string]: any;
};
export type Course = {
  intervals: Interval[];
  info: CourseInfo;
};
export type CourseEvent = {
  time: Interval;
  info: CourseInfo;
};
export type TimetableState = {
  timeStart: Date;
  timeEnd: Date;
  weekStartOnSunday: boolean;
  minutesPerCell: number;
  cellHeight: Size;
  minutesPerVertUnit?: number;
  vertUnit?: string;
};
