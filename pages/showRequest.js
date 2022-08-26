import moment from "moment";
import getRawBody from "raw-body";

import Layout from "../components/Layout";

export default function showRequestPage({
  query,
  headers,
  body,
  lastUpdateDate
}) {
  return (
    <Layout pageTitle="Request information">
      <p>Page generated on : {lastUpdateDate}</p>
      Request body : <pre>{JSON.stringify(body, null, 2)}</pre>
      Request query : <pre>{JSON.stringify(query, null, 2)}</pre>
      Request headers : <pre>{JSON.stringify(headers, null, 2)}</pre>
    </Layout>
  );
}

export async function getServerSideProps({ req, query }) {
  const currentDate = moment().format("YYYY-MM-DD - HH:mm:ss");
  let body = {};
  if (req.method === "POST") {
    body = JSON.parse((await getRawBody(req)).toString("utf-8"));
  }
  return {
    props: {
      lastUpdateDate: currentDate,
      headers: req.headers,
      body,
      query
    }
  };
}
