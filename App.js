import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  AsyncStorage,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Header from "./components/Header";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

// TODO: safe area usage

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

  const listEmptyComponent = () => (
    <View style={styles.emptyListView}>
      <FontAwesome name="list-ul" style={styles.emptyListIcon} />
      <Text style={styles.emptyListText}>
        It is very empty here. Add some items to your shopping list.
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        ListEmptyComponent={listEmptyComponent}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyListView: {
    alignItems: "center",
  },
  emptyListIcon: {
    paddingTop: 30,
    fontSize: 100,
    opacity: 0.1,
  },
  emptyListText: {
    textAlign: "center",
    padding: 30,
    fontSize: 20,
    opacity: 0.3,
  },
});

export default App;
