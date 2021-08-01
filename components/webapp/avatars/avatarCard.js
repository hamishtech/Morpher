import {
    Box,
    Button, Flex,
    Image, useColorModeValue,
    useToast
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
        bg={useColorModeValue("white", "gray.800")}
        rounded='lg'
        overflow='hidden'
        mx='auto'
      >
        <Image w='full' h={56} fit='cover' src={avatar.url} alt='avatar' />
        <Box textAlign='center'>
          <Flex direction='column'>
            <Button
              mb='1'
              isLoading={loadingUpdate}
              bg='green.500'
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
                    : alert("error updating banner");
                  setLoadingUpdate(false);
                });
              }}
            >
              Set as current avatar now
            </Button>
            <Button
              bg='red.500'
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
      </Box>
    </Flex>
  );
};

export default AvatarCard;
