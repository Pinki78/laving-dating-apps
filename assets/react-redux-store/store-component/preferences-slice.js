import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {  db, auth } from "../../firebase/firebaseConfig";



export const savePreferences = createAsyncThunk(
  "preferencesList/savePreferences",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedPreferences } =
        getState().PreferencesReducerStore;

      if (!selectedPreferences.length) {
        return rejectWithValue("No preferences selected");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      // const parentDocId = `${user.email}_${user.uid}`;


const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      // ✅ SAVE TO FIRESTORE
      await setDoc(
            // doc(db, "users", parentDocId, "profileDataUser","myUserprofile"),
            doc(db, "users", emailId, "profileDataUser", "myUserprofile"),
            {
                preferences: selectedPreferences,
                updatedAt: serverTimestamp(),
            },
            { merge: true }
    );

      console.log("✅ Preferences saved:", selectedPreferences);

      return selectedPreferences;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const preferencesSlice = createSlice({
name: "preferencesList",

  initialState: {
    selectedPreferences: [],
    loading: false,
    error: null,
  },

  reducers: {
   
    setSelectedPreferences: (state, action) => {
      state.selectedPreferences = action.payload;
    },

    toggleSelect: (state, action) => {
      const value = action.payload;

      if (state.selectedPreferences.includes(value)) {
        state.selectedPreferences =
          state.selectedPreferences.filter(
            (item) => item !== value
          );
      } else {
        state.selectedPreferences.push(value);
      }

    //   console.log(
    //     "Selected preferences:",
    //     state.selectedPreferences
    //   );
    },
extraReducers: (builder) => {
  builder
    .addCase(savePreferences.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(savePreferences.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(savePreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
   
  },

 

});



export const {

  setSelectedPreferences,
  toggleSelect,

} = preferencesSlice.actions;

export default preferencesSlice.reducer;