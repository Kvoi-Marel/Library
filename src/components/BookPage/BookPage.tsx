import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { IBook } from "./BookPage.interface"
import styles from "./BookPage.module.scss"

const BookPage = () => {
  const params = useParams()
  const [info, setInfo] = useState<IBook>({
    id: "",
    etag: "",
    volumeInfo: {
      title: "",
      description: "",
      categories: [],
      authors: [],
      imageLinks: {
        thumbnail: "",
      },
    },
  })

  const getbyId = async (id: string) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    )
    setInfo(response.data)
  }

  useEffect(() => {
    getbyId(params.id!)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.image}>
          <img
            src={info.volumeInfo.imageLinks?.thumbnail}
            alt={info.volumeInfo.title}
          />
        </div>
        <div className={styles.info}>
          <h1>{info.volumeInfo.title}</h1>
          <div>
            <b>Categories:</b> {info.volumeInfo.categories}
          </div>
          <div>
            <b>Authors:</b> {info.volumeInfo.authors}
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h1>Description</h1>
        <p>{info.volumeInfo.description}</p>
      </div>
    </div>
  )
}

export default BookPage
