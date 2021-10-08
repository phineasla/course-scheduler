export const hours = (
  hours: number,
  min: number = 0,
  sec: number = 0,
  ms: number = 0
) => {
  const time = new Date();
  time.setHours(hours, min, sec, ms);
  return time;
};
