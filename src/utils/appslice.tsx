import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./types";

const initialState: AppState = {
  isMenuOpen: true,
  searchQuery: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleMenu, setSearchQuery } = appSlice.actions;

export default appSlice.reducer;