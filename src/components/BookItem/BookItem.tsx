import { useNavigate } from "react-router-dom"
import styles from "./BookItem.module.scss"
const BookItem = ({ book }: any) => {
  // console.log(book)
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      {book.map((item: any) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail
        return (
          <div
            key={item.etag}
            className={styles.card}
            onClick={() => navigate(`/book/${item.id}`)}
          >
            <img src={thumbnail} alt="Image not found" />
            <div className={styles.info}>
              <p className={styles.category}>{item.volumeInfo.categories}</p>
              <h3>{item.volumeInfo.title}</h3>
              <p className={styles.author}>{item.volumeInfo.authors}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookItem
