import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "."
import { IBook } from "../components/BookPage/BookPage.interface"
import axios from "axios"

const api: string = "AIzaSyA_GJ4qpjjJWZxmvNCp0c_M9kWRprLzTEI"

export const getSortedBooks = createAsyncThunk(
  "book/getSortedBooks",
  async (option: string, { dispatch }) => {
    const response = await axios.get(
      ` https://www.googleapis.com/books/v1/volumes?q=
      ${option}&key=${api}`
    )
    dispatch(setBookData(response.data.items))
    dispatch(updateCount(response.data.totalItems))
    return response
  }
)

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
  extraReducers: (builder) => {
    builder
      .addCase(getSortedBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSortedBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.index = 30
      })
    // .addCase(getSortedBooks.rejected, (state,action)=>{
    //   state.isLoading = false

    // })
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
