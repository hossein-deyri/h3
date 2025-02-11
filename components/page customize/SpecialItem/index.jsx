import React, { useState, useEffect, useRef } from "react";
import { SpecialItemStyle } from "./SpecialItemStyle";
import SearchModal from "components/common/SearchModal";
import DeleteButton from "components/common/DeleteButton";
import uploadApi from "utilize/apis/uploadApi";
import { Add } from "@styled-icons/remix-fill/Add";
import {
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  ITEM_TYPE_ENUMS,
} from "utilize/constant/constants";
import { getProductList } from "services/productsServices/getProductList";
import { showError } from "utilize/toast";
import { PRODUCT_CATEGORY } from "utilize/constant/productCategory";

const SpecialItem = ({ slide, index, setSlider, uploading }) => {
  const [image, setImage] = useState();
  const [product, setProduct] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [fileState, setFileState] = useState(null);
  const [progress, setProgress] = useState();
  const [searchReset, setSearchReset] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (slide && !slide.isPlaceholder) {
      setImage({
        src: slide.file
          ? URL.createObjectURL(slide.file)
          : `${process.env.REACT_APP_API_URL_FILE}${slide.imagePath}`,
      });

      if (slide.productId) {
        fetchProduct(slide.productId);
      } else if (slide.product) {
        setProduct(slide.product);
      }
      setPreviewMode(true);
    } else {
      resetHandler();
    }
  }, [slide]);

  const resetHandler = () => {
    setPreviewMode(false);
    setProduct(null);
    setImage(null);
    setSubmitted(false);
    setError(false);
    setFileState(null);
    setSearchReset(false);
    setProgress(null);
  };

  const uploadImage = async () => {
    const data = await uploadApi({
      fileProp: slide.file,
      setProgress,
      field: IMAGES_ITEM_FIELD_TYPE_ENUMS.SPECIAL_BANNER.label,
      itemType: ITEM_TYPE_ENUMS.IMAGES.label,
    });
    setSlider(index, {
      ...slide,
      imagePath: data.result[0].file,
      file: undefined,
    });
    setProgress(null);
  };

  useEffect(() => {
    if (uploading) {
      uploadImage();
    }
  }, [uploading]);

  const fetchProduct = async (id) => {
    try {
      const response = await getProductList(id);
      setProduct(response);
    } catch (err) {
      showError();
    }
  };

  useEffect(() => {
    setError(!(image && product));
  }, [image, product]);

  const handlePreview = () => {
    setSubmitted(true);
    if (image || product) {
      setError(false);
      setSearchReset(true);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (submitted && !error) {
      setSlider(index, {
        file: fileState,
        productId: product?.id || null,
        isPlaceholder: false,
      });
      resetHandler();
    }
  }, [submitted, error]);

  const handleClosePreview = () => {
    if (slide.isPlaceholder) {
      setSlider(index, null);
    } else {
      setSlider(index, { isPlaceholder: true });
      resetHandler();
    }
  };

  return (
    <SpecialItemStyle image={previewMode && image?.src}>
      <div className="SpecialItemContainer">
        {!previewMode ? (
          <>
            <div>
              <p>محصول</p>
              <SearchModal
                className={`col-12 ms-0 ${submitted && !product && "invalid"}`}
                confirm={false}
                setProduct={setProduct}
                reset={searchReset}
                allowedCategories={[
                  PRODUCT_CATEGORY.SERIES.id,
                  PRODUCT_CATEGORY.MOVIE.id,
                  PRODUCT_CATEGORY.CERTIFICATED_COURSE.id,
                  PRODUCT_CATEGORY.COURSE.id,
                  PRODUCT_CATEGORY.OTHER.id,
                ]}
              />
            </div>
            <div>
              <div
                className="uploadField"
                onClick={() => inputRef.current.click()}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      fileState && URL.createObjectURL(fileState)
                    })`,
                  }}
                >
                  <img
                    src="/icon/upload-cloud-fill.svg"
                    className="uploadCloudIcon position-absolute start-50 top-50 translate-middle bg-white p-2"
                    alt="upload"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    ref={inputRef}
                    onClick={(e) => (e.target.value = "")}
                    onChange={(e) => setFileState(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <button onClick={handlePreview} className="mt-3 saveBtn">
              افزودن
              <span className="me-1">
                <Add />
              </span>
            </button>
          </>
        ) : (
          <>
            {progress && (
              <div style={{ height: `${progress}%` }} className="progressBar">
                {progress}%
              </div>
            )}
            <DeleteButton onClick={handleClosePreview} />
            <div className="hoverElement">
              <div className="productInfo text-white">
                <span>{product?.name}</span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.shortDescription,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </SpecialItemStyle>
  );
};

export default SpecialItem;
