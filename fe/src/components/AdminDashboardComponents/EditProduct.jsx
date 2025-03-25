import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";

import {
  Box,
  Spinner,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";


const EditProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    brand_name: "",
    media: [
      { type: "image", url: "" },
      { type: "image", url: "" },
      { type: "image", url: "" },
      { type: "image", url: "" },
    ],
  });
  const { isAuth, logout, user, token } = useContext(AuthContext);

  const getProductData = async () => {
    setLoading(true);
    // console.log("inside getProductsData");
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
        console.log(res);
        setProduct(res.product);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        // console.log(err);
      });
  };

  const handleEditSubmit = async () => {
    // console.log(product);
    const data = {
        product:product
    }
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/editproduct/${id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        console.log(res);
        setProduct(res.updatedProduct);
        
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });

  }

  useEffect(() => {
    document.title = "Admin Dashboard Edit Product";
    console.log("inside use effect");
    if (isAuth) {
      console.log("inside if");
      getProductData();
    }
  }, [isAuth]);

  if(loading){
    return (<Box
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
      </Box>)
  }

  if(error){
    return ( <Flex justifyContent={"center"} alignItems={"center"}>
    <Image
      width={"200px"}
      display={"flex"}
      margin={"100px auto"}
      src={
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGMyanI4bjIzZ3Zib2MxYTZoZTludndqdDZud2d6NDg2Y3dwcXZocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.gif"
      }
      alt={"Error Image"}
    />
  </Flex>)
  }

  return ( <Flex align={"center"} justify={"center"} bg={"gray.50"} >
        <Stack spacing={8} mx={"auto"} maxW={"xl"} width={"70%"} py={12} px={6} >
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}
            fontFamily={"Inter"}>
              Edit Product Details
            </Heading>
          </Stack>
           <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}
           fontFamily={"Inter"}>
            <Stack spacing={4}>
              
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input type="text"
                    name = "name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="price">
                    <FormLabel>Price</FormLabel>
                    <Input 
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: parseFloat(e.target.value) })}  />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="quantity">
                    <FormLabel>Quantity</FormLabel>
                    <Input 
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                        setProduct({ ...product, quantity: parseFloat(e.target.value) })
                      } />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="brand_name">
                    <FormLabel>Brand Name</FormLabel>
                    <Input 
                    type="text"
                    name="brand_name"
                    value={product.brand_name}
                    onChange={(e) =>
                        setProduct({ ...product, brand_name: e.target.value })
                      } />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="img1">
                    <FormLabel>Image 1</FormLabel>
                    <Input 
                    type="text"
                    name="img1"
                    value={product.media[0].url}
                    onChange={(e) =>
                        setProduct({ ...product,  media: [
                            { type: "image", url: e.target.value },
                            product.media[1],
                            product.media[2],
                            product.media[3],
                          ], })
                      } />
                  </FormControl>
                  </Box>
                  <Box>
                  <FormControl id="img2">
                    <FormLabel>Image 2</FormLabel>
                    <Input 
                    type="text"
                    name="img2"
                    value={product.media[1].url}
                    onChange={(e) =>
                        setProduct({ ...product,  media: [
                            product.media[0],
                            { type: "image", url: e.target.value },
                           
                            product.media[2],
                            product.media[3],
                          ], })
                      } />
                  </FormControl>
                  </Box>
                  <Box>
                  <FormControl id="img3">
                    <FormLabel>Image 3</FormLabel>
                    <Input 
                    type="text"
                    name="img3"
                    value={product.media[2].url}
                    onChange={(e) =>
                        setProduct({ ...product,  media: [
                            product.media[0],
                           
                           
                            product.media[1],
                            { type: "image", url: e.target.value },
                            product.media[3],
                          ], })
                      } />
                  </FormControl>
                  </Box>
                  <Box>
                  <FormControl id="img4">
                    <FormLabel>Image 4</FormLabel>
                    <Input 
                    type="text"
                    name="img4"
                    value={product.media[3].url}
                    onChange={(e) =>
                        setProduct({ ...product,  media: [
                            product.media[0],
                           
                           
                            product.media[1],
                           
                            product.media[2],
                            { type: "image", url: e.target.value },
                          ], })
                      } />
                  </FormControl>
                </Box>
              
              
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleEditSubmit}
                >
                  Edit Product
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>);

};

export default EditProduct;
