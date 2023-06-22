import {
  Paginator,
  PaginatorRowsPerPageDropdownOptions,
  PaginatorFirstPageLinkOptions,
  PaginatorLastPageLinkOptions,
  PaginatorPrevPageLinkOptions,
  PaginatorNextPageLinkOptions,
} from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { PropsWithChildren, ReactNode } from "react";
import { classNames } from "primereact/utils";
import {
  CgPushChevronLeft,
  CgPushChevronRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import { useDataTableContext } from "./use-datatable-context.hook";
import { DefaultPageSize, RowsPerPageOptions } from "./constants";

function RowsPerPage(options: PaginatorRowsPerPageDropdownOptions) {
  return (
    <>
      <span className="mx-1 text-color">Items per page: </span>
      <Dropdown
        value={options.value}
        options={options.options}
        onChange={options.onChange}
        className="mx-1"
      />
    </>
  );
}

type NavOption =
  | PaginatorFirstPageLinkOptions
  | PaginatorLastPageLinkOptions
  | PaginatorNextPageLinkOptions
  | PaginatorPrevPageLinkOptions;

function PageNavButton({
  options,
  icon,
}: PropsWithChildren<{
  options: NavOption;
  icon: ReactNode;
}>) {
  return (
    <button
      className={classNames(options.className, "border-circle border-0 mx-1")}
      onClick={options.onClick}
      disabled={options.disabled}
    >
      {icon}
    </button>
  );
}

export function Pagination() {
  const { settings, onPageChange } = useDataTableContext();
  const pageMeta = settings.pageMeta;
  const params = settings.params;
  const first = ((params?.page || 1) - 1) * (params?.limit || 0);

  if (settings.hidePagination) {
    return <></>;
  }

  return (
    <div className="flex justify-content-end">
      <Paginator
        totalRecords={pageMeta?.totalDocs || 0}
        rows={params?.limit || DefaultPageSize}
        rowsPerPageOptions={RowsPerPageOptions}
        first={first}
        onPageChange={(e) => onPageChange({ page: e.page, limit: e.rows })}
        template={{
          layout:
            "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
          RowsPerPageDropdown: RowsPerPage,
          FirstPageLink: (options) => (
            <PageNavButton options={options} icon={<CgPushChevronLeft />} />
          ),
          LastPageLink: (options) => (
            <PageNavButton options={options} icon={<CgPushChevronRight />} />
          ),
          PrevPageLink: (options) => (
            <PageNavButton options={options} icon={<CgChevronLeft />} />
          ),
          NextPageLink: (options) => (
            <PageNavButton options={options} icon={<CgChevronRight />} />
          ),
          CurrentPageReport: (options) => {
            return (
              <span className="text-color mx-3">
                {options.first} - {options.last} of {options.totalRecords}
              </span>
            );
          },
        }}
      />
    </div>
  );
}
