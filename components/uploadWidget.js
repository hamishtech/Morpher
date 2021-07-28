import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Upload = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
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
        axios.post("/api/avatars", { url: data.url }).then((res) => {
          window.location.reload();
        });
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <Button onClick={uploadImage}>Upload</Button>
      </div>
    </div>
  );
};
export default Upload;
