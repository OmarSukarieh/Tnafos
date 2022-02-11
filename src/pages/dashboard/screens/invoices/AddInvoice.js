import React, { useState } from "react";
import { Box, Heading, HStack, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { CustomAddForm } from "../../components";

import { SecondaryButton, PrimaryButton } from "../../../../components";
import { AxiosInstance } from "../../../../api";

const AddInvoice = () => {
  const [err, setErr] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const createInvoice = async (data) => {
    try {
      const res = await AxiosInstance.post(
        "/api/dashboard/invoice/create",
        data
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    history.push("/dashboard/invoicehome");
  };

  return (
    <Box overflowY="scroll" w="full" h="full">
      <Box
        px={{ base: 1, md: 2 }}
        mt={{ base: 4, md: 12 }}
        boxShadow="2xl"
        rounded="3xl"
        w={{ base: 230, sm: 340, md: 550, lg: 700 }}
        ml={{ base: 8, sm: 16, md: 16, lg: 32 }}
        bg="white"
      >
        <Heading
          color="#F8B916"
          fontSize={{ base: "large", md: "x-large", lg: "xx-large" }}
          fontWeight="normal"
          alignItems="baseline"
          pt={{ base: 4, sm: 8, md: 6, lg: 8 }}
          ml={{ base: 2, sm: 4, md: 4, lg: 6 }}
        >
          Fill in this form to add new invoice
        </Heading>

        <Center mx={{ base: "2%", md: "5%" }} mt="10px">
          <form>
            <CustomAddForm
              listForm={[
                {
                  head: "Subject",
                  placeHolder: "Enter Subject ",
                  name: "subject",
                  err: err,
                },
                {
                  head: " Status",
                  placeHolder: "Enter status ",
                  name: "status",
                  err: err,
                },
                {
                  head: "Enter Date  ",
                  placeHolder: "Enter date ",
                  name: "date",
                  err: err,
                },
                {
                  head: "Due - date ",
                  placeHolder: "Enter due_date",
                  name: "due_date",
                  err: err,
                },
                {
                  head: "Currency ",
                  placeHolder: "Enter currency",
                  name: "currency",
                  err: err,
                },
                {
                  head: "Customer_id ",
                  placeHolder: "Enter customer_id",
                  name: "customer_id",
                  err: err,
                },
                {
                  head: "Assigned_to ",
                  placeHolder: "assigned_to",
                  name: "assigned_to",
                  err: err,
                },
                {
                  head: " Discount_type ",
                  placeHolder: "Enter discount_type",
                  name: "discount_type",
                  err: err,
                },
                {
                  head: "Discount_amount ",
                  placeHolder: "discount_amount",
                  name: "discount_amount",
                  err: err,
                },
                {
                  head: "Subtotal ",
                  placeHolder: "Enter subtotal",
                  name: "subtotal",
                  err: err,
                },
                {
                  head: "Total ",
                  placeHolder: "total",
                  name: "total",
                  err: err,
                },
                {
                  head: "Vat-Id ",
                  placeHolder: "Enetr vat_id",
                  name: "vat_id",
                  err: err,
                },
                {
                  head: "Lines ",
                  placeHolder: "Enter lines",
                  name: "lines",
                  err: err,
                },
              ]}
              control={control}
              register={register}
            />

            <HStack spacing="5px" py="10" justify="center" mt="5px">
              <PrimaryButton
                name="SAVE"
                onClick={handleSubmit(createInvoice)}
                loadingButton={isUpdating}
                width={{ base: 20, sm: 20, md: 32, lg: 36 }}
                height={{ base: 6, sm: 8, md: 10 }}
                fontSize={{
                  base: "xx-small",
                  sm: "xx-small",
                  md: "sm",
                  lg: "md",
                }}
              />

              <SecondaryButton
                onClick={handleCancel}
                name="CANCEL"
                width={{ base: 20, sm: 20, md: 32, lg: 36 }}
                height={{ base: 6, sm: 8, md: 10 }}
                fontSize={{
                  base: "xx-small",
                  sm: "xx-small",
                  md: "sm",
                  lg: "md",
                }}
              />
            </HStack>
          </form>
        </Center>
      </Box>
    </Box>
  );
};

export default AddInvoice;
