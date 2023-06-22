import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDataTableContext } from "./use-datatable-context.hook";

export function Table() {
  const context = useDataTableContext();
  const columns = context.settings.columns;
  const params = context.settings.params;

  return (
    <DataTable
      {...context.props}
      className={`datatable ${context.props.className || ""}`}
      loading={context.settings.isLoading}
      sortField={params?.sortBy || ""}
      sortOrder={params?.sortOrder === "asc" ? 1 : -1}
      removableSort
      onSort={(event) => {
        context.onSortChange({
          sortBy: event.sortField,
          sortOrder: event.sortOrder === 1 ? "asc" : "desc",
        });
      }}
    >
      {columns.map((column, index) => (
        <Column {...column} key={index} />
      ))}
    </DataTable>
  );
}
