import { NextPageWithLayout, PanelLayout } from "features/layouts";
import { Users } from "features/users";

const UsersPage: NextPageWithLayout = () => {
  return <Users />;
};

UsersPage.getLayout = (page) => <PanelLayout>{page}</PanelLayout>;

export default UsersPage;
