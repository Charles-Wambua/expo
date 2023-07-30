import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          textAlign: "center",
          paddingTop: 70,
          backgroundColor: "#003580",
        }}
      >
        <View style={{flexDirection: 'row',justifyContent:"center", alignItems:"center"}}>
          <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
              marginRight: 5,
              marginLeft: 15,
            }}
            source={{
              uri: "https://ngcdf.go.ke/wp-content/uploads/2020/01/cropped-cdf-official-logo.png",
            }}
          />
          <Text
            style={{
              padding: 20,
              color: "white",
              fontSize: 22,
              fontWeight: "800",
            }}
          >
            Machakos Town Sub-County NGCDF
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#003580",
          height: 65,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "white",
            padding: 8,
            borderRadius: 25,
            borderWidth: 1,
          }}
        >
          <Entypo name="home" size={24} color="white" />
          <Text
            style={{
              marginLeft: 8,
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Status")}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="pending" size={24} color="white" />
          <Text
            style={{
              marginLeft: 8,
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Check Status
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Admin")}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="user" size={24} color="white" />
          <Text
            style={{
              marginLeft: 8,
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Admin
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
