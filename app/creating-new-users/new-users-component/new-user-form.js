import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  ActivityIndicator
} from "react-native";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as formik from 'formik';
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";
import COLORS from "../../../assets/style/color";

import {
  fetchSignup,
  uploadUserNewForm,
  setShow,
  setOpenSelect,
  setShowPassword,
  createUser
} from "../../../assets/react-redux-store/store-component/user-new-form-slice";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import { setOnboardingComplete, setHasOpenedAppBefore, setIsAuthenticated, setIsSigningUp } from "../../../assets/react-redux-store/store-component/auth-slice";
import { auth, } from "../../../assets/firebase/firebaseConfig";

import { signOut } from "firebase/auth";
import PhoneInput from "react-native-phone-number-input";


const NewUserForm = () => {
  const phoneRef = useRef(null);
  const [countryCode, setCountryCode] = useState("IN");
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { usersCreateForm, show, openSelect, showPassword, loading } =
    useSelector((state) => state.SignupReducerStore);

  const { isAuthenticated, isSigningUp, onboardingComplete } =
    useSelector((state) => state.authReducerStore);

  useEffect(() => {
    dispatch(uploadUserNewForm()).then(() => {
      dispatch(fetchSignup());
    });
  }, [dispatch]);

  //   useEffect(() => {
  //   const loadData = async () => {
  //     await dispatch(uploadUserNewForm()).unwrap();
  //     await dispatch(fetchSignup()).unwrap();
  //   };

  //   loadData();
  // }, []);

  const initialValues = useMemo(() => {
    return usersCreateForm.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {});
  }, [usersCreateForm]);

  const validationSchema = useMemo(() => {
    if (!usersCreateForm || usersCreateForm.length === 0) {
      return Yup.object({});
    }

    const shape = usersCreateForm.reduce((acc, field) => {
      let validator = Yup.string();

      if (field.type === "email") {
        validator = Yup.string().required(`${field.label} is required`);
      }

      if (field.type === "select") {
        validator = Yup.string().required(`${field.label} is required`);
      }

      if (field.type === "phone") {
        validator = validator
          .matches(/^\+?[0-9]+$/, "Only numbers allowed")
          .test("valid-phone", "Invalid phone number", function (value) {
            if (!value) return false;

            return phoneRef.current?.isValidNumber(value);
          });
      }

      if (field.type) {
        validator = validator.required(`${field.label} is required`);
      }

      acc[field.id] = validator;
      return acc;

    }, {});

    return Yup.object().shape(shape);

  }, [usersCreateForm]);

  // console.log("initialValues",initialValues);
  // console.log("usersCreateForm:", usersCreateForm);
  // console.log("validationSchema:", validationSchema);

  if (loading || usersCreateForm.length === 0) {
    return <ActivityIndicator />;
  }


  // if (loading ) {
  //   return <ActivityIndicator />;
  // }

  return (
    <>

      <View style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async (values, { resetForm }) => {
            try {
              dispatch(setIsSigningUp(true)); // ✅ START BLOCK

              const user = await dispatch(createUser(values)).unwrap();

              if (!user?.uid) throw new Error("Signup failed");

              resetForm();

              navigation.replace("log-in");

              await signOut(auth);

              dispatch(setHasOpenedAppBefore(true));
              dispatch(setIsSigningUp(false)); // ✅ END BLOCK

            } catch (error) {
              dispatch(setIsSigningUp(false));
              Alert.alert("Signup Error", error.message);
            }
          }}

        >
          {({
            values,
            errors,
            touched,
            submitCount,
            handleSubmit,
            handleBlur,   // ⭐ add this
            setFieldValue,
            setFieldTouched,
            setFieldError   // ✅ ADD THIS

          }) => (
            <View>

              {usersCreateForm.map((field, index) => {
                /* ---------- SELECT ---------- */

                if (field.type === "select") {
                  return (
                    <View
                      key={field.id}
                      style={[styles.inputWrapper, styles.selectWrapper]}
                    >
                      <Pressable
                        style={[
                          styles.input,
                          styles.selectoption,
                          (touched[field.id] || submitCount > 0) &&
                          errors[field.id] && { borderColor: "red" }
                        ]}
                        onBlur={handleBlur(field.id)}
                        onPress={() =>
                          dispatch(
                            setOpenSelect(
                              openSelect === field.id ? null : field.id
                            )
                          )
                        }

                      >
                        <Text style={styles.selectPlaceholder}>
                          {values[field.id]
                            ? field.options.find(
                              (o) => o.value === values[field.id]
                            )?.label
                            : field.placeholder}
                        </Text>

                        <Ionicons
                          name="chevron-down"
                          size={18}
                          color={COLORS.greyish}
                        />
                      </Pressable>

                      {openSelect === field.id && field.options && (
                        <View style={styles.dropdown}>
                          {field.options.map((option) => (
                            <Pressable
                              key={option.value}
                              style={styles.option}
                              onBlur={handleBlur(field.id)}
                              onPress={() => {
                                setFieldValue(field.id, option.value);
                                setFieldTouched(field.id, true);   // ⭐ add this
                                dispatch(setOpenSelect(null));
                              }}
                            >
                              <Text style={styles.optionText}>{option.label}</Text>
                            </Pressable>
                          ))}
                        </View>
                      )}

                      {(touched[field.id] || submitCount > 0) && errors[field.id] && (
                        <Text style={styles.error}>{errors[field.id]}</Text>
                      )}
                    </View>
                  );
                }

                /* ---------- PASSWORD ---------- */

                if (field.type === "password") {
                  return (
                    <View key={field.id} style={styles.inputWrapper}>
                      <View style={[styles.passwordWrapper, (touched[field.id]) &&
                        errors[field.id] && { borderColor: "red" }]} >
                        <TextInput

                          placeholder={field.placeholder}
                          style={[{ flex: 1 }]}
                          value={values[field.id]}
                          onChangeText={(text) => setFieldValue(field.id, text)}
                          onBlur={() => setFieldTouched(field.id, true)}
                          //  onBlur={handleBlur(field.id)}
                          secureTextEntry={!showPassword}
                        />

                        <Pressable
                          onPress={() =>
                            dispatch(setShowPassword(!showPassword))
                          }
                        >
                          <Ionicons
                            name={
                              showPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                            }
                            size={20}
                          />
                        </Pressable>
                      </View>

                      {touched[field.id] && errors[field.id] && (
                        <Text style={styles.error}>
                          {errors[field.id]}
                        </Text>
                      )}
                    </View>
                  );
                }
                /* ---------- DATE ---------- */
                if (field.type === "date") {
                  return (
                    <View key={field.id} style={styles.inputWrapper}>
                      <Pressable
                        style={[
                          styles.input,
                          (touched[field.id] || submitCount > 0) &&
                          errors[field.id] && { borderColor: "red" }
                        ]}
                        onBlur={handleBlur(field.id)}
                        onPress={() => {
                          setFieldTouched(field.id, true);
                          dispatch(setShow(true));
                        }}
                      >
                        <Text>
                          {values[field.id] || field.placeholder}
                        </Text>
                      </Pressable>

                      {show && (
                        <DateTimePicker
                          mode="date"
                          value={new Date()}
                          maximumDate={new Date()}
                          onChange={(event, date) => {
                            dispatch(setShow(false));

                            if (date) {
                              const day = String(date.getDate()).padStart(2, "0");
                              const month = String(date.getMonth() + 1).padStart(2, "0");
                              const year = date.getFullYear();

                              setFieldValue(field.id, `${day}/${month}/${year}`);
                              setFieldTouched(field.id, true);
                            }
                          }}
                        />
                      )}

                      {(touched[field.id] || submitCount > 0) && errors[field.id] && (
                        <Text style={styles.error}>{errors[field.id]}</Text>
                      )}
                    </View>
                  );
                }

                /* ---------- PHONE ---------- */

                if (field.type === "phone") {
                  // const phoneInputRef = useRef(null);
                  return (
                    <View key={field.id} style={styles.inputWrapper}>



                      <PhoneInput
                        ref={phoneRef}
                        defaultCode="IN"
                        layout="second"
                        value={values[field.id] || ""}

                        withDarkTheme
                        withCountryNameButton   // ✅ shows "India"

                        onChangeFormattedText={(text) => {
                          setFieldValue(field.id, text);
                          setFieldTouched(field.id, true);
                        }}

                        onPressFlag={() => setCountryPickerVisible(true)}
                        onChangeCountry={(country) => {
                          setCountryCode(country.cca2);
                        }}
                        textInputProps={{
                          maxLength: countryCode === "IN" ? 10 : 15
                        }}
                        // containerStyle={styles.phoneContainer}
                         containerStyle={[
                            styles.phoneContainer,
                            (touched[field.id] || submitCount > 0) &&
                              errors[field.id] && { borderColor: "red" }
                          ]}
                        flagButtonStyle={styles.flagButton}
                        textContainerStyle={styles.textContainer}
                        textInputStyle={styles.phoneTextInput}
                      />



                      {(touched[field.id] || submitCount > 0) && errors[field.id] && (
                        <Text style={styles.error}>{errors[field.id]}</Text>
                      )}
                    </View>
                  );
                }


                return (
                  <View key={field.id} style={[styles.inputWrapper]}>
                    <TextInput
                      style={[styles.input, (touched[field.id]) &&
                        errors[field.id] && { borderColor: "red" }]}
                      placeholder={field.placeholder}
                      placeholderTextColor={COLORS.greyish}
                      value={values[field.id]}
                      onBlur={() => handleBlur(field.id)}
                      onChangeText={(text) => setFieldValue(field.id, text)}
                      keyboardType={
                        field.type === "email"
                          ? "email-address"
                          : "default"
                      }

                    />

                    {touched[field.id] && errors[field.id] && (
                      <Text style={styles.error}>
                        {errors[field.id]}
                      </Text>
                    )}
                  </View>
                );


              })}

              <PressableIconButtonGradient ButtonTitle={loading ? "Please wait..." : "Create User"}
                onPress={handleSubmit} />

            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default NewUserForm;

const styles = StyleSheet.create({


  textContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingVertical: 0,
    paddingEnd: 6,
    fontFamily: "Urbanist_600SemiBold",
  },

  phoneTextInput: {
    height: 48,
    paddingVertical: 0,
    fontFamily: "Urbanist_600SemiBold",

  },
  flagButton: {
    width: 70,              // controls flag box width
    borderRightWidth: 1,
    borderRightColor: COLORS.greyCcc,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Urbanist_600SemiBold",
  },
  phoneContainer: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    backgroundColor: "transparent",
    overflow: "hidden", // ⭐ important for rounded corners
    fontFamily: "Urbanist_600SemiBold",
    paddingHorizontal: 10,
  },

  phoneTextContainer: {
    flex: 1, // ⭐ important
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 8,
    justifyContent: "center",
  },


  container: {
    padding: 20,
  },

  inputWrapper: {
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    padding: 12,
    fontFamily: "Urbanist_600SemiBold",
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    paddingHorizontal: 12,
  },

  selectWrapper: {
    width: "100%",
    marginBottom: 10,
  },

  selectoption: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectPlaceholder: {
    fontFamily: "Urbanist_600SemiBold",
  },

  dropdown: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 5,
    zIndex: 1000,
    elevation: 5,
  },

  option: {
    padding: 10,
  },

  optionText: {
    fontSize: 14,
  },

  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },


});