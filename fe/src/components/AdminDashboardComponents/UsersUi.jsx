import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import {
  Box,
  Spinner,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const UsersUi = () => {
  const [usersData,setUsersData] = useState([])
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/usersdata`).then((res)=>res.json()).then(res=>{
      console.log(res)
      if(res.status===200){
        setUsersData(res.users);
        setLoading(false);
      }
      
    }).catch(err=>{
      setError(true);
      setLoading(false);
      console.log(err);
    })
  }

  useEffect(()=>{
 getData();
  },[])
  
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

  return (
    <Flex width={"100%"} fontFamily={"Inter"}>
     <TableContainer
     width={"100%"}
     backgroundColor={"white"}>
  <Table size='md'>
    <Thead>
      <Tr>
        <Th>Sr. No.</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Role</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        usersData.length>0 ? usersData?.map((el,index)=>(<Tr>
          <Td>{index+1}</Td>
          <Td>{el.name}</Td>
          <Td>{el.email}</Td>
          <Td>{el.role}</Td>
          <Td>{<Menu>
  <MenuButton as={Button}>{<CiEdit />}</MenuButton>
  <MenuList>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuList>
</Menu>}</Td>
        </Tr>)):""
      }
      
     
    </Tbody>
  </Table>
</TableContainer>
    </Flex>
  )
}

export default UsersUi
