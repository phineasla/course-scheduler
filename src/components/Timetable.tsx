import "./Timetable.scss";
import styled from "styled-components";
import dayjs from "dayjs";

const defaultDayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DayHeader = ({ dayOfWeek }: { dayOfWeek: string[] }) => {
  const DayHeaderWrapper = styled.div`
    grid-column-start: 2;
    display: grid;
    grid-template-columns: repeat(${dayOfWeek.length}, 1fr);
    height: 2rem;
  `;

  return (
    <DayHeaderWrapper>
      {dayOfWeek.map((value, index, array) => (
        <span className="DayWrapper">{value}</span>
      ))}
    </DayHeaderWrapper>
  );
};

const Timeline = ({
  startHour = dayjs().hour(7),
  endHour = dayjs().hour(17),
  precision = 15,
}) => {};

export const Timetable = ({ dayOfWeek = defaultDayOfWeek }) => {
  return (
    <div className="TimetableWrapper">
      <DayHeader dayOfWeek={dayOfWeek} />
    </div>
  );
};
