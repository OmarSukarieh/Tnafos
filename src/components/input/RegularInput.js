import React, { Fragment } from "react";

import { HStack, Input as ChakraInput, Text, VStack } from "@chakra-ui/react";
import { control, Controller } from "react-hook-form";
import { Box } from "react-feather";

export const RegularInput = ({
  register,
  input,
  setInput,
  value,
  setValue,
  placeHolder,
  inputType,
  width,
  name,
  error,
  requiredMessage,
  ...rest
}) => {
  const handleChange = (event) => setValue(event.target.value);

  return !value && !setValue ? (
    <ChakraInput
      className="rounded-3xl select-none"
      borderRadius="25"
      focusBorderColor="#F8B916"
      borderColor={!error ? "#AEAEAE" : "#ff0000"}
      backgroundColor="#fff"
      paddingLeft={inputType === "tel" && "80px"}
      placeholder={placeHolder}
      id={name}
      width={!width ? "100%" : width}
      type={inputType}
      {...register}
      {...rest}
    />
  ) : (
    <ChakraInput
      className="rounded-3xl select-none"
      borderRadius="25"
      focusBorderColor="#F8B916"
      borderColor={!error ? "#AEAEAE" : "red"}
      backgroundColor="#fff"
      paddingLeft={inputType === "tel" && "80px"}
      placeholder={placeHolder}
      id={name}
      width={!width ? "100%" : width}
      value={value}
      onChange={handleChange}
      type={inputType}
      autoComplete="off"
      autoFocus="off"
      {...rest}
    />
  );
};

export const RegularInputControl = ({
  control,
  name,
  placeHolder,
  register,

  inputType,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <VStack>
          <RegularInput
            placeholder={placeHolder}
            register={register(`${name}`, { required: true })}
            error={error || (errors && errors[name])}
            width={{ base: 150, sm: 250, md: 480, lg: 500 }}
            height={{ base: 4, sm: 6, md: 8, lg: 10 }}
            inputType={inputType}
          />
          {error?.message && <Text color="#ff0000">{error?.message}</Text>}
          {errors &&
            errors[name] &&
            errors[name].map((e, i) => (
              <Text color="#ff0000" key={i}>
                {e}
              </Text>
            ))}
        </VStack>
      )}
    />
  );
};
