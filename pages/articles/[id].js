import { useRouter } from "next/router";
import moment from "moment";
import { getArticles, getSingleArticle } from "../../models/article";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";

export default function ArticleDetailPage({
  title,
  body,
  lastUpdateDate,
  pictureUrl
}) {
  const router = useRouter();
  return (
    <Layout pageTitle={router.isFallback ? "Loading..." : title}>
      {router.isFallback ? (
        "Loading the article..."
      ) : (
        <>
          <p>Page generated on : {lastUpdateDate}</p>

          <Link href="/articles" scroll={false}>
            <a href="/articles">Go back to the list</a>
          </Link>
          <h1>{title}</h1>
          <Image
            alt="Picture representing the content of the article. Or not."
            width={600}
            height={400}
            src={pictureUrl}
          />
          <p>{body}</p>
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const articles = await getArticles(0, 3);
  const paths = articles.map((a) => ({ params: { id: a.id.toString() } }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { title, body, pictureUrl } = await getSingleArticle(params.id);
  const currentDate = moment().format("YYYY-MM-DD - HH:mm:ss");

  return {
    props: {
      title,
      body,
      pictureUrl,
      lastUpdateDate: currentDate
    },
    revalidate: 2
  };
}
