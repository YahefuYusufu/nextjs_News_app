import { NewsArticles } from "@/moduls/NewsArticles"
import { Card } from "react-bootstrap"

interface NewsArticleEntryProps {
  article: NewsArticles
}

const NesArticleEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) => {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined

  return (
    <a href={url}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={validImageUrl}
          width={500}
          height={200}
          alt="News Article Image"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title>{description}</Card.Title>
        </Card.Body>
      </Card>
    </a>
  )
}

export default NesArticleEntry
