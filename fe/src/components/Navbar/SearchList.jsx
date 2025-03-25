import React from 'react'
import {
  Box
} from "@chakra-ui/react";
import { SearchComp } from './SearchComp';

const SearchList = ({data,display}) => {
  return (
    <div>
       <Box backgroundColor={"#FFF5F7"}  
       mx={"auto"} 
       height={"425px"}  
       position={"absolute"} 
       top={{base:"80px",md:"165px",lg:"108px"}} 
       left={{base:"2%",md:"2%",lg:"40%"}} 
       width={{base:"95%",md:"80%",lg:"50%"}}
       zIndex={"20"}  
       display={display} 
       flexDirection={"column"} 
       gap={"10px"}
       borderRadius={"15px"}
       boxShadow='xs'
       overflowY={"auto"} 
       >
        {
            data?.map((el)=><SearchComp key={el._id} 
            image={el.media[0].url} 
            name={el.name} 
            price={el.price}
            rating={el.rating}
            reviewCount={el.rating_count}
            id={el.id} />)
        }
    </Box>
    </div>
  )
}

export default SearchList
