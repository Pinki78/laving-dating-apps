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
      // 1️⃣ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password
      );

      const user = userCredential.user;

      // 2️⃣ Custom document ID
      const docId = `${data.email.trim().replace(/\s+/g, "_")}_${user.uid}`;

      // 3️⃣ Firestore document
      const userDoc = {
        uid: user.uid, // ⚡ FIXED
        name: data.fullName.trim(),
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        role: data.role || "user",
        phone: data.phone || "",
        dob: data.dob || "",
        createdAt: serverTimestamp(),
        onboardingComplete: false,
      };

      await setDoc(doc(db, "users", docId), userDoc);

      // 4️⃣ Sign out after creation
      await signOut(auth);

      // ✅ Return payload without non-serializable serverTimestamp if needed
      const { createdAt, ...serializablePayload } = userDoc;
      return serializablePayload;

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