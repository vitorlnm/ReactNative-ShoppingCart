import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { v4 as uuidv4 } from 'uuid';  

type OrderStatusProps = NativeStackScreenProps<RootStackParamList, "OrderStatus">;

const OrderStatus = ({ navigation, route }: OrderStatusProps) => {
  const { cardNumber, expiryDate, cep, address, totalAmount } = route.params || {};

  const generateOrderId = () => {
    return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const orderDetails = {
    orderId: generateOrderId(),
    date: "14/11/2024",
    deliveryAddress: address,
    paymentMethod: "Cartão de Crédito",
    totalAmount: totalAmount,
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require("../img/icon2.gif")} style={styles.icon} />
        <Text style={styles.title}>Obrigado pela sua compra!</Text>
        <Text style={styles.subtitle}>Seu pedido foi concluído com sucesso</Text>
        
        <View style={styles.receiptContainer}>
          <Text style={styles.sectionTitle}>Detalhes do Pedido</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ID do Pedido:</Text>
            <Text style={styles.value}>{orderDetails.orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data:</Text>
            <Text style={styles.value}>{orderDetails.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Endereço de Entrega:</Text>
            <Text style={styles.value}>{orderDetails.deliveryAddress}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Forma de Pagamento:</Text>
            <Text style={styles.value}>{orderDetails.paymentMethod}</Text>
          </View>
          

          <Text style={styles.sectionTitle}>Dados de Pagamento</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Número do Cartão:</Text>
            <Text style={styles.value}>{`**** **** **** ${cardNumber?.slice(-4)}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data de Validade:</Text>
            <Text style={styles.value}>{expiryDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CEP:</Text>
            <Text style={styles.value}>{cep}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonText}>Ir para a tela inicial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6A0DAD",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  receiptContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "400",
    textAlign: "right",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    width: 60,
  },
  itemPrice: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
    width: 80,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A0DAD",
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
