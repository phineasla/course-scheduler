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
// }: {
//   startTime: Dayjs;
//   endTime: Dayjs;
//   step: number;
//   stepUnit: string;
// }) => {
//   return (
//     <div className="timeline">
//       <div>{startTime.format("HH:mm")}</div>
//       <div>08:00</div>
//       <div>09:00</div>
//       <div>10:00</div>
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
  step = 60,
  stepUnit = "minute",
  cellHeight = "3rem",
}) => {
  const Cell = styled.div`
    height: ${cellHeight};
  `;

  const timelineRange = timeRange(startTime, endTime, step, stepUnit);

  return (
    <div className="timetable">
      <div className="day--header">
        {dayOfWeek.map((value) => (
          <div>{value}</div>
        ))}
      </div>
      <div className="timeline">
        {timelineRange.map((value) => {
          <Cell>{value.format("HH:mm")}</Cell>;
        })}
      </div>
      <div className="day--grid">
        {dayOfWeek.map(() => (
          <div></div>
        ))}
      </div>
    </div>
  );
};
