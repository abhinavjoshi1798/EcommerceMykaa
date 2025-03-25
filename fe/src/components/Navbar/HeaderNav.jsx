import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { IoIosApps, IoMdGift } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const HeaderNav = () => {
  const navigate = useNavigate();

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const handelAdmindashboardButtonClick = () => {
    const previousUi = localStorage.getItem("renderUi");
    if (previousUi) {
      return navigate(`/admindashboard/${previousUi}`);
    }
    localStorage.setItem("renderUi", "products");
    navigate(`/admindashboard/products`);
  };

  return (
    <Flex
      backgroundColor={"#FC2779"}
      justifyContent="space-around"
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
        "2xl": "row",
      }}
      alignItems={"center"}
      display={{ base: "none", sm: "flex" }}
    >
      <Box>
        <Heading
          as={"p"}
          fontSize="sm"
          textAlign={{ sm: "center", base: "center" }}
          marginBottom="3"
          marginTop={2}
          color="#FFFFFF"
        >
          BEAUTY BONANZA Get Your Daily Dose Of Amazing Deals
        </Heading>
      </Box>
      <Flex
        flexWrap="wrap"
        justifyContent={"space-around"}
        gap={5}
        marginTop={2}
        marginBottom="3"
        alignItems={"center"}
      >
        <Flex
          gap={1}
          _hover={{
            color: " #FFFFFF",
            cursor: "pointer",
          }}
          alignItems={"center"}
        >
          <IoIosApps size={20} />
          <Heading as={"p"} fontSize="sm" fontWeight={"normal"}>
            {" "}
            Get App
          </Heading>
        </Flex>

        <Flex
          gap={1}
          _hover={{
            color: " #FFFFFF",
            cursor: "pointer",
          }}
          alignItems={"center"}
        >
          {" "}
          <GrLocation size={20} />
          <Heading as={"p"} fontSize="sm" fontWeight={"normal"}>
            {" "}
            Store & Events
          </Heading>
        </Flex>

        <Flex
          gap={1}
          _hover={{
            color: " #FFFFFF",
            cursor: "pointer",
          }}
          alignItems={"center"}
        >
          <IoMdGift size={20} />
          <Heading as={"p"} fontSize="sm" fontWeight={"normal"}>
            {" "}
            Gift Card
          </Heading>
        </Flex>
         {
              user.role === "admin"? ( <Flex
                gap={1}
                _hover={{
                  color: " #FFFFFF",
                  cursor: "pointer",
                }}
                alignItems={"center"}
                onClick={handelAdmindashboardButtonClick}
              >
                {" "}
                <MdAdminPanelSettings size={20} />
                Admin
              </Flex>):""
         }
       
      </Flex>
    </Flex>
  );
};

export default HeaderNav;
