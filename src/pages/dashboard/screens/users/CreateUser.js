import {
  Heading,
  Box,
  Button,
  HStack,
  Checkbox,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AxiosInstance } from "../../../../utils";

export const CreateUser = () => {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
  });

  const history = useHistory();

  const [check, setCheck] = useState(false);
  // const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //* onSubmit function:
  const addUser = async (e, userData) => {
    e.preventDefault();
    await AxiosInstance.post("/api/dashboard/user/create", userData)
      .then((res) => {
        return {
          success: true,
          data: res.data.data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          errors: err.response.data.errors,
          message: err.response.data.message,
        };
      });
    history.push("/dashboard/user");
  };

  const handleCancel = () => {
    history.push("/dashboard/user");
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      w="2xl"
      px="15"
      pt="5"
      h="2xl"
    >
      <Box>
        <Heading
          color="yellow.500"
          fontWeight="medium"
          fontSize="x-large"
          fontFamily="inhirit"
          alignItems="baseline"
        >
          Add new User
        </Heading>
      </Box>
      <form on onSubmit={(ev) => addUser(ev)}>
        <label className="w-32 text-right">
          First Name :
          <Input
            size="sm"
            type="text"
            borderRadius="lg"
            type="text"
            name="first_name"
            required
            value={input.first_name}
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <label className="w-32 text-right">
          Last Name:
          <Input
            size="sm"
            type="text"
            borderRadius="lg"
            name="last_name"
            value={input.last_name}
            required
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <label className="w-32 text-right">
          Phone Number:
          <Input
            size="sm"
            type="text"
            borderRadius="lg"
            name="phone_number"
            value={input.phone_number}
            required
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <label className="w-32 text-right">
          Email:
          <Input
            size="sm"
            borderRadius="lg"
            type="email"
            name="email"
            value={input.email}
            required
            _autofill="off"
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <label className="w-32 text-right">
          Password:
          <Input
            size="sm"
            borderRadius="lg"
            type="password"
            name="password"
            value={input.password}
            required
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <label className="w-32 text-right">
          Confirm Password:
          <Input
            size="sm"
            borderRadius="lg"
            type="password"
            name="password_confirmation"
            value={input.password_confirmation}
            required
            _autofill="off"
            onChange={(ev) => handleChange(ev)}
          />
        </label>

        <Box className="flex flex-col items-center gap-2">
          <Heading fontSize="md" color="gray.500" fontWeight="normal">
            Terms and Conditions agreement
          </Heading>
          <Checkbox size="sm" colorScheme="blue">
            I agree to Tnafos
          </Checkbox>
          <HStack>
            <Link to="#" className="text-blue-700 hover:underline">
              <Text>terms of service</Text>
            </Link>{" "}
            <Text>and</Text>
            <Link className="text-blue-700 hover:underline">
              Privacy policy
            </Link>
          </HStack>
          <Box>
            <Heading fontSize="md" color="gray.500" fontWeight="normal">
              Decleration of Valid Information
            </Heading>
          </Box>
          <Checkbox>
            I confirm that the information given in this form is true, complete
            and accurate.
          </Checkbox>
          <HStack spacing="10px">
            <Button colorScheme="blue" size="sm">
              SAVE
            </Button>
            <Button colorScheme="blackAlpha" size="sm" onClick={handleCancel}>
              CANCEL
            </Button>
          </HStack>
        </Box>
      </form>
    </Box>
  );
};
