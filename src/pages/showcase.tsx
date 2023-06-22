import { NextPageWithLayout, PanelLayout } from "features/layouts";
import { ShowCase } from "features/showcase";

const ShowcasePage: NextPageWithLayout = () => {
  return <ShowCase />;
};

ShowcasePage.getLayout = (page) => <PanelLayout>{page}</PanelLayout>;

export default ShowcasePage;
