import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Center, Spinner, VStack, Stack, Text } from "@chakra-ui/react";
import { NoData } from "../../components";

import { AxiosInstance } from "../../../../api";

const PaymentMedia = () => {
  const [media, setMedia] = useState(null);

  const history = useHistory();

  const { uuid } = useParams();

  const getPaymentMedia = async () => {
    try {
      const res = await AxiosInstance.get(
        `/api/dashboard/payment/${uuid}/media`
      );
      console.log(res.data.data);
      setMedia(res.data.data);
    } catch (err) {
      console.log(err.response.data);
      history.push("/dashboard/paymenthome");
    }
  };

  useEffect(() => {
    getPaymentMedia();
  }, []);

  return !media ? (
    <Center h="70vh" w="100%">
      <Spinner size="xl" color="#F8B916" />
    </Center>
  ) : media.length === 0 ? (
    <NoData component={"payment"} />
  ) : (
    <Center py="5">
      <Box
        className="rounded-3xl relative bg-white shadow-2xl"
        w="350px"
        h="200px"
      >
        <VStack spacing="20px" mx="5%" mt="5">
          {media.map((el, idx) => (
            <Stack key={idx}>
              <Text py="1" textColor="gray.600">
                {el}
              </Text>
            </Stack>
          ))}
        </VStack>
      </Box>
    </Center>
  );
};

export default PaymentMedia;
