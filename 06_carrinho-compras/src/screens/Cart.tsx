import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Cart = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho de Compras</Text>
        <Text style={styles.emptyMessage}>Seu carrinho está vazio</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
