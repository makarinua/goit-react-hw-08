import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast' 
import { addContact, fetchContacts, deleteContact, updateContact } from './operations'

function errorHandler(state, action) {
    state.error = action.payload
    toast('Oops, try again', { style: {backgroundColor: 'red'}})
    
}

function loadingHandler(state) {
    state.loading = true
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        error: null,
        loading: false
    }, 
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, loadingHandler)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchContacts.rejected, errorHandler)
            .addCase(addContact.pending, loadingHandler)
            .addCase(addContact.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.items.push(action.payload)
                toast('Контакт додано', { style: {backgroundColor: 'rgb(210, 210, 218)'}})
            })
            .addCase(addContact.rejected, errorHandler)
            .addCase(deleteContact.pending, loadingHandler)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                const elem = state.items.find(item => item.id === action.payload)
                state.items.splice(state.items.indexOf(elem), 1)
                toast('Контакт видалено', { style: {backgroundColor: 'rgb(210, 210, 218)'}})
            })
            .addCase(deleteContact.rejected, errorHandler)
            .addCase(updateContact.pending, loadingHandler)
            .addCase(updateContact.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                const elem = state.items.find(item => item.id === action.payload)
                state.items.splice(state.items.indexOf(elem), 1, action.payload)
                toast('Контакт оновлено', { style: {backgroundColor: 'rgb(210, 210, 218)'}})
            })
            .addCase(updateContact.rejected, errorHandler)
    }
})

export const contactsReduser = contactsSlice.reducer