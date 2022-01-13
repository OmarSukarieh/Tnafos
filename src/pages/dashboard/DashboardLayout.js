import React, { useState, useEffect, useContext } from "react";
import { Navbar, Sidebar } from "./components/index";
import {
  HStack,
  VStack,
  Center,
  Spinner,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
} from "@chakra-ui/react";
import {
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { AxiosInstance } from "../../api";

import { FiInbox } from "react-icons/fi";

import CompanyLayout from "./screens/company/CompanyLayout";
import InvoiceHome from "./screens/invoices/InvoiceHome";
// import Proposal from "./screens/proposals/Proposal"
import Ratings from "./screens/rating/Ratings";
import UserLayout from "./screens/users/UserLayout";
import { UserDataContext } from "../../context";
import ClientsHome from "./screens/clients/ClientsHome";
import PurchasesHome from "./screens/purchase-requests/PurchasesHome";
import PaymentHome from "./screens/payments/PaymentHome";
import EstimateHome from "./screens/estimates/EstimateHome";
import ServiceHome from "./screens/services/ServiceHome";
import SettingHome from "./screens/settings/SettingHome";
import Incoming from "./screens/invoices/Incoming";
import Outgoing from "./screens/invoices/Outgoing";
// import { PrivateRoute } from "./components/PrivateRoute";

const DashboardLayout = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { tokenProviderValue, dataProviderValue } = useContext(UserDataContext);
  const { userToken } = tokenProviderValue;
  const { userData, setUserData } = dataProviderValue;

  const [loading, setLoading] = useState(true);

  const colors = ["#F8B916", "#007BFF", "#AEAEAE", "#B00020"];

  //* set border color:
  const randomElement = colors[Math.floor(Math.random() * colors.length)];

  const fetchTokenMe = async (token) => {
    try {
      const res = await AxiosInstance.get("/api/dashboard/user/my-profile");
      setUserData(res.data.data);
      setLoading(false);
    } catch (error) {
      setUserData(error.response);
      setLoading(false);
    }
  };

  const removeForwardSlashFromUrl = () => {
    if (location.pathname === "/dashboard/") {
      history.push("/dashboard");
    }
  };

  useEffect(() => {
    if (userData) return;
    fetchTokenMe();
    removeForwardSlashFromUrl();
  }, []);

  return (
    <Switch>
      <Route exact path={match.path}>
        {!loading && userData ? (
          <HStack spacing={0}>
            <Sidebar />
            <VStack className="chakra-stack w-full h-screen overflow-scroll">
              <Navbar />
              {/* {body} */}
              <Box>
                <Grid templateColumns="repeat(4, 1fr)" gap={10} pt="20px">
                  <Box
                    mt="5"
                    w="240px"
                    h="70px"
                    rounded="xl"
                    boxShadow="2xl"
                    relative
                    bg={"white"}
                    borderLeftColor={randomElement}
                    borderLeftWidth="4px"
                  >
                    <HStack w="full">
                      <Stat px="5%" w="full">
                        <StatLabel py="1">Title</StatLabel>
                        <StatNumber fontSize="xl">number</StatNumber>
                      </Stat>
                      <Box pr="7%" fontSize="4xl" fontWeight="light" pt="2%">
                        <FiInbox color="#AEAEAE" />
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    mt="5"
                    w="240px"
                    h="70px"
                    rounded="xl"
                    boxShadow="2xl"
                    relative
                    bg={"white"}
                    borderLeftColor={randomElement}
                    borderLeftWidth="4px"
                  >
                    <HStack w="full">
                      <Stat px="5%" w="full">
                        <StatLabel py="1">Title</StatLabel>
                        <StatNumber fontSize="xl">number</StatNumber>
                      </Stat>
                      <Box pr="7%" fontSize="4xl" fontWeight="light" pt="2%">
                        <FiInbox color="#AEAEAE" />
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    mt="5"
                    w="240px"
                    h="70px"
                    rounded="xl"
                    boxShadow="2xl"
                    relative
                    bg={"white"}
                    borderLeftColor={randomElement}
                    borderLeftWidth="4px"
                  >
                    <HStack w="full">
                      <Stat px="5%" w="full">
                        <StatLabel py="1">Title</StatLabel>
                        <StatNumber fontSize="xl">number</StatNumber>
                      </Stat>
                      <Box pr="7%" fontSize="4xl" fontWeight="light" pt="2%">
                        <FiInbox color="#AEAEAE" />
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    mt="5"
                    w="240px"
                    h="70px"
                    rounded="xl"
                    boxShadow="2xl"
                    relative
                    bg={"white"}
                    borderLeftColor={randomElement}
                    borderLeftWidth="4px"
                  >
                    <HStack w="full">
                      <Stat px="5%" w="full">
                        <StatLabel py="1">Title</StatLabel>
                        <StatNumber fontSize="xl">number</StatNumber>
                      </Stat>
                      <Box pr="7%" fontSize="4xl" fontWeight="light" pt="2%">
                        <FiInbox color="#AEAEAE" />
                      </Box>
                    </HStack>
                  </Box>
                </Grid>
              </Box>
            </VStack>
          </HStack>
        ) : (
          <Center h="100vh" w="100%">
            <Spinner size="xl" color="#F8B916" />
          </Center>
        )}
      </Route>
      <Route path={`${match.path}/company`} component={CompanyLayout} />
      <Route path={`${match.path}/rating`} component={Ratings} />
      <Route path={`${match.path}/user`} component={UserLayout} />
      <Route path={`${match.path}/service`} component={ServiceHome} />
      <Route
        path={`${match.path}/purchase-request`}
        component={PurchasesHome}
      />
      <Route path={`${match.path}/payment`} component={PaymentHome} />
      <Route path={`${match.path}/invoice`} component={InvoiceHome} />
      <Route path={`${match.path}/invoice/incoming`} component={Incoming} />
      <Route path={`${match.path}/invoice/outgoing`} component={Outgoing} />
      <Route path={`${match.path}/estimate`} component={EstimateHome} />
      <Route path={`${match.path}/client`} component={ClientsHome} />
      <Route path={`${match.path}/settings`} component={SettingHome} />
    </Switch>
  );
};

export default DashboardLayout;
