// const columns: GridColDef[] = [
//   { field: "id", headerName: "Course ID", width: 100 },
//   { field: "name", headerName: "Course Name", width: 200 },
//   { field: "credit", headerName: "Credit", width: 50 },
//   { field: "lecture", headerName: "Lecture", width: 150 },
//   { field: "lab", headerName: "Lab", width: 150 },
// ];



const dayOfWeekArray = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeColWidth = 32;
const dayHeaderHeight = 10;

const DayHeader = ({ dayOfWeek }: { dayOfWeek: string[] }) => {
  return (
    <div
      className={`grid grid-cols-${dayOfWeekArray.length} w-full font-medium`}
    >
      {dayOfWeek.map((value, index, array) => (
        <div className="flex border-l justify-center items-center">{value}</div>
      ))}
    </div>
  );
};

export const Timetable = ({timeColMinWidth = 32, tableColMinWidth = 40}) => {
  return (
    <div className="timetable flex flex-col mx-2 md:mx-6 overflow-auto border">
      <div className={`timetable__header flex h-${dayHeaderHeight} border-b`}>
        {/* Empty div for time column */}
        <div className={`w-${timeColWidth}`}></div>
        <DayHeader dayOfWeek={dayOfWeekArray} />

        {/* <table className="table-fixed relative w-full border">
          <tr>
            <th className="sticky top-0 px-6 py-3 w-32 border border-gray" />
            {colHeader.map((value, index, array) => (
              <th className="sticky top-0 px-6 py-3 w-32 border border-gray">
                {value}
              </th>
            ))}
          </tr>
        </table> */}
      </div>
      <div className="timetable__body"></div>
    </div>
  );
};
