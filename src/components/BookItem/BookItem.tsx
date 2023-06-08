import { useNavigate } from "react-router-dom"
import styles from "./BookItem.module.scss"

import { useAppSelector } from "../../store/hooks"

const BookItem = () => {
  const { bookData } = useAppSelector((state) => state.books)

  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      {bookData.map((item) => {
        let thumbnail =
          item.volumeInfo &&
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.thumbnail
        let categories = item.volumeInfo && item.volumeInfo.categories
        let title = item.volumeInfo && item.volumeInfo.title
        let authors = item.volumeInfo && item.volumeInfo.authors
        return (
          <div
            key={item.etag}
            className={styles.card}
            onClick={() => navigate(`/book/${item.id}`)}
          >
            {thumbnail ? (
              <img src={thumbnail} alt="Not found" />
            ) : (
              <img
                src="https://www.gollancz.co.uk/wp-content/uploads/2018/07/missingbook.png?fit=450%2C675"
                alt="Not found"
              />
            )}

            <div className={styles.info}>
              {categories ? (
                <p className={styles.category}>{categories}</p>
              ) : (
                <p className={styles.category}>Category not found</p>
              )}

              <h3>{title}</h3>
              <p className={styles.author}>{authors}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookItem
