// src/screens/ProductDetails.tsx
import React from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCartContext } from "../contexts/CartContext";
import { ProductDTO } from "../types/Product";

const ProductDetails = () => {
  const route = useRoute();
  const { product } = route.params as { product: ProductDTO };
  const { addProduct } = useCartContext();

  const handleAddToCart = () => {
    addProduct(product);
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} color="#333" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Fundo leve para destacar o contêiner
    paddingVertical: 20, // Espaçamento para o scroll
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "green",
    fontWeight: "600",
    marginVertical: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 30,
    borderRadius: 8,
    overflow: "hidden",
  },
});
