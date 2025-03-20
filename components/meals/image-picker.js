"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handleImagePick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    } else {
      const fileReader = new FileReader();
      // To store the url
      fileReader.onload = () => {
        setPickedImage(fileReader.result);
      };
      //To get data url for the image to use it in the src prop of the image tag
      fileReader.readAsDataURL(file);
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image Picked by user" fill />
          )}
        </div>
        <input
          type="file"
          className={classes.input}
          id={name}
          accept="image/png, image/jpeg, image/webp"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          onClick={handleImagePick}
          className={classes.button}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
