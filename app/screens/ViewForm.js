import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';

// import { Svg, Rect } from 'react-native-svg';


// import QRCode from 'qrcode.react';
import axios from "axios";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from 'expo-permissions';

export default function ViewForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const formId = await AsyncStorage.getItem("formId");
      const response = await axios.get(
        `http://192.168.0.10:3001/form/get/${formId}`
      );
      setFormData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handleDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
  
    try {
      if (status === 'granted') {
        const formId = await AsyncStorage.getItem('formId');
        const pdfUrl = `http://192.168.0.10:3001/form/get/${formId}/download`;
       
  
        const fileUri = FileSystem.documentDirectory + 'form.pdf';
        
        const downloadResumable = FileSystem.createDownloadResumable(pdfUrl, fileUri);
        
  
        const { uri } = await downloadResumable.downloadAsync();
        
  
        if (uri) {
          try {
            // ...
            const asset = await MediaLibrary.createAssetAsync(uri);
            console.log(asset)
            await MediaLibrary.saveToLibraryAsync(asset);
            console.log('Form downloaded successfully.');
          } catch (error) {
            console.error('Error creating asset:', error.error);
          }
          
        } else {
          console.log('Error downloading form: Invalid file URI.');
        }
      } else {
        // Handle the case where permission is not granted
        console.log('Permission not granted for media library access');
      }
    } catch (error) {
      console.error('Error downloading form:', error);
    }
  };
  
 
  
  
  const handlePrint = async () => {
    if (loading) {
      console.log("Form data is still loading. Please wait.");
      return;
      
    }
    try {
      
      const htmlContent = `
  <html>
    <head>
      <style>
        h1 {
          color: #333333;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
          
        }
        .footer {
          display: flex;
          justify-content: space-between;
          flexDirection: column;
        }
        .footeroption {
          text-align: center;


        }
        .footeroption h5 {
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        .footeroption h6 {
          font-size: 14px;
          color: #666666;
          margin-top: 5px;
        }
        p {
          border: 1px solid #000000;
          color: #666666;
          font-size: 16px;
          margin-bottom: 5px;
          padding: 3px;
          borderRadius: 5px;
        }
      </style>
    </head>
    <body>
      <h1>Machakos Town Constituency CDF Form</h1>
      <p>Name: ${formData.name}</p>
      <p>Gender: ${formData.gender}</p>
      <p>Adm Reg No: ${formData.admRegNo}</p>
      <p>Application Date: ${formData.applicationDate}</p>
      <p>Course Duration: ${formData.courseDuration}</p>
      <p>Email: ${formData.email}</p>
      <p>Family Status: ${formData.familyStatus}</p>
      <p>Father's Income: ${formData.fatherIncome}</p>
      <p>ID: ${formData.id}</p>
      <p>Institution: ${formData.institution}</p>
      <p>Mobile Number: ${formData.mobileNumber}</p>
      <p>Mother's Income: ${formData.motherIncome}</p>
      <p>Semester: ${formData.semester}</p>
      <p>Study Level: ${formData.studyLevel}</p>
      <p>Study Mode: ${formData.studyMode}</p>
      <p>Study Year: ${formData.studyYear}</p>
      <p>Sub Location: ${formData.subLocation}</p>
      <p>Ward: ${formData.ward}</p>
      <h5> Note: This application form shall be submitted in person during the
      students meeting. One will be required to sign and produce a copy of
      national id and school id, failure to which will lead to automatic
      disqualification.</h5>
      <div class="footer">
      <div class="footeroption"><h5>STAMP.........</h5><br/> <h6>CHIEF of the applicants location</h6> </div>
      <div class="footeroption"><h5>SIGN.........</h5> <br/> <h6>bursury applicant sign</h6> </div>
      </div>
    </body>
  </html>
`;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Error printing form:", error);
    }
  };

  return (
    <ScrollView>
       <View  style={styles.qrcode}>
        <QRCode
         
            value={JSON.stringify(formData)}
            size={200}
            color="black"
            backgroundColor="white"
        />
        </View>
    <View style={styles.container}>
      <Text style={styles.heading}>
        Machakos Town Constituency Bursary Form
        </Text>
     
       
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Name:</Text>
        <Text style={styles.fieldValue}>{formData.name}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Gender:</Text>
        <Text style={styles.fieldValue}>{formData.gender}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Admission Registration Number:</Text>
        <Text style={styles.fieldValue}>{formData.admRegNo}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Application Date:</Text>
        <Text style={styles.fieldValue}>{formData.applicationDate}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Course Duration:</Text>
        <Text style={styles.fieldValue}>{formData.courseDuration}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Email:</Text>
        <Text style={styles.fieldValue}>{formData.email}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Family Status:</Text>
        <Text style={styles.fieldValue}>{formData.familyStatus}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Father's Income:</Text>
        <Text style={styles.fieldValue}>{formData.fatherIncome}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Institution:</Text>
        <Text style={styles.fieldValue}>{formData.institution}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Mobile Number:</Text>
        <Text style={styles.fieldValue}>{formData.mobileNumber}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Mother's Income:</Text>
        <Text style={styles.fieldValue}>{formData.motherIncome}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Semester:</Text>
        <Text style={styles.fieldValue}>{formData.semester}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Study Level:</Text>
        <Text style={styles.fieldValue}>{formData.studyLevel}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Study Mode:</Text>
        <Text style={styles.fieldValue}>{formData.studyMode}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Study Year:</Text>
        <Text style={styles.fieldValue}>{formData.studyYear}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Sublocation:</Text>
        <Text style={styles.fieldValue}>{formData.subLocation}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldName}>Ward:</Text>
        <Text style={styles.fieldValue}>{formData.ward}</Text>
        </View>
      
        

      <View style={styles.buttonContainer}>
        <Button title="Download Form" onPress={handleDownload} />
        <Button title="Print Form" onPress={handlePrint} />
      </View>

      <View style={styles.stampPlaceContainer}>
        <Text style={styles.stampPlaceLabel}>Stamp</Text>
        {/* Add stamp place component here */}
      </View>

      <View style={styles.signingPlaceContainer}>
        <Text style={styles.signingPlaceLabel}>Sign</Text>
        {/* Add signing place component here */}
      </View>
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 70,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrcode: {
    marginTop: 70,
    padding: 20,
    justifyContent: 'center',
    alignItems:'center',
    
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000000",
    
    flexDirection: "row",
    alignItems: "center",
  },
  fieldName: {
    fontWeight: "bold",
    margin:10,
  },
  fieldValue: {
    textAlign:"justify",
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  stampPlaceContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'tomato'
  },
  stampPlaceLabel: {
    fontWeight: "bold",
  },
  signingPlaceContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: 'dodgerblue'
  },
  signingPlaceLabel: {
    fontWeight: "bold",
  },
});
