import "./Timetable.scss";
import styled from "styled-components";
import { EventGrid } from "./EventGrid";
import { Course, Size } from "../types";
import { setOnly, sizeToString } from "../utils/Utils";
import { format, eachMinuteOfInterval } from "date-fns";

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
 * @param timeInterval - The start and end time for timeline with 5-minute precision
 * @param weekStartOnSunday
 * @param minutesPerCell
 * @param cellHeight
 */
export default function Timetable({
  courses = [],
  timeInterval,
  weekStartOnSunday,
  minutesPerCell,
  cellHeight,
}: {
  courses: Course[];
  timeInterval: Interval;
  weekStartOnSunday: boolean;
  minutesPerCell: number;
  cellHeight: Size;
}) {
  const days = defaultDays;
  const times = eachMinuteOfInterval(timeInterval, { step: minutesPerCell });
  const rowCount = times.length;
  const columnCount = days.length;
  const totalHeight = {
    value: cellHeight.value * rowCount,
    unit: cellHeight.unit,
  };
  // Move Sunday to the back
  if (!weekStartOnSunday) days.push(days.shift()!);

  courses = [
    {
      info: { name: "c1", color: "blue" },
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
      info: { name: "c2", color: "green" },
      intervals: [
        {
          start: setOnly({ day: 1, hour: 10 }),
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
  // console.log(courses);

  return (
    <div className="timetable">
      <Header days={days} />
      <Timeline times={times} height={totalHeight} />
      <div className="timetable-body">
        <Grid
          rowCount={rowCount}
          columnCount={columnCount}
          height={totalHeight}
        />
        <EventGrid
          courses={courses}
          timeInterval={timeInterval}
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

function Timeline({ times, height }: { times: Date[]; height: Size }) {
  return (
    <Wrapper className="timeline" height={sizeToString(height)}>
      {times.map((date, i) => (
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
