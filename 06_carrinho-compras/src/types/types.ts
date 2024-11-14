import { ProductDTO } from "./Product"; // Ajuste o caminho para seu arquivo de tipos de produto

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: ProductDTO };
  Cart: undefined;
  Payment: { total: string };
  OrderStatus: undefined;
  UserInfo: undefined;
};
