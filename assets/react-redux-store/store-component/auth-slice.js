
// store/authSliceHandler.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";



const authSliceHandler = createSlice({

    name: "onboarding",
    initialState: {
        loading: false,
        error: null,
        onboardingComplete: null,
        isAuthenticated: null,
        hasOpenedAppBefore: false,
        authChecked: false, // ✅ ADD THIS
        isSigningUp: false, // ✅ ADD THIS
    },
    reducers: {
        setIsSigningUp: (state, action) => {
            state.isSigningUp = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setAuthChecked: (state, action) => {
            state.authChecked = action.payload;
        },
        setHasOpenedAppBefore: (state, action) => {
            state.hasOpenedAppBefore = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setOnboardingComplete: (state, action) => {
            state.onboardingComplete = action.payload;
        },
    },


})

export const { setIsSigningUp, setIsAuthenticated, setAuthChecked, setHasOpenedAppBefore, setLoading, setOnboardingComplete } = authSliceHandler.actions;

export default authSliceHandler.reducer;