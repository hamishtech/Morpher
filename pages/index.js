import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const HomePage = () => {
  const router = useRouter();
  return (
    <Container>
      <Flex direction='column'>
        <Box>Welcome to homepage</Box>
        <Box>
          <Button onClick={signIn}> Sign in with twitter</Button>
          <Button onClick={signOut}> Logout</Button>
        </Box>
        <Box mt={10}>
          <Button onClick={() => router.push("/webapp")}> Enter app</Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: "/webapp",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
