import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
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
    return <Text style={styles.loadingText}>Carregando...</Text>;
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
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
});
