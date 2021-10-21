import "./Timetable.scss";
import styled from "styled-components";
import { EventGrid } from "./EventGrid";
import { Course, Size } from "../types";
import { setOnly, sizeToString } from "../utils/utils";
import { format, eachMinuteOfInterval } from "date-fns";

const defaultDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Wrapper = styled.div`
  height: ${({ height }: { height: string }) => height};
`;

/**
 *
 * @param courses - Array of courses
 * @param timeInterval - The start and end time for timeline with 15-minute precision
 * @param weekStartOnSunday
 * @param minutesPerCell
 * @param cellHeight
 */
export const Timetable = ({
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
}) => {
  const days = defaultDays;
  const times = eachMinuteOfInterval(timeInterval, { step: minutesPerCell });
  const rowCount = times.length;
  const columnCount = days.length;
  const totalHeight = {
    value: cellHeight.value * rowCount,
    unit: cellHeight.unit,
  };

  courses = [
    {
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
      info: { name: "c1", color: "blue" },
    },
  ];
  // console.log(courses);

  return (
    <div className="timetable">
      <div className="timetable-header">
        {days.map((value, i) => (
          <div key={i}>{value}</div>
        ))}
      </div>
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
        />
      </div>
    </div>
  );
};

const Timeline = ({ times, height }: { times: Date[]; height: Size }) => {
  return (
    <Wrapper className="timeline" height={sizeToString(height)}>
      {times.map((date, i) => (
        <div key={i}>{format(date, "HH:mm")}</div>
      ))}
    </Wrapper>
  );
};

const Grid = ({
  rowCount,
  columnCount,
  height,
}: {
  rowCount: number;
  columnCount: number;
  height: Size;
}) => {
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
};

// const Column = ({ courseClasses }) => {};
