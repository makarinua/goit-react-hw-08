import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'
import { register, login, logout, refreshUser } from '../auth/operations'

function errorHandler() {
    toast('Спробуйте ще раз.', { style: {backgroundColor: 'rgb(83, 83, 139)'}})
}

function loadingHandler() {
}

function resetItems(state) {
  state.items = []
}
 
const authSlice = createSlice({
    name: 'auth',
    initialState: {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
    },
  extraReducers: builder => {
    builder
      .addCase(register.pending, loadingHandler)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoggedIn = true
      })
      .addCase(register.rejected, errorHandler)
      .addCase(login.pending, loadingHandler)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isLoggedIn = true
      })
      .addCase(login.rejected, () => {
        toast('Вказаного Еmail-а не знайдено, або Ви вказали не вырний пароль', {duration: 3000, style: {backgroundColor: 'rgb(83, 83, 139)'}})
      })
      .addCase(logout.pending, loadingHandler)
      .addCase(logout.fulfilled, (state) => {
        state.user = {name: null, email: null,}
        state.token = null
        state.isLoggedIn = false
        resetItems(state)
      })
      .addCase(logout.rejected, errorHandler)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.isRefreshing = false
      })
    }
})

export const authReduser = authSlice.reducer