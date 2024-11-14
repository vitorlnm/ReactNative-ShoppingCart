import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type OrderStatusProps = NativeStackScreenProps<RootStackParamList, "OrderStatus">;

const OrderStatus = ({ navigation }: OrderStatusProps) => {
  return (
    <View style={styles.container}>
      <Image source={require("../img/icon2.gif")} style={styles.icon} />
      <Text style={styles.message}>Seu pedido foi realizado com sucesso!</Text>
      <Text style={styles.subMessage}>Aguarde as informações da entrega.</Text>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>Ir para a tela inicial</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A0DAD",
    textAlign: "center",
    marginVertical: 10,
  },
  subMessage: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  homeButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  homeButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
