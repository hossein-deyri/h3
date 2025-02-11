import { useState, useEffect } from "react";
import { BigDelimiterStyle, BigDelimiterPreview } from "./BigDelimiterStyle";
import UploadImage from "components/content/add/upload/image";
import { endpoints } from "endpoints";
import { get, post } from "services/httpService";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import getBigDelimiters from "services/bigDelimitersServices/getBigDelimiters";
import postBigDelimiters from "services/bigDelimitersServices/postBigDelimiters";

const BigDelimiter = ({ id, menuId, field, ...props }) => {
  const [title, setTitle] = useState();
  const [buttonCaption, setButtonCaption] = useState();
  const [buttonLink, setButtonLink] = useState();
  const [leftImage, setLeftImage] = useState();
  const [rightImage, setRightImage] = useState();
  const [previewMode, setPreviewMode] = useState(false);
  // const [background, setBackground] = useState();
  // const [description, setDescription] = useState();

  const resetHandler = () => {
    setPreviewMode(false);
    setTitle(null);
    setRightImage(null);
    setLeftImage(null);
    setButtonLink(null);
    setButtonCaption(null);
    // setBackground(null);
    // setDescription(null);
  };

  useEffect(() => {
    (async () => {
      const bigDelimitersData = await getBigDelimiters(id);

      setTitle(bigDelimitersData.title);
      if (bigDelimitersData.rightImagePath) {
        setRightImage(bigDelimitersData.rightImagePath);
        setLeftImage(bigDelimitersData.leftImagePath);
      } else {
        setRightImage(null);
      }
      setButtonLink(bigDelimitersData.buttonLink);
      setButtonCaption(bigDelimitersData.buttonCaption);
      setPreviewMode(true);
      // setDescription(bigDelimitersData.description);
      // setBackground(bigDelimitersData.backgroundImagePath);
    })();
  }, [menuId]);

  const previewHandler = async () => {
    const requestBody = {
      id: id,
      title: title,
      buttonLink: buttonLink,
      buttonCaption: buttonCaption,
      leftImagePath: leftImage?.replace(/^.*\/\/[^\/]+/, ""),
      rightImagePath: rightImage?.replace(/^.*\/\/[^\/]+/, ""),
      // backgroundImagePath: background.replace(/^.*\/\/[^\/]+/, ""),
      // description: description,
    };

    await postBigDelimiters(JSON.stringify(requestBody), setPreviewMode);
  };

  return (
    <BigDelimiterStyle>
      <div className="sectionTitle">برگزیده ها</div>
      {!previewMode ? (
        <>
          <div className="titleHolder mb-3">
            <span className="mb-3 d-block">عنوان</span>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* <div className="backgroundHolder">
            <span className="mb-3 d-block">تصویر پس زمینه</span>
            <UploadImage
              field={IMAGES_ITEM_FIELD_TYPE_ENUMS.BIG_DELIMITER.label}
              value={background}
              setFieldValue={setBackground}
              CSSClass="backgroundImage"
            />
          </div> */}

          <div className="imageHolder ">
            <div className="image ">
              <span className="mb-3 d-block">تصویر موبایل</span>
              <UploadImage
                minHeight="140px "
                field={
                  field || IMAGES_ITEM_FIELD_TYPE_ENUMS.BIG_DELIMITER.label
                }
                value={rightImage}
                CSSClass="smallImages smallWidth"
                setFieldValue={setRightImage}
              />
            </div>
            <div>
              <span className="mb-3 d-block">تصویر دسکتاپ </span>
              <UploadImage
                minHeight="140px"
                field={
                  field || IMAGES_ITEM_FIELD_TYPE_ENUMS.BIG_DELIMITER.label
                }
                CSSClass="smallImages bigWidth"
                value={leftImage}
                setFieldValue={setLeftImage}
              />
            </div>
          </div>

          {/* <div className="descriptionHolder p-3">
            <span className="mb-3 d-block">توضیحات</span>
            <textarea
              className="form-control"
              rows={4}
              cols={50}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div> */}

          <div className="btnHolder">
            <span className="mb-3 d-block">اطلاعات دکمه</span>
            <div className="d-flex">
              {/* <input
                className="form-control ms-3"
                placeholder="متن دکمه"
                type="text"
                value={buttonCaption}
                onChange={(e) => setButtonCaption(e.target.value)}
              /> */}
              <input
                className="form-control me-3"
                placeholder="لینک دکمه"
                type="text"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
              />
            </div>
          </div>
          <button onClick={previewHandler} className="saveBtn mt-3">
            ذخیره
          </button>
        </>
      ) : (
        <>
          <BigDelimiterPreview
            // backgroundImage={
            //   previewMode &&
            //   `${process.env.REACT_APP_API_URL_FILE}${background}`
            // }
            withoutImage={rightImage}
            className={`d-flex flex-wrap p-2 text-white `}
          >
            {/* <button onClick={resetHandler} className='closePreview'><Close /></button> */}

            <div
              className={`d-flex col-12 flex-wrap flex-column ${
                !rightImage && "justify-content-center align-items-center"
              }`}
            >
              <h5>{title && title}</h5>
              {/* <span>{description && description}</span> */}
              {rightImage && (
                <div className="position-relative imgHolder ">
                  <img
                    src={`${process.env.REACT_APP_API_URL_FILE}${rightImage}`}
                    alt="nobino"
                  />
                  <img
                    src={`${process.env.REACT_APP_API_URL_FILE}${leftImage}`}
                    alt="nobino"
                  />
                </div>
              )}
              {/* <div className="btnHolder col-6  mt-5 mb-3 d-flex justify-content-center">
                <a href={buttonLink}>
                  <button className="darkBtn px-4 py-3">
                    {buttonCaption && buttonCaption}
                  </button>
                </a>
              </div> */}
            </div>
          </BigDelimiterPreview>
          <button onClick={resetHandler} className="saveBtn mt-3">
            حذف
          </button>
        </>
      )}
    </BigDelimiterStyle>
  );
};

export default BigDelimiter;
