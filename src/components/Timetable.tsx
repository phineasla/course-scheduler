import "./Timetable.scss";
import { eachMinuteOfInterval, format, Interval } from "date-fns";
import { Measurement } from "../types";
import { hours } from "../utils/utils";
import { EventGroup } from "./EventGroup";

const defaultDaysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Timeline = ({
  timeRange,
  height: cellHeight,
}: {
  timeRange: Date[];
  height: string;
}) => {
  return (
    <div className="timeline" style={{ height: cellHeight }}>
      {timeRange.map((date, i) => (
        <div key={i}>{format(date, "HH:mm")}</div>
      ))}
    </div>
  );
};

const Grid = ({
  timeRange,
  numDaysOfWeek,
  height,
}: {
  timeRange: Date[];
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
    <div className="event-grid" style={{ height: height }}>
      {cols}
    </div>
  );
};

export const Timetable = ({
  daysOfWeek = defaultDaysOfWeek,
  range = { start: hours(7), end: hours(17) },
  stepInMinutes = 60,
  cellHeight = { value: 3, unit: "rem" },
}: {
  daysOfWeek?: string[];
  range?: Interval;
  stepInMinutes?: number;
  cellHeight?: Measurement;
}) => {
  const timeRange = eachMinuteOfInterval(range, { step: stepInMinutes });
  const yCells = timeRange.length;
  const xCells = daysOfWeek.length;
  const totalHeight = `${cellHeight.value * yCells}${cellHeight.unit}`;

  return (
    <div className="timetable">
      <div className="timetable--header">
        {daysOfWeek.map((value, i) => (
          <div key={i}>{value}</div>
        ))}
      </div>
      <Timeline timeRange={timeRange} height={totalHeight} />
      <div className="timetable--body">
        <Grid
          timeRange={timeRange}
          numDaysOfWeek={xCells}
          height={totalHeight}
        />
        <EventGroup />
      </div>
    </div>
  );
};
