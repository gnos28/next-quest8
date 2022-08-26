import Image from "next/image";
import Layout from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout pageTitle="Home">
      <Image
        src="/images/wcs_logo.jpg"
        height={500}
        width={900}
        alt="wild code school logo"
      />
      <p>Hello Wilder !</p>
    </Layout>
  );
}
