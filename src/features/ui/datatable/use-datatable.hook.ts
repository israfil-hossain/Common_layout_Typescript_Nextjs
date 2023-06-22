import { useEffect, useReducer } from "react";
import {
  DataTableStateType,
  DataTableContextType,
  DataTableProps,
  PaginationResponse,
  PaginationParams,
  PageMeta,
} from "./types";
import { DataTableReducer } from "./datatable.reducer";
import { useLazyGet } from "features/api";
import {
  DataTableSettingsKeys,
  InitialParams,
  PageMetaKeys,
} from "./constants";
import { cloneDeep, merge, omit, pick } from "lodash";
import { DataTableAction as Actions } from "./datatable.actions";
import { DataTableValueArray } from "primereact/datatable";

function separateTableProps(
  props: DataTableProps,
  {
    value,
    isLoading,
    params,
  }: {
    value: DataTableValueArray;
    isLoading: boolean;
    params: PaginationParams;
  }
): DataTableStateType {
  return {
    props: {
      ...omit(props, DataTableSettingsKeys),
      value,
      lazy: true,
    },
    settings: {
      ...pick(props, DataTableSettingsKeys),
      params,
      isLoading,
    },
  } as DataTableStateType;
}

export function useDataTable(props: DataTableProps): DataTableContextType {
  const [state, dispatch] = useReducer(
    DataTableReducer,
    separateTableProps(props, {
      value: [],
      isLoading: false,
      params: InitialParams,
    })
  );
  const { data, trigger, isLoading } = useLazyGet<PaginationResponse>(
    props.url,
    state.settings.params
  );

  // Keep synced with props
  useEffect(() => {
    const source = separateTableProps(props, {
      value: data?.docs || [],
      isLoading,
      params: state.settings.params as PaginationParams,
    });
    const merged = merge(cloneDeep(state), source);

    dispatch({
      action: Actions.SetContextState,
      payload: merged,
    });
  }, [props]);

  // Fetch a page with current params from server
  useEffect(() => {
    trigger();
  }, [state.settings.params]);

  // When is page is fetched update table data
  useEffect(() => {
    dispatch({
      action: Actions.SetValue,
      payload: {
        props: { value: data?.docs },
        settings: {
          pageMeta: pick(data, PageMetaKeys) as PageMeta,
        },
      },
    });
  }, [data]);

  // Update loading state of the datatable
  useEffect(() => {
    dispatch({
      action: Actions.SetLoading,
      payload: { settings: { isLoading } },
    });
  }, [isLoading]);

  return {
    ...state,
    dispatch,
  };
}
