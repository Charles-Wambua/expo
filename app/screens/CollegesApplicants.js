import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Modal, ActivityIndicator } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";

const CollegesApplicants = () => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://ngcdf.onrender.com/students/get-all-applicants")
      .then((response) => {
        setApplicants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleAction = (applicantId, action) => {
    if (action === "approve") {
      axios
        .put(`https://ngcdf.onrender.com/form/approve-applicant/${applicantId}`)
        .then((response) => {
          if (response.status === 200) {
            // Update the approval status in the local state
            setApplicants((prevApplicants) =>
              prevApplicants.map((applicant) =>
                applicant._id === applicantId
                  ? { ...applicant, approved: true }
                  : applicant
              )
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false)
          console.error("Error approving applicant:", error);
        });
    }
  };

  const handleApplicantPress = (applicant) => {
    setSelectedApplicant(applicant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header />
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#003580" size={50} />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, padding: 20, backgroundColor: "#f0f0f0" }}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Universities/Colleges/Tvets Applicants
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {applicants.map((applicant) => (
              <Pressable
                key={applicant._id}
                style={styles.applicant}
                onPress={() => handleApplicantPress(applicant)}
                disabled={applicant.approved} // Disable the "Approve" button for already approved applicants
              >
                <Text style={styles.name}>{applicant.name}</Text>
                <Text style={styles.info}>
                  Gender: {applicant.gender} | Institution:{" "}
                  {applicant.institution}
                </Text>
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? "#d9d9d9" : "#007bff",
                      padding: 10,
                      borderRadius: 5,
                      opacity: applicant.approved ? 0.5 : 1, // Reduce opacity for already approved applicants
                    })}
                    onPress={() => handleAction(applicant._id, "approve")}
                    disabled={applicant.approved} // Disable the "Approve" button for already approved applicants
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        {applicant.approved ? "Approved" : "Approve"}
                      </Text>
                    )}
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? "#d9d9d9" : "#dc3545",
                      padding: 10,
                      borderRadius: 5,
                    })}
                    onPress={() => handleAction(applicant._id, "decline")}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Decline</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
          {/* The modal content */}
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedApplicant && (
                  <>
                    {/* Applicant details */}
                    <Text style={styles.modalTitle}>Applicant Details</Text>
                    <Text style={styles.modalInfo}>
                      Name: {selectedApplicant.name}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Gender: {selectedApplicant.gender}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Email: {selectedApplicant.email}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Phone: {selectedApplicant.mobileNumber}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Admission Registration No.: {selectedApplicant.admRegNo}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Application Date: {selectedApplicant.applicationDate}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Course Duration: {selectedApplicant.courseDuration} years
                    </Text>
                    <Text style={styles.modalInfo}>
                      Family Status: {selectedApplicant.familyStatus}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Father's Income: {selectedApplicant.fatherIncome}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Mother's Income: {selectedApplicant.motherIncome}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Institution: {selectedApplicant.institution}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Location: {selectedApplicant.location}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Mobile Number: {selectedApplicant.mobileNumber}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Semester: {selectedApplicant.semester}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Level: {selectedApplicant.studyLevel}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Mode: {selectedApplicant.studyMode}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Study Year: {selectedApplicant.studyYear}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Sub Location: {selectedApplicant.subLocation}
                    </Text>
                    <Text style={styles.modalInfo}>
                      Ward: {selectedApplicant.ward}
                    </Text>
                  </>
                )}

                {/* Close button */}
                <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </>
  );
};

const styles = {
  applicant: {
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
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedApplicantInfo: {
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
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    paddingRight: 20,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
  },
};

export default CollegesApplicants;
