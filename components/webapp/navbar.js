import {
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const router = useRouter();
  const view = router.route;

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
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label='Open menu'
                fontSize='20px'
                color={useColorModeValue("gray.800", "inherit")}
                variant='ghost'
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos='absolute'
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection='column'
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded='sm'
                shadow='sm'
              >
                <CloseButton
                  aria-label='Close menu'
                  justifySelf='self-start'
                  onClick={mobileNav.onClose}
                />
                <Button
                  w='full'
                  variant='ghost'
                  onClick={() => {
                    view === "/app/avatars"
                      ? null
                      : router.push("/app/avatars");
                  }}
                  leftIcon={<AiFillHome />}
                >
                  Avatars
                </Button>
                <Button
                  w='full'
                  onClick={() => {
                    view === "/app/banners" ? null : router.push("/app/banners");
                  }}
                  variant='solid'
                  colorScheme='brand'
                  leftIcon={<AiOutlineInbox />}
                >
                  Banners
                </Button>
              </VStack>
            </Box>
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Button
                variant='solid'
                fontSize='xl'
                colorScheme={view === "/app/avatars" ? "twitter" : null}
                onClick={() => {
                  view === "/app/avatars" ? null : router.push("/app/avatars");
                }}
                leftIcon={<AiOutlineInbox />}
              >
                Avatars
              </Button>
              <Button
                variant='solid'
                onClick={() => {
                  view === "/app/banners" ? null : router.push("/app/banners");
                }}
                colorScheme={view === "/app/banners" ? "twitter" : null}
                fontSize='xl'
                leftIcon={<AiOutlineInbox />}
              >
                Banners
              </Button>
            </HStack>
          </HStack>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"md"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
