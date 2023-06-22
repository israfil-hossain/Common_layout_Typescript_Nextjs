import { DataTableProvider } from "./datatable.provider";
import { DataTableProps } from "./types";

export function DataTable(props: DataTableProps) {
  return <DataTableProvider {...props} />;
}
