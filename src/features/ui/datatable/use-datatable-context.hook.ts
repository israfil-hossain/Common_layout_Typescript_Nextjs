import { useContext } from "react";
import { DataTableContext } from "./datatable.context";
import { DataTableContextType, PaginationParams } from "./types";
import { DataTableAction as Actions } from "./datatable.actions";

type PageChangeHandler = (e: Pick<PaginationParams, "page" | "limit">) => void;

type SortChangeHandler = (
  e: Pick<PaginationParams, "sortBy" | "sortOrder">
) => void;

type SearchChangeHandler = (e: string) => void;

type SetFilters = (filters: Record<string, unknown>) => void;

type ResetFilters = () => void;

type UseDataTableContextType = DataTableContextType & {
  onPageChange: PageChangeHandler;
  onSortChange: SortChangeHandler;
  onSearchChange: SearchChangeHandler;
  setFilters: SetFilters;
  resetFilters: ResetFilters;
};

export function useDataTableContext(): UseDataTableContextType {
  const { dispatch, ...rest } = useContext(DataTableContext);

  const onPageChange: PageChangeHandler = (e) => {
    dispatch?.({
      action: Actions.SetPageAndLimit,
      payload: {
        settings: {
          params: {
            page: e.page,
            limit: e.limit,
          },
        },
      },
    });
  };

  const onSortChange: SortChangeHandler = (e) => {
    dispatch?.({
      action: Actions.SetSort,
      payload: {
        settings: {
          params: {
            sortBy: e.sortBy,
            sortOrder: e.sortOrder,
          },
        },
      },
    });
  };

  const onSearchChange: SearchChangeHandler = (s) => {
    dispatch?.({
      action: Actions.SetSearch,
      payload: {
        settings: {
          params: {
            search: s,
          },
        },
      },
    });
  };

  const setFilters: SetFilters = (filters) => {
    dispatch?.({
      action: Actions.SetFilters,
      payload: {
        settings: {
          params: filters,
        },
      },
    });
  };

  const resetFilters: ResetFilters = () => {
    dispatch?.({ action: Actions.ResetFilters });
  };

  return {
    ...rest,
    onPageChange,
    onSortChange,
    onSearchChange,
    setFilters,
    resetFilters,
  };
}
