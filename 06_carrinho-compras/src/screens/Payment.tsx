import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type PaymentProps = NativeStackScreenProps<RootStackParamList, "Payment">;

const Payment = ({ navigation }: PaymentProps) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Endereço de entrega</Text>
        <TextInput placeholder="Endereço" style={styles.input} />
        <View style={styles.row}>
          <TextInput placeholder="Cidade" style={[styles.input, styles.halfInput]} />
          <TextInput placeholder="Estado" style={[styles.input, styles.halfInput]} />
        </View>

        <Text style={styles.sectionTitle}>Dados de pagamento</Text>
        <TextInput
          placeholder="Número do cartão"
          style={styles.input}
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <TextInput
            placeholder="Data de validade"
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="CVV"
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate("OrderStatus")}
        >
          <Text style={styles.orderButtonText}>Finalizar pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6A0DAD",
    marginVertical: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    color: "#333",
    fontSize: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#6A0DAD",
    width: "90%",
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  halfInput: {
    width: "48%",
  },
  orderButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
