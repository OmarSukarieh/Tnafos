import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  IconButton,
  HStack,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Divider,
  Text,
  Spacer,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";

import { BiUpload, BiChevronsUp } from "react-icons/bi";
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
// import { CustomTable } from "../../components";
import { AxiosInstance } from "api";
import { AiOutlineHome } from "react-icons/ai";
import { SecondaryButton } from "components";
import { Search2Icon } from "@chakra-ui/icons";
// import { PurchasesHome } from "./PuchasesHome";
import { NoData } from "../../components";

export const IncomingPurchases = () => {
  const [list, setList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [rowsNumber, setRowsNumber] = useState("10");

  const match = useRouteMatch();
  const history = useHistory();

  const purIncomingList = async () => {
    await AxiosInstance.get("/api/dashboard/purchase-request/incoming")
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  const searchHandler = () => {
    history.push(`/${searchInput}`);
  };

  useEffect(() => {
    purIncomingList();
  }, []);
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <Box w="full" overflowY="scroll" padding="10">
          <HStack justifyContent="space-between" paddingBottom="5">
            <Heading
              textColor="gray.600"
              fontSize="xx-large"
              fontWeight="lg"
              alignItems="baseline"
            >
              IncomingPurchases
            </Heading>
            <IconButton
              as={Button}
              colorScheme="yellow"
              size="lg"
              icon={<AiOutlineHome />}
              rounded="full"
              onClick={() => {
                // Redirect("/dashboard/purchase-request");
              }}
            />
          </HStack>

          {!list ? (
            <Center h="70vh" w="100%">
              <Spinner size="xl" color="#F8B916" />
            </Center>
          ) : list.length === 0 ? (
            <NoData component={"purchase-request"} />
          ) : (
            <Box className="rounded-3xl shadow-2xl relative bg-white" w="full">
              <Text
                py="3"
                px="3"
                // borderBottom="groove"
                borderWidth="2px"
                bg="#333333"
                width="100%"
                roundedTop="2xl"
                fontSize="lg"
                color="white"
              >
                List of incoming purchase requests
              </Text>

              <Flex w="full" height="45px" my="8" spacing="30px">
                <HStack pl="5">
                  <SecondaryButton
                    rounded="full"
                    width="100px"
                    height="40px"
                    variant="outline"
                    colorScheme="gray"
                    name="EXPORT"
                    fontSize="xs"
                    leftIcon={<BiUpload size="20px" />}
                  />

                  <Select
                    size="sm"
                    rounded="full"
                    height="40px"
                    width="120px"
                    onChange={(e) => {
                      const selectedOption = e.target.value;
                      setRowsNumber(selectedOption);
                    }}
                  >
                    {/* <Divider orientation="vertical" width="1px" /> */}
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </Select>
                </HStack>
                <Spacer />

                <Box mr="5" w="200px">
                  <InputGroup>
                    <InputLeftElement
                      children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="search"
                      focusBorderColor="#F8B916"
                      rounded="full"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeypress}
                    />
                  </InputGroup>
                </Box>
              </Flex>

              {/* <CustomTable PageHeadLine="Incoming-estimates" list={list} /> */}
            </Box>
          )}
        </Box>
      </Route>
      {/* <Route path={`${match.path}` - 1} component={PurchasesHome} /> */}
    </Switch>
  );
};