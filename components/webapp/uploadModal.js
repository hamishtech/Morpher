import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function UploadModal({ setAvatars, setBanners, images_count, view }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [url, setURL] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(false);

  if (images_count > 5) {
    return <Box mb={10}>Maximum of 6 pictures reached</Box>;
  }

  const uploadURL = () => {
    setLoadingUrl(true);
    function checkURL(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }
    let isValidUrl = checkURL(url);
    if (!isValidUrl) {
      setInvalidUrl(true);
      return;
    }

    const data = new FormData();
    data.append("upload_preset", "xadvuvf2");
    data.append("cloud_name", "twitterprofilepicmanager");
    data.append("file", url);
    fetch(
      "https://api.cloudinary.com/v1_1/twitterprofilepicmanager/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => {
        if (resp.status !== 200) {
          throw error;
        }
        return resp.json();
      })
      .then((data) => {
        if (!data.url) {
          throw error;
        }
        axios.post(`/api/${view}`, { url: data.url }).then((res) => {
          view === "banners" ? setBanners(res.data) : setAvatars(res.data);
          setLoading(false);
          setLoadingUrl(false);
          setURL("");
          onClose();
        });
      })
      .catch((err) => {
        alert("error occured when uploading");
        setLoadingUrl(false);
      });
  };

  const uploadImage = () => {
    setLoading(true);
    if (!image) {
      alert(
        "Error occurred when uploading. Make sure the file size is not above 3mb and its an image"
      );
      setLoading(false);
      return;
    }
    const data = new FormData();
    data.append("upload_preset", "xadvuvf2");
    data.append("cloud_name", "twitterprofilepicmanager");
    data.append("file", image);
    fetch(
      "https://api.cloudinary.com/v1_1/twitterprofilepicmanager/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((resp) => {
        if (resp.status !== 200) {
          throw error;
        }
        return resp.json();
      })
      .then((data) => {
        if (!data.url) {
          throw error;
        }
        axios.post(`/api/${view}`, { url: data.url }).then((res) => {
          view === "banners" ? setBanners(res.data) : setAvatars(res.data);
          setLoading(false);
          onClose();
        });
      })
      .catch((err) => {
        alert(
          "Error occurred when uploading. Make sure the file size is not above 3mb and its an image"
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Button mb={10} onClick={onOpen} bg='blue.500'>
        Upload
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight='bold' m={2}>
                File Upload
              </Text>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <Flex justifyContent='flex-end'>
                <Button isLoading={loading} onClick={uploadImage}>
                  Upload File
                </Button>
              </Flex>{" "}
            </Box>
            <Box mt={5}>
              <Text fontWeight='bold'>Upload via URL</Text>
              <Input
                errorBorderColor='red.500'
                isInvalid={invalidUrl}
                variant='outline'
                value={url}
                onChange={(e) => {
                  setInvalidUrl(false);
                  setURL(e.target.value);
                }}
                placeholder='Upload via URL'
              />
              <Flex w='100%' justifyContent='space-between'>
                <Text as='i' color='red.500'>
                  {invalidUrl ? "Invalid Url" : null}
                </Text>
                <Button isLoading={loadingUrl} onClick={uploadURL}>
                  Upload URL
                </Button>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
