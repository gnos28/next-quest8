import moment from "moment";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getArticles } from "../../models/article";

export default function ArticleListPage({ articles, lastUpdateDate }) {
  return (
    <Layout pageTitle="Articles">
      <p>Page generated on : {lastUpdateDate}</p>
      <h1>Articles</h1>
      <ul>
        {articles.map(({ id, title }) => {
          const href = "/articles/" + id;
          return (
            <li key={id}>
              <Link href={href}>
                <a href={href}>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const currentDate = moment().format("YYYY-MM-DD - HH:mm:ss");
  const articles = await getArticles(0, 5);

  return {
    props: {
      articles,
      lastUpdateDate: currentDate
    },
    revalidate: 5
  };
}
