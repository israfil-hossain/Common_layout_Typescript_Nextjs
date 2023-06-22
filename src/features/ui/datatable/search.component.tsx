import { useState } from "react";
import { useDebounce } from "react-use";
import { CgSearch } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { InputText } from "primereact/inputtext";
import { useDataTableContext } from "./use-datatable-context.hook";

export function Search() {
  const context = useDataTableContext();
  const [searchTerm, setSearchTerm] = useState("");
  useDebounce(
    () => {
      context.onSearchChange(searchTerm);
    },
    500,
    [searchTerm]
  );

  return (
    <div className="p-input-icon-left p-input-icon-right">
      <CgSearch />
      <InputText
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {searchTerm && (
        <RxCross2
          onClick={() => setSearchTerm("")}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}
