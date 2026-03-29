import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ImagePicker from "expo-image-picker";
import {db, auth } from "../../firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const MAX_PHOTOS = 6;

export const pickImageThunk = createAsyncThunk(
  "photosCreate/pickImage",
  async (index, { rejectWithValue }) => {
    try {
      // ✅ Ask permission
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        return rejectWithValue("Permission denied");
      }

      // ✅ Open gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;

      // ✅ Return both uri + index
      return { uri, index };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const savePhoto = createAsyncThunk(
  "photosCreate/savePhoto",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { photoListSelector } =
        getState().PhotosPickeReducerStore;

      // ✅ Filter only selected photos
      const selectedPhotos = photoListSelector.filter(Boolean);

      if (!selectedPhotos.length) {
        return rejectWithValue("No photos selected");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      // const parentDocId = `${user.email}_${user.uid}`;
      const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      await setDoc(
        doc(db, "users", emailId, "profileDataUser", "myUserprofile"),
        {
          photos: selectedPhotos, // ✅ CORRECT FIELD
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      console.log("✅ Photos saved:", selectedPhotos);

      return selectedPhotos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const PhotosPickeSlice = createSlice({
  name: "photosCreate",
  initialState: {
    photoListSelector: Array(MAX_PHOTOS).fill(null), // ✅ FIXED
    loading: false,
  },
  reducers: {
    // addPhoto: (state, action) => {
    //   const { uri, index } = action.payload;
    //   state.photoListSelector[index] = uri; // ✅ replace at index
    // },
    removePhoto: (state, action) => {
      state.photoListSelector[action.payload] = null;
    },
    clearPhotos: (state) => {
      state.photoListSelector = Array(MAX_PHOTOS).fill(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pickImageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(pickImageThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          const { uri, index } = action.payload;
          state.photoListSelector[index] = uri; // ✅ UPDATE STATE HERE
        }
      })
      .addCase(pickImageThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { removePhoto, clearPhotos, 
  // addPhoto 
} = PhotosPickeSlice.actions;
export default PhotosPickeSlice.reducer;