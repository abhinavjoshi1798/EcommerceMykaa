import React from 'react'
import notFoundImg from "../assets/NotFound.jpg"
import { Flex, Image } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Flex justifyContent={"center"}
    alignItems={"center"}
    minH={"100vh"}>
      <Image src={notFoundImg} alt={"Not Found Image"} width={"50%"}
      maxWidth={"500px"}
      height={"50%"}
      maxH={"500px"} />
    </Flex>
  )
}

export default NotFound
