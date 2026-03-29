import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, TouchableOpacity, Platform } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";
import EditLocation from "./edit-location";
import COLORS from "../../../assets/style/color";
import {
  saveUserLocationThunk,
  setLocationAdded,
  setShowBtn,
  setRegion,
  setLocationMap,
  pickLocationThunk, // ✅ USE THIS
} from "../../../assets/react-redux-store/store-component/location-data-picke-slice";

import { useDispatch, useSelector } from "react-redux";

const PickeLocation = () => {


  const dispatch = useDispatch();

  const { region, address, locationAdded, loading, editFrom } = useSelector(
    (state) => state.LocationReducerStore
  );

  // if (Platform.OS !== "ios" && Platform.OS !== "android") {
  //   return <Text>Maps are only available on Android and iOS</Text>;
  // }


  // 📍 Get Current Location
  const getCurrentLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
      if (!location) {
        location = await Location.getCurrentPositionAsync({});
      }

      const { latitude, longitude } = location.coords;

      const regionData = {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      dispatch(setRegion(regionData));

      dispatch(
        pickLocationThunk({
          latitude,
          longitude,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  // 🗺️ Map Drag
  let timeout;

  const handleRegionChange = (newRegion) => {
    dispatch(setRegion(newRegion)); // keep for smooth UI

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      dispatch(
        pickLocationThunk({
          latitude: newRegion.latitude,
          longitude: newRegion.longitude,
        })
      );
    }, 500);
  };

  // ✅ Confirm Location
  const addLocationHandler = async () => {
    if (!address?.houseNo?.trim()) {
      alert("Please enter house / flat number");
      return;
    }

    const payload = { region, address };

    dispatch(setLocationMap(payload));
    dispatch(setLocationAdded(true));
    dispatch(setShowBtn(true));
    dispatch(
    saveUserLocationThunk({
      // parentDocId: "USER_ID_HERE", // 🔴 replace with real user uid
      region,
      address,
    })
  );
    // optional: AsyncStorage save here
  };




  return (
    <View style={styles.LocationWrapper}>
      {/* Initial */}
      {!region && !locationAdded && !loading && (
        <>
          <Image
            source={require("../../../assets/image/icon/location.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <PressableIconButtonGradient
            ButtonTitle="Allow Location Access"
            onPress={getCurrentLocation}
            PressableClass={styles.pressable}
          />

        </>
      )}

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
          <Text style={styles.loadingText}>Fetching your location...</Text>
        </View>
      )}

      {/* Map */}
      {region && !locationAdded && !loading && (
        <>

          <View style={[styles.mapWrapper, { flex: 1 } ]}>
            <MapView style={styles.map}
            
              onRegionChangeComplete={handleRegionChange}
              region={region} showsUserLocation>
              <Marker coordinate={region}
             />
            </MapView>
          </View>


          {/* <MapView
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={handleRegionChange}
          >
            <Marker coordinate={region} />
          </MapView> */}

          {address && (
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>
                {[
                  address.houseNo?.trim() || null,
                  address.plotNo?.trim() ? `Plot ${address.plotNo.trim()}` : null,
                  address.premisesNo?.trim() || null,
                  address.city || null,
                  address.district &&
                    address.district.toLowerCase() !== address.city?.toLowerCase()
                    ? address.district
                    : null,
                  address.state || null,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </Text>

              <Text style={styles.addressSubText}>
                {[address.pin, address.country].filter(Boolean).join(", ")}
              </Text>
            </View>
          )}

          <PressableIconButtonGradient
            ButtonTitle="Confirm Location"
            PressableClass={styles.pressable}
            onPress={addLocationHandler}
          />
        </>
      )}

      {/* Final */}
      {locationAdded && address && !loading && (
        <EditLocation />
      )}
    </View>
  );
};

export default PickeLocation;


const styles = StyleSheet.create({
  LocationWrapper: {

    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  imageWrapper: {
    marginTop: 40,
  },
  image: {
    width: 120,
    height: 120,
  },
  btnGroup: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  manualText: {
    color: "#E91E63",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
  pressable: {
    width: "100%",
    marginTop: 20,
  },
  loadingContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  mapWrapper: {
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  map: {
    width: "100%",
    height: 250,
  },
  addressBox: {
    marginVertical: 20,
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  addressSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});