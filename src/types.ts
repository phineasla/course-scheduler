export type Measurement = { value: number; unit: string };
export type CourseInfo = { name: string; color: string; [key: string]: any };
export type Course = {
  intervals: Interval[];
  info: CourseInfo;
};
export type CourseEvent = {
  interval: Interval;
  info: CourseInfo;
};
export type Box = {
  top: Measurement;
  left?: Measurement;
  height: Measurement;
  width?: Measurement;
};
