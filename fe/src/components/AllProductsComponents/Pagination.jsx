import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  useColorModeValue,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalButtons = new Array(Math.ceil(total / 10))
    .fill(0)
    .map((_, i) => i + 1);
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = React.useState(initialPage);
  const handleClick = (i) => {
    setPage(page + i);
  };

  React.useEffect(() => {
    searchParams.set("page", page);
    setSearchParams(searchParams, "pushIn");
  }, [page]);

  return (
    <Flex
      alignItems="center"
      justify="space-between"
      w={{ base: "100%", md: "100%" }}
      mb="10"
	  direction={{base:"column",sm:"column",md:"column",lg:"column",xl:"row"}}
    >
      <Text px="2" m={4} fontSize="sm" fontWeight="bold">
        Page {page} of {totalButtons.length}
      </Text>
      <ButtonGroup spacing="6">
        <Button
          boxShadow={"md"}
          w="20px"
          backgroundColor={"#f4b1b1"}
          color="black"
          _hover={{ backgroundColor: "#fc8181" }}
          // colorScheme={useColorModeValue("red", "red")}
          isDisabled={page === 1}
          onClick={() => handleClick(-1)}
          rounded="full"
        >
          <ChevronLeftIcon boxSize={6} />
        </Button>
        {totalButtons.map((i) => (
          <Button
            display={{ base: "none", md: "inline-flex" }}
            p="2"
            rounded="full"
            bg={page === i ? "#f4b1b1" : "gray.300"}
            onClick={() => setPage(i)}
            color="black"
            _hover={{ backgroundColor: "#fc8181" }}
            key={i}
          >
            {i}
          </Button>
        ))}
        <Button
          rounded="100%"
          // colorScheme={useColorModeValue("red", "red")}
          backgroundColor={"#f4b1b1"}
          color="black"
          _hover={{ backgroundColor: "#fc8181" }}
          w="20px"
          isDisabled={page == totalButtons.length}
          onClick={() => handleClick(1)}
        >
          <ChevronRightIcon boxSize={6} />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default memo(Pagination);
