import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";

export const saveInterests = createAsyncThunk(
  "interestsData/saveInterests",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedInterests } =
        getState().InterestsReducerStore; // ✅ FIXED

      if (!selectedInterests.length) {
        return rejectWithValue("No interests selected"); // ✅ FIXED
      }

      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

    //   const parentDocId = `${user.email}_${user.uid}`;
const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");
      await setDoc(
        doc(db, "users", emailId, "profileDataUser", "myUserprofile"),
        {
          interests: selectedInterests,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("✅ Interests saved:", selectedInterests);

      return selectedInterests;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const interestsSlice = createSlice({
    name: "interestsData",
    initialState: {
        selectedInterests: [],

    },
    reducers: {

        setSelectedInterests: (state, action) => {
            state.selectedInterests = action.payload;
        },


        toggleInterest: (state, action) => {
            const id = action.payload;
            if (state.selectedInterests.includes(id)) {
                state.selectedInterests = state.selectedInterests.filter(x => x !== id);
            } else {
                state.selectedInterests.push(id);
            }
        },
        clearInterests: (state) => {
            state.selectedInterests = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(saveInterests.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveInterests.fulfilled, (state) => {
                state.loading = false;
                state.showUploadPhoto = true; // ✅ move here instead

            })
            .addCase(saveInterests.rejected, (state) => {
                state.loading = false;
            });
    },
});


export const {
    setSelectedInterests,
    toggleInterest,
    clearInterests,
} = interestsSlice.actions;

export default interestsSlice.reducer;

