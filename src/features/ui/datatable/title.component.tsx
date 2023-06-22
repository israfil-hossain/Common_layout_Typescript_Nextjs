import { Col } from "../col.component";
import { Row } from "../row.component";
import { Search } from "./search.component";
import { useDataTableContext } from "./use-datatable-context.hook";

export function Title() {
  const { settings } = useDataTableContext();

  const { tableTitle, topFilter: TopFilter, hideSearch } = settings;

  if (!tableTitle && !TopFilter && hideSearch) {
    return <></>;
  }

  return (
    <Row>
      {tableTitle && (
        <Col>
          {typeof tableTitle === "string" ? <h3>{tableTitle}</h3> : tableTitle}
        </Col>
      )}

      <Col className="flex flex-wrap gap-3 justify-content-center md:justify-content-end">
        {TopFilter && <TopFilter />}

        {!hideSearch && <Search />}
      </Col>
    </Row>
  );
}
