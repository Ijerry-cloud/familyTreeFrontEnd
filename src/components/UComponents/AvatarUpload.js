import { Avatar, Button as MuiButton, Typography } from "@mui/material";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@mui/icons-material";
import { spacing } from '@mui/system';
import React, { createRef, useState } from "react";
import { styled } from '@mui/system';

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled('div')`
  text-align: center;
  width: 100%;
  backgroundColor: red
`;

const BigAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
  margin: 0 auto; ${(props) => props.theme.spacing(2)}px;
`;

const AvatarUpload = ({handleImage, url}) => {
  const [image, _setImage] = useState(url);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
    handleImage(null, null);
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];
    let url;

    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      handleImage(url, reader.result, "add");
    }
    
    let base64FileString;
    
    if (newImage) {
      url = URL.createObjectURL(newImage);   
      reader.readAsDataURL(newImage);
      console.log("am abou to pas the dile string", base64FileString);
      // handleImage(url, base64FileString, "add");
      setImage(url);
    }
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <CenteredContent>
      <BigAvatar
        alt="Avatar"
        src={image || "/static/img/avatars/default-profile.svg"}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          m={2}
          onClick={handleClick}
        >
          {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {image ? "Remove" : "Upload"}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom >
        Please select an image to upload
      </Typography>
    </CenteredContent>
  );
};

export default AvatarUpload;