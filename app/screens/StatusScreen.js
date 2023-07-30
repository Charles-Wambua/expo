import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";

const StatusScreen = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.node}>
          <Text style={styles.nodeText}>Applied</Text>
          <View style={styles.line} />
          <View style={styles.node}>
            <Text style={styles.nodeText}>Received</Text>
            <View style={styles.line} />
            <View style={styles.node}>
              <Text style={styles.nodeText}>Previewed</Text>
              <View style={styles.line} />
              <View style={styles.node}>
                <Text style={styles.nodeText}>Approved</Text>
                <View style={styles.line} />
                <View style={styles.node}>
                  <Text style={styles.nodeText}>Disbursed</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  node: {
    flexDirection: "column",
    alignItems: "center",
  },
  nodeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: "#007bff",
  },
});

export default StatusScreen;
