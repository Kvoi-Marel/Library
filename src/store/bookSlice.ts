import { createSlice } from "@reduxjs/toolkit"

import { RootState } from "."

const bookSlice = createSlice({
  name: "book",
  initialState: {
    search: "",
    count: 0,
    selectedSort: "",
    index: 0,
    searchIndex: 0,
    variant: "relevance",
    sortBook: "",
    isLoading: false,
  },
  reducers: {
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
    increaseIndex: (state, action) => {
      state.index += action.payload
    },
    setIndex: (state, action) => {
      state.index = action.payload
    },
    increaseSearchIndex: (state, action) => {
      state.searchIndex += action.payload
    },
    setSearchIndex: (state, action) => {
      state.searchIndex = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})
export const selectCount = (state: RootState) => state.books
export const {
  updateCount,
  setSelectedSort,
  setVariant,
  setSearch,
  setIndex,
  setSearchIndex,
  increaseSearchIndex,
  increaseIndex,
  setLoading,
} = bookSlice.actions
export const bookReduser = bookSlice.reducer
