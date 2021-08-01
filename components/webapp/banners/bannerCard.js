import {
  Box,
  Button,
  Flex,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const BannerCard = ({ banner, setBanners }) => {
  const toast = useToast();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Flex w='full' alignItems='center' justifyContent='center'>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        rounded='lg'
        overflow='hidden'
        mx='auto'
      >
        <Image w={700} h={300} fit='inherit' src={banner.url} alt='banner' />
        <Box textAlign='center'>
          <Flex direction='column' mt={5}>
            <Button
              bg='green.500'
              isLoading={loadingUpdate}
              onClick={() => {
                setLoadingUpdate(true);
                axios.put("/api/banners", { url: banner.url }).then((res) => {
                  res.status === 200
                    ? toast({
                        title: "Banner Updated.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      })
                    : toast({
                        title: "Problem Occured",
                        description: res.data.error,
                        status: "error",
                        duration: 7000,
                        isClosable: true,
                      });
                  setLoadingUpdate(false);
                });
              }}
            >
              Set as current banner now
            </Button>
            <Button
              bg='red.500'
              isLoading={loading}
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
