import { ArrowUpIcon, ChatIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  Tag,
  TagLabel,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";
import type { IDevtoResponse } from "../../pages/api/devto";

type IDevtoProps = {
  items: IDevtoResponse[] | undefined;
};

const ListItems: FC<IDevtoProps> = ({ items }) => {
  console.log(items);
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        h="100%"
        gap="2px"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "primary",
            borderRadius: "24px",
          },
        }}
      >
        {items?.map((item) => (
          <GridItem
            key={item.id}
            h="150px"
            bg="primary"
            borderRadius="10"
            color="gray.200"
            display="flex"
            pl={{ base: "10px", sm: "25px", lg: "15px" }}
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Tag>{item.id}</Tag>
            </Box>
            <Text>{item.title}</Text>
            <Text>{item.url}</Text>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default ListItems;
