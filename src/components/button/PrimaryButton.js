import React, { useRef, useEffect, useState } from "react";

import { Button } from "@chakra-ui/react";

export const PrimaryButton = ({ name, buttonType, ...buttonProps }) => {
  const [loading, setLoading] = useState(false);

  let ref = useRef(null);

  const handleClick = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      buttonProps.onClick && buttonProps.onClick();
      setLoading(!loading);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  });

  return (
    <Button
      className="info-box"
      ref={ref}
      isLoading={loading}
      loadingText="Loading"
      width="120px"
      height="40px"
      backgroundColor="#F8B916"
      _hover={{ bg: "#D59B06" }}
      borderRadius="30px"
      color="white"
      _focus={{
        outline: "none",
      }}
      type={buttonType ? buttonType : "button"}
      {...buttonProps}
    >
      {name}
    </Button>
  );
};
