import LatestProduct from "./common/LatestProduct";
import FeatureProduct from "./common/FeatureProduct";
import Hero from "./common/Hero";
import Layout from "./common/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LatestProduct />
      <FeatureProduct />
    </Layout>
  );
}
