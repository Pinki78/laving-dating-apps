import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";



export const saveMarialStatus = createAsyncThunk(
  "marialStatusData/saveMarialStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedMarialStatus } =
        getState().MarialStatusReducerStore; // ✅ FIXED
        if (!selectedMarialStatus.length) {
        return rejectWithValue("No MarialStatus selected"); // ✅ FIXED
      }

      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

    //   const parentDocId = `${user.email}_${user.uid}`;
      const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      const customId = `${emailId}_${user.uid}`;
      await setDoc(
        doc(db, "users", customId, "profileDataUser", "myUserprofile"),
        {
          marialStatus: selectedMarialStatus,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("✅ MarialStatus saved:", selectedMarialStatus);

      return selectedMarialStatus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
  );

  
  const marialStatusSlice = createSlice({
      name: "marialStatusData",
      initialState: {
          selectedMarialStatus: [],
      },
      reducers: {
  
          setSelectedMarialStatus: (state, action) => {
              state.selectedMarialStatus = action.payload;
          },
  
          toggleMarialStatus: (state, action) => {
              const id = action.payload;
              if (state.selectedMarialStatus.includes(id)) {
                  state.selectedMarialStatus = state.selectedMarialStatus.filter(x => x !== id);
              } else {
                  state.selectedMarialStatus.push(id);
              }
          },
          clearMarialStatus: (state) => {
              state.selectedMarialStatus = [];
          },
      },
  
      extraReducers: (builder) => {
          builder
              .addCase(saveMarialStatus.pending, (state) => {
                  state.loading = true;
              })
              .addCase(saveMarialStatus.fulfilled, (state) => {
                  state.loading = false;
                  state.showUploadPhoto = true; // ✅ move here instead
  
              })
              .addCase(saveMarialStatus.rejected, (state) => {
                  state.loading = false;
              });
      },
  });
  
  
  export const {
      setSelectedMarialStatus,
      toggleMarialStatus,
      clearMarialStatus,
  } = marialStatusSlice.actions;
  
  export default marialStatusSlice.reducer;