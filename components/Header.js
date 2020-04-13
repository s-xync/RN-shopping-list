import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const Header = ({ title }) => {
  return (
    <View>
      <StatusBar backgroundColor="darkslateblue" />
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

Header.defaultProps = {
  title: "Shopping List",
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    padding: 10,
    backgroundColor: "darkslateblue",
  },
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
});

export default Header;
