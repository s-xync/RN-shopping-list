import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert, AsyncStorage } from "react-native";

import Header from "./components/Header";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

// TODO: safe area usage
// TODO: list is empty

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("items").then((items) => {
      if (!items) {
        return;
      }
      const itemsArray = JSON.parse(items);
      if (!Array.isArray(itemsArray)) {
        return;
      }
      setItems(itemsArray);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert("Error", "Please enter an item", [{ text: "OK" }]);
      return;
    }
    setItems((prevItems) => {
      return [{ id: `${Math.random()}`, text }, ...prevItems];
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
