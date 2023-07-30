import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import Header from "../components/Header";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const ApprovedUni = () => {
  const [loading, setLoading] = useState(true);
  const [approvedApplicants, setApprovedApplicants] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState(null);

  useEffect(() => {
    fetchApprovedApplicants();
  }, []);

  const fetchApprovedApplicants = () => {
    fetch("https://ngcdf.onrender.com/students/approved-applicants")
      .then((response) => response.json())
      .then((data) => {
        setApprovedApplicants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching approved applicants:", error);
        setLoading(false);
      });
  };
  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #aaa;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .qrcode-imagee {
            width: 90px;
            height: 90px;
            padding-right: 10px;
            
            
          }
        </style>
      </head>
      <body>
      <img
      src="https://ngcdf.go.ke/wp-content/uploads/2020/01/cropped-cdf-official-logo.png"
     class="qrcode-imagee"
    />
        <h1>Approved Applicants</h1>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Adm/Reg Number</th>
            <th>Institution</th>
            <th>Program</th>
          </tr>
          ${approvedApplicants.map(
            (applicant, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${applicant.name}</td>
              <td>${applicant.admRegNo}</td>
              <td>${applicant.institution}</td>
              <td>${applicant.program}</td>
            </tr>
          `
          )}
        </table>
      </body>
    </html>
  `;

    const pdfFile = await Print.printToFileAsync({ html: htmlContent });
    if (pdfFile.uri) {
      Sharing.shareAsync(pdfFile.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share PDF",
      });
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Approved Applicants</Text>
        {loading ? (
          <ActivityIndicator color="#003580" size="large" />
        ) : (
          <FlatList
            data={approvedApplicants}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.applicantItem}>
                <Text style={styles.applicantName}>{item.name}</Text>
                <Text style={styles.applicantInfo}>
                  Adm/Reg Number: {item.admRegNo}
                </Text>
                <Text style={styles.applicantInfo}>
                  Institution: {item.institution}
                </Text>
              </View>
            )}
          />
        )}
        <Pressable style={styles.downloadButton} onPress={generatePDF}>
          <Text style={styles.downloadButtonText}>Download as PDF</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  applicantItem: {
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
  },
  applicantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  applicantInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ApprovedUni;
