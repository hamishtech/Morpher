import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function UploadModal({ setAvatars, setBanners, images_count, view }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (images_count > 5) {
    return (
      <Center>
        <Box mb={10}>Maximum of 6 pictures reached</Box>
      </Center>
    );
  }

  const uploadImage = () => {
    setLoading(true);
    if (!image) {
      alert("No image found");
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
      .then((resp) => resp.json())
      .then((data) => {
        axios.post(`/api/${view}`, { url: data.url }).then((res) => {
          view === "banners" ? setBanners(res.data) : setAvatars(res.data);
          setLoading(false);
          onClose();
        });
      })
      .catch((err) => {
        alert("error occured when uploading");
        setLoading(false);
        console.log(err);
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
            <div>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={loading} onClick={uploadImage}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
