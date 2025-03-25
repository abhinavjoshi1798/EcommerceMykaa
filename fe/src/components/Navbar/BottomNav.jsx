import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Links = ["Make up", "Skin", "Hair", "Bath & Body", "Natural"];

const links = [
  "Mom & Baby",
  "Health & Wellness",
  "Men",
  "Fragrance",
  "Pop Ups",
];

const NavLink = ({ children }) => {
  
  return (
    <Flex
      justifyContent="space-around"
      width={{ lg: "80%", "2xl": "80%", base: "100%", sm: "100%" }}
      margin="auto"
      textAlign={"center"}
      fontSize="14px"
      fontFamily={"Inter,sans-serif"}
      color="grey"
    >
      {children}
    </Flex>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <Box paddingY="3" shadow={"lg"}>
      <Flex
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          "2xl": "row",
        }}
        width="75%"
        margin={"auto"}
      >
        <NavLink>
          {Links.map((link) => (
            <Link
              key={link}
              to={
                "/allproducts"
              }
            >
              <Flex
                key={link}
                _hover={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#fb94bc",
                }}
                m={2}
              >
                {link}
              </Flex>
            </Link>
          ))}
        </NavLink>
        <NavLink>
          {links.map((link) => (
            <Flex
              key={link}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#fb94bc",
              }}
              m={2}
              onClick={()=>navigate("/allproducts")}
            >
              {link}
            </Flex>
          ))}
        </NavLink>
      </Flex>
    </Box>
  );
};

export default BottomNav;
