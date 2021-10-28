import "../styles/EventGrid.scss";
import styled from "styled-components";
import EventItem from "./EventItem";
import { Course, CourseEvent, Size, Box } from "../types";
import { differenceInMinutesOfDay, isWithinTimeInterval } from "../utils/Utils";
import { getDay, isSameDay, isBefore } from "date-fns";

export default function EventGrid({
  courses,
  timeStart,
  timeEnd,
  cellHeight,
  minutesPerCell,
  weekStartOnSunday,
}: {
  courses: Course[];
  timeStart: Date;
  timeEnd: Date;
  cellHeight: Size;
  minutesPerCell: number;
  weekStartOnSunday: boolean;
}) {
  // Minutes per vertical unit
  const minutesPerY = minutesPerCell / cellHeight.value;
  const dayColumns = mapCourseToDayOfWeek(courses);
  // Move Sunday to the back
  if (!weekStartOnSunday) {
    dayColumns.push(dayColumns.shift()!);
  }

  // console.log(minutesPerCell);
  // console.log(cellHeight);
  // const t = events[1][0].interval;
  // console.log(differenceInMinutes(t.end, t.start));
  // const testEvent = intervalToBox(
  //   events[1][0].time,
  //   timeInterval,
  //   minutesPerY,
  //   cellHeight.unit
  // );
  // console.log(testEvent);

  return (
    <div className="event-grid">
      {dayColumns.map((events, i) => (
        <DayColumn
          key={i}
          events={events}
          timeStart={timeStart}
          timeEnd={timeEnd}
          minutesPerY={minutesPerY}
        />
      ))}
    </div>
  );
}

/**
 * Each `DayColumn` represent a day of week (i.e. Monday, Tuesday, ...)
 * @see [Algorithm to layout events with maximum width](https://stackoverflow.com/q/11311410/12405558)
 */
function DayColumn({
  events,
  timeStart,
  timeEnd,
  minutesPerY,
}: {
  events: CourseEvent[];
  timeStart: Date;
  timeEnd: Date;
  minutesPerY: number;
}) {
  // Each group contains columns of events that overlap.
  const eventGroups: CourseEvent[][][] = [];
  // Each column contains events that do not overlap.
  let subCols: CourseEvent[][] = [];
  let lastEventEnding: Date | number | null = null;
  // Place each event into a column within an event group.
  events
    .sort(({ time: e1 }, { time: e2 }) => {
      if (e1.start < e2.start) return -1;
      if (e1.start > e2.start) return 1;
      if (e1.end < e2.end) return -1;
      if (e1.end > e2.end) return 1;
      return 0;
    })
    .forEach((ev) => {
      // Check if a new event group needs to be started.
      if (lastEventEnding != null && ev.time.start >= lastEventEnding) {
        // The event is later than any of the events in the
        // current group. There is no overlap. Output the
        // current event group and start a new one.
        eventGroups.push(subCols);
        // Reset
        subCols = [];
        lastEventEnding = null;
      }

      // Try to place the event inside an existing column.
      let placed = false;
      subCols.some((col) => {
        if (!isColliding(col[col.length - 1].time, ev.time)) {
          col.push(ev);
          placed = true;
        }
        return placed;
      });

      // It was not possible to place the event. Add a new column
      // for the current event group.
      if (!placed) subCols.push([ev]);

      // Remember the latest event end time of the current group.
      // This is later used to determine if a new groups starts.
      if (lastEventEnding == null || ev.time.end > lastEventEnding)
        lastEventEnding = ev.time.end;
    });
  eventGroups.push(subCols);
  // console.log(eventGroups);
  return (
    <>
      {eventGroups.map((subCols: CourseEvent[][]) =>
        subCols.map((subCol: CourseEvent[], subColIdx) =>
          subCol.map((ev: CourseEvent) => {
            return (
              <EventItem
                key={ev.info.id}
                info={ev}
                timelineStart={timeStart}
                timelineEnd={timeEnd}
                minutesPerY={minutesPerY}
                leftPercent={subColIdx / subCols.length}
                widthPercent={
                  expandWidth(ev, subColIdx, subCols) / subCols.length
                }
              ></EventItem>
            );
          })
        )
      )}
    </>
  );
}

/**
 * Sort classes into days of the week, with Sunday is 0, Monday is 1...
 */
function mapCourseToDayOfWeek(courses: Course[]) {
  const events: CourseEvent[][] = [...Array(7)].map(() => []);
  for (let course of courses) {
    const { intervals, info } = course;
    for (let intvl of intervals) {
      const { start, end } = intvl;
      if (!isSameDay(start, end) || !isBefore(start, end))
        throw new RangeError("Invalid course interval");
      events[getDay(start)].push({ time: intvl, info: info });
    }
  }
  return events;
}

function isColliding(a: Interval, b: Interval) {
  return a.start < b.end && a.end > b.start;
}

/**
 * Checks how many columns the event can expand into, without colliding with other events.
 * @param ev
 * @param iCol
 * @param columns
 * @returns
 */
function expandWidth(ev: CourseEvent, iCol: number, columns: CourseEvent[][]) {
  let colSpan = 1;
  for (let i = iCol + 1; i < columns.length; i++) {
    const col = columns[i];
    for (let j = 0; j < col.length; j++) {
      const ev1 = col[j];
      if (isColliding(ev.time, ev1.time)) return colSpan;
      colSpan++;
    }
  }
  return colSpan;
}

// <div>
//   {/* <div
//       className="event-box"
//       style={{ top: "20px", left: "0%", height: 30, width: "22%" }}
//     ></div>
//     <div
//       className="event-box"
//       style={{ top: "20px", left: "25%", height: 100, width: "22%" }}
//     ></div>
//     <div
//       className="event-box"
//       style={{ top: "20px", left: "50%", height: 30, width: "22%" }}
//     ></div>
//     <div
//       className="event-box"
//       style={{ top: "20px", left: "75%", height: 30, width: "22%" }}
//     ></div> */}
// </div>
// <div>
//   <div
//     className="event-box"
//     style={{
//       top: sizeToString(testEvent!.top),
//       left: "0%",
//       height: sizeToString(testEvent!.height),
//       width: "100%",
//     }}
//   ></div>
// </div>
// <div></div>
// <div></div>
// <div></div>
// <div></div>
// <div></div>
