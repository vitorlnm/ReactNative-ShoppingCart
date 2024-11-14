import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCartContext } from "../contexts/CartContext";
import { RootStackParamList } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";

const Cart = () => {
  const { cart, addProduct, removeProduct } = useCartContext();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Cart">>();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {cart.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Text style={styles.title}>{item.product.title}</Text>
            <Text style={styles.price}>R$ {item.product.price.toFixed(2)}</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => item.quantity > 1 && addProduct(item.product, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={item.quantity.toString()}
                keyboardType="numeric"
                editable={false}
              />
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => addProduct(item.product, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeProduct(item.product.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() =>
            navigation.navigate("Payment", { total: calculateTotal() })
          }
        >
          <Text style={styles.orderButtonText}>Fazer Pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#f8f9fc",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  cartItem: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    marginVertical: 12,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#6A0DAD",
    fontWeight: "600",
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#6A0DAD",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: 50,
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 4,
    backgroundColor: "#f5f5f5",
  },
  removeButton: {
    backgroundColor: "#ff1744",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 14,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  orderButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 16,
    borderRadius: 14,
    width: "90%",
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
