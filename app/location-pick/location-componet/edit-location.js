import { StyleSheet, Text, View, Pressable , FlatList} from "react-native";
import EditForm from "./edit-form";
import { useDispatch, useSelector } from "react-redux";
import {

  setEditFrom,
  setLocationAdded,
  setRegion,
  setLocationMap,
  clearLocation,
  pickLocationThunk,
  setShowBtn,

} from "../../../assets/react-redux-store/store-component/location-data-picke-slice";

const EditLocation = () => {

  const dispatch = useDispatch();
  const { region, address, locationAdded, loading, editFrom } = useSelector(
    (state) => state.LocationReducerStore
  );
  const editLocationHandler = () => {
    dispatch(setShowBtn(false));
    dispatch(setEditFrom(true));
  };

  // ❌ Remove Location
  const removeLocationHandler = () => {
    // setLocationAdded(false);
    dispatch(setLocationAdded(false));
    dispatch(setRegion(null));

    dispatch(setShowBtn(false));

  };


const renderLocationItem = ({ item }) => {
  return (
    <View style={styles.locationCard}>
      
      {item.houseNo ? (
        <Text style={styles.locationTitle}>
          <Text style={styles.titles}>House No: </Text>
          {item.houseNo.trim()}
        </Text>
      ) : null}

      {item.plotNo ? (
        <Text style={styles.locationTitle}>
          <Text style={styles.titles}>Plot No: </Text>
          {item.plotNo.trim() ? `Plot ${item.plotNo.trim()}` : null}
        </Text>
      ) : null}

      {item.premisesNo ? (
        <Text style={styles.locationTitle}>
          <Text style={styles.titles}>Premises No: </Text>
          {item.premisesNo.trim()}
        </Text>
      ) : null}

      <Text style={styles.locationTitle}>
        <Text style={styles.titles}>City: </Text>
        {item.city}
      </Text>

      <Text style={styles.locationSub}>
        <Text style={styles.titles}>District: </Text>
        {item.district &&
        item.district.toLowerCase() !== item.city.toLowerCase()
          ? `${item.district}, `
          : ""}
        {item.state}
      </Text>

      <Text style={styles.locationSub}>
        <Text style={styles.titles}>Country: </Text>
        {item.country}
      </Text>

      <Text style={styles.locationSub}>
        <Text style={styles.titles}>Pin: </Text>
        {item.pin}
      </Text>

      <View style={styles.actionRow}>
        <Pressable onPress={() => editLocationHandler(item)}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>

        <Pressable onPress={() => removeLocationHandler(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

  return (
    <>
      {!editFrom && (

        <FlatList
          data={address ? [address] : []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLocationItem}
          showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />

      )}


      {editFrom && (
        <EditForm

          closeForm={() => dispatch(setEditFrom(false))}
        />
      )}

    </>
  )
}

export default EditLocation


const styles = StyleSheet.create({
  IconHeader:{ 
    flex:1,
  },
  locationCard: {
    width: 340,
    padding: 16,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#F8F8F8",
  },

  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  locationSub: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  editText: {
    color: "#E91E63",
    fontWeight: "500",
  },


  removeText: {
    color: "#999",
  },
});
