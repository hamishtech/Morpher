import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { signout } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiFillPicture, AiFillSmile } from "react-icons/ai";

export default function NavBar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const router = useRouter();
  const { view } = router.query;

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w='full'
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow='md'
      >
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <HStack display='flex' spacing={3} alignItems='center'>
            <HStack spacing={3}>
              <Button
                variant='solid'
                fontSize='xl'
                colorScheme={view === "avatars" ? "twitter" : null}
                onClick={() => {
                  view === "avatars" ? null : router.push("/app/avatars");
                }}
                leftIcon={<AiFillSmile />}
              >
                Avatars
              </Button>
              <Button
                variant='solid'
                onClick={() => {
                  view === "banners" ? null : router.push("/app/banners");
                }}
                colorScheme={view === "banners" ? "twitter" : null}
                fontSize='xl'
                leftIcon={<AiFillPicture />}
              >
                Banners
              </Button>
            </HStack>
          </HStack>
          <Box flexGrow='1'></Box>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"md"} />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </MenuItem>
              {/* <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
