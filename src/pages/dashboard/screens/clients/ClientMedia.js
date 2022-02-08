import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Center,
  Spinner,
  VStack,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";

import { NoData } from "../../components";

import { AxiosInstance } from "../../../../api";

const ClientMedia = () => {
  const [media, setMedia] = useState(null);

  const history = useHistory();
  const { uuid } = useParams();

  const getClientMedia = async () => {
    try {
      const res = await AxiosInstance.get(
        `/api/dashboard/customer/${uuid}/media`
      );
      console.log(res.data.data);
      setMedia(res.data.data);
    } catch (err) {
      console.log(err.response.data);
      history.push("/dashboard/client");
    }
  };

  useEffect(() => {
    getClientMedia();
  }, []);

  return !media ? (
    <Center h="70vh" w="100%">
      <Spinner size={{ base: "md", lg: "xl" }} color="#F8B916" />
    </Center>
  ) : media.length === 0 ? (
    <NoData component={"clientshome"} />
  ) : (
    <Center py="5">
      <Box
        my={{ base: 2, lg: 6 }}
        rounded="3xl"
        position="relative"
        bg="brand.white"
        shadow="2xl"
        w={{ base: 200, sm: 260, md: 300, lg: 350 }}
        h={{ base: 350, sm: 360, md: 380, lg: 380 }}
      >
        <Heading
          fontSize={{ base: "md", md: "xl", lg: "xx-large" }}
          ml="5%"
          mt="5%"
          textColor="brand.primary"
          fontWeight="semibold"
        >
          Client's Media:
        </Heading>
        <VStack spacing="20px" mx="5%" mt="5">
          {media.map((el, idx) => (
            <Stack
              key={idx}
              fontSize={{ base: "x-small", sm: "sm", md: "md", lg: "large" }}
            >
              <Text py="1" textColor="gray.600">
                {el}
              </Text>
            </Stack>
          ))}

          <Box fontSize={{ base: "x-small", sm: "sm", md: "md", lg: "large" }}>
            <Button
              justify={"center"}
              size={{
                base: "x-small",
                sm: "x-small",
                md: "md",
                lg: "large",
              }}
              rounded="full"
              h={{ base: 6, sm: 8, md: 10, lg: 12 }}
              w={{ base: 6, sm: 8, md: 10, lg: 12 }}
              bg={"#F8B916"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "orange.400",
              }}
              onClick={() => {
                history.push("/dashboard/client");
              }}
            >
              {" "}
              <AiOutlineHome
                fontSize={{
                  base: "xx-small",
                  sm: "small",
                  md: "md",
                  lg: "large",
                }}
              />
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default ClientMedia;
