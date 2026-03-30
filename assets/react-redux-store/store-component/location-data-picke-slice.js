import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Location from "expo-location";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
// 🔥 Thunk: Pick location + reverse geocode
export const pickLocationThunk = createAsyncThunk(
  "location/pickLocation",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      // 📍 Region
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      // 📍 Reverse geocode
      const addressArr = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let address = null;

      if (addressArr?.length) {
        const addr = addressArr[0];

        const normalizedDistrict =
          addr.district &&
          addr.city &&
          addr.district.toLowerCase() === addr.city.toLowerCase()
            ? addr.subregion || addr.district
            : addr.district;

        address = {
          houseNo: addr.name || addr.street || "",
          plotNo: "",
          premisesNo: addr.street || "",
          city:
            addr.city ||
            addr.subregion ||
            addr.district ||
            "Unknown City",
          district: normalizedDistrict || "",
          state: addr.region || "",
          pin: addr.postalCode || "",
          country: addr.country || "",
        };
      }

      return { region, address };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const saveUserLocationThunk = createAsyncThunk(
  "location/saveUserLocation",
  async ({ region, address }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      // const parentDocId = `${user.email}_${user.uid}`;

      const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      const customId = `${emailId}_${user.uid}`;

      console.log("Saving for:", emailId);
      console.log("USER:", auth.currentUser);
      const ref = doc(
        db,
        "users",
        customId,
        "profileDataUser",
        "myUserprofile"
      );

      await setDoc(
        ref,
        {
          location: {
            region,
            address,
          },
          updatedAt: serverTimestamp(), // ✅ better
        },
        { merge: true }
      );

      console.log("Saved successfully ✅");

      return true;
    } catch (error) {
      console.log("Save error:", error);
      return rejectWithValue(error.message);
    }
  }
);



// 🔥 Slice
const locationSlice = createSlice({
  name: "location",

  initialState: {
    keyboardHeight: 0,
    showBtn: false,
    editFrom: false,

    loading: false,
    locationAdded: false,

    region: null,
    address: null,
  },

  reducers: {
    setShowBtn: (state, action) => {
      state.showBtn = action.payload;
    },

     setAddress: (state, action) => {
      state.address = action.payload;
    },

    setRegion: (state, action) => {
    state.region = action.payload;
  },

    setEditFrom: (state, action) => {
      state.editFrom = action.payload;
    },

    setKeyboardHeight: (state, action) => {
      state.keyboardHeight = action.payload;
    },

    clearLocation: (state) => {
      state.region = null;
      state.address = null;
      state.locationAdded = false;
    },

    setLocationMap: (state, action) => {
      state.region = action.payload.region;
      state.address = action.payload.address;
      state.locationAdded = true;
    },
    setLocationAdded: (state, action) => {
  state.locationAdded = action.payload;
},
  },

  extraReducers: (builder) => {
    builder
      .addCase(pickLocationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(pickLocationThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.region = action.payload.region;
          state.address = action.payload.address;
          // state.locationAdded = true;
        }
      })
      .addCase(pickLocationThunk.rejected, (state) => {
        state.loading = false;
      })

      // 🔥 NEW
    .addCase(saveUserLocationThunk.pending, (state) => {
      state.loading = true;
    })
    .addCase(saveUserLocationThunk.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(saveUserLocationThunk.rejected, (state) => {
      state.loading = false;
    });

      
      
  },
});

export const {
  setShowBtn,
  setEditFrom,
  setKeyboardHeight,
  clearLocation,
  setLocationMap,
  setRegion,
  setLocationAdded,
  setAddress
} = locationSlice.actions;

export default locationSlice.reducer;