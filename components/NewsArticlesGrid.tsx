import { NewsArticles } from "@/moduls/NewsArticles"
import { Col, Row } from "react-bootstrap"
import NesArticleEntry from "./NewsArticleEntry"

interface NewsArticlesGridProps {
  articles: NewsArticles[]
}

const NewsArticlesGrid = ({ articles }: NewsArticlesGridProps) => {
  return (
    <Row xs={1} sm={2} xl={3} className="g-4">
      {articles.map((article) => (
        <Col key={article.url}>
          <NesArticleEntry article={article} />
        </Col>
      ))}
    </Row>
  )
}

export default NewsArticlesGrid
