import "../styles/Timetable.scss";
import styled from "styled-components";
import EventGrid from "./EventGrid";
import { Course, Size } from "../types";
import { setOnly, sizeToString } from "../utils/Utils";
import { format, eachMinuteOfInterval, roundToNearestMinutes } from "date-fns";

/**
 * Use undefined for 1-hour precision,
 * @see https://date-fns.org/v2.25.0/docs/roundToNearestMinutes
 */
const minutePrecision = {
  nearestTo: 30,
};

const defaultDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Wrapper = styled.div`
  height: ${({ height }: { height: string }) => height};
`;

/**
 *
 * @param courses - Array of courses
 * @param timeInterval - The start and end time with precision equals `minutePrecision`.
 * For example, if `timeInterval.start = 07:12:00` and `minutePrecision = 15`
 * => `roundedTimeInterval.start = 07:15:00`
 * @param weekStartOnSunday
 * @param minutesPerCell
 * @param cellHeight
 */
export default function Timetable({
  courses = [],
  timeStart,
  timeEnd,
  weekStartOnSunday,
  minutesPerCell,
  cellHeight,
}: {
  courses: Course[];
  timeStart: Date;
  timeEnd: Date;
  weekStartOnSunday: boolean;
  minutesPerCell: number;
  cellHeight: Size;
}) {
  const days = defaultDays;
  const roundedStart = roundToNearestMinutes(timeStart, minutePrecision);
  const roundedEnd = roundToNearestMinutes(timeEnd, minutePrecision);
  const timemarks = eachMinuteOfInterval(
    { start: roundedStart, end: roundedEnd },
    { step: minutesPerCell }
  );
  const rowCount = timemarks.length;
  const columnCount = days.length;
  const totalHeight = {
    value: cellHeight.value * rowCount,
    unit: cellHeight.unit,
  };
  // Move Sunday to the back
  if (!weekStartOnSunday) days.push(days.shift()!);

  courses = [
    {
      info: { id: "1234", name: "c1", color: "blue" },
      intervals: [
        {
          start: setOnly({ day: 1, hour: 8, min: 0 }),
          end: setOnly({ day: 1, hour: 10 }),
        },
        {
          start: setOnly({ day: 3, hour: 8 }),
          end: setOnly({ day: 3, hour: 11 }),
        },
      ],
    },
    {
      info: { id: "4567", name: "c2", color: "green" },
      intervals: [
        {
          start: setOnly({ day: 1, hour: 9 }),
          end: setOnly({ day: 1, hour: 11 }),
        },
        {
          start: setOnly({ day: 2, hour: 9 }),
          end: setOnly({ day: 2, hour: 10 }),
        },
        {
          start: setOnly({ day: 2, hour: 1 }),
          end: setOnly({ day: 2, hour: 2 }),
        },
      ],
    },
  ];

  return (
    <div className="timetable">
      <Header days={days} />
      <Timeline timemarks={timemarks} height={totalHeight} />
      <div className="timetable-body">
        <Grid
          rowCount={rowCount}
          columnCount={columnCount}
          height={totalHeight}
        />
        <EventGrid
          courses={courses}
          timeStart={timeStart}
          timeEnd={timeEnd}
          cellHeight={cellHeight}
          minutesPerCell={minutesPerCell}
          weekStartOnSunday={weekStartOnSunday}
        />
      </div>
    </div>
  );
}

function Header({ days }: { days: String[] }) {
  return (
    <div className="timetable-header">
      {days.map((value, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
}

function Timeline({ timemarks, height }: { timemarks: Date[]; height: Size }) {
  return (
    <Wrapper className="timeline" height={sizeToString(height)}>
      {timemarks.map((date, i) => (
        <div key={i}>{format(date, "HH:mm")}</div>
      ))}
    </Wrapper>
  );
}

function Grid({
  rowCount,
  columnCount,
  height,
}: {
  rowCount: number;
  columnCount: number;
  height: Size;
}) {
  const cells = [];
  for (let i = 0; i < rowCount; i++) {
    cells.push(<div key={i}></div>);
  }
  const cols = [];
  for (let i = 0; i < columnCount; i++) {
    cols.push(<div key={i}>{cells}</div>);
  }
  return (
    <Wrapper className="timetable-grid" height={sizeToString(height)}>
      {cols}
    </Wrapper>
  );
}
