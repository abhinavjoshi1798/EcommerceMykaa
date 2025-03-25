import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartPageComponents/CartItem";
import { CartOrderSummary } from "../components/CartPageComponents/CartOrderSummary";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/deleteusercartitem/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res && res.isDeleted === true) {
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/usercartdata`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        setCartData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    document.title = "Cart Page";
    if (isAuth) {
      getData();
    }
  }, [isAuth]);

  const totalWithQuantity = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <>
      {loading ? (
        <>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner
              marginTop={"250px"}
              size={"xl"}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.400"
            />
          </Box>
        </>
      ) : error ? (
        <>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Image
              width={"200px"}
              display={"flex"}
              margin={"100px auto"}
              src={
                "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGMyanI4bjIzZ3Zib2MxYTZoZTludndqdDZud2d6NDg2Y3dwcXZocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.gif"
              }
              alt={"Error Image"}
            />
          </Flex>
        </>
      ) : (
        <>
          <Navbar />
          <Box
            maxW={{
              base: "3xl",
              lg: "7xl",
            }}
            mx="auto"
            px={{
              base: "4",
              md: "8",
              lg: "12",
            }}
            py={{
              base: "6",
              md: "8",
              lg: "12",
            }}
          >
            <Stack
              direction={{
                base: "column",
                lg: "row",
              }}
              align={{
                lg: "flex-start",
              }}
              spacing={{
                base: "8",
                md: "16",
              }}
            >
              <Stack
                spacing={{
                  base: "8",
                  md: "10",
                }}
                flex="2"
              >
                <Heading fontSize="2xl" fontWeight="extrabold" fontFamily={"Inter"}>
                  Shopping Cart ({cartData.length} items)
                </Heading>
                {!cartData.length && (
                  <Image src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" />
                )}
                <Stack spacing="6">
                  {cartData.map((item, idx) => (
                    <CartItem
                      key={idx}
                      {...item}
                      onClickDelete={() => handleDelete(item._id)}
                    />
                  ))}
                </Stack>
              </Stack>

              <Flex direction="column" align="center" flex="1">
                <CartOrderSummary total={totalWithQuantity} cart={cartData} />
                <HStack mt="6" fontWeight="semibold" fontFamily={"Inter"}>
                  <p>or</p>
                  <Link color={"blue.500"} to="/allproducts" fontFamily={"Inter"}>
                    Continue shopping
                  </Link>
                </HStack>
              </Flex>
            </Stack>
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};

export default CartPage;
