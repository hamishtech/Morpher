import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";

import { getSession, signout, useSession } from "next-auth/client";
import { useState } from "react";
import Avatar from "../components/avatar";
import AvatarView from "../components/avatarView";
import Upload from "../components/uploadWidget";
import { supabase } from "../utils/supabaseClient";

const AppHome = ({ pictures }) => {
  const [session, loading] = useSession();
  const [avatars, setAvatars] = useState(pictures);

  if (loading) return null;

  return (
    <Container>
      <Box>
        <Upload />
        <AvatarView avatars={avatars} setAvatars={setAvatars}></AvatarView>
      </Box>
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

  const response = await supabase
    .from("avatars")
    .select("*")
    .eq("user_id", session.userID);

  if (response.data) {
    return {
      props: { pictures: response.data },
    };
  }
}
