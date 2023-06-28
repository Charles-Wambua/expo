import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FrontPage = () => {
  const navigation = useNavigation();
  const handleAdminButtonPress = () => {
    navigation.navigate("Admin");
  };

  const handleApplyButtonPress = () => {
    navigation.navigate("WelcomeScreen");
  };

  const handleDownloadButtonPress = () => {
    navigation.navigate("ViewForm");
  };

  const handlePrintButtonPress = () => {
    // Handle print button press
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Machakos Town Constituency CDF Bursaries</Text>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>
      <Text style={styles.p}>
        Please fill in the true information failure to which you will be
        disqualified.
      </Text>
      <Text style={styles.p}>
        After filling in the details, download the form which will be presented
        in person at the annual meeting day.
      </Text>
      <Text style={styles.p}>Machakos Town Constituency CDF Bursaries</Text>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdminButtonPress}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleApplyButtonPress}>
        <Text style={styles.buttonText}>Apply for Bursary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleDownloadButtonPress}
      >
        <Text style={styles.buttonText}>Form and Options</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePrintButtonPress}>
        <Text style={styles.buttonText}>Print Form</Text>
      </TouchableOpacity>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>
      <View style={styles.lineContainer}>
        <View style={[styles.line, { backgroundColor: "#008000" }]} />
        <View style={[styles.line, { backgroundColor: "#FF0000" }]} />
        <View style={[styles.line, { backgroundColor: "#FFFFFF" }]} />
        <View style={[styles.line, { backgroundColor: "#000000" }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    alignItems: "center",
    padding: 20,
    backgroundColor:"aliceblue"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "red",
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 20,

    marginBottom: 10,
  },

  line: {
    flex: 1,
    height: 5,
   
  },

  p: {
    fontSize: 20,
    fontWeight: "light",
    marginBottom: 20,
    color: "black",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FrontPage;
