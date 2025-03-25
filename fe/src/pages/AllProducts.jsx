import { Box, Stack, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AllProductsCarousel from "../components/AllProductsComponents/AllProductsCarousel";
import SideBar from "../components/AllProductsComponents/SideBar";
import Products from "../components/AllProductsComponents/Products";
import Footer from "../components/Footer";

const AllProducts = () => {
  return (
    <>
      <Box bg={"#f3f3f3"}>
        <Navbar />
        <Box
          width={{ base: "95%", sm: "90%", md: "85%", lg: "80%" }}
          maxWidth={"1300px"}
          mx="auto"
          my={3}
        >
          <AllProductsCarousel />
          <Heading
            as="h1"
            fontSize={{ base: "12px", sm: "17px", md: "22", lg: "25" }}
            fontFamily={"Inter"}
            textAlign={"center"}
            my={3}
          >
            All Products
          </Heading>
          <Stack
            direction={{ base: "column", md: "column", lg: "row" }}
            width={"100%"}
            mx="auto"
            space={8}
            align={"flex-start"}
          >
            <Stack
              width={{ base: "100%", md: "90%", lg: "15rem" }}
              height={"full"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              margin={{ base: "0 auto", md: "0 2 0 0", lg: "0 2 0 0" }}
              pt="8"
            >
              <SideBar />
            </Stack>

            <Stack
              width={{ base: "100%", sm: "80%", md: "80%", lg: "75%" }}
              mx={"auto"}
            >
              <Products />
            </Stack>
          </Stack>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AllProducts;
