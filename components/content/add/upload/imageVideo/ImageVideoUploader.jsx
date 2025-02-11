import React, { useEffect, useRef, useState } from "react";
import { actionRemoveApi } from "utilize/apis/deleteApi";
import { showError, showSuccess } from "utilize/toast";
import { ITEM_TYPE_ENUMS } from "utilize/constant/constants";
import uploadApi from "utilize/apis/uploadApi";
import { ProgressBar } from "primereact/progressbar";
import DeleteButton from "components/common/DeleteButton";
import { ImageVideoUploaderStyles } from "./ImageVideoUploaderStyles";

export const ImageVideoUploader = ({
  value,
  setFieldValue,
  imageFieldType,
  videoFieldType,
  previewHorizontalRatio = 1,
  previewVerticalRatio = 1,
  hasError = false,
}) => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const inputRef = useRef();
  const isImage = file?.type.startsWith("image/");

  const onInputChange = (e) => {
    const newFile = e.target.files[0];
    const isNewFileImage = newFile.type.startsWith("image/");

    setLoadingState(true);

    uploadApi({
      field: isNewFileImage ? imageFieldType?.label : videoFieldType?.label,
      setProgress,
      setFieldValue,
      fileProp: newFile,
      itemType: isNewFileImage
        ? ITEM_TYPE_ENUMS.IMAGES.label
        : ITEM_TYPE_ENUMS.VIDEOS.label,
    })
      .then(() => {
        setFile(newFile);
        showSuccess("فایل با موفقیت آپلود شد");
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const onRemoveFile = async (e) => {
    setLoadingState(true);

    await actionRemoveApi(
      process.env.REACT_APP_API_URL_FILE,
      value?.file || value
    )
      .then(() => {
        inputRef.current.value = "";
        setFile(null);
        setProgress(0);
        setFieldValue(null);
        showSuccess("فایل حذف گردید");
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  useEffect(() => {
    if (!value) setFile(null);
  }, [value]);

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*,video/*"
        ref={inputRef}
        onChange={onInputChange}
      />

      <ImageVideoUploaderStyles
        {...{
          previewHorizontalRatio,
          previewVerticalRatio,
        }}
        onClick={() => !file && inputRef.current.click()}
        className={`${loadingState ? "" : file ? "with-file" : "is-button"} ${
          hasError ? "has-error" : ""
        }`}
      >
        {loadingState ? (
          <>
            <div className="spinner-wrapper">
              <div className="spinner-border" />
            </div>
            {!!(!file && progress < 100) && (
              <ProgressBar
                className="progress"
                value={progress}
                style={{ direction: "ltr" }}
                color="#e21221"
              />
            )}
          </>
        ) : file ? (
          <>
            {isImage ? (
              <img
                className="preview-image"
                src={URL.createObjectURL(file)}
                alt="preview"
              />
            ) : (
              <video playsInline autoPlay loop muted className="preview-image">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            )}
            <DeleteButton onClick={onRemoveFile} />
          </>
        ) : (
          <img
            className="upload-button"
            role="button"
            src="/icon/upload-cloud-fill.svg"
            alt="upload-button"
          />
        )}
      </ImageVideoUploaderStyles>
    </>
  );
};

export default ImageVideoUploader;
