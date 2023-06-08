import React, { useEffect } from "react"

import styles from "./Main.module.scss"

import BookItem from "../BookItem/BookItem"
import { MySelect } from "./MySelect/MySelect"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setSearch, setSelectedSort, setVariant } from "../../store/bookSlice"
import { useApiService } from "../../services/api.service"

const Main = () => {
  const { count, selectedSort, variant, search, index, isLoading } =
    useAppSelector((state) => state.books)

  const dispatch = useAppDispatch()

  const {
    getSortedBooks,
    loadSortedBooks,
    getSearchedBooks,
    loadSearchedBooks,
  } = useApiService()

  // const getApi = async (option: string) => {
  //   try {
  //     dispatch(setLoading(true))
  //     const response = await axios.get(
  //       ` https://www.googleapis.com/books/v1/volumes?q=${option}&key=${api}`
  //       )
  //       if (!response) {
  //         throw new Error("Server error")
  //       }
  //       if(option === firstLoadOption || firstSortOption){
  //     dispatch(setBookData(response.data.items))
  //     dispatch(setLoading(false))
  //     dispatch(updateCount(response.data.totalItems))}
  //     else{}
  //   } catch (error: any) {
  //     return error.message
  //   }
  // }

  const searchBook = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      getSearchedBooks()
    }
  }
  const sortBook = () => {
    dispatch(setSearch(""))
    getSortedBooks()
  }

  useEffect(() => {
    getSortedBooks()
  }, [])

  useEffect(() => {
    sortBook()
  }, [selectedSort, variant])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <h1>Search your book</h1>
          <input
            type="text"
            placeholder="Enter book title"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            onKeyPress={searchBook}
          />
          <button className={styles.button} onClick={() => getSearchedBooks()}>
            Search
          </button>
          <h1>Sort books</h1>
          <div className={styles.select}>
            <MySelect
              defaultValue=""
              defaultName="All"
              value={selectedSort}
              title="Category"
              options={[
                {
                  name: "Art",
                  value: "art",
                },
                {
                  name: "Biography",
                  value: "biography",
                },
                {
                  name: "Computers",
                  value: "computers",
                },
                {
                  name: "History",
                  value: "history",
                },
                {
                  name: "Medical",
                  value: "medical",
                },
                {
                  name: "Poetry",
                  value: "poetry",
                },
              ]}
              onChange={(selectedSort) =>
                dispatch(setSelectedSort(selectedSort))
              }
            />
            <MySelect
              defaultValue="relevance"
              defaultName="Relevance"
              title="Sorted by"
              value={variant}
              options={[
                {
                  name: "Newest",
                  value: "newest",
                },
              ]}
              onChange={(variant) => dispatch(setVariant(variant))}
            />
          </div>
        </div>
      </div>
      <h1>Books found: {count}</h1>
      <BookItem />
      {!search && index <= count && !isLoading && (
        <button onClick={() => loadSortedBooks()}>Load more</button>
      )}
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {search && index <= count && !isLoading && (
        <button onClick={() => loadSearchedBooks()}>Load more</button>
      )}
    </>
  )
}

export default Main
