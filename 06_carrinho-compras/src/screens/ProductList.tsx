import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProductDTO } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../types/types";

const ProductList = () => {
  const [data, setData] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchData = async () => {
    try {
      const response = await axios.get<ProductDTO[]>(
        "https://fakestoreapi.com/products"
      );
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A0DAD" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
        >
          <ProductCard item={item} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    color: "#6A0DAD",
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginVertical: 10,
    padding: 16,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    width: "90%",
    alignSelf: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#6A0DAD",
  },
  listContainer: {
    paddingVertical: 20,
  },
});
