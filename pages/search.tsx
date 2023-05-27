import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticles } from "@/moduls/NewsArticles"
import Head from "next/head"
import { FormEvent, useState } from "react"
import { Alert, Button, Form, Spinner } from "react-bootstrap"

const SearchNewPage = () => {
  const [searchResults, setResults] = useState<NewsArticles[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    //handling the extra space in input
    const searchQuery = formData.get("searchQuery")?.toString().trim()

    if (searchQuery) {
      try {
        setResults(null)
        setError(false)
        setIsLoading(true)
        const res = await fetch("/api/search-news?q=" + searchQuery)
        const articles: NewsArticles[] = await res.json()
        setResults(articles)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
  }
  return (
    <>
      <Head>
        <title key="title">Search News _ Next JS News App</title>
      </Head>
      <main>
        <h1>Search News</h1>
        <Alert>
          This page uses <strong>clientSideProps</strong> to fetch data
          server-side on every request. This allows search engines to crawl the
          page content and <strong>improves SEO</strong>.
        </Alert>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder="E.g . politics, sports, ..."
            />
          </Form.Group>
          <Button type="submit" className="mb-3" disabled={isLoading}>
            Search
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {isLoading && <Spinner animation="border" />}
          {error && <p>Something went wrong. Please try again.</p>}
          {searchResults?.length === 0 && (
            <p>Nothing found. Try a different query!</p>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  )
}

export default SearchNewPage
