import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {auth,  db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp  } from "firebase/firestore";
import { formFields } from "../../../app/creating-new-users/data-new-form-user/formFields";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";


  // const { onboardingComplete} =
  //   useSelector((state) => state.SignupReducerStore);

// 🔹 Upload user form to Firestore
export const uploadUserNewForm = createAsyncThunk(
  "userNew/upload",
  async (_, thunkAPI) => {
    try {
      const docRef = doc(db, "createNewForms", "newUserForm");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          usersCreateForm: formFields,
          createdAt: new Date(),
        });
      }

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Fetch the Signup form data

export const fetchSignup = createAsyncThunk(
  "userNew/fetch",
  async () => {
    // console.log("fetchSignup called");

    const docRef = doc(db, "createNewForms", "newUserForm");
    const docSnap = await getDoc(docRef);

    // console.log("Document exists:", docSnap.exists());

    if (docSnap.exists()) {
      const data = docSnap.data();
      //   console.log("Firestore data:", data);

      return data.usersCreateForm;
    } else {
      //   console.log("Document not found, using fallback");
      return formFields;
    }
  }
);

export const createUser = createAsyncThunk(
  "userNew/createUser",
  async (data, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim().toLowerCase(),
        data.password
      );

      const user = userCredential.user;

      const emailId = data.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");
        const customId = `${emailId}_${user.uid}`;

      const userDoc = {
        uid: user.uid,
        email: data.email.trim().toLowerCase(),
        name: data.fullName.trim(),
        fullName: data.fullName.trim(),
        role: "user",
        phone: data.phone || "",
        dob: data.dob || "",
        gender: data.gender || "",
        onboardingComplete: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", customId), userDoc);

      // ❌ REMOVE SIGNOUT FROM HERE

      const { createdAt, ...safeUser } = userDoc;

      return safeUser;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userNewFormSlice = createSlice({
  name: "userNew",

  initialState: {
    loading: false,
    SignupUser: null,
    error: null,
    usersCreateForm: [],
    show: false,
    showPassword: false,
    openSelect: null
  },
  reducers: {
    setShow(state, action) {
      state.show = action.payload;
    },
    setOpenSelect(state, action) {
      state.openSelect = action.payload;
    },
    setShowPassword(state, action) {
      state.showPassword = action.payload;
    },

  },
  extraReducers: (builder) => {
  builder

    // Fetch form
    .addCase(fetchSignup.pending, (state) => {
      state.loading = true;
    })

    .addCase(fetchSignup.fulfilled, (state, action) => {
      state.usersCreateForm = action.payload;
      state.loading = false;
    })

    .addCase(fetchSignup.rejected, (state) => {
      state.loading = false;
    })

    // Create user
    .addCase(createUser.pending, (state) => {
      state.loading = true;
    })

    .addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.SignupUser = action.payload;
    })

    .addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export const {

  setShow, // ⚡ export it
  setOpenSelect,
  setShowPassword

} = userNewFormSlice.actions;

export default userNewFormSlice.reducer;