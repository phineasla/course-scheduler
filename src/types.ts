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
export type Box = {
  top: Size;
  left?: Size;
  height: Size;
  width?: Size;
};
