import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const AvatarCard = ({ avatar, setAvatars }) => {
  const toast = useToast();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  return (
    <Flex shadow='xl' w='full' alignItems='center' justifyContent='center'>
      <Box
        w='xs'
        bg={useColorModeValue("white", "gray.900")}
        rounded='lg'
        overflow='hidden'
        mx='auto'
      >
        <Center>
          <Avatar
            boxSize='200px'
            fit='cover'
            src={avatar.url}
            alt='avatar'
            borderRadius='full'
            mt={5}
          />
        </Center>
        <Center>
          {" "}
          <Box textAlign='center' w='50%' my='5'>
            <Flex direction='column'>
              <Button
                mb='1'
                isLoading={loadingUpdate}
                bg='green.500'
                size='xs'
                onClick={() => {
                  setLoadingUpdate(true);
                  axios.put("/api/avatars", { url: avatar.url }).then((res) => {
                    res.status === 200
                      ? toast({
                          title: "Avatar Updated.",
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
                Set as current avatar
              </Button>
              <Button
                bg='red.500'
                size='xs'
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  axios
                    .delete("/api/avatars", { data: { id: avatar.id } })
                    .then((res) => {
                      setAvatars(res.data);
                      setLoading(false);
                    })
                    .catch((err) => alert("error occurred deleting"));
                }}
              >
                Delete
              </Button>
            </Flex>{" "}
          </Box>
        </Center>{" "}
      </Box>
    </Flex>
  );
};

export default AvatarCard;
