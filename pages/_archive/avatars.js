import { Box, Container, Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import AvatarView from "../../components/webapp/avatars";
import NavBar from "../../components/webapp/navbar";
import UploadModal from "../../components/webapp/uploadModal";
import { supabase } from "../../utils/supabaseClient";

const AppHome = ({ pictures, interval }) => {
  const [avatars, setAvatars] = useState(pictures);

  return (
    <>
      <NavBar />
      <Container maxW='container.xl' mt={10}>
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex>
            <UploadModal
              setAvatars={setAvatars}
              images_count={avatars.length}
            />
          </Flex>
          <AvatarView avatars={avatars} setAvatars={setAvatars}></AvatarView>
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
    .from("avatars")
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
