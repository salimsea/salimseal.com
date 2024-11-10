import { IMGNotFound } from "assets";
import { Layout } from "components";
import Image from "next/image";

const Portfolio = () => {
  return (
    <Layout pageTitle="Tools Page" pageDescription="This is a tools page">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <Image
            src={IMGNotFound}
            width={200}
            height={200}
            className="img-fluid"
          />
          <br />
          <p className="text-center ">Coming Soon</p>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
