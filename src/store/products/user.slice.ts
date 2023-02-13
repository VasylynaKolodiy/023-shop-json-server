import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUsers} from "../../models/Interfaces";

export const USR_STORAGE_KEY = 'user'
const initialState = {
  user: JSON.parse(localStorage.getItem(USR_STORAGE_KEY) || '{}')
}

export const userSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<IUsers>) {
      state.user = action.payload
      localStorage.setItem(USR_STORAGE_KEY, JSON.stringify(state.user))
    },
    logoutUser(state, action: PayloadAction<IUsers>) {
      state.user = action.payload
      localStorage.removeItem(USR_STORAGE_KEY)
    }
  }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer