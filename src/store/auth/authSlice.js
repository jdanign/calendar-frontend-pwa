import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    status: 'checking', // authenticated || not-authenticated || checking
    user: {},
    errorMessage: '',
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state, /* action */ ) => {
            Object.entries(initialState).forEach(([key, value])=>
                state[key] = value
            );
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onChecking, 
    onLogin, 
    onLogout, 
    clearErrorMessage, 
} = authSlice.actions;