import { HStack, VStack, Button, Input, Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createService } from "../../../../utils";

export const AddService = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    category_id: "",
    type: "",
    price: "",
  });
  const history = useHistory();
  // const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    const response = await createService(input);
    if (response.success) {
      history.push("/dashboard/service");
    } else {
      // setErrors(response.errors);
    }
  };

  const handleCancel = () => {
    history.push("/dashboard/service");
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      w="xl"
      px="20"
      pt="5"
      h="lg"
    >
      <Box>
        <Heading
          color="black"
          fontWeight="medium"
          fontSize="x-large"
          fontFamily="inhirit"
          alignItems="baseline"
          m={4}
        >
          New Service
        </Heading>
      </Box>
      <form onSubmit={(ev) => handleAddService(ev)}>
        <label className="ml-3 font-normal text-gray-600 text-lg">
          name:
          <Input
            size="sm"
            borderRadius="lg"
            onChange={(ev) => handleChange(ev)}
            name="name"
            value={input.name}
            m={2}
          />
        </label>

        <label className="ml-3 font-normal text-gray-600 text-lg">
          description :
          <Input
            size="sm"
            borderRadius="lg"
            onChange={(ev) => handleChange(ev)}
            name="description"
            value={input.description}
            m={2}
          />
        </label>

        <label className="ml-3 font-normal text-gray-600 text-lg">
          category_id :
          <Input
            size="sm"
            borderRadius="lg"
            onChange={(ev) => handleChange(ev)}
            name="category_id"
            value={input.category_id}
            m={2}
          />
        </label>

        <label className="ml-3 font-normal text-gray-600 text-lg">
          price :
          <Input
            size="sm"
            borderRadius="lg"
            onChange={(ev) => handleChange(ev)}
            name="price"
            value={input.price}
            m={2}
          />
        </label>

        <label className="ml-3 font-normal text-gray-600 text-lg">
          type :
          <Input
            size="sm"
            borderRadius="lg"
            onChange={(ev) => handleChange(ev)}
            name="type"
            value={input.type}
            m={2}
          />
        </label>
        <HStack m={3} className="flex flex-row gap-2" ml={"24"}>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={(ev) => handleAddService(ev)}
          >
            ADD SERVICE
          </Button>
          <Button colorScheme="blackAlpha" size="sm" onClick={handleCancel}>
            CANCEL
          </Button>
        </HStack>
      </form>
    </Box>
  );
};