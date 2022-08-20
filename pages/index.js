import { Layout } from "components";
import ComponentHome from "components/Pages/Home";

const Home = () => {
  return (
    <Layout
      pageTitle="Home Page"
      pageDescription="Fullstack Developer, I am front-end designer & back-end developer From Indonesia 🇮🇩. This website also has articles, you can read about various tricks, coding, news, business"
    >
      <ComponentHome />
    </Layout>
  );
};

export default Home;
