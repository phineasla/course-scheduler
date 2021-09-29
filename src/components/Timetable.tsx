// const columns: GridColDef[] = [
//   { field: "id", headerName: "Course ID", width: 100 },
//   { field: "name", headerName: "Course Name", width: 200 },
//   { field: "credit", headerName: "Credit", width: 50 },
//   { field: "lecture", headerName: "Lecture", width: 150 },
//   { field: "lab", headerName: "Lab", width: 150 },
// ];

const colHeader = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeColWidth = 32;

export const Timetable = () => {
  return (
    <div className="flex flex-col mx-2 md:mx-6">
      <div className="flex-grow overflow-auto">
        <table className="table-fixed relative w-full border">
          <tr>
            <th className="sticky top-0 px-6 py-3 w-32 border border-gray" />
            {colHeader.map((value, index, array) => (
              <th className="sticky top-0 px-6 py-3 w-32 border border-gray">
                {value}
              </th>
            ))}
          </tr>
        </table>
      </div>
      {/* <div className="flex overflow-auto justify-center">
        {colHeader.map((value, index, array) => (
          <div className="border border-gray w-32">{value}</div>
        ))}
      </div> */}
    </div>
  );
};
