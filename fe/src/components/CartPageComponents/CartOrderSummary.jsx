import {
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { formatPrice } from './PriceTag'
  import Checkout from './Checkout'
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={'gray.600'} fontFamily={"Inter"}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium" fontFamily={"Inter"}>{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = ({total,cart}) => {
    return (
          <Stack
              spacing='8'
              borderWidth='1px'
              rounded='lg'
              padding='8'
              width='full'>
              <Heading size='md' fontFamily={"Inter"}>Order Summary</Heading>
  
              <Stack spacing='6'>
                  <OrderSummaryItem label='Subtotal' value={formatPrice(total)} />
                  <OrderSummaryItem label='Shipping + Tax' fontFamily={"Inter"}>
                      <Link href='#' textDecor='underline' fontFamily={"Inter"}>
                          Calculate shipping
                      </Link>
                  </OrderSummaryItem>
                  <OrderSummaryItem label='Coupon Code'>
                      <Link href='#' textDecor='underline' fontFamily={"Inter"}>
                          Add coupon code
                      </Link>
                  </OrderSummaryItem>
                  <Flex justify='space-between'>
                      <Text fontSize='lg' fontWeight='semibold' fontFamily={"Inter"}>
                          Total
                      </Text>
                      <Text fontSize='xl' fontWeight='extrabold' fontFamily={"Inter"}>
                          {formatPrice(total)}
                      </Text>
                  </Flex>
              </Stack>
              <Checkout total={total} cartData={cart}/>
          </Stack>
    );
  }
  