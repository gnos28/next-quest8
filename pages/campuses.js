import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { getCampuses } from "../models/campus";
import styles from "/styles/campuses.module.css";

const LIMIT = 5;

export default function CampusesPage({
  staticCampuses,
  staticTotalCount,
  lastUpdateDate,
}) {
  const [campuses, setCampuses] = useState(staticCampuses);
  const [totalCount, setTotalCount] = useState(staticTotalCount);

  const router = useRouter();
  const { currentPage, perPage } = router.query;

  console.log("router.query", currentPage, perPage);

  const getAxiosData = async () => {
    const axiosResult = await axios.get(
      `http://localhost:3000/api/campuses?limit=${perPage || LIMIT}&offset=${
        currentPage * (perPage || LIMIT) || 0
      }`
    );
    setTotalCount(axiosResult.headers["x-total-count"]);
    const axiosData = axiosResult.data;

    console.log("axiosData", axiosData);

    setCampuses(axiosData);
  };

  useEffect(() => {
    getAxiosData();
  }, [currentPage, perPage]);

  const pagesList = Array(
    Math.ceil((totalCount || staticTotalCount) / (perPage || LIMIT))
  )
    .fill(0)
    .map((item, itemIndex) => itemIndex + 1);

  return (
    <Layout pageTitle="Campuses">
      <p>Page generated on : {lastUpdateDate}</p>
      <h1>Our Campuses</h1>
      <ul>
        {campuses &&
          campuses.map(({ id, name }) => {
            return <li key={id}>{name}</li>;
          })}
      </ul>
      {pagesList &&
        pagesList.map((page) => (
          <Link
            key={page}
            href={`/campuses?currentPage=${encodeURIComponent(
              page - 1
            )}&perPage=${encodeURIComponent(perPage || LIMIT)}`}
            prefetch={false}
          >
            <a className={styles.pageLink}>{page}</a>
          </Link>
        ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const currentDate = moment().format("YYYY-MM-DD - HH:mm:ss");
  const [campuses] = await getCampuses(5, 0);

  const axiosResult = await axios.get(
    `http://localhost:3000/api/campuses?limit=${LIMIT}&offset=0`
  );
  const totalCount = axiosResult.headers["x-total-count"];
  const axiosData = axiosResult.data;

  console.log("axiosData", axiosData, totalCount);

  return {
    props: {
      staticCampuses: axiosData,
      staticTotalCount: totalCount,
      lastUpdateDate: currentDate,
    },
    revalidate: 10,
  };
}
