import React, { useState } from 'react'
import { UserData } from "./Data";
import {
  Flex,Box
} from "@chakra-ui/react";
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

const OrdersUi = () => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (<>
    <Flex width={"100%"} 
    justifyContent={"space-around"}
    flexDirection={"column"}
    gap={3}>
       <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 700,marginTop:"100px" }}>
        <LineChart chartData={userData} />
      </div>
      <Box style={{ width: 500,
  marginTop:"100px" }} >
    <PieChart chartData={userData} />
  </Box>
    </Flex>
   
  </>
  )
}

export default OrdersUi
