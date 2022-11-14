import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";

type User = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: true,
      callbackUrl: `${window.location.origin}/`,
    }).then(() => setLoading(true));
    console.log(res);
  };

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <Flex
      flexDirection="column"
      height="100vh"
      width="100vw"
      backgroundColor="gray.500"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="black.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.500"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputRightElement pointerEvents="none" />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={user.email}
                    onChange={({ target }) =>
                      setUser({ ...user, email: target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={user.password}
                    onChange={({ target }) =>
                      setUser({ ...user, password: target.value })
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                value={"Login"}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Dont Have User?{" "}
        <Link color="black.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
