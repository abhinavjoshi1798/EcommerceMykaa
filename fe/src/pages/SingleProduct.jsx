import React, { useState, useContext, useEffect } from "react";
import {
  Spinner,
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Box,
  Button,
  ButtonGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Rating } from "../components/AllProductsComponents/ProductCard.tsx";
import Offers from "../components/SingleProductComponent/Offers.tsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

export default function SingleProduct() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [image, setImage] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  

  const [quantity, setQuantity] = React.useState(1);
  const { id } = useParams();

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const toast = useToast()

  const url = data?.media?.[0];

  const handleClick = (e) => {
    setImage(e.target.src);
    setShow(true);
  };

  const handleCart = async () => {
    console.log("inside handleCart");
    const cartItem = {
      ...data,
      buyerId: user._id,
      quantity: quantity,
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/addtocart/`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: cartItem }),
      });
  
      const responseData = await response.json();
      console.log(responseData); 
  
      // Use responseData to check for errors
      if(responseData.error && responseData.error.includes("E11000 duplicate key error collection")) {
        toast({
          title: 'This Product is already present in your cart.',
          description: "Product is already present in your cart. Go to the cart page to complete the order.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (response.status === 201) {
        // Assuming setShow2 and toast are correctly defined elsewhere
        setShow2(true);
        toast({
          title: 'Product Added to cart successfully.',
          description: "You have successfully added this product to your cart. Go to the cart page to complete the order.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const getProductData = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/getproducts/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        // console.log(res);
        setData(res.product);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        // console.log(err);
      });
  };

  useEffect(() => {
    document.title = "Product Details";
    if (isAuth) {
      getProductData();
    }
  }, [isAuth]);

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
          <Container
            maxW={"container.xl"}
            py={8}
            boxShadow={"xl"}
            bg={"#f3f3f3"}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Flex flexDirection="column" alignItems="center">
                <Image
                  w={{ base: "95%", md: "80%" }}
                  rounded={"md"}
                  alt={"feature image"}
                  src={
                    show
                      ? image
                      : url
                      ? url.url
                      : "https://media2.giphy.com/media/2uJ0EhZnMAMDe/giphy.gif"
                  }
                  objectFit={"cover"}
                  transition="all 0.5s cubic-bezier(.08,.52,.52,1)"
                />

                <Flex w="100%" justifyContent={"space-between"} mt="8">
                  {data?.media?.map((item, idx) => {
                    return (
                      (idx === 0 || idx === 3 || idx === 4 || idx === 5) && (
                        <Image
                          border={
                            image === item.url ? "2px solid orange" : "none"
                          }
                          cursor={"pointer"}
                          key={idx}
                          w="20%"
                          rounded={"md"}
                          alt={"feature image"}
                          src={
                            data
                              ? item.url
                              : "https://media2.giphy.com/media/2uJ0EhZnMAMDe/giphy.gif"
                          }
                          objectFit={"cover"}
                          boxShadow="0 0 10px 0 rgba(0,0,0,0.2)"
                          onClick={handleClick}
                        />
                      )
                    );
                  })}
                </Flex>
              </Flex>

              <Stack
                spacing={4}
                mt="14"
                borderRadius={"15px"}
                boxShadow={"lg"}
                h="auto"
                p="4"
                bg={"white"}
              >
                <Text
                  fontFamily={"Inter"}
                  textTransform={"uppercase"}
                  color={"blue.400"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={"blue.50"}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  {data.brand_name}
                </Text>
                <Heading
                  fontSize={{ base: "2xl", sm: "4xl", md: "3xl" }}
                  fontFamily={"Inter"}
                >
                  {data?.name}
                </Heading>
                <Text color={"gray.500"} fontSize={"lg"} fontFamily={"Inter"}>
                  {url ? data?.offers[0]?.description : "lorem"}
                </Text>
                <StatGroup flexDirection={"column"} fontFamily={"Inter"}>
                  <Stat>
                    <StatNumber fontSize={"4xl"}>£{data?.price}</StatNumber>
                    <Rating
                      rating={data?.rating}
                      numReviews={data?.rating_count}
                    />
                    <StatHelpText mt="4">
                      Package Size {data?.pack_size}
                    </StatHelpText>
                  </Stat>
                  <StatGroup flexDirection={"row"} w={"60%"} my="4">
                    <Stat>
                      <StatLabel>Popularity</StatLabel>
                      <StatNumber>
                        {data?.tracking_metadata?.popularity.toFixed(2)}%
                      </StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {data?.tracking_metadata?.es_score.toFixed(2) * 2}%
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Review</StatLabel>
                      <StatNumber>{data?.star_rating_percentage}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        {((data?.star_rating_percentage * 2) / 3).toFixed(2)}%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                </StatGroup>

                <Flex alignItems="center" justifyContent={"space-between"}>
                  <Box>
                    <ButtonGroup
                      size="md"
                      isAttached
                      display="flex"
                      alignItems="center"
                    >
                      <Button
                        isDisabled={quantity === 1 || show2}
                        colorScheme={"red"}
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        -
                      </Button>
                      <Text mx="3">{quantity}</Text>
                      <Button
                        isDisabled={show2}
                        colorScheme={"green"}
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Tooltip
                    fontFamily={"Inter"}
                    label={
                      !show2
                        ? "Click To Add Item in Cart"
                        : "Item Already Added in Cart"
                    }
                    bg="white"
                    placement={"top"}
                    color={"gray.800"}
                    fontSize={"1em"}
                  >
                    <Button
                      fontFamily={"Inter"}
                      colorScheme="green"
                      ml="4"
                      w="100%"
                      onClick={handleCart}
                      isDisabled={show2}
                    >
                      Add to Cart
                    </Button>
                  </Tooltip>
                </Flex>
              </Stack>
            </SimpleGrid>
          </Container>

         

          <Offers offers={data?.offers} />
          <Footer />
        </>
      )}
    </>
  );
}
