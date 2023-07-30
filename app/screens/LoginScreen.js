import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("usercredentilas: ", user);
        setIsLoading(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Invalid credentials")
        console.log("Login Error:", error);
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
        }
        if (authUser) {
          navigation.navigate("Home");
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView style={{}}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
            Sign In to your account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="enter your email address"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontWeight: "500", fontSize: 17 }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="enter your password"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          />
        </View>
        <Pressable
          onPress={login}
          disabled={isLoading}
          style={{
            width: 200,
            backgroundColor: isLoading ? "gray" : "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {isLoading ? ( 
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
