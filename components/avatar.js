import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Avatar = () => {
  const [uploading, setUploading] = useState(false);

  async function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async function handleUpload(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      console.log(event.target.files);

      const file = event.target.files[0];
      const base64 = await getBase64(file);

      axios.post("/api/avatars/", { base64 });
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Box>Upload a picture</Box>
      <Button>Upload</Button>
      <label htmlFor='single'>upload</label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type='file'
        id='single'
        accept='image/*'
        onChange={handleUpload}
        disabled={uploading}
      />
    </>
  );
};

export default Avatar;
