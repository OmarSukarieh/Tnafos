import React, { useContext, useEffect } from "react";
import { useToast, Wrap, WrapItem, Button } from "@chakra-ui/react";
import { AlertContextProvider } from "context";

export const ToastComponent = ({ data }) => {
  const { alert, setAlert } = alertProvider;
  const { alertProvider } = useContext(AlertContextProvider);
  const toast = useToast();
  const statuses = ["success", "error", "info"];

  const showAlert = () => {
    switch (statuses) {
      case "success":
        setAlert(<ToastComponent />, { description: "Successfully created!" });
        break;
      case "error":
        setAlert(<ToastComponent />, { description: "Successfully deleted!" });
        break;
      case "info":
        setAlert(<ToastComponent />, { description: "Updated successfully!" });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    showAlert();
  }, [alert]);

  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${status} toast`,
                status: status,
                isClosable: true,
                duration: 4000,
                position: "bottom",
                description: data,
              })
            }
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};