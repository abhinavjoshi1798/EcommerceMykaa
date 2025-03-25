import { Box, Image, Text, HStack, Divider } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

export const SearchComp = ({ image, name, price, rating, reviewCount, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/allproduct/${id}`);
  };
  return (
    <HStack
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"

      backgroundColor={"#f3f3f3"}
      display={"flex"}
      justifyContent={"space-between"}
      p={1}
      borderRadius={"15px"}
      spacing={4}
      m={2}
      alignItems={"center"}
      onClick={handleClick}
      flexDirection={{base:"column",sm:"row"}}
    >
      <Box flex={1} p={1}>
        <Image
          src={image}
          width={"100px"}
          height={"90px"}
          borderRadius={"15px"}
          boxShadow={"lg"}
        />
      </Box>
      <Box flex={3} borderRadius={"15px"} p={1}>
        <HStack>
          <Text fontSize={"sm"} color={"gray.900"}>
            Name :{" "}
          </Text>
          <Text
            fontSize={"xs"}
            color={"gray.600"}
            overflow={"hidden"}
            maxWidth={"200px"}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {name}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.900"}>
            Price :{" "}
          </Text>
          <Text fontSize={"xs"} color={"gray.600"}>
            {price}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <HStack>
            <Text fontSize={"sm"} color={"gray.900"}>
              Rating :{" "}
            </Text>
            <Text fontSize={"xs"} color={"gray.600"}>
              {rating}
            </Text>
          </HStack>
          <Divider
            orientation="vertical"
            height={"12px"}
            border={"1px solid #2D3748"}
          />
          <HStack>
            <Text fontSize={"sm"} color={"gray.900"}>
              Reviews :{" "}
            </Text>
            <Text fontSize={"xs"} color={"gray.600"}>
              {reviewCount}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </HStack>
  );
};
