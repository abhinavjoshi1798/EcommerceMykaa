import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import * as Yup from "yup";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCon, setShowPasswordCon] = useState(false);

  const [loading,setLoading] = useState(false);

  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const navigate = useNavigate()

  const [errors,setErrors] = useState({});
  const [resFailedMsg,setResFailedMsg] = useState("");

  const validationSchema = Yup.object({
    userName:Yup.string().required("Name is Required").min(3, "Name must be at least 3 characters")
    .max(30, "Name must not exceed 30 characters"),
    email:Yup.string().required("Email is Required").email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleChange = (e) => {
   const {name,value} = e.target;
   setErrors({
    ...errors,
    [name]: undefined,
  });
   setFormData({
    ...formData,
    [name]:value,
   })
  }

  const handleSubmit = async () => {
    try {
      setResFailedMsg("");
      await validationSchema.validate(formData, {abortEarly: false});
        const dataObj = {
          name : formData.userName,
          email:formData.email,
          pass:formData.password
        }
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(dataObj) 
        });
      
        const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to sign up');
    }

    if (data.msg === "New User has been registered") {
      navigate("/login");
      setLoading(false);
    };

    } catch (error) {
      setLoading(false)
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
          setResFailedMsg(error.message || 'An error occurred, please try again.');
      }
    }
  }
  


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#f3f3f3", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} width={"700px"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"} fontFamily={"Inter"} color={"#fc2779"}>
            Create Your Mykaa Account
          </Heading>
          
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
           
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
             {errors.userName && <Text color={"#fc2779"} >*{" "}{errors.userName}</Text>} 
              <Input type="text"
              name="userName"
              value={formData.userName}
              placeholder="Enter Name"
              onChange={handleChange} />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              {errors.email && <Text color={"#fc2779"} >*{" "}{errors.email}</Text>}
              <Input type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email" />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              {errors.password && <Text color={"#fc2779"} >*{" "}{errors.password}</Text>}
              <InputGroup>
                <Input type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                onChange={handleChange} />
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

            <FormControl id="confirm_password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              {errors.confirmPassword && <Text color={"#fc2779"} >*{" "}{errors.confirmPassword}</Text>}
              <InputGroup>
                <Input type={showPasswordCon ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPasswordCon((showPasswordCon) => !showPasswordCon)
                    }
                  >
                    {showPasswordCon ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
            {resFailedMsg && <Text color={"#fc2779"} >*{" "}{resFailedMsg}</Text>}
            <Button
               isLoading={loading}
                loadingText="Loading"
                size="lg"
                bg={"#fc2779"}
                color={"white"}
                _hover={{
                  bg: "#ff93bc",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                SignUp
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already have an account ?{" "}
                <Link to={"/login"}>
                  {" "}
                  <Box
                    marginLeft={2}
                    as={"span"}
                    _hover={{ textDecoration: "underline",color:"#fc2779"  }}
                  >
                    LogIn
                  </Box>{" "}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
