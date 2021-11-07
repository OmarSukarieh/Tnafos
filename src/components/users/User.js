import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import { showUsersList } from "../../utils";
import { UserCard, CreateUser, MyProfile, CardComponent } from "./";
import {
  Box,
  IconButton,
  VStack,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

export const User = () => {
  const [usersList, setUsersList] = useState([]);

  const match = useRouteMatch();
  const { uuid } = useParams();

  const USERS = async () => {
    const array = await showUsersList();
    setUsersList(array);
  };
  useEffect(() => {
    USERS();
  }, []);
  return (
    <>
      <Box width="100%">
        <HStack className="w-full h-3/4">
          <Box bg="" w="75%" p={4} color="black">
            Users
          </Box>
          <Link to={`${match.url}/createuser`}>
            <IconButton
              as={Button}
              colorScheme="yellow"
              size="lg"
              icon={<PlusSquareIcon />}
            ></IconButton>
          </Link>
        </HStack>
        <Box>
          {usersList.length === 0
            ? null
            : usersList.map((el, idx) => (
                <Link key={idx} to={`${match.url}/${el.uuid}`}>
                  <CardComponent userData={el} />
                </Link>
              ))}
        </Box>
      </Box>

      <Switch>
        <Route exact path={`${match.path}`} />
        <Route path={`${match.path}/createuser`} component={CreateUser} />
        <Route path={`${match.path}/profile`} component={MyProfile} />
        <Route path={`${match.path}/:uuid`} component={UserCard} />
      </Switch>
    </>
  );
};
