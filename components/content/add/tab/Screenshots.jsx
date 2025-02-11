import React, { useState, useRef, useEffect } from "react";
import UploadVideo from "components/content/add/upload/video";
import { Close } from "@styled-icons/remix-fill/Close";
import uploadApi from "utilize/apis/uploadApi";
import { deleteImagesApi } from "utilize/apis/deleteApi";
import Duration from "components/common/Duration";

import { Check } from "@styled-icons/remix-fill/Check";
import {
  CONST_NEW,
  CONST_POSTED,
  CONST_SELECTED,
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  ITEM_TYPE_ENUMS,
  VIDEO_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";

export default function Screenshots({
  values,
  screenshots,
  setFieldValue,
  productID,
}) {
  const [submitState, setSubmitState] = useState(false);
  const screenshotInputRef = useRef();

  useEffect(() => {
    screenshots.find((item) => item.state === CONST_SELECTED)
      ? setSubmitState(true)
      : setSubmitState(false);
  }, [screenshots]);

  const addScreenshot = (e) => {
    const newScreenshots = [...screenshots];
    for (let i = 0; i < e.target.files.length; i++) {
      newScreenshots.push({
        src: e.target.files[i],
        state: CONST_NEW,
      });
    }
    setFieldValue(
      IMAGES_ITEM_FIELD_TYPE_ENUMS.SCREEN_SHOT.label,
      newScreenshots
    );
  };

  const selectScreenshot = (index) => {
    const newScreenshots = screenshots.map((sc, i) => {
      if (i === index) {
        return {
          src: sc.src,
          state:
            sc.state === CONST_NEW
              ? CONST_SELECTED
              : sc.state === CONST_SELECTED
              ? CONST_NEW
              : CONST_POSTED,
        };
      } else {
        return sc;
      }
    });
    setFieldValue(
      IMAGES_ITEM_FIELD_TYPE_ENUMS.SCREEN_SHOT.label,
      newScreenshots
    );
  };

  const removeScreenshot = (id, index, e) => {
    e.stopPropagation();
    const screenshotsTemp = screenshots.filter((sc, i) =>
      i !== index ? sc : null
    );
    setFieldValue(
      IMAGES_ITEM_FIELD_TYPE_ENUMS.SCREEN_SHOT.label,
      screenshotsTemp
    );
    if (id) {
      deleteImagesApi(id);
    }
  };

  const sendScreenshot = () => {
    for (let i = 0; i < screenshots.length; i++) {
      if (screenshots[i].state === CONST_SELECTED) {
        uploadApi({
          fileProp: screenshots[i].src,
          productID,
          setFieldValue: setFieldValue,
          values: screenshots,
          index: i,
          itemType: ITEM_TYPE_ENUMS.IMAGES.label,
          field: IMAGES_ITEM_FIELD_TYPE_ENUMS.SCREEN_SHOT.label,
        });
        setSubmitState(false);
      }
    }
  };
  return (
    <div className="screenshots">
      <div className="d-flex flex-wrap">
        <div className="right col-lg-6 col-12 mb-lg-0 mb-5">
          <div className="upload-video ">
            <h6>بارگذاری ویدیو</h6>
            <div className="fs-12 my-2">
              <p className="description-color m-0">
                <span className="text-danger">* </span>فایل ویديویی شما باید با
                فرمت MP4 باشد
              </p>
              <p className="description-color m-0">
                <span className="text-danger">* </span>
                بعد از اتمام آپلود، کیفیت‌های مختلف لایه های پایین تر ویدیو به
                صورت خودکار ساخته خواهند شد
              </p>
            </div>
            <div className="d-flex col-10 mb-3">
              <UploadVideo
                CSSClass="col-8 fs-12"
                minHeight="170px"
                field={VIDEO_ITEM_FIELD_TYPE_ENUMS.MAIN.label}
                setFieldValue={setFieldValue}
                product={values}
                productID={productID}
                hasLowerResolution
              />
            </div>
            <div className="d-flex col-9 mb-4 fs-12">
              {values?.videos?.find((item) => item.type === "MAIN") && (
                <span>
                  {" "}
                  مدت زمان ویدیو :{" "}
                  <Duration
                    seconds={
                      values?.videos?.find((item) => item.type === "MAIN")
                        ?.duration
                    }
                  />{" "}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="left col-lg-6 col-12 mt-lg-0 mt-5">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <h6>اسکرین شات ها</h6>
              <span className="me-1">(انتخاب 10 مورد)</span>
            </div>
            <div className="fs-12 my-2">
              <p className="description-color m-0">
                <span className="text-danger">* </span>بعد از بارگذاری ویدئو شما
                میتوانید از گزینه ساخت اسکرین شات از ویدئو استفاده کنید
              </p>
              <p className="description-color m-0">
                <span className="text-danger">* </span>حداکثر ده اسکرین شات جهت
                نمایش در وب سایت نوبینو میتوانید انتخاب کنید
              </p>
            </div>
            <div className="mt-2 mb-5">
              <button
                className="btn btn-dark ms-3"
                onClick={() => screenshotInputRef.current.click()}
              >
                افزودن اسکرین شات
              </button>
              <button className="btn btn-primary">ساخت اسکرین شات</button>
              <input
                type="file"
                className="d-none"
                ref={screenshotInputRef}
                onChange={addScreenshot}
                multiple={true}
              />
            </div>
            <div className="gallery mx-auto mb-lg-0 mb-4">
              {screenshots.length > 0 && (
                <div className="d-flex flex-wrap overflow-auto">
                  {screenshots.map((sc, index) => (
                    <div
                      className={`images screenshotBox position-relative m-2 `}
                      onClick={() => selectScreenshot(index)}
                    >
                      <img
                        src={
                          typeof sc.src === "object"
                            ? URL.createObjectURL(sc.src)
                            : sc.src
                        }
                        width="150px"
                        height="80px"
                      />
                      <Close
                        className="position-absolute close "
                        onClick={(e) => removeScreenshot(sc.id, index, e)}
                        style={{ zIndex: 50 }}
                      />
                      <div
                        className="position-absolute screenshotActive start-0 top-0 w-100 h-100 "
                        style={{ zIndex: 1 }}
                      >
                        <div
                          className={
                            sc.state === "new"
                              ? ""
                              : sc.state === "selected"
                              ? "blueBg"
                              : "greenBg"
                          }
                        ></div>
                        {sc.state === "selected" && <Check />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className={`btn btn-primary ${!submitState && "disabled"}`}
              type="button"
              onClick={sendScreenshot}
            >
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
