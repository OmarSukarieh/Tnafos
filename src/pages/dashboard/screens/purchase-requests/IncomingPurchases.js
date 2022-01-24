import React, { useState, useEffect } from "react";
import { Box, Heading, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { CustomTable } from "../../components";
import { AxiosInstance } from "../../../../api";

const IncomingPurchases = () => {
  const [list, setList] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const history = useHistory();

  const purIncomingList = async () => {
    try {
      const res = await AxiosInstance.get(
        "/api/dashboard/purchase-request/incoming"
      );
      setList(res.data.data);
    } catch (err) {
      console.log(err.response.data);
      history.push("/dashboard/purchase-request");
    }
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
      </HStack>
      <CustomTable
        list={list}
        component={"purchase-request"}
        theHeading="List of incoming purchase requests"
        thData={["Transaction-ID", "Details", "Date", "Action"]}
        listData={["uuid", "details", "date"]}
      />
    </Box>
  );
};

export default IncomingPurchases;
