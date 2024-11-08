import { StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { handleLogin } = useContext(UserContext);

  const [email, setEmail] = useState("karn.yong@melivecode.com");
  const [password, setPassword] = useState("melivecode");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="Insira seu email"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Insira sua senha"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#333",
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#8B8878",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
