import { useDataTableContext } from "features/ui";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

type ActiveFilterOption = { label: string; data: boolean };

export function UserFilter() {
  const { setFilters, resetFilters } = useDataTableContext();
  const [filter, setFilter] = useState<ActiveFilterOption | null>(null);

  const activeFilterOptions: ActiveFilterOption[] = [
    { label: "Active", data: true },
    { label: "Inactive", data: false },
    { label: "Show all", data: false },
  ];

  return (
    <Dropdown
      options={activeFilterOptions}
      optionLabel="label"
      placeholder="Show only"
      value={filter}
      onChange={(e) => {
        setFilter(e.value);
        if (e.value.label === "Show all") {
          resetFilters();
        } else {
          setFilters({ isActive: e.value.data });
        }
      }}
    />
  );
}
