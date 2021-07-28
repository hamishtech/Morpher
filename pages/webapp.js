import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import axios from "axios";
import { getSession, signout, useSession } from "next-auth/client";
import { useState } from "react";

const AppHome = () => {
  const [tweet, setTweet] = useState("");
  const [session, loading] = useSession();

  function handleTweeet() {
    axios.post("/api/tweet", { tweet });
  }
  function handleChangePic() {
    axios.get("/api/changePic");
  }

  if (loading) return null;

  return (
    <Container>
      <Button onClick={() => signout()}> Logout</Button>
      <Box>Send a tweet</Box>
      <Input
        onChange={(e) => {
          setTweet(e.target.value);
        }}
      ></Input>
      <Button onClick={handleTweeet}>Send</Button>
      <Button onClick={handleChangePic}>Change Pic</Button>
      <Flex mt={10} direction='column'>
        <Button>Upload picture</Button>
        <Box>Image 1</Box>
        <Box>Image 2</Box>
        <Box>Image 3</Box>
        <Box>Image 4</Box>
      </Flex>
    </Container>
  );
};

export default AppHome;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
