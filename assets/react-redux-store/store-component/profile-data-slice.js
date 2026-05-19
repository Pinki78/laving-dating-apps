import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { profiles_data } from "../../data/profilesData/profilesData";

const PROFILES_DOC_REF = doc(db, "profilesDataCollection", "profileLists"); // ✅ Single source of truth for path

// 🔹 Upload profiles to Firestore
export const uploadProfilesFirebase = createAsyncThunk(
  "profilesDatas/uploadProfiles",
  async () => {
    const docRef = doc(db, "profilesDataCollection", "profileLists"); // ✅ inside thunk
    await setDoc(docRef, {
      profilesDatas: profiles_data,
    });
    return profiles_data;
  }
);

export const fetchLoadProfiles = createAsyncThunk(
  "profilesDatas/fetchProfiles",
  async () => {
    const docRef = doc(db, "profilesDataCollection", "profileLists"); // ✅ inside thunk
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const firestoreData = docSnap.data().profilesDatas;

      const isOutOfSync =
        JSON.stringify(firestoreData) !== JSON.stringify(profiles_data);

      if (isOutOfSync) {
        await setDoc(docRef, { profilesDatas: profiles_data });
        return profiles_data;
      }

      return firestoreData;
    }

    await setDoc(docRef, { profilesDatas: profiles_data });
    return profiles_data;
  }
);

const initialState = {
  profilesStateData: [],
  likedProfiles: [],       // ✅ added
  dislikedProfiles: [],    // ✅ added
  loading: false,
  error: null,
};

const profilesDataSlice = createSlice({
  name: "profilesDatas",
  initialState,
  reducers: {
    addLikedProfile: (state, action) => {        // ✅ save liked profile
      if (!state.likedProfiles) state.likedProfiles = [];
      state.likedProfiles.push(action.payload);
    },
    addDislikedProfile: (state, action) => {     // ✅ save disliked profile
      if (!state.dislikedProfiles) state.dislikedProfiles = [];
      state.dislikedProfiles.push(action.payload);
    },
  },           // ✅ Fixed: removed misplaced `loading: false` that was here
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilesFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilesFirebase.fulfilled, (state, action) => {
        state.profilesStateData = action.payload;
        state.loading = false;
      })
      .addCase(uploadProfilesFirebase.rejected, (state, action) => { // ✅ Added missing rejected case
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoadProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoadProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profilesStateData = action.payload;
      })
      .addCase(fetchLoadProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addLikedProfile, addDislikedProfile } = profilesDataSlice.actions;

export default profilesDataSlice.reducer;