import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  setEditFrom,
  setShowBtn,
  setAddress,
  saveUserLocationThunk
} from "../../../assets/react-redux-store/store-component/location-data-picke-slice";
import PressableIconButtonGradient from '../../../components/button/pressable-gradient-icon-button';


const EditForm = (props) => {
  const dispatch = useDispatch();
  const { closeForm } = props;

  const { region, address, locationAdded, loading, editFrom } = useSelector(
    (state) => state.LocationReducerStore
  );

  // ✅ Local editable state
  const [form, setForm] = useState({
    houseNo: "",
    plotNo: "",
    premisesNo: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pin: "",
  });

  useEffect(() => {
    if (!address) return;

    setForm({
      houseNo: address.houseNo || address.name || address.street || "",
      plotNo: address.plotNo || "",
      premisesNo: address.premisesNo || address.street || "",
      city: address.city || "",
      district: address.district || "",
      state: address.state || "",
      country: address.country || "",
      pin: address.pin || "",
    });
  }, [address]);

  // update handler
  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // ✅ Save updated data
  const saveHandler = () => {
    if (!form.houseNo.trim()) {
      alert("House No is required!");
      return;
    }

    const updatedAddress = {
      ...address,
      ...form,
    };

    // ✅ Redux update
    dispatch(setAddress(updatedAddress));
    dispatch(setEditFrom(false));
    dispatch(setShowBtn(true));

    // ✅ Firebase update
    dispatch(
      saveUserLocationThunk({
        region,
        address: updatedAddress,
      })
    );
  };

  const closeHandler = () => {

    dispatch(setEditFrom(false));
    dispatch(setShowBtn(true));
  };


  return (
    <>
      <View style={styles.container}>

        <Text style={styles.title}>Edit Location</Text>

        <View>
          <Text style={styles.label}>House No</Text>
          <TextInput
            style={styles.input}
            value={form.houseNo}
            placeholder="House No"
            onChangeText={(v) => updateField("houseNo", v)}
          />
        </View>

        <View>
          <Text style={styles.label}>Plot No</Text>
          <TextInput
            style={styles.input}
            value={form.plotNo}
            placeholder="Plot No"
            onChangeText={(v) => updateField("plotNo", v)}
          />
        </View>

        <View>
          <Text style={styles.label}>Premises No</Text>
          <TextInput
            style={styles.input}
            value={form.premisesNo}
            placeholder="Premises No"
            onChangeText={(v) => updateField("premisesNo", v)}
          />
        </View>

        <View>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={form.city}
            placeholder="City"
            onChangeText={(v) => updateField("city", v)}
          />
        </View>

        <View>
          <Text style={styles.label}>District</Text>

          <TextInput
            style={styles.input}
            value={form.district}
            placeholder="District"
            onChangeText={(v) => updateField("district", v)}
          />

        </View>

        <View>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={form.state}
            placeholder="State"
            onChangeText={(v) => updateField("state", v)}
          />

        </View>

        <View>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={form.country}
            placeholder="Country"
            onChangeText={(v) => updateField("country", v)}
          />
        </View>

        <View>
          <Text style={styles.label}>Pin Code</Text>

          <TextInput
            style={styles.input}
            value={form.pin}
            placeholder="Pin Code"
            keyboardType="number-pad"
            onChangeText={(v) => updateField("pin", v)}
          />

        </View>

        <View style={styles.row}>
          <PressableIconButtonGradient
            ButtonTitle="Save"
            gradientClass={styles.gradientClass}
            onPress={saveHandler}
             ButtonTitleClass={styles.ButtonTitleClass}

          />

          <Pressable onPress={closeHandler}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>

      </View>
    </>
  )
}

export default EditForm


const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
  container: {
    width: 340,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems:"center"
  },

  cancel: {
    color: "gray",
    fontSize: 16
  },

  gradientClass: {
    // paddingVertical: 0,
    // paddingHorizontal:0,

    paddingVertical: 5,
    paddingHorizontal:22,
  },

  ButtonTitleClass:{
    fontSize: 14,
    fontWeight: "600",
  }

});