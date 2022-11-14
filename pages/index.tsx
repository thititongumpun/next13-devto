import { useQuery, UseQueryResult } from "react-query";
import React, { FC } from "react";
import { fetchData } from "./api/devto";
import type { IDevtoResponse } from "./api/devto";
import {
  Box,
  Link,
  ListItem,
  Spinner,
  UnorderedList,
  Text,
  useToast,
  Heading,
  Flex,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ListItems from "../components/devto/listitem";

const IndexPage: FC = () => {
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<IDevtoResponse[], Error> = useQuery<
    IDevtoResponse[],
    Error
  >("devtodata", fetchData);

  const toast = useToast();

  if (isError)
    return (
      <>
        {toast({
          description: error?.message,
          position: "bottom",
        })}
      </>
    );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Box alignContent={"center"} alignItems={"center"}>
      <Heading as="h1" size="4xl">
        Dev.to <span style={{ color: "teal" }}>news</span>
      </Heading>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        width="100%"
        mt="12"
      >
        <Heading as="h1" size="xl">
          Top news
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Page
          </MenuButton>
          <MenuList>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
            <MenuItem>4</MenuItem>
            <MenuItem>5</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column" width="100%" mt="8">
        <ListItems items={data} />
      </Flex>
    </Box>
  );
};

export default IndexPage;
