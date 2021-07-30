import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const BannerCard = ({ banner, setBanners }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Flex w='full' alignItems='center' justifyContent='center'>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        rounded='lg'
        overflow='hidden'
        mx='auto'
      >
        {loading ? (
          <Center>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Center>
        ) : (
          <Image w={700} h={300} fit='inherit' src={banner.url} alt='banner' />
        )}
        <Box textAlign='center'>
          <Flex direction='column' mt={5}>
            <Button
              bg='green.100'
              onClick={() => {
                axios.put("/api/banners", { url: banner.url });
              }}
            >
              Set as Current Banner
            </Button>
            <Button
              bg='red.100'
              onClick={() => {
                setLoading(true);
                axios
                  .delete("/api/banners", { data: { id: banner.id } })
                  .then((res) => {
                    setBanners(res.data);
                    setLoading(false);
                  })
                  .catch((err) => alert("error occurred deleting"));
              }}
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default BannerCard;
