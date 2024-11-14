import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ProductDTO } from "../types/Product";

type ProductCardProps = {
  item: ProductDTO;
};

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "transparent", 
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain", 
    backgroundColor: "transparent", 
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
