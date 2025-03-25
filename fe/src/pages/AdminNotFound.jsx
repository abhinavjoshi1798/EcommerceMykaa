import React from 'react'
import { Heading, Box } from '@chakra-ui/react'

const AdminNotFound = () => {
  return (
    <Box width={"100%"}
    height={"100vh"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}>
      <Heading as={"h1"} size="lg">Only Admins are Allowed on Admin Pages</Heading>
    </Box>
  )
}

export default AdminNotFound
