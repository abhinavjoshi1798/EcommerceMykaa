import {
  Box,
  Flex,
  IconButton,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Button
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import nyka from "../../assets/nyka.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SearchList from "./SearchList";

const Links = [
  "Categories",
  "Brands",
  "Luxe",
  "Mykaa Fashion",
  "Beauty Advice",
];

const NavLink = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Box
      fontSize="14px"
      fontFamily={"Inter,sans-serif"}
      fontWeight={500}
      _hover={{
        textDecoration: "underline",
        cursor: "pointer",
        color: "#fb94bc",
      }}
      onClick={() =>
        children === "Categories"
          ? navigate(`/categories`)
          : navigate(`/allproducts`)
      }
      textTransform="uppercase"
    >
      {children}
    </Box>
  );
};

function MainNav() {
  const [isopen, setIsopen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [display,setDisplay] = useState("none");
 

  const { isAuth, logout, user, token } = useContext(AuthContext);

  const navigate = useNavigate();

  const getSearchResults = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/product?searchQuery=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:token
        }
      });
      const res = await response.json();
      const { data } = res
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(()=>{
  getSearchResults();
  if(!searchQuery){
     setDisplay("none")
  }
  setDisplay("block")
  },[searchQuery])




  return (
    <>
      <Flex
        justifyContent="space-evenly"
        borderBottom={"1px solid grey"}
        mx="2"
        py="2"
        direction={{ base: "column", md: "column", lg: "row" }}
      >
        <Flex justifyContent="space-evenly" 
		gap="5">
          <Box display="flex" 
		  alignItems={"center"}>
            <Link to={"/"}>
              <Image src={nyka} alt="NykaaLogo" width={"100px"} />
            </Link>
          </Box>

          <Flex
            display={{ base: "none", lg: "flex" }}
            justifyContent="center"
            alignItems={"center"}
            gap="3"
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Flex>
        </Flex>

        <Flex
          justifyContent={"space-evenly"}
          gap={5}
          alignItems="center"
          direction={{ base: "column", md: "row" }}
        > 
          
          <InputGroup display={{ base: "flex", xl: "flex", md: "flex" }}>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input type="text" placeholder="Search on Mykaa" 
             value={searchQuery}
             onChange={(e)=>setSearchQuery(e.target.value)}  />
          </InputGroup>
          
          
          <Flex gap={5} justifyContent={"space-evenly"} alignItems={"center"}
          flexDirection={{"base":"column","sm":"row"}}>
            <Button
              onClick={() => navigate("/login")}
              backgroundColor={"#fc2779"}
              color="white"
              _hover={{
                backgroundColor: "#ff93bc",
                color: "#FFFFFF",
              }}
            >
              {isAuth ? user.name : "Login"}
            </Button>

            {isAuth ? (
              <Button
                onClick={() => {
                  logout();
                }}
                backgroundColor={"#fc2779"}
                color="white"
                _hover={{
                  backgroundColor: "#ff93bc",
                  color: "#FFFFFF",
                }}
              >
                {"LogOut"}
              </Button>
            ) : (
              ""
            )}

            <Box
              onClick={() => {
                if (isAuth) {
                  return navigate("/cart");
                }
                navigate("/login");
              }}
              _hover={{
                cursor: "pointer",
              }}
            >
              <HiOutlineShoppingBag size={30} />
            </Box>

            <Box
              onClick={() => {
                setIsopen(!isopen);
              }}
            >
              <IconButton
                size={"md"}
                aria-label={"Open Menu"}
                display={{ lg: "none" }}
              >
                {isopen ? <CloseIcon /> : <HamburgerIcon />}
              </IconButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={"column"}
        gap={2}
        display={{ base: isopen ? "flex" : "none", lg: "none" }}
        transition={"ease-in-out"}
        overflow={"hidden"}
        borderBottom={"1px solid gray"}
        m={2}
      >
        {Links.map((link) => (
          <Box
            fontSize="14px"
            fontFamily={"Inter,sans-serif"}
            fontWeight={500}
            _hover={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#fb94bc",
            }}
            key={link}
            onClick={() => {
              link === "Categories"
                ? navigate(`/categories`)
                : navigate(`/allproducts`);
            }}
            textTransform="uppercase"
            width={{ base: "80%", md: "50%", lg: "20%" }}
            margin={"auto"}
            textAlign={"center"}
          >
            {link}
          </Box>
        ))}
      </Flex>
      {searchQuery && <SearchList data={searchResults} display={display} />}
    </>
  );
}

export default MainNav;
