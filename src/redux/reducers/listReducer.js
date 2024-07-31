import {createSlice} from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: 'list',
    initialState: {
        newContactId: null
    },
    reducers: {
        setNewContactId(state, action) {
            state.newContactId = action.payload
        }
    }
})
export const { setNewContactId } = listSlice.actions;
export default listSlice.reducer;
