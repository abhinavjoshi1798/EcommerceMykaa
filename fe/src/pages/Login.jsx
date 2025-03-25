import React, { useContext } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const { isAuth, login, token, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [resFailedMsg, setResFailedMsg] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    pass: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });

  const location = useLocation();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: undefined,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setResFailedMsg("");
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to login up");
      }

      login(data.token, data.user);
      if(location.state){
       return navigate(location.state, { replace: true });
      }
       navigate("/")
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setResFailedMsg(
          error.message || "An error occurred, please try again."
        );
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#f3f3f3", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} width={"700px"}>
        <Stack align={"center"}>
          <Heading
            fontSize={"3xl"}
            textAlign={"center"}
            fontFamily={"Inter"}
            color={"#fc2779"}
          >
            Login To Your Mykaa Account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              {errors.email && <Text color={"#fc2779"}>* {errors.email}</Text>}
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              {errors.pass && <Text color={"#fc2779"}>* {errors.pass}</Text>}
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  value={formData.pass}
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              {resFailedMsg && <Text color={"#fc2779"}>* {resFailedMsg}</Text>}
              <Button
                isLoading={loading}
                loadingText="Loading"
                size="lg"
                bg={"#fc2779"}
                color={"white"}
                _hover={{
                  bg: "#ff93bc",
                }}
                onClick={handleSubmit}
              >
                LogIn
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't Have an Account ?
                <Link to={"/signup"}>
                  <Box
                    marginLeft={2}
                    as={"span"}
                    _hover={{ textDecoration: "underline", color: "#fc2779" }}
                  >
                    SignUp
                  </Box>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
