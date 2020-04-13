import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Header from "./components/Header";
import ListItem from "./components/ListItem";

const App = () => {
  const [items, setItems] = useState([
    { id: `${Math.random()}`, text: "Milk" },
    { id: `${Math.random()}`, text: "Eggs" },
    { id: `${Math.random()}`, text: "Bread" },
    { id: `${Math.random()}`, text: "Juice" },
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
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
