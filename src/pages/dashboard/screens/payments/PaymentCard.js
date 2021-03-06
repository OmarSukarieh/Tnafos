import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  IconButton,
  Box,
  Text,
  Image,
  HStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
  Spinner,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  useHistory,
  useParams,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlinePermMedia } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import { AlertContext } from "../../../../context/AlertContext";
import { AxiosInstance, media } from "../../../../api";
import {
  RegularInputControl,
  SecondaryButton,
  PrimaryButton,
} from "../../../../components";

const PaymentCard = () => {
  const { alertProviderValue } = useContext(AlertContext);
  const { setAlert } = alertProviderValue;

  const history = useHistory();
  const match = useRouteMatch();

  const { uuid } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, control } = useForm();

  const [card, setCard] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [photo, setPhoto] = useState(null);
  // let inputRef = useRef(null);

  const resetHooksForm = (data) => {
    reset({
      // amount: data.amount,
      method: data.method,
      transaction_number: data.transaction_number,
      date: data.date,
      notes: data.notes,
      uuid: data.uuid,
    });
  };

  const getPayment = async () => {
    await AxiosInstance.get(`/api/dashboard/payment/${uuid}`)
      .then((res) => {
        console.log(res.data.data);
        resetHooksForm(res.data.data);
        setCard(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        history.push("/dashboard/payment");
      });
  };

  const updatePayment = async (data) => {
    setErrors(null);
    setIsUpdating(true);
    await AxiosInstance.put(`/api/dashboard/payment/${uuid}/update`, data)
      .then((res) => {
        console.log(res);
        setIsUpdating(false);
        setAlert({
          message: "Payment's info has been updated!",
          type: "info",
        });
        history.push(`/dashboard/payment`);
      })
      .catch((err) => {
        setIsUpdating(false);
        setErrors(err.response.data);
        setAlert({
          message: `${err.response.data.message}`,
          type: "error",
        });
      });
  };

  const onCancelHandler = () => {
    if (isUpdating) return;
    resetHooksForm(card);
    setErrors(null);
    onClose();
  };

  useEffect(() => {
    getPayment();
  }, []);

  //* media file upload:
  const uploadFile = (photo) => {
    if (!photo) return;
    media(uuid, "payment", photo);
  };

  return !card ? (
    <Center h="70vh" w="100%">
      <Spinner size="xl" color="#F8B916" />
    </Center>
  ) : (
    <>
      <Center py="5">
        <Box
          className="rounded-3xl relative bg-white shadow-2xl"
          w="400px"
          h="500px"
        >
          <Image
            src={"https://bit.ly/sage-adebayo"}
            alt="Segun Adebayo"
            objectFit="cover"
            roundedTop="3xl"
            w="100%"
            h="220px"
            layout={"fill"}
          />
          <VStack spacing="20px" mx="5%" mt="5">
            <Box mr="0">
              <Text py="1" textColor="gray.600">
                Amount: {card?.amount}
              </Text>
              <Text textColor="gray.600">Method: {card?.method}</Text>
              <Text textColor="gray.600">
                Transaction_Number: {card?.transaction_number}
              </Text>
              <Text textColor="gray.600">Date:{card?.date}</Text>
              <Text textColor="gray.600">Notes:{card?.notes}</Text>
              <Text textColor="gray.600">UUID:{card?.uuid}</Text>
            </Box>

            <Flex justify={"center"} w="full" gap="15px">
              <IconButton
                justify={"center"}
                fontSize={"lg"}
                rounded={"full"}
                bg={"#F8B916"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "orange.400",
                }}
                icon={<MdOutlinePermMedia />}
                onClick={() => {
                  history.push(`${match.url}/media`);
                }}
              />

              <IconButton
                justify={"center"}
                fontSize={"lg"}
                rounded={"full"}
                bg={"#F8B916"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "orange.400",
                }}
                icon={<FiEdit />}
                onClick={onOpen}
              />
            </Flex>
          </VStack>
        </Box>
      </Center>

      {/* updating user info. */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onCancelHandler}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="#F8B916">
            Edit your Info by filling up this form
          </DrawerHeader>

          <DrawerBody>
            <HStack
              align="flex-end"
              w="full"
              alignItems="baseline"
              mb="14"
              mt="5"
            >
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                name="choose file"
              />
              <Spacer />
              <SecondaryButton name="Upload File" onClick={uploadFile} />
            </HStack>
            <form>
              {/* <Box className="mt-4">
                <label className="w-32 text-left text-gray-500 ">
                  Amount :
                  <RegularInputControl
                    placeHolder="amount"
                    name="amount"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box> */}

              <Box className="mt-4">
                <label className="w-32 text-left text-gray-500 ">
                  Method:
                  <RegularInputControl
                    placeHolder="method"
                    name="method"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box>

              <Box className="mt-4">
                <label className="w-32 text-left text-gray-500">
                  Transaction - Number:
                  <RegularInputControl
                    placeHolder="Transaction - number"
                    name="transaction_number"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box>

              <Box className="mt-4">
                <label className="w-32 text-left text-gray-500">
                  Date:
                  <RegularInputControl
                    placeHolder="date"
                    name="date"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box>

              <Box className="mt-4">
                <label className="w-32 text-left text-gray-500">
                  Notes:
                  <RegularInputControl
                    placeHolder="notes"
                    name="notes"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box>

              <Box className="mt-4">
                <label className="w-32 text-left text-gray-500">
                  UUID:
                  <RegularInputControl
                    placeHolder="uuid"
                    name="uuid"
                    control={control}
                    register={register}
                    width="100%"
                    error={errors}
                  />
                </label>
              </Box>

              <Flex mt="5" w="full" ml="320px">
                <PrimaryButton
                  name="Update"
                  onClick={handleSubmit(updatePayment)}
                  loadingButton={isUpdating}
                  buttonType="submit"
                  mx="2"
                />

                <SecondaryButton
                  name="Cancel"
                  onClick={onCancelHandler}
                  buttonType="button"
                />
              </Flex>
              {errors?.message && (
                <Text className="text-center mt-4" color="red">
                  {errors?.message}
                </Text>
              )}
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PaymentCard;
