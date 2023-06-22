import { Api } from "features/api";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { DataTable } from "features/ui";
import { UserFilter } from "./user-filter.component";
import { Button } from "primereact/button";

function Title() {
  return (
    <div className="flex align-items-center gap-2">
      <h3>Users</h3>
      <Button size="small" outlined>
        Hi there!
      </Button>
    </div>
  );
}

export function Users() {
  return (
    <div className="w-full px-4 mt-4">
      <Card>
        <DataTable
          tableTitle={<Title />}
          url={Api.GetUsers}
          columns={[
            { field: "id", header: "Id" },
            { field: "name", header: "Name", sortable: true },
            { field: "email", header: "Email", sortable: true },
            {
              field: "isActive",
              header: "Active",
              body: ({ isActive }: { isActive: boolean }) => {
                return isActive ? (
                  <Badge value="Active" severity="success" />
                ) : (
                  <Badge value="Inactive" severity="danger" />
                );
              },
            },
          ]}
          topFilter={UserFilter}
        />
      </Card>
    </div>
  );
}
