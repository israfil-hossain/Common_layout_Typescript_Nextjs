import {
  DataTableProps as PrimeDataTableProps,
  DataTableValue,
  DataTableValueArray,
} from "primereact/datatable";
import { Dispatch, ElementType, ReactNode } from "react";
import { DataTableAction } from "./datatable.actions";
import { ColumnProps } from "primereact/column";

export type PaginationResponse<T = DataTableValue> = {
  docs: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type SortType = "asc" | "desc";

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortType;
  search?: string;
  [key: string]: unknown;
};

export type PageMeta = Omit<PaginationResponse, "docs">;

export type DataTableSettings = {
  tableTitle?: ReactNode;
  url: string;
  isLoading?: boolean;
  columns: ColumnProps[];
  topFilter?: ElementType;
  bottomFilter?: ElementType;
  hideSearch?: boolean;
  hidePagination?: boolean;
  params?: PaginationParams;
  pageMeta?: PageMeta;
};

export type DataTableProps = PrimeDataTableProps<DataTableValueArray> &
  DataTableSettings;

export type DataTableStateType = {
  props: PrimeDataTableProps<DataTableValueArray>;
  settings: DataTableSettings;
};

export type DataTableActionType = {
  action: DataTableAction;
  payload?: {
    props?: Partial<PrimeDataTableProps<DataTableValueArray>>;
    settings?: Partial<DataTableSettings>;
  };
};

export type DataTableContextType = DataTableStateType & {
  dispatch?: Dispatch<DataTableActionType>;
};
