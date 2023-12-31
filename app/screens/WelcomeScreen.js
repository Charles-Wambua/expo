import React, { useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "qrcode.react";


import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import Header from "../components/Header";
export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [institution, setInstitution] = useState("");
  const [admRegNo, setAdmRegNo] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [semester, setSemester] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [fatherIncome, setFatherIncome] = useState("");
  const [motherIncome, setMotherIncome] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [selectedmodeofstudy, setSelectedModeofStudy] = React.useState("");
  const [selectedFamilyStatus, setSelectedFamilyStatus] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const phoneInput = useRef < PhoneInput > (null);

  const handleFormSubmit = () => {
    if (validateForm()) {
      const formData = {
        name: name,
        gender: selectedGender,
        id: id,
        institution: institution,
        admRegNo: admRegNo,
        studyYear: studyYear,
        semester: semester,
        courseDuration: courseDuration,
        mobileNumber: mobileNumber,
        email: email,
        ward: selectedWard,
        location: selectedLocation,
        subLocation: selectedSubLocation,
        studyLevel: studyLevel,
        studyMode: selectedmodeofstudy,
        familyStatus: selectedFamilyStatus,
        fatherIncome: fatherIncome,
        motherIncome: motherIncome,
        applicationDate: applicationDate,
      };
      function generateFormId() {
        return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        );
      }
      setIsLoading(true);
      axios
        .post("https://ngcdf.onrender.com/form/post", formData)
        .then((response) => {
          console.log("Form submitted successfully");

          Alert.alert(
            "Form Submitted Successfuly, proceed to download your form"
          );
          setIsLoading(false);
          console.log(response.data);
          const formId = response.data.id;
          console.log("formid: ", formId);
          AsyncStorage.setItem("formId", formId);
          setName("");
          setSelectedGender("");
          setID("");
          setInstitution("");
          setAdmRegNo("");
          setStudyYear("");
          setSemester("");
          setCourseDuration("");
          setMobileNumber("");
          setEmail("");
          setSelectedWard("");
          setSelectedLocation("");
          setSelectedSubLocation;
          setStudyLevel("");
          setSelectedModeofStudy("");
          setSelectedFamilyStatus("");
          setFatherIncome("");
          setMotherIncome("");
          setApplicationDate("");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error submitting form:", error);
        });
    }
  };
  const modeofStudy = [
    { key: "1", value: "Regular" },
    { key: "2", value: "Part-time" },
    { key: "3", value: "Full-time" },
  ];
  const familyStatus = [
    { key: "1", value: "Both parents alive" },
    { key: "2", value: "One parent alive" },
    { key: "3", value: "Orphan" },
  ];

  const gender = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ];

  const wardLocations = {
    Kalama: {
      Kalama: ["Kiitini", "Kyangala", "Nziuni"],
      Kimutwa: ["Konza", "Kaathi"],
      Kyangala: ["Kinoni"],
    },
    "Kola/Muumandu": {
      Kola: ["Iiyuni", "Katanga"],
      Lumbwa: ["Muumandu"],
    },
    "Machakos Central": {
      "Machakos Township": [
        "Eastleigh",
        "Misakwani",
        "Mjini",
        "Upper Kiandani",
      ],
    },
    Mua: {
      "Katheka Kai": ["Katheka Kai"],
      Mikuyu: ["Katelembo", "Kitanga"],
      Mua: ["Kyaani", "Kyanda", "Mua"],
    },
    "Mumbuni North": {
      Mumbuni: ["Lower Kiandani", "Mung'ala", "Kasinga"],
    },
    "Mutituni/Ngelani": {
      Mutituni: ["Kivutini", "Mutituni", "Nzoweni"],
      Ngelani: ["Kamuthanga", "Ngelani", "Nduu"],
    },
    "Muvuti/Kiima Kimwe": {
      Muvuti: ["Muvuti", "Kivandini"],
      "Kiima Kimwe": ["Katoloni", "Kiima Kimwe", "Mwanyani", "Mbilini"],
    },
  };

  const ward = Object.keys(wardLocations);
  const location = selectedWard
    ? Object.keys(wardLocations[selectedWard] || {})
    : [];
  const subLocation =
    selectedLocation && wardLocations[selectedWard]
      ? wardLocations[selectedWard][selectedLocation] || []
      : [];

  const handleWardChange = (val) => {
    setSelectedWard(val);
    setSelectedLocation(null);
    setSelectedSubLocation(null);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(val);
    setSelectedSubLocation(null);
  };

  const handleSubLocationChange = (val) => {
    setSelectedSubLocation(val);
  };
  const validateForm = () => {
    if (
      name === "" ||
      gender === "" ||
      id === "" ||
      institution === "" ||
      admRegNo === "" ||
      studyYear === "" ||
      semester === "" ||
      courseDuration === "" ||
      mobileNumber === "" ||
      email === "" ||
      ward === "" ||
      // location === "" ||
      subLocation === "" ||
      studyLevel === "" ||
      // selectedmodeofstudy===""||
      familyStatus === "" ||
      fatherIncome === "" ||
      motherIncome === "" ||
      applicationDate === ""
    ) {
      Alert.alert("Error", "Please fill in all the required fields");
      return false;
    }
    return true;
  };
  
  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.heading}>
            BURSARY APPLICATION FORM MACHAKOS TOWN CONSTITUENCY
          </Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedGender(val)}
            data={gender}
            save="value"
            placeholder="Gender"
          />

          <TextInput
            style={styles.input}
            placeholder="ID / Birth No"
            value={id}
            onChangeText={setID}
          />
          <TextInput
            style={styles.input}
            placeholder="Institution"
            value={institution}
            onChangeText={setInstitution}
          />
          <TextInput
            style={styles.input}
            placeholder="Adm / Reg No"
            value={admRegNo}
            onChangeText={setAdmRegNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Year of Study"
            value={studyYear}
            onChangeText={setStudyYear}
          />
          <TextInput
            style={styles.input}
            placeholder="Semester"
            value={semester}
            onChangeText={setSemester}
          />
          <TextInput
            style={styles.input}
            placeholder="Course Duration"
            value={courseDuration}
            onChangeText={setCourseDuration}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <SelectList
            style={styles.inputt}
            setSelected={handleWardChange}
            data={ward}
            save="value"
            placeholder="Select Ward"
          />

          <SelectList
            style={styles.inputt}
            setSelected={handleLocationChange}
            data={location}
            save="value"
            placeholder="Select Location"
          />

          <SelectList
            style={styles.inputt}
            setSelected={handleSubLocationChange}
            data={subLocation}
            save="value"
            placeholder="Select Sub Location"
          />
          <TextInput
            style={styles.input}
            placeholder="Level of Study"
            value={studyLevel}
            onChangeText={setStudyLevel}
          />
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedModeofStudy(val)}
            data={modeofStudy}
            save="value"
            placeholder="Mode of study"
          />
          <SelectList
            style={styles.inputt}
            setSelected={(val) => setSelectedFamilyStatus(val)}
            data={familyStatus}
            save="value"
            placeholder="Family status"
          />
          <TextInput
            style={styles.input}
            placeholder="Father's Income"
            value={fatherIncome}
            onChangeText={setFatherIncome}
          />
          <TextInput
            style={styles.input}
            placeholder="Mother's Income"
            value={motherIncome}
            onChangeText={setMotherIncome}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Application DD/MM/YYYY"
            value={applicationDate}
            onChangeText={setApplicationDate}
          />

          <Pressable
            onPress={handleFormSubmit}
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
                Submit
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Note: This application form shall be submitted in person during the
            students meeting. One will be required to sign and produce a copy of
            national id and school id, failure to which will lead to automatic
            disqualification
          </Text>
          <View style={styles.signatureContainer}>
            <View style={styles.stampPlaceholder} />
            <View style={styles.signaturePlaceholder} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#CCCCCC",
    paddingTop: 70,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputt: {
    height: 40,
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#003580",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  heading: {
    fontSize: 24,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
  },
  noteContainer: {
    marginBottom: 20,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666666",
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stampPlaceholder: {
    width: 100,
    height: 50,
    backgroundColor: "#CCCCCC",
    marginBottom: 10,
  },
  signaturePlaceholder: {
    width: 150,
    height: 50,
    backgroundColor: "#CCCCCC",
    marginBottom: 10,
  },
});
