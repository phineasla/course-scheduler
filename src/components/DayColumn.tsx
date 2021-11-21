import EventItem from "./EventItem";
import { CourseEvent } from "../types";
import { getTimeOfDay } from "../utils/TimeUtils";
import { expandWidth } from "../utils/TimetableUtils";
import { useTimetableState } from "../contexts/TimetableContext";
import { areIntervalsOverlapping } from "date-fns";

/**
 * Each `DayColumn` represent a day of week (i.e. Monday, Tuesday, ...)
 * @see [Algorithm to layout events with maximum width](https://stackoverflow.com/q/11311410/12405558)
 */
export default function DayColumn({ events }: { events: CourseEvent[] }) {
  const { timeStart, timeEnd } = useTimetableState();

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
        if (!areIntervalsOverlapping(col[col.length - 1].time, ev.time)) {
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
  return (
    <div>
      {eventGroups.map((subCols: CourseEvent[][]) =>
        subCols.map((subCol: CourseEvent[], subColIdx) =>
          subCol.map((ev: CourseEvent) => {
            const { start, end } = ev.time;
            if (
              getTimeOfDay(end) <= getTimeOfDay(timeStart) ||
              getTimeOfDay(start) >= getTimeOfDay(timeEnd)
            )
              return null;
            else
              return (
                <EventItem
                  key={ev.info.id}
                  info={ev}
                  leftPercent={subColIdx / subCols.length}
                  widthPercent={
                    expandWidth(ev, subColIdx, subCols) / subCols.length
                  }
                />
              );
          })
        )
      )}
    </div>
  );
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
