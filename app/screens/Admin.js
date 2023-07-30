import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Header from "../components/Header";
import QrCode from "../components/QrCode";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Admin() {
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://ngcdf.onrender.com/applicants/total_applicants")
      .then((response) => {
        setTotalApplicants(response.data.totalApplicants);
        console.log(totalApplicants);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <View style={styles.container}>
          <Text style={styles.mainText}>Loading...</Text>
        </View>
      ) : (
        <View
          style={{
            padding: 20,
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("CollegeApplicants")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 30,
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              University/Colleges Applicants
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                borderColor: "red",
                borderRadius: 15,
                backgroundColor: "gray",
                padding: 10,
                borderWidth: 2,
              }}
            >
              {totalApplicants}
            </Text>
          </Pressable>

          <View
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
                padding: 16,
                paddingBottom: 30,
              
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Number of HighSchool Applicants
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("QrCode")}
            style={{
              marginVertical: 20,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Scan Documents
            </Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate("ApprovedApplicants")}
            style={{
              marginVertical: 20,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Approved Applicants
            </Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flexDirection: "row", // Set flexDirection to "row"
    justifyContent: "flex-end", // Align items to the right end of the container
    padding: 20,
    fontSize: 17,
    fontWeight: "600",
  },
});
