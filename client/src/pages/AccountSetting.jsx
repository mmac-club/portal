import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AccountSetting1 from "../components/AccountSetting";
import MembershipDetails from "../components/MembershipDetails";
import React, { useState, useEffect } from "react";
import UserManagementService from "../services/UserManagementService/UserManagement";
import { useAuth } from "../services/AuthService/AuthContext";

const AccountSetting = () => {
  const userManagementService = new UserManagementService();

  const { currentUser } = useAuth(); // Ensure that useAuth() is providing the currentUser
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to track validation errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(currentUser.uid);
        const response = await userManagementService.get_user_by_id(
          currentUser.uid
        );
        setUserData(response);
        setEditableData(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error, e.g., show an error message to the user
      }
    };
    fetchUserDetails();
  }, [currentUser]);

  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>Personal Information</Tab>
        <Tab>Membership Details</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AccountSetting1></AccountSetting1>
        </TabPanel>
        <TabPanel>
          <MembershipDetails></MembershipDetails>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AccountSetting;
