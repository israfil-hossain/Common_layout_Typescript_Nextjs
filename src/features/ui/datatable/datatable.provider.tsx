import { DataTableContext } from "./datatable.context";
import { DataTableProps } from "./types";
import { useDataTable } from "./use-datatable.hook";
import { Pagination } from "./pagination.component";
import { Title } from "./title.component";
import { Table } from "./table.component";
import { BottomFilters } from "./bottom-filters.component";

export function DataTableProvider(props: DataTableProps) {
  const context = useDataTable(props);

  return (
    <DataTableContext.Provider value={context}>
      <div className="flex flex-column gap-3">
        {/* Title part */}
        <Title />

        {/* Bottom filters */}
        <BottomFilters />

        {/* Render the table it self */}
        <Table />

        {/* Pagination */}
        <Pagination />
      </div>
    </DataTableContext.Provider>
  );
}
