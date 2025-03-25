import React, { memo, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Checkbox,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const SideBar = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const CATEGORY = ["Skin", "Beauty", "Makeup", "Mother & Child", "Hair"];

  const BRAND = [
    "Kama Ayurveda",
    "The Ordinary",
    "M.A.C",
    "Huda Beauty",
    "LANEIGE",
    "Estee Lauder",
    "Moroccanoil",
    "Charlotte Tilbury",
    "Olaplex",
    "Benefit Cosmetics",
    "Bobbi Brown",
    "Clinique",
    "Smashbox",
  ];

  const COLOR = [
    "Black",
    "White",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Brown",
    "Grey",
    "Other",
  ];

  const FINISH = ["Matte", "Glossy", "Metallic", "Other"];

  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.getAll("category_values") || []);
  const [brand, setBrand] = useState(searchParams.getAll("brand_name") || []);
  const [order, setOrder] = useState(searchParams.get("order") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1); 

  

  const handleSort = (value) => {
    setOrder(value);
    setPage(1);
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));
    setPage(1);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand((prev) => (prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]));
    setPage(1);
  };

  const updateSearchParams = debounce(() => {
    const params = { page };
    if (category.length) params.category_values = category;
    if (brand.length) params.brand_name = brand;
    if (order) params.order = order;
    setSearchParams(params);
  }, 500);

  useEffect(() => {
    updateSearchParams();
    return () => updateSearchParams.cancel();
  }, [category, brand, order, page]);

  return (
    <>
      <Accordion
        w="100%"
        allowToggle
        defaultIndex={[0]}
        bg="white"
        mb={4}
      >
        <AccordionItem mb={4}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sort By
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Collapse startingHeight={80}>
              <RadioGroup
                defaultValue={order}
                bg={"#f4b1b1"}
                color={"black"}
                padding={4}
                borderRadius={4}
                onChange={handleSort}
              >
                <Stack>
                  <Radio value="asc">Price: Low to High</Radio>
                  <Radio value="desc">Price: High to Low</Radio>
                </Stack>
              </RadioGroup>
            </Collapse>
          </AccordionPanel>
        </AccordionItem>

      </Accordion>


    <Accordion
        bg={"white"}
        allowToggle
        defaultIndex={[0]}>
			
        <AccordionItem mb={4}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              BRAND
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Collapse startingHeight={120} in={show}>
              {BRAND.map((location, id) => (
                <HStack
                  spacing={4}
                  key={id}
                  onChange={handleBrandChange}
                  alignItems={"center"}
                >
                  <Checkbox
                    value={location}
                    defaultChecked={brand.includes(location)}
                  />
                  <FormLabel my="auto">{location}</FormLabel>
                </HStack>
              ))}
            </Collapse>
            <Button
              w="100%"
              onClick={handleToggle}
              mt="1rem"
              backgroundColor={"#f4b1b1"}
              color="black"
              _hover={{ backgroundColor: "#fc8181" }}
            >
              Show {show ? "Less" : "More"}
            </Button>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              CATEGORY
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Collapse startingHeight={120}>
              {CATEGORY.map((location, id) => (
                <HStack
                  spacing={4}
                  key={id}
                  alignItems={"center"}
                  onChange={handleCategoryChange}
                >
                  <Checkbox
                    defaultChecked={category.includes(location)}
                    value={location}
                  />
                  <FormLabel my="auto">{location}</FormLabel>
                </HStack>
              ))}
            </Collapse>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              COLOR
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Collapse startingHeight={120} in={show}>
              {COLOR.map((location, id) => (
                <HStack spacing={4} key={id} alignItems={"center"}>
                  <Checkbox />
                  <FormLabel my="auto">{location}</FormLabel>
                </HStack>
              ))}
            </Collapse>
            <Button
              onClick={handleToggle}
              mt="1rem"
              backgroundColor={"#f4b1b1"}
              color="black"
              width={"100%"}
              _hover={{ backgroundColor: "#fc8181" }}
            >
              Show {show ? "Less" : "More"}
            </Button>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={4}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              FINISH BASE
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Collapse startingHeight={120}>
              {FINISH.map((location, id) => (
                <HStack spacing={4} key={id} alignItems={"center"}>
                  <Checkbox />
                  <FormLabel my="auto">{location}</FormLabel>
                </HStack>
              ))}
            </Collapse>
          </AccordionPanel>
        </AccordionItem>

    </Accordion>
    </>
  );
};

export default memo(SideBar);
