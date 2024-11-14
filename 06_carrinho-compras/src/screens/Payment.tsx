import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type PaymentProps = NativeStackScreenProps<RootStackParamList, "Payment">;

const Payment = ({ navigation }: PaymentProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cepError, setCepError] = useState("");

  const [isAddressAutoFilled, setIsAddressAutoFilled] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (cardNumber.length !== 16) {
      setCardNumberError("O número do cartão deve ter 16 dígitos.");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setExpiryDateError("A data deve estar no formato MM/AA.");
      isValid = false;
    } else {
      setExpiryDateError("");
    }

    if (cvv.length !== 3) {
      setCvvError("O CVV deve ter 3 dígitos.");
      isValid = false;
    } else {
      setCvvError("");
    }

    return isValid;
  };

  const generateOrderId = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  const handleOrder = () => {
    if (validateInputs()) {
      const orderId = generateOrderId();
      navigation.navigate("OrderStatus", {
        orderId,
        date: new Date().toLocaleDateString("pt-BR"),
        deliveryAddress: `${address}, ${houseNumber}, ${city} - ${state}`,
        paymentMethod: "Cartão de Crédito",
        cardNumber,
        expiryDate,
        cep,
      });
    }
  };

  const handleCardNumberChange = (text: string) => {
    const formattedText = text.replace(/\D/g, "").slice(0, 16);
    setCardNumber(formattedText);
    if (formattedText.length === 16) setCardNumberError("");
  };

  const handleExpiryDateChange = (text: string) => {
    let formattedText = text.replace(/\D/g, "").slice(0, 4);
    if (formattedText.length >= 3) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    }
    setExpiryDate(formattedText);
    if (/^\d{2}\/\d{2}$/.test(formattedText)) setExpiryDateError("");
  };

  const handleCvvChange = (text: string) => {
    const formattedText = text.replace(/\D/g, "").slice(0, 3);
    setCvv(formattedText);
    if (formattedText.length === 3) setCvvError("");
  };

  const handleCepChange = async (text: string) => {
    const formattedCep = text.replace(/\D/g, "").slice(0, 8);
    setCep(formattedCep);

    if (formattedCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
        if (response.data.erro) {
          setCepError("CEP não encontrado.");
          setIsAddressAutoFilled(false);
        } else {
          setAddress(response.data.logradouro);
          setCity(response.data.localidade);
          setState(response.data.uf);
          setIsAddressAutoFilled(true);
          setCepError("");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar o endereço.");
        setCepError("Erro ao buscar o CEP.");
        setIsAddressAutoFilled(false);
      }
    } else {
      setCepError("O CEP deve ter 8 dígitos.");
      setIsAddressAutoFilled(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Endereço de entrega</Text>
        <TextInput
          placeholder="CEP"
          style={styles.input}
          keyboardType="numeric"
          value={cep}
          onChangeText={handleCepChange}
        />
        {cepError ? <Text style={styles.errorText}>{cepError}</Text> : null}

        {isAddressAutoFilled ? (
          <>
            <TextInput
              placeholder="Número da casa"
              style={styles.input}
              value={houseNumber}
              onChangeText={setHouseNumber}
            />
            <Text style={styles.autoFilledText}>
              {address}, {city} - {state}
            </Text>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Endereço"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.row}>
              <TextInput
                placeholder="Cidade"
                style={[styles.input, styles.halfInput]}
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                placeholder="Estado"
                style={[styles.input, styles.halfInput]}
                value={state}
                onChangeText={setState}
              />
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Dados de pagamento</Text>
        <TextInput
          placeholder="Número do cartão"
          style={styles.input}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
        />
        {cardNumberError ? <Text style={styles.errorText}>{cardNumberError}</Text> : null}

        <View style={styles.row}>
          <TextInput
            placeholder="Data de validade (MM/AA)"
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
          />
          {expiryDateError ? <Text style={styles.errorText}>{expiryDateError}</Text> : null}
          <TextInput
            placeholder="CVV"
            style={[styles.input, styles.halfInput]}
            keyboardType="numeric"
            value={cvv}
            onChangeText={handleCvvChange}
          />
          {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Finalizar pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  autoFilledText: {
    fontSize: 16,
    color: "#6A0DAD",
    marginVertical: 8,
    textAlign: "center",
  },
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
    width: "100%",
  },
  halfInput: {
    width: "48%",
  },
  orderButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -8,
    marginBottom: 8,
  },
});
