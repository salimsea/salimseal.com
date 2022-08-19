import { Layout } from "components";
import ComponentPortfolio from "components/Pages/Portfolio";

const Portfolio = () => {
  return (
    <Layout
      pageTitle="Portfolio Page"
      pageDescription="This is a portfolio page to display the results of the products that i have made"
    >
      <ComponentPortfolio />
    </Layout>
  );
};

export default Portfolio;
