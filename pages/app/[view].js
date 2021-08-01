import { Box, Container, Flex } from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import Footer from "../../components/footer";
import AvatarView from "../../components/webapp/avatars";
import BannerView from "../../components/webapp/banners";
import NavBar from "../../components/webapp/navbar";
import ScheduleSwitch from "../../components/webapp/switch";
import UploadModal from "../../components/webapp/uploadModal";
import { supabase } from "../../utils/supabaseClient";
import Head from "next/head";

const AppHome = (props) => {
  const [avatars, setAvatars] = useState(props.avatars);
  const [banners, setBanners] = useState(props.banners);
  const [onBanners, setOnBanners] = useState(props.user.banner_cycling);
  const [onAvatars, setOnAvatars] = useState(props.user.avatar_cycling);
  const router = useRouter();
  const { view } = router.query;

  if (view !== "banners" && view !== "avatars") {
    return null;
  }

  return (
    <>
      <Head>
        <title>Morpher</title>
      </Head>
      <NavBar />
      <Container maxW='container.xl' mt={10} minHeight='100vh'>
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex
            w='100%'
            justifyContent='space-between'
            flexDirection={{ base: "column", sm: "column", md: "row" }}
          >
            <Box>
              {" "}
              <ScheduleSwitch
                view={view}
                on={view === "banners" ? onBanners : onAvatars}
                setOn={view === "banners" ? setOnBanners : setOnAvatars}
              />
            </Box>
            <Box>
              <UploadModal
                setAvatars={setAvatars}
                setBanners={setBanners}
                view={view}
                images_count={
                  view === "banners" ? banners.length : avatars.length
                }
              />
            </Box>
          </Flex>

          {view === "banners" ? (
            <BannerView banners={banners} setBanners={setBanners} />
          ) : (
            <AvatarView avatars={avatars} setAvatars={setAvatars} />
          )}
        </Flex>
      </Container>
      <Footer />
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

  const avatars = await supabase
    .from("avatars")
    .select("*")
    .eq("user_id", session.userID);

  const banners = await supabase
    .from("banners")
    .select("*")
    .eq("user_id", session.userID);

  const user = await supabase
    .from("users")
    .select("*")
    .eq("id", session.userID);

  delete user.data[0].access_token;
  delete user.data[0].access_secret;

  return {
    props: {
      avatars: avatars.data,
      banners: banners.data,
      user: user.data[0],
    },
  };
}
