import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import Image from "next/image";

export default function Hero({ providers }) {
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
          Automatically Change {""} <br />
          <Text
            as={"span"}
            color={"blue.400"}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          >
            Avatars and Banners on Twitter
          </Text>
        </Heading>
        <Text
          color={"gray.500"}
          maxW={"3xl"}
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
        >
          Do you have multiple avatars or banners that you want to showcase on
          Twitter? Twics automatically changes your avatars and banners every hour.
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
          <Text fontWeight='bold' fontSize='2xl' my={6}>
            How It Works
          </Text>
          <OrderedList textAlign='left' fontSize='xl'>
            <ListItem>Sign in with your Twitter account</ListItem>
            <ListItem>Upload your banner and avatar images</ListItem>
            {/* <ListItem>Set your change interval (i.e. every 2 hours)</ListItem> */}
            <ListItem>
              Thats it! Your banner will now automatically change every hour
            </ListItem>
          </OrderedList>
        </Box>
        {/* <Box>
          <Illustration />
        </Box> */}
      </Stack>
    </Container>
  );
}

export const Illustration = (props) => {
  return (
    <Image
      height='200'
      width='1000'
      src='https://assets.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg'
    />
  );
};
