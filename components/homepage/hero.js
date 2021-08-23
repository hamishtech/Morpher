import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";

export default function Hero({ providers }) {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 14 }}
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
          Twitter? Morpher automatically changes your avatars and banners every
          20mins.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"twitter"}
            color={"white"}
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
          <Illustration />
        </Box>
        <Box>
          <Text fontWeight='bold' fontSize='2xl' my={6}>
            How It Works
          </Text>
          <OrderedList textAlign='left' fontSize='xl'>
            <ListItem>Sign in with your Twitter account</ListItem>
            <ListItem>Upload your banner and avatar images</ListItem>
            {/* <ListItem>Set your change interval (i.e. every 2 hours)</ListItem> */}
            <ListItem>
              Thats it! Your avatar and banner will now automatically change
              every 20 mins
            </ListItem>
          </OrderedList>
        </Box>
      </Stack>
    </Container>
  );
}

export const Illustration = (props) => {
  return (
    <Image
      alt='description img'
      src='https://images.mktw.net/im-309419?width=1280&size=1.77777778'
      rounded='20px'
      h='300px'
    ></Image>
  );
};
