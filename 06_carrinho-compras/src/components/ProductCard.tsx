import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ProductDTO } from "../types/Product";

interface CardProps {
  item: ProductDTO;
}

const ProductCard = ({ item }: CardProps) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ff",
    padding: 25,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 300,
    color: "#00",
  },
});
