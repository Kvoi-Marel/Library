import axios from "axios"
import {
  setBookData,
  setLoading,
  updateCount,
  updateData,
} from "../store/bookSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export const useApiService = () => {
  const { selectedSort, variant, search, index } = useAppSelector(
    (state) => state.books
  )

  const api: string = "AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI"

  const firstLoadOption: string = `intitle:${search}
  &maxResults=30&startIndex=0`

  const loadBySearchOption: string = `intitle:${search}
  &maxResults=30&startIndex=${index}`

  const sortOption: string = `subject:${selectedSort}&orderBy=${variant}&maxResults=30&startIndex=${index}`
  const firstSortOption: string = `subject:${selectedSort}&orderBy=${variant}&maxResults=30&startIndex=0`

  const dispatch = useAppDispatch()

  const getSortedBooks = async () => {
    dispatch(setLoading(true))

    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=${firstSortOption}&key=${api}`
      )
      if (!response) {
        throw new Error("Server error")
      }
      dispatch(setBookData(response.data.items))
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
    } catch (error: any) {
      return error.message
    }
  }

  const loadSortedBooks = async () => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=${sortOption}&key=${api}`
      )
      if (!response) {
        throw new Error("Server error")
      }
      dispatch(updateData(response.data.items))
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
    } catch (error: any) {
      return error.message
    }
  }

  const getSearchedBooks = async () => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=
        ${firstLoadOption}&key=${api}`
      )
      if (!response) {
        throw new Error("Server error")
      }
      dispatch(setBookData(response.data.items))
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
    } catch (error: any) {
      return error.message
    }
  }

  const loadSearchedBooks = async () => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        ` https://www.googleapis.com/books/v1/volumes?q=
        ${loadBySearchOption}&key=${api}`
      )
      if (!response) {
        throw new Error("Server error")
      }
      dispatch(updateData(response.data.items))
      dispatch(setLoading(false))
      dispatch(updateCount(response.data.totalItems))
    } catch (error: any) {
      return error.message
    }
  }

  return {
    getSortedBooks,
    loadSortedBooks,
    getSearchedBooks,
    loadSearchedBooks,
  }
}
