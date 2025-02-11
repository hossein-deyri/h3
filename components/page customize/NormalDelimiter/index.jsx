import { useState, useEffect } from "react";
import { NormalDelimiterStyle } from "./NormalDelimiterStyle";
import UploadImage from "components/content/add/upload/image";
import { get, post } from "services/httpService";
import { endpoints } from "endpoints";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import getNormalDelimiters from "./../../../services/normalDelimiterServices/getNormalDelimiters";
import postNormalDelimiters from "services/normalDelimiterServices/postNormalDelimiters";

const NormalDelimiter = ({ id, menuId, ...props }) => {
  const [leftImage, setLeftImage] = useState();
  const [rightImage, setRightImage] = useState();
  const [rightImageLink, setRightImageLink] = useState();
  const [leftImageLink, setLeftImageLink] = useState();
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    (async () => {
      const normalDelimitersData = await getNormalDelimiters(id);

      setPreviewMode(true);
      setLeftImage(normalDelimitersData.leftImagePath);
      setRightImage(normalDelimitersData.rightImagePath);
    })();
  }, [menuId]);

  const resetHandler = () => {
    setLeftImage(null);
    setRightImage(null);
    setPreviewMode(false);
  };

  const settingData = async () => {
    const dataBody = {
      id: id,
      rightImageLink: rightImageLink,
      leftImageLink: leftImageLink,
      ...(leftImage && {
        leftImagePath: leftImage.replace(/^.*\/\/[^\/]+/, ""),
      }),
      ...(rightImage && {
        rightImagePath: rightImage.replace(/^.*\/\/[^\/]+/, ""),
      }),
    };

    await postNormalDelimiters(JSON.stringify(dataBody), setPreviewMode);
  };

  const previewHandler = async () => {
    if (leftImage && rightImage && leftImageLink && rightImageLink) {
      settingData();
    }
  };

  return (
    <NormalDelimiterStyle>
      <div className="sectionTitle">تبلیغات ویژه</div>
      {!previewMode ? (
        <>
          <div className="d-flex d-flex">
            <div className="uploadHolder">
              <UploadImage
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.NORMAL_DELIMITER.label}
                value={rightImage}
                setFieldValue={setRightImage}
              />
              <input
                type="text"
                placeholder="لینک تصویر"
                className=" form-control mt-2"
                value={rightImageLink}
                onChange={(e) => setRightImageLink(e.target.value)}
              />
            </div>

            <div className="uploadHolder">
              <UploadImage
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.NORMAL_DELIMITER.label}
                value={leftImage}
                setFieldValue={setLeftImage}
              />
              <input
                type="text"
                placeholder="لینک تصویر"
                className=" form-control mt-2"
                value={leftImageLink}
                onChange={(e) => setLeftImageLink(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button onClick={previewHandler} className="submitBtn">
              ذخیره دسته بندی اسلایدر
            </button>
          </div>
        </>
      ) : (
        <div className="previewHolder">
          <div className="d-flex py-5">
            <div className="col-6 imgHolder">
              <img
                src={`${process.env.REACT_APP_API_URL_FILE}${rightImage}`}
                alt="nobino"
              />
            </div>
            <div className="col-6 imgHolder">
              <img
                src={`${process.env.REACT_APP_API_URL_FILE}${leftImage}`}
                alt="nobino"
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
};

export default NormalDelimiter;
