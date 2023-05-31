import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticles, newsResponse } from "@/moduls/NewsArticles"
import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Alert } from "react-bootstrap"

interface CategoryNesPageProps {
  newsArticles: NewsArticles[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    // this could be coming from an API
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ]
  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryNesPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString()
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  )
  const newsResponse: newsResponse = await res.json()

  return {
    props: {
      newsArticles: newsResponse.articles,
    },
    revalidate: 5 * 60,
  }
  // let error go to 500 page
}

const CategoryNewsPage = ({ newsArticles }: CategoryNesPageProps) => {
  const router = useRouter()
  const categoryName = router.query.category?.toString()
  const title = "Category: " + categoryName
  return (
    <>
      <Head>
        <title key="title">{`${title} - Next.js News App`}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <Alert>
          This is page uses <strong>getStaticProps</strong> for very high page
          loading speed and <strong>incremental static regeneration</strong> to
          show data not older than <strong>5 minutes</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}

export default CategoryNewsPage
