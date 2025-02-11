import React from "react";
import UploadImage from "components/content/add/upload/image";
import UploadVideo from "components/content/add/upload/video";
import {
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  VIDEO_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";
export default function VisualContent({
  values,
  errors,
  setFieldValue,
  ...props
}) {
  return (
    <>
      <div className="d-flex flex-wrap w-100 rounded">
        <div className="right d-flex flex-column col-lg-6 col-12">
          <div className="d-flex flex-column mb-3">
            <h6 className="fs-14">بارگذاری پوستر</h6>
            <div className="fs-12 lh-description my-1">
              <p className="description-color">
                <span className="text-danger">* </span>این فایل با فرمت بوده JPG
                و نسبت تناسب 2:3 و اندازه آن 750*500 میابشد
              </p>

              <p className="description-color">
                <span className="text-danger">* </span> فایل دوم با فرمت بوده
                JPG و نسبت تناسب 3:2 و اندازه آن 500*750 میابشد
              </p>

              <p className="description-color">
                <span className="text-danger">* </span>ترجیحا حجم فایل جهت آپلود
                زیر 100 کیلوبایت باشد
              </p>
            </div>
            <div className="d-flex">
              <UploadImage
                CSSClass="col-1_5"
                minHeight="140px"
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.POSTER.label}
                value={values.POSTER}
                setFieldValue={setFieldValue}
                productID={props.productID}
              />

              {values?.category === "EPISODE" ? (
                <UploadImage
                  field={IMAGES_ITEM_FIELD_TYPE_ENUMS.POSTER_VERTICAL.label}
                  value={values.POSTER_VERTICAL}
                  setFieldValue={setFieldValue}
                  productID={props.productID}
                  isVertical
                />
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-column">
            <h6 className="fs-14">بارگذاری اسلایدر</h6>
            <div className="fs-12 lh-description my-1">
              <p className="description-color">
                <span className="text-danger">* </span>اسلایدر وب با فرمت JPG
                بوده و نسبت تناسب آن 3:1 و اندازه آن 640*1920 میابشد
              </p>
              <p className="description-color">
                <span className="text-danger">* </span>اسلایدر موبایل با فرمت
                JPG بوده و نسبت تناسب آن 5:6 و اندازه آن 960*1152 میابشد
              </p>
              <p className="description-color">
                <span className="text-danger">* </span>ترجیحا حجم فایل جهت آپلود
                زیر 100 کیلوبایت باشد
              </p>
            </div>
            <div className="d-flex flex-wrap ">
              <UploadImage
                CSSClass="mobileImage mb-lg-0 mb-3 ms-lg-2 ms-5"
                minHeight="140px"
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.BANNER_MOBILE.label}
                value={values.BANNER_MOBILE}
                setFieldValue={setFieldValue}
                productID={props.productID}
              />
              <UploadImage
                CSSClass="col-lg-8 col-8"
                minHeight="140px"
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.BANNER.label}
                value={values.BANNER}
                setFieldValue={setFieldValue}
                productID={props.productID}
              />
            </div>
          </div>
        </div>

        <div className="left pe-3 d-flex flex-column col-12 col-lg-6">
          <div className="d-flex flex-column flex-wrap mb-4">
            <h6 className="fs-14">بارگذاری لوگو</h6>
            <div className="fs-12 lh-description my-1">
              <p className="description-color">
                <span className="text-danger">* </span>این فایل با فرمت PNG بوده
                و نسبت تناسب آن آزاد است. نهایت ارتفاع برای لوگو ۱۲۰ پیکسل می
                باشد
              </p>
            </div>
            <div className="d-flex">
              <UploadImage
                CSSClass="col-3"
                minHeight="80px"
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.LOGO.label}
                value={values.LOGO}
                setFieldValue={setFieldValue}
                productID={props.productID}
              />
            </div>
          </div>

          <div className="d-flex flex-column">
            <h6 className="fs-14">بارگذاری تیزر</h6>
            <div className="fs-12 lh-description my-1">
              <p className="description-color">
                <span className="text-danger">* </span>در این قسمت شما میتوانید
                تیزر مربوطه را بارگزاری فرمایید
              </p>
            </div>
            <UploadVideo
              CSSClass="col-6 fs-12 mb-3"
              minHeight="170px"
              field={VIDEO_ITEM_FIELD_TYPE_ENUMS.TRAILER.label}
              setFieldValue={setFieldValue}
              productID={props.productID}
              product={values}
            />
          </div>
        </div>
      </div>
    </>
  );
}
