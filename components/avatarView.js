import { Box, Button, Flex, Image } from "@chakra-ui/react";
import axios from "axios";

const AvatarView = ({ avatars, setAvatars }) => {
  if (!avatars) return null;
  return (
    <>
      <Flex justifyContent='space-around'>
        {avatars.map((avatar) => {
          return (
            <Box mr={2} key={avatar.id}>
              <Image boxSize='150px' src={avatar.url} />
              <Flex direction='column'>
                <Button
                  mb='1'
                  bg='green.100'
                  onClick={() => {
                    axios.put("/api/avatars", { url: avatar.url });
                  }}
                >
                  set as twitter pic
                </Button>{" "}
                <Button
                  bg='red.100'
                  onClick={() => {
                    axios
                      .delete("/api/avatars", { data: { id: avatar.id } })
                      .then((res) => {
                        setAvatars(res.data);
                      });
                  }}
                >
                  delete{" "}
                </Button>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default AvatarView;
