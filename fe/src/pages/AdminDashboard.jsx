import React, { useState, useEffect, useContext } from "react";
import {
  Lorem,
  Button,
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Heading,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { FiTrendingUp, FiMenu, FiChevronDown } from "react-icons/fi";
import { FaBoxOpen, FaUser, FaRegUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import logo from "../assets/nyka.png";
import ProductsUi from "../components/AdminDashboardComponents/ProductsUi";
import UsersUi from "../components/AdminDashboardComponents/UsersUi";
import OrdersUi from "../components/AdminDashboardComponents/OrdersUi";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import EditProduct from "../components/AdminDashboardComponents/EditProduct";
import { MdSettings } from "react-icons/md";

const MobileNav = ({ onOpen, user, ...rest }) => {
  const [isSticky, setSticky] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      position={isSticky ? "fixed" : "relative"}
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack justifyContent={"space-between"} width={"85%"}>
        <Flex alignItems={"center"} gap={2}>
          <Icon as={MdSettings} />

          <Heading as="h3" size={{ base: "sm", sm: "md" }} fontFamily={"Inter"}>
            Admin Dashboard
          </Heading>
        </Flex>

        <Flex alignItems={"center"} gap={2}>
          <Icon as={FaRegUser} />
          <Heading as="h3" size={{ base: "sm", sm: "md" }} fontFamily={"Inter"}>
            {user.name}
          </Heading>
        </Flex>
      </HStack>
    </Flex>
  );
};

const AdminDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
 

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const [selectedOption, setSelectedOption] = useState("");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("renderUi", option);
  };

  useEffect(() => {
    const previousUi = localStorage.getItem("renderUi");
    setSelectedOption(previousUi);
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        display={{ base: "none", md: "block" }}
      >
        <Link to={"/"}>
          <Flex h="20" alignItems="center" mx="8" justifyContent="center">
            <Image src={logo} width={"100px"} />
          </Flex>
        </Link>
        <Link to={"/admindashboard/products"}>
          <Box
            as="a"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            onClick={() => handleButtonClick("products")}
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "#eb6195",
                color: "white",
              }}
              bg={selectedOption === "products" ? "#eb6195" : "transparent"}
              color={selectedOption === "products" ? "white" : "black"}
              marginBottom={2}
              fontFamily={"Inter"}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={FaBoxOpen}
              />
              Products
            </Flex>
          </Box>
        </Link>

        <Link to={"/admindashboard/users"}>
          <Box
            as="a"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            onClick={() => handleButtonClick("users")}
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "#eb6195",
                color: "white",
              }}
              marginBottom={2}
              bg={selectedOption === "users" ? "#eb6195" : "transparent"}
              color={selectedOption === "users" ? "white" : "black"}
              fontFamily={"Inter"}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={FaUser}
              />
              Users
            </Flex>
          </Box>
        </Link>

        <Link to={"/admindashboard/orders"}>
          <Box
            as="a"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            onClick={() => handleButtonClick("orders")}
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "#eb6195",
                color: "white",
              }}
              bg={selectedOption === "orders" ? "#eb6195" : "transparent"}
              color={selectedOption === "orders" ? "white" : "black"}
              fontFamily={"Inter"}
              marginBottom={2}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={FiTrendingUp}
              />
              Orders
            </Flex>
          </Box>
        </Link>

        <Box
          as="a"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          onClick={logout}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "#eb6195",
              color: "white",
            }}
            bg={"transparent"}
            color={"black"}
            fontFamily={"Inter"}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={TbLogout2}
            />
            LogOut
          </Flex>
        </Box>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>
            <Flex
              h="20"
              alignItems="center"
              mx="8"
              justifyContent="space-between"
            >
              <Link to={"/"}>
                <Image src={logo} width={"100px"} />
              </Link>

              <Flex border={"1px solid #0004"} borderRadius={"lg"}>
                <CloseButton
                  display={{ base: "flex", md: "none" }}
                  onClick={onClose}
                />
              </Flex>
            </Flex>
            <hr style={{ border: "1px solid #0005" }} />
          </DrawerHeader>

          <DrawerBody>
            <Link to={"/admindashboard/products"}>
              <Box
                as="a"
                style={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => {
                  handleButtonClick("products");
                  onClose();
                }}
              >
                <Flex
                  align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    bg: "#eb6195",
                    color: "white",
                  }}
                  bg={selectedOption === "products" ? "#eb6195" : "transparent"}
                  color={selectedOption === "products" ? "white" : "black"}
                  marginBottom={2}
                  fontFamily={"Inter"}
                >
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={FaBoxOpen}
                  />
                  Products
                </Flex>
              </Box>
            </Link>

            <Link to={"/admindashboard/users"}>
              <Box
                as="a"
                style={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => {
                  handleButtonClick("users");
                  onClose();
                }}
              >
                <Flex
                  align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    bg: "#eb6195",
                    color: "white",
                  }}
                  marginBottom={2}
                  bg={selectedOption === "users" ? "#eb6195" : "transparent"}
                  color={selectedOption === "users" ? "white" : "black"}
                  fontFamily={"Inter"}
                >
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={FaUser}
                  />
                  Users
                </Flex>
              </Box>
            </Link>

            <Link to={"/admindashboard/orders"}>
              <Box
                as="a"
                style={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => {
                  handleButtonClick("orders");
                  onClose();
                }}
              >
                <Flex
                  align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    bg: "#eb6195",
                    color: "white",
                  }}
                  bg={selectedOption === "orders" ? "#eb6195" : "transparent"}
                  color={selectedOption === "orders" ? "white" : "black"}
                  fontFamily={"Inter"}
                  marginBottom={2}
                >
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={FiTrendingUp}
                  />
                  Orders
                </Flex>
              </Box>
            </Link>

            <Box
              as="a"
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={logout}
            >
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "#eb6195",
                  color: "white",
                }}
                bg={"transparent"}
                color={"black"}
                fontFamily={"Inter"}
              >
                <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={TbLogout2}
                />
                LogOut
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} logout={logout} user={user} />



      <Box ml={{ base: 0, md: 60 }} p="4">
        <Routes>
          <Route path="/products" element={<ProductsUi />} />
          <Route path="/users" element={<UsersUi />} />
          <Route path="/orders" element={<OrdersUi />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          {/* <Route path="/add-product" element={<AddProduct />} /> */}
        </Routes>
      </Box>

     
    </Box>
  );
};

export default AdminDashboard;
