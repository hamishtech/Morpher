import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  List,
  Button,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Icon,
  Box,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import Image from "next/image";

export default function Hero({ providers }) {
  console.log(providers);
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Twitter {""}
          <Text as={"span"} color={"blue.400"}>
            Profile Pic Manager
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"} fontSize='2xl'>
          Do you have multiple profile pictures that you want to use on Twitter?
          This tool automatically changes your profile picture on Twitter.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"twitter"}
            onClick={() => {
              signIn(providers.twitter.id);
            }}
            bg={"blue.400"}
            _hover={{ bg: "blue.500" }}
          >
            Sign in with Twitter
          </Button>
        </Stack>
        <Box>
          <OrderedList textAlign='left' fontSize='xl'>
            <ListItem>Sign in with your Twitter account</ListItem>
            <ListItem>Upload your profile pictures</ListItem>
            <ListItem>Set your change interval (i.e. every 2 hours)</ListItem>
            <ListItem>
              Thats it! Your profile pic will now automatically change
            </ListItem>
          </OrderedList>
        </Box>
        <Box h='1000px' w='1000px'>
          <Illustration />
        </Box>
      </Stack>
    </Container>
  );
}

export const Illustration = (props) => {
  return (
    <Image
      height='1000px'
      width='2000px'
      src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
    />
  );
};
