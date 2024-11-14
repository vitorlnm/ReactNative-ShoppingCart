import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ProductDTO } from "../types/Product";
import { useCartContext } from "../contexts/CartContext";

type ProductDetailsProps = {
  route: {
    params: {
      product: ProductDTO;
    };
  };
};

const ProductDetails = ({ route }: ProductDetailsProps) => {
  const { product } = route.params;
  const { addProduct } = useCartContext();
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    addProduct(product, quantity);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          R$ {(product.price * quantity).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    backgroundColor: "#f5f5f5",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    color: "#6A0DAD",
    fontWeight: "600",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  quantityButton: {
    borderWidth: 2,
    borderColor: "#6A0DAD",
    backgroundColor: "#f0e6f9",
    padding: 10,
    width: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
