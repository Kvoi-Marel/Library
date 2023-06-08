import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "."
import { IBook } from "../components/BookPage/BookPage.interface"

const bookData: IBook[] = []
const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookData,
    search: "",
    count: 0,
    selectedSort: "",
    index: 0,
    variant: "relevance",
    sortBook: "",
    isLoading: false,
  },
  reducers: {
    setBookData: (state, action: PayloadAction<IBook[]>) => {
      state.bookData = action.payload
      state.index = 30
    },
    updateData: (state, action: PayloadAction<IBook[]>) => {
      state.bookData.push(...action.payload)
      state.index += 30
    },
    updateCount: (state, action) => {
      state.count = action.payload
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload
    },
    setVariant: (state, action) => {
      state.variant = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const selectCount = (state: RootState) => state.books
export const {
  setBookData,
  updateData,
  updateCount,
  setSelectedSort,
  setVariant,
  setSearch,
  setLoading,
} = bookSlice.actions
export const bookReduser = bookSlice.reducer
