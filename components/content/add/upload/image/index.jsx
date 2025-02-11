import React, { useEffect, useRef, useState } from "react";

import uploadApi from "utilize/apis/uploadApi";
import { actionRemoveApi, deleteImagesApi } from "utilize/apis/deleteApi";
import { ProgressBar } from "primereact/progressbar";
import { ITEM_TYPE_ENUMS } from "utilize/constant/constants";

export default function UploadImage(props) {
  const {
    field,
    value,
    values,
    CSSClass,
    productID,
    minHeight,
    isCarousel,
    isVertical,
    setFieldValue,
    htmlContent
  } = props;

  const Ref = useRef();
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState();

  /**
   * This useEffect tries to find the url from value and values.
   * Also the comment is, the url should be raw it means it doesn't have
   * any domains.
   */
  useEffect(() => {
    if (
      value &&
      typeof value === "object" &&
      value.src &&
      value.src.includes("http")
    ) {
      const urlObj = new URL(value.src);
      if (!urlObj?.pathname.includes("undefined")) {
        setUrl(urlObj.pathname);
      } else {
        setUrl("");
      }
    }

    if (
      value &&
      typeof value === "object" &&
      value.src &&
      !value.src.includes("http")
    ) {
      setUrl(value.src);
    }

    if (
      value &&
      typeof value !== "object" &&
      value !== null &&
      value.includes("http")
    ) {
      const urlObj = new URL(value);
      setUrl(urlObj.pathname);
    }

    if (
      value &&
      typeof value !== "object" &&
      value !== null &&
      !value.includes("http")
    ) {
      setUrl(value);
    }

    if (
      values &&
      values.images &&
      values.images.src &&
      values.images.src.includes("http")
    ) {
      const urlObj = new URL(values.images.src);
      setUrl(urlObj.pathname);
    }

    if (value && value.imagePath && value.imagePath.includes("http")) {
      const urlObj = new URL(value.imagePath);
      setUrl(urlObj.pathname);
    }

    if (value && value.imagePath && !value.imagePath.includes("http")) {
      setUrl(value.imagePath);
    }

    if (
      value &&
      value.imagePath &&
      value.imagePath.src &&
      value.imagePath.src.includes("http")
    ) {
      const urlObj = new URL(value.imagePath.src);
      setUrl(urlObj.pathname);
    }

    if (
      value &&
      value.imagePath &&
      value.imagePath.src &&
      !value.imagePath.src.includes("http")
    ) {
      setUrl(value.imagePath.src);
    }

    if (values && values.logo) {
      setUrl(values.logo);
    }
  }, [value, values]);

  /**
   * function of removing image
   *
   * @param {object} e
   */
  const removeImage = async (e) => {
    try {
      e.stopPropagation();
      const hostUrl = props.isChannel
        ? process.env.REACT_APP_API_URL_CHANNEL
        : process.env.REACT_APP_API_URL_FILE;

      if (value && value.id) {
        await deleteImagesApi(value.id);
      } else {
        await actionRemoveApi(hostUrl, url);
      }

      if (productID && !props.itemList) {
        const _value = { ...props.value };
        if (_value.imagePath) _value.imagePath = null;
        if (_value.images && _value.images) _value.images = null;
        setFieldValue(_value);
      }

      if (props.itemList) {
        const _values = { ...props.values };
        if (_values.imagePath) _values.imagePath = null;
        if (_values.images && _values.images) _values.images = null;
        setFieldValue(_values);
      }

      if (!props.itemList && !productID) {
        setFieldValue(!props.justRemove ? (field, "") : null);
      }

      if (values?.logo) {
        const _values = { ...values };
        _values.logo = "";
        setFieldValue(_values);
      }
      setUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handle image upload functionality
   *
   * @param {object} e
   */
  const uploadingImageHandler = async (e) => {
    uploadApi({
      field,
      setProgress,
      setFieldValue,
      fileProp: e.target.files[0],
      itemType: ITEM_TYPE_ENUMS.IMAGES.label,
      ...(productID && { productID }),
      ...(props.itemList && { itemList: true }),
      ...(props.isChannel && { isChannel: true }),
      ...(props.itemList && { values: props.values }),
    });
  };

  return (
    <div
      className={` uploadField  ${CSSClass}`}
      style={{
        minHeight: minHeight,
        ...(isCarousel && { width: "100%" }),
        ...(isVertical && {
          width: "140px",
          height: "110px",
          marginRight: "20px",
        }),
      }}
    >
      <div
        className={`position-relative start-0 top-0 h-100 b g-size-cover ${isCarousel && "query-height"
          }`}
        style={{
          borderRadius: 5,
          background: `#e6ebf0 url(${props.isChannel
              ? process.env.REACT_APP_API_URL_CHANNEL + url
              : process.env.REACT_APP_API_URL_FILE + url
            }) no-repeat center center `,
        }}
        onClick={() => Ref.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          className="d-none"
          ref={Ref}
          onChange={uploadingImageHandler}
          disabled={!!(url?.length > 2)}
        />
        {!!(url?.length > 2) ? (
          <button
            className="position-absolute start-50 bottom-0 translate-middle btn btn-danger w-0 px-3 py-2 rounded-circle"
            onClick={removeImage}
          >
            x
          </button>
        ) : (
          <>
            <img
              src="/icon/upload-cloud-fill.svg"
              className="uploadCloudIcon position-absolute start-50 top-50 translate-middle bg-white p-2"
              alt="nobino"
            />
            {!!htmlContent && (

              <div className="uploadCloudIcon position-absolute start-50 top-50 translate-middle p-2 mt-5">
                {htmlContent}
              </div>
            )}
          </>
        )}
        {!!(url?.length > 2) && progress < 100 && (
          <ProgressBar value={progress} style={{ direction: "ltr" }} />
        )}
      </div>
    </div>
  );
}
