import { createContext } from "react";
import { DataTableContextType } from "./types";

export const DataTableContext = createContext<DataTableContextType>({
  props: {},
  settings: { url: "", columns: [] },
});
