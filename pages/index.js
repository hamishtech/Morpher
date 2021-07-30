import { Box } from "@chakra-ui/react";
import { getProviders, getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Hero from "../components/homepage/hero";

const HomePage = ({ providers }) => {
  const router = useRouter();
  return (
    <Box h='100vh'>
      <Hero providers={providers} />
    </Box>
  );
};

export default HomePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/webapp",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
}
