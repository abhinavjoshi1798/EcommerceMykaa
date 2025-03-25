import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ProductCard from "./ProductCard";
import {
  Grid,
  Box,
  Spinner,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import "./CSS/ProductList.css";

const ProductsUi = () => {
  const [productsData, setProductsData] = useState([]);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isAuth, token } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Admin Dashboard Products";
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/getallproducts`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProductsData(data.products);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  };

  const handleDeleteRequest = async (id) => {
    setDeletingIds(prev => new Set(prev.add(id)));
    onOpen();
  };

  const handleCloseDelete = () => {
    setDeletingIds(new Set())
    onClose()
  }

  const confirmDelete = async (id) => {
    // Implement delete logic here, possibly involving an API call
    console.log("Deleting product", id);
    
    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
   
  
   await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/deleteproduct/${id}`,{
    method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
   }).then((res)=>res.json()).then(res=>{
    console.log(res);
    console.log(res.status);
    if(res.status === 200){
      onClose();
      fetchProducts();

    }
   
   }).catch(err=>{
    console.log(err);
   })
    
    
  };

  return (
    <>
      {loading ? (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
          <Spinner marginTop="250px" size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.400" />
        </Box>
      ) : error ? (
        <Flex justifyContent="center" alignItems="center">
          <Image width="200px" display="flex" margin="100px auto" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGMyanI4bjIzZ3Zib2MxYTZoZTludndqdDZud2d6NDg2Y3dwcXZocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.gif" alt="Error Image" />
        </Flex>
      ) : (
        <div>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={2}>
             {productsData && productsData.length >0 ?  productsData?.map(product => (
              <ProductCard key={product._id} product={product} onDelete={handleDeleteRequest} isDeleting={deletingIds.has(product._id)} />
            )):""}
          </Grid>

          <Modal isOpen={isOpen} onClose={handleCloseDelete}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontFamily="Inter">Delete Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Are you sure you want to delete this product permanently?</ModalBody>
              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={() => confirmDelete([...deletingIds][0])}>Delete</Button>
                <Button colorScheme='blue' mr={3} onClick={handleCloseDelete}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ProductsUi;

