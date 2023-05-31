import { NewsArticles } from "@/moduls/NewsArticles"
import { Card } from "react-bootstrap"
import placeHolderImage from "../assets/images/placeHolderImage.jpg"
import Image from "next/image"

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
        <Image
          src={validImageUrl || placeHolderImage}
          width={500}
          height={200}
          alt="News Article Image"
          className="card-img-top"
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
