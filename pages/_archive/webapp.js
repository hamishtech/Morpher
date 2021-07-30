import { Box, Container, Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import AvatarView from "../../components/webapp/avatars";
import NavBar from "../../components/webapp/navbar";
import UploadModal from "../../components/webapp/uploadModal";
import { supabase } from "../../utils/supabaseClient";

const AppHome = ({ pictures, user }) => {
  const [_, loading] = useSession();
  const [avatars, setAvatars] = useState(pictures);
  const [selectValue, setSelectValue] = useState(user.interval);

  if (loading) return null;

  if (!avatars) {
    return (
      <Container maxW='container.xl' textAlign='center'>
        <UploadModal />
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxW='container.xl' mt={10}>
        <Box>
          <Select
            onChange={(e) => {
              setSelectValue(e.target.value);
              axios
                .post("/api/settings/", {
                  interval: e.target.value,
                })
                .then((res) => {
                  return;
                });
            }}
            value={selectValue}
            w='250px'
          >
            <option value={0}>Never</option>
            <option value={1}>Every 1 hour</option>
            <option value={6}>Every 6 hours</option>
          </Select>
        </Box>

        <Flex
          direction='column'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex
            direction='column'
            alignItems='center'
            justifyContent='space-between'
          >
            {avatars.length > 5 ? (
              <Box mb={10}>Maximum of 6 images reached</Box>
            ) : (
              <UploadModal setAvatars={setAvatars} />
            )}
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
      props: { pictures: response.data, user: user.data[0] },
    };
  }
}
