import { useState, useEffect } from "react";
import styled from "styled-components";
import UploadImage from "components/content/add/upload/image";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import SearchModal from "components/common/SearchModal";
import { postSpecialsMainPage } from "./../../../services/specialsServices/postSpecials";
import { toast } from "react-toastify";
import { PRODUCT_CATEGORY } from "utilize/constant/productCategory";

function SeriesPreview({ menuId, id }) {
  const [imagePath, setImagePath] = useState();
  const [product, setProduct] = useState();

  const [previewMode, setPreviewMode] = useState(false);

  const [searchReset, setSearchReset] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errorText, setErrorText] = useState(true);

  useEffect(() => {
    setPreviewMode(true);
  }, []);

  useEffect(() => {
    if (product && product.category === "SEASON") {
      setErrorText(false);
    } else {
      setErrorText(true);
    }
  }, [product]);

  const resetHandler = () => {
    setImagePath(null);
    setPreviewMode(false);
  };

  const settingData = async () => {
    const data = [
      {
        ...(imagePath && {
          imagePath: imagePath.replace(/^.*\/\/[^\/]+/, ""),
        }),
        productId: product.id,
        type: "SERIES",
      },
    ];

    await postSpecialsMainPage(JSON.stringify(data), setPreviewMode);
    toast.success("سریال ویژه با موفقیت ساخته شد");
  };

  const previewHandler = async () => {
    if (imagePath && product?.category === "SEASON") {
      settingData();
    } else {
      toast.warning("لطفا فقط فصل مورد نظر را انتخاب فرمایید");
    }
  };

  return (
    <NormalDelimiterStyle>
      <div className="sectionTitle">بخش سریال ویژه</div>
      {!previewMode ? (
        <>
          <div className="d-flex d-flex">
            <div className="uploadHolder">
              <UploadImage
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.NORMAL_DELIMITER.label}
                value={imagePath}
                setFieldValue={setImagePath}
                htmlContent={"660 * 1920"}
              />

              <div style={{ width: "100%" }}>
                <p className="mt-5">محصول</p>
                <SearchModal
                  className={`col - 12 ms - 0 ${
                    submitted && !product && "invalid"
                  } `}
                  confirm={false}
                  setProduct={setProduct}
                  reset={searchReset}
                  allowedCategories={[PRODUCT_CATEGORY.SEASON.id]}
                />
              </div>
            </div>
          </div>
          <div>
            <button onClick={previewHandler} className="submitBtn">
              ذخیره دسته سریال
            </button>
          </div>
        </>
      ) : (
        <div className="previewHolder">
          <div className="d-flex py-5">
            <div className="col-6 imgHolder">
              <img
                src={`${process.env.REACT_APP_API_URL_FILE}${imagePath}`}
                alt="لطفا یک عکس استاتیک جایگزین کنید"
              />
            </div>
          </div>
          <button onClick={resetHandler} className="saveBtn">
            حذف
          </button>
        </div>
      )}
    </NormalDelimiterStyle>
  );
}
export default SeriesPreview;

export const NormalDelimiterStyle = styled.div`
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #919baa;
  .previewHolder {
    position: relative;
  }
  .imgHolder {
    padding: 5px;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
  }

  > div {
    padding: 10px;
    .uploadHolder {
      display: flex;
      flex-direction: row;
      gap: 30px;
      width: 100%;

      .uploadField {
        height: 250px;
        width: 90%;
        img {
          width: auto;
          height: 55px;
        }
      }
      input {
        width: 90%;
      }
    }
  }
`;
