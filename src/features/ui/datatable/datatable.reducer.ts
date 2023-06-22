import { Reducer } from "react";
import { DataTableActionType, DataTableStateType } from "./types";
import { DataTableAction as Action } from "./datatable.actions";
import { DefaultPageSize } from "./constants";
import { pick } from "lodash";
import { FixedParamKeys } from "./constants";

export const DataTableReducer: Reducer<
  DataTableStateType,
  DataTableActionType
> = (state, { action, payload }) => {
  switch (action) {
    case Action.SetLoading: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isLoading: !!payload?.settings?.isLoading,
        },
      };
    }

    case Action.SetValue: {
      return {
        props: {
          ...state.props,
          value: payload?.props?.value || [],
        },
        settings: {
          ...state.settings,
          pageMeta: payload?.settings?.pageMeta,
        },
      };
    }

    case Action.SetContextState: {
      return payload as DataTableStateType;
    }

    case Action.SetPageAndLimit: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            page: (payload?.settings?.params?.page || 0) + 1,
            limit: payload?.settings?.params?.limit || DefaultPageSize,
          },
        },
      };
    }

    case Action.SetSort: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            sortBy: payload?.settings?.params?.sortBy || "",
            sortOrder: payload?.settings?.params?.sortOrder || "asc",
          },
        },
      };
    }

    case Action.SetSearch: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            search: payload?.settings?.params?.search || "",
          },
        },
      };
    }

    case Action.SetFilters: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            ...payload?.settings?.params,
          },
        },
      };
    }

    case Action.ResetFilters: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: pick(state.settings.params, FixedParamKeys),
        },
      };
    }

    default: {
      return state;
    }
  }
};
