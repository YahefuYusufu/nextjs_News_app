import { NewsArticles, newsResponse } from "@/moduls/NewsArticles"
import { GetServerSideProps } from "next"
import Head from "next/head"
import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { Alert } from "react-bootstrap"

interface BreakingNesPageProps {
  newsArticles: NewsArticles[]
}

export const getServerSideProps: GetServerSideProps<
  BreakingNesPageProps
> = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  )
  const newsResponse: newsResponse = await response.json()
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
    // let error go to 500 page
  }
}

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNesPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - </title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data
          server-side on every request. This allows search engines to crawl the
          page content and <strong>improves SEO</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
