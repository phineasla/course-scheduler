import "./Timetable.scss";
import dayjs, { Dayjs } from "dayjs";
import { timeRange } from "../utils/utils";

const defaultDaysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DayHeader = ({ daysOfWeek }: { daysOfWeek: string[] }) => {
  return (
    <div className="day--header">
      {daysOfWeek.map((value, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
};

const Timeline = ({
  timeRange,
  height: cellHeight,
}: {
  timeRange: Dayjs[];
  height: string;
}) => {
  return (
    <div className="timeline" style={{ height: cellHeight }}>
      {timeRange.map((value, i) => (
        <div key={i}>{value.format("HH:mm")}</div>
      ))}
    </div>
  );
};

const DayGrid = ({
  timeRange,
  numDaysOfWeek,
  height,
}: {
  timeRange: Dayjs[];
  numDaysOfWeek: number;
  height: string;
}) => {
  const col = [];
  for (let i = 0; i < timeRange.length; i++) {
    col.push(<div key={i}></div>);
  }
  const cols = [];
  for (let i = 0; i < numDaysOfWeek; i++) {
    cols.push(<div key={i}>{col}</div>);
  }
  return (
    <div className="day--grid" style={{ height: height }}>
      {cols}
    </div>
  );
};

export const Timetable = ({
  daysOfWeek = defaultDaysOfWeek,
  startTime = dayjs().hour(7).minute(0),
  endTime = dayjs().hour(15).minute(0),
  step = 1,
  stepUnit = "hour",
  cellHeight = 3,
  cellHeightUnit = "rem",
}) => {
  const timelineRange = timeRange(startTime, endTime, step, stepUnit);
  const yCells = timelineRange.length;
  const xCells = daysOfWeek.length;
  const totalHeight = `${cellHeight * yCells}${cellHeightUnit}`;

  return (
    <div className="timetable">
      <DayHeader daysOfWeek={daysOfWeek} />
      <Timeline timeRange={timelineRange} height={totalHeight} />
      <DayGrid
        timeRange={timelineRange}
        numDaysOfWeek={xCells}
        height={totalHeight}
      />
    </div>
  );
};
