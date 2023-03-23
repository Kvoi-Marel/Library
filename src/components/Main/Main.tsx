import React, { useEffect, useState } from "react"
import axios from "axios"

import styles from "./Main.module.scss"

import BookItem from "../BookItem/BookItem"
import { MySelect } from "./MySelect/MySelect"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import {
  increaseIndex,
  increaseSearchIndex,
  setIndex,
  setSearch,
  setSearchIndex,
  updateCount,
  setSelectedSort,
  setVariant,
  setLoading,
} from "../../store/bookSlice"

const Main = () => {
  const {
    count,
    selectedSort,
    variant,
    search,
    index,
    searchIndex,
    isLoading,
  } = useAppSelector((state) => state.books)
  const dispatch = useAppDispatch()

  const [bookData, setBookData] = useState([])

  const Search = async (search: string, index: number) => {
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=
          intitle:${search}
            &maxResults=30&startIndex=${index}&key=AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI`
      )
      if (!response) {
        throw new Error("Server error")
      }
      setBookData(bookData.concat(response.data.items))

      dispatch(updateCount(response.data.totalItems))
      dispatch(increaseSearchIndex(30))
    } catch (error: any) {
      return error.message
    }
  }

  const firstGetApi = async (search: string) => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=
        intitle:${search}
          &maxResults=30&startIndex=0&key=AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI`
      )
      if (!response) {
        throw new Error("Server error")
      }
      setBookData(response.data.items)
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
      dispatch(setSearchIndex(30))
    } catch (error: any) {
      return error.message
    }
  }
  const sortByCategories = async (
    category: string,
    variant: string,
    index: number
  ) => {
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=${variant}&maxResults=30&startIndex=${index}&key=AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI`
      )
      if (!response) {
        throw new Error("Server error")
      }
      setBookData(bookData.concat(response.data.items))
      dispatch(updateCount(response.data.totalItems))
      dispatch(increaseIndex(30))
    } catch (error: any) {
      return error.message
    }
  }
  const firstSort = async (category: string, variant: string) => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=${variant}&maxResults=30&startIndex=0&key=AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI`
      )
      if (!response) {
        throw new Error("Server error")
      }
      setBookData(response.data.items)
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
      dispatch(setIndex(30))
    } catch (error: any) {
      return error.message
    }
  }
  const searchBook = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      firstGetApi(search)
    }
  }
  const sortBook = (sort: string, variant: string) => {
    dispatch(setSelectedSort(sort))
    dispatch(setVariant(variant))
    firstSort(sort, variant)
  }

  useEffect(() => {
    firstSort(selectedSort, variant)
  }, [])

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
          <button className={styles.button} onClick={() => firstGetApi(search)}>
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
              onChange={(selectedSort) => sortBook(selectedSort, variant)}
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
              onChange={(variant) => sortBook(selectedSort, variant)}
            />
          </div>
        </div>
      </div>
      <h1>Books found: {count}</h1>
      {isLoading ? <div>Loading...</div> : <BookItem book={bookData} />}
      {!search && index <= count && (
        <button onClick={() => sortByCategories(selectedSort, variant, index)}>
          Load more
        </button>
      )}
      {search && searchIndex <= count && (
        <button onClick={() => Search(search, searchIndex)}>Load more</button>
      )}
    </>
  )
}

export default Main
