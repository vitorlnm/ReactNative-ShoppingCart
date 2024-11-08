import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { useUserContext } from "../contexts/UserContext";

const UserDetails = () => {
  const { userData, handleLogout } = useUserContext();

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{
            uri: userData?.user.avatar,
          }}
        />
        <Text style={styles.name}>
          {userData?.user.fname ?? ""} {userData?.user.lname ?? ""}
        </Text>
        <Text style={styles.email}>{userData?.user.email ?? ""}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={handleLogout} title="Sair" color="#333" />
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",  // Fundo suave para destacar o cartão branco
  },
  container: {
    backgroundColor: "#fff",
    padding: 40,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 10,
  },
});
