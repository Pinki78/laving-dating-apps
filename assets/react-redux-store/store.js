import { configureStore } from "@reduxjs/toolkit";

import authSliceHandler from "../react-redux-store/store-component/auth-slice"
import userNewFormSlice from "../react-redux-store/store-component/user-new-form-slice"
import LogInUserSlice from "../react-redux-store/store-component/logIn-user-form-slice"
import profilesDataSlice from "../react-redux-store/store-component/profile-data-slice"
import preferencesSlice from "../react-redux-store/store-component/preferences-slice"
import interestsSlice from "../react-redux-store/store-component/interests-data-slice"
import PhotosPickeSlice from "../react-redux-store/store-component/photos-picke-slice"
import  locationDataPickeSlice from "../react-redux-store/store-component/location-data-picke-slice"
import marialStatusSlice from "../react-redux-store/store-component/marial-status-slice"

export const store = configureStore({
    reducer: {
        authReducerStore:authSliceHandler,
        SignupReducerStore:userNewFormSlice,
        LogInUserReducerStore:LogInUserSlice,
        ProfilesDataReducerStore:profilesDataSlice,
        PreferencesReducerStore:preferencesSlice,
        InterestsReducerStore:interestsSlice,
       PhotosPickeReducerStore:PhotosPickeSlice,
      LocationReducerStore:locationDataPickeSlice,
      MarialStatusReducerStore:marialStatusSlice,

    },
});

