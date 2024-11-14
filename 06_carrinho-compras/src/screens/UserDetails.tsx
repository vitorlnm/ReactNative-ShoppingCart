import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useUserContext } from "../contexts/UserContext";

const UserDetails = () => {
  const { userData, handleLogout } = useUserContext();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    margin: 20,
    shadowColor: "#6A0DAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#6A0DAD",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6A0DAD",
    marginBottom: 10,
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    color: "#6A0DAD",
    opacity: 0.7,
    marginBottom: 25,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
