import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { Container } from "@chakra-ui/react";
import HomePage from "../components/HomePage/index";
import { useColorMode, Button } from "@chakra-ui/react"; 

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={"100%"} mx="auto" p={0}>
      <Navbar />
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
      <HomePage />
      <Footer />
    </Container>
  );
};

export default Home;
