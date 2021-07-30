import { Box, Container, Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import { useState } from "react";
import BannerView from "../../components/webapp/banners";
import NavBar from "../../components/webapp/navbar";
import UploadModal from "../../components/webapp/uploadModal";
import { supabase } from "../../utils/supabaseClient";

const AppHome = ({ pictures, user }) => {
  const [_, loading] = useSession();
  const [banners, setBanners] = useState(pictures);
  const [selectValue, setSelectValue] = useState(user.interval);

  if (loading) return null;

  if (!banners) {
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
            {/* <Select
              onChange={(e) => {
                setSelectValue(e.target.value);
                axios
                  .post("/api/avatarSettings/", {
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
            </Select> */}
            {banners.length > 5 ? (
              <Box mb={10}>Maximum of 6 banners reached</Box>
            ) : (
              <UploadModal setBanners={setBanners} />
            )}
          </Flex>
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
      props: { pictures: response.data, user: user.data[0] },
    };
  }
}
