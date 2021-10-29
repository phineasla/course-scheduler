import { createContext, useContext } from "react";
import { TimetableState } from "../types";

export const TimetableStateContext = createContext<TimetableState | null>(null);

// If this is null, then you forgot to set value for `TimetableStateContext.Provider`
export const useTimetableState = (): TimetableState =>
  useContext(TimetableStateContext)!;
