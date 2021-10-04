import "./Timetable.scss";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { timeRange } from "../utils/utils";

const defaultDayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// const DayHeader = ({ dayOfWeek }: { dayOfWeek: string[] }) => {
//   const DayHeaderDiv = styled.div`
//     grid-template-columns: repeat(${dayOfWeek.length}, 1fr);
//   `;

//   return (
//     <DayHeaderDiv className="DayHeader">
//       {dayOfWeek.map((value, index, array) => (
//         <span className="DayCell">{value}</span>
//       ))}
//     </DayHeaderDiv>
//   );
// };

// const Timeline = ({
//   startTime,
//   endTime,
//   step,
//   stepUnit,
//   cellHeight,
// }: {
//   startTime: Dayjs;
//   endTime: Dayjs;
//   step: number;
//   stepUnit: string;
//   cellHeight: string;
// }) => {
//   const range = timeRange(startTime, endTime, step, stepUnit);
//   return (
//     <div className="timeline">
//       {range.map((value, i) => (
//         <div key={i} style={{ height: cellHeight }}>
//           {value.format("HH:mm")}
//         </div>
//       ))}
//     </div>
//   );
// };

// const TimetableGrid = ({ numDayOfWeek }: { numDayOfWeek: number }) => {
//   const TimetableGridDiv = styled.div`
//     grid-template-columns: repeat(${numDayOfWeek}, 1fr);
//   `;

//   const gridCols = [];
//   for (let i = 0; i < numDayOfWeek; i++) {
//     gridCols.push(<div className="Timetable--Grid--Col"></div>);
//   }

//   return (
//     <TimetableGridDiv className="Timetable--Grid">{gridCols}</TimetableGridDiv>
//   );
// };

export const Timetable = ({
  dayOfWeek = defaultDayOfWeek,
  startTime = dayjs().hour(7).minute(0),
  endTime = dayjs().hour(17).minute(0),
  step = 1,
  stepUnit = "hour",
  cellHeight = "3rem",
}) => {
  const timelineRange = timeRange(startTime, endTime, step, stepUnit);

  return (
    <div className="timetable">
      <div className="day--header">
        {dayOfWeek.map((value, i) => (
          <div key={i}>{value}</div>
        ))}
      </div>
      <div className="timeline">
        {timelineRange.map((value, i) => (
          <div key={i} style={{ height: cellHeight }}>
            {value.format("HH:mm")}
          </div>
        ))}
      </div>
      <div className="day--grid">
        {dayOfWeek.map((value, i) => (
          <div
            key={i}
            style={{ height: `calc(${cellHeight} * ${timelineRange})` }}
          >
            {timelineRange.map((value, j) => (
              <div key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
