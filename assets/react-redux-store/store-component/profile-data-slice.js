import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {auth,  db } from "../../firebase/firebaseConfig";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"

import { profiles_data } from "../../data/profilesData/profilesData";

// 🔹 Upload menu to Firestore
export const uploadProfilesFirebase = createAsyncThunk(
  "profilesDatas/uploadProfiles",
  async () => {
    await setDoc(collection, doc(db,  "profiles", "profileLists"), {
      profilesDatas: profiles_data,
    });

    return profiles_data;
  }
);

export const fetchLoadProfiles = createAsyncThunk(
  "profilesDatas/fetchProfiles",
  async () => {

    const docRef = doc(db, "profilesDataCollection", "profileLists");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().profilesDatas;
    }

    // Auto upload if empty
    await setDoc(docRef, {
      profilesDatas: profiles_data,
    });

    return profiles_data;
  }
);

const initialState = {
  profilesStateData: [],
  loading: false,
  error: null,
  // showInterests: false,
  // selectedPreferences: []
}

const profilesDataSlice = createSlice({
  name: "profilesDatas",
  initialState,
  reducers: {

    // setShowInterests: (state, action) => {
    //   state.showInterests = action.payload;
    // },
    // setSelectedPreferences: (state, action) => {
    //   state.selectedPreferences = action.payload;
    // }
  },
   loading: false,
  extraReducers: (builder) => {
    builder

     .addCase(uploadProfilesFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilesFirebase.fulfilled, (state, action) => {
        state.profilesStateData = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoadProfiles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLoadProfiles.fulfilled, (state, action) => {
        state.loading = false
        state.profilesStateData = action.payload
      })
      .addCase(fetchLoadProfiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})


// export const { setShowInterests,setSelectedPreferences } = profilesDataSlice.actions;
export default profilesDataSlice.reducer

