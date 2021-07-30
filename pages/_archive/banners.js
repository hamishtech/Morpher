import { Box, Container, Flex } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import BannerView from "../../components/webapp/banners";
import NavBar from "../../components/webapp/navbar";
import UploadModal from "../../components/webapp/uploadModal";
import { supabase } from "../../utils/supabaseClient";

const AppHome = ({ pictures, interval }) => {
  const [_, loading] = useSession();
  const [banners, setBanners] = useState(pictures);

  if (loading) return null;

  if (!banners) {
    return (
      <Container maxW='container.xl' textAlign='center'>
        <UploadModal setBanners={setBanners} />
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW='container.xl' mt={10}>
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='space-between'
        >
          <UploadModal setBanners={setBanners} images_count={banners.length} />
          <BannerView banners={banners} setBanners={setBanners}></BannerView>
        </Flex>
      </Container>
    </>
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

  const response = await supabase
    .from("banners")
    .select("*")
    .eq("user_id", session.userID);

  const user = await supabase
    .from("users")
    .select("*")
    .eq("id", session.userID);

  if (response.data && user.data) {
    return {
      props: { pictures: response.data, interval: user.data[0].interval },
    };
  }
}
