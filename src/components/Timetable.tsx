import "./Timetable.scss";
import styled from "styled-components";
import { Course, CourseEvent, Measurement } from "../types";
import {
  set,
  getDay,
  format,
  isSameDay,
  isBefore,
  eachMinuteOfInterval,
  differenceInMinutes,
} from "date-fns";
import { setOnly, intervalToBox } from "../utils/utils";

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

export const Timetable = ({
  courses = [],
  days = defaultDays,
  times = eachMinuteOfInterval(
    {
      start: setOnly({ hour: 7 }),
      end: setOnly({ hour: 15 }),
    },
    { step: 60 }
  ),
  rowHeight = { value: 3, unit: "rem" },
}: {
  courses?: Course[];
  days?: string[];
  times?: Date[];
  rowHeight?: Measurement;
}) => {
  const rowCount = times.length;
  const columnCount = days.length;
  const totalHeight = {
    value: rowHeight.value * rowCount,
    unit: rowHeight.unit,
  };

  courses = [
    {
      intervals: [
        {
          start: setOnly({ day: 1, hour: 8 }),
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
  console.log(courses);
  // console.log("set func ", set(new Date(0), { year: undefined }));

  // Sort classes into days of the week, with Sunday is 0, Monday is 1,...
  const events: CourseEvent[][] = [...Array(7)].map(() => []);
  for (let course of courses) {
    const { intervals, info } = course;
    for (let intvl of intervals) {
      const { start, end } = intvl;
      if (!isSameDay(start, end) || !isBefore(start, end))
        throw new RangeError("Invalid course interval");
      events[getDay(start)].push({ interval: intvl, info: info });
    }
  }

  console.log(events);

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
        <EventGrid events={events} times={times} height={totalHeight} />
      </div>
    </div>
  );
};

const Timeline = ({
  times,
  height,
}: {
  times: Date[];
  height: Measurement;
}) => {
  return (
    <Wrapper className="timeline" height={`${height.value}${height.unit}`}>
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
  height: Measurement;
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
    <Wrapper
      className="timetable-grid"
      height={`${height.value}${height.unit}`}
    >
      {cols}
    </Wrapper>
  );
};

const EventGrid = ({
  events,
  times,
  height,
}: {
  events: CourseEvent[][];
  times: Date[];
  height: Measurement;
}) => {
  const clampInterval = { start: times[0], end: times[times.length - 1] };
  const duration = differenceInMinutes(clampInterval.end, clampInterval.start);
  const minutesPerY = duration / height.value;

  console.log(
    intervalToBox(
      events[1][0].interval,
      clampInterval,
      minutesPerY,
      height.unit
    )
  );

  return (
    <div className="event-grid">
      {/* <div>
        <div
          className="event-box"
          style={{ top: "20px", left: "0%", height: 30, width: "22%" }}
        ></div>
        <div
          className="event-box"
          style={{ top: "20px", left: "25%", height: 100, width: "22%" }}
        ></div>
        <div
          className="event-box"
          style={{ top: "20px", left: "50%", height: 30, width: "22%" }}
        ></div>
        <div
          className="event-box"
          style={{ top: "20px", left: "75%", height: 30, width: "22%" }}
        ></div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> */}
    </div>
  );
};

const EventBox = (event: CourseEvent) => {};

// const Column = ({ courseClasses }) => {};
