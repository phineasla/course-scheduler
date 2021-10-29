import { createContext, useContext } from "react";
import { TimetableState } from "../types";
import { setOnly } from "../utils/Utils";

export const TimetableStateContext = createContext<TimetableState>({
  timeStart: setOnly({ hour: 7, min: 10 }),
  timeEnd: setOnly({ hour: 17 }),
  weekStartOnSunday: false,
  minutesPerCell: 60,
  cellHeight: { value: 3, unit: "rem" },
});

export const useTimetableState = (): TimetableState =>
  useContext(TimetableStateContext);
