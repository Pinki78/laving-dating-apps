import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../../assets/style/color";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";

import { setIsAuthenticated, setLoading } from "../../../assets/react-redux-store/store-component/auth-slice";

import { useForm, Controller } from "react-hook-form";
import { setShowPasswordLogin } from "../../../assets/react-redux-store/store-component/logIn-user-form-slice";



const LoginFrom = () => {



  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, showPasswordLogin } = useSelector(
    (state) => state.LogInUserReducerStore
  );
    // const { isAuthenticated, onboardingComplete} =
    // useSelector((state) => state.authReducerStore);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { identity: "", password: "" },
    mode: "onSubmit",
  });

const onSubmit = async ({ identity, password }) => {
  // try {
  //   dispatch(setLoading(true));

  //   const userCredential = await signInWithEmailAndPassword(
  //     auth,
  //     identity.trim(),
  //     password
  //   );

  //   // ✅ This line controls everything
  //   dispatch(setIsAuthenticated(true));

  // } catch (error) {
  //   Alert.alert("Login Error", error.message);
  // } finally {
  //   dispatch(setLoading(false));
  // }
};

  return (
    <>
      <View>
        <Controller
          control={control}
          name="identity"
          rules={{ required: "Required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#BABBC3"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.identity && <Text style={[styles.error, { color: "red" }]}>{errors.identity.message}</Text>}

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password required" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0 }]}
                placeholder="Password"
                placeholderTextColor="#BABBC3"
                secureTextEntry={!showPasswordLogin}
                value={value}
                onChangeText={onChange}
              />
              <Pressable  onPress={() => dispatch(setShowPasswordLogin(!showPasswordLogin))} style={{ marginRight: 12 }}>
                <Ionicons name={showPasswordLogin ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
              </Pressable>
            </View>
          )}
        />
        {errors.password && <Text style={[styles.error, { color: "red" }]}>{errors.password.message}</Text>}

        <PressableIconButtonGradient ButtonTitle={loading ? "Please wait..." : "Log In"} onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  )
}

export default LoginFrom

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontFamily: "Urbanist_600SemiBold",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    marginBottom: 20,
  },
  error: {
    color: COLORS.red,
    marginBottom: 8,
    fontSize: 12,
    fontFamily: "Urbanist_600SemiBold",
  },
});