import { useDataTableContext } from "./use-datatable-context.hook";

export function BottomFilters() {
  const context = useDataTableContext();
  const {
    settings: { bottomFilter: BottomFilter },
  } = context;

  if (!BottomFilter) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap justify-content-end gap-3">
      <BottomFilter />
    </div>
  );
}
