import { useState, useEffect } from "react";
import { SliderItemStyle } from "./SliderItemStyle";
import SearchModal from "components/common/SearchModal";
import DeleteButton from "components/common/DeleteButton";
import { get } from "services/httpService";
import { endpoints } from "endpoints";
import {
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
  VIDEO_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";
import ImageVideoUploader from "components/content/add/upload/imageVideo/ImageVideoUploader";
import isVideoPath from "utilize/slider/isVideoPath";
import { PRODUCT_CATEGORY } from "utilize/constant/productCategory";

const SliderItem = ({ slide, bannerType, sliderRef, ...props }) => {
  const [modeState, setModeState] = useState("product");
  const [mobileBanner, setMobileBanner] = useState();
  const [desktopBanner, setDesktopBanner] = useState();
  const [product, setProduct] = useState();
  const [link, setLink] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [shouldResetSearchInput, setShouldResetSearchInput] = useState(false);

  const resetHandler = () => {
    setPreviewMode(false);
    setLink(null);
    setProduct(null);
    setDesktopBanner(null);
    setMobileBanner(null);
    setSubmitted(false);
    setError(true);
  };

  const gettingProduct = async (id) => {
    const url = props.isLivePage ? endpoints.LIVES : endpoints.PRODUCTS();
    await get(url + id)
      .then(({ data }) => setProduct(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (slide) {
      setDesktopBanner({
        src: `${process.env.REACT_APP_API_URL_FILE}${slide.imageHorizontalPath}`,
      });
      setMobileBanner({
        src: `${process.env.REACT_APP_API_URL_FILE}${slide.imageVerticalPath}`,
      });
      setLink(slide.link && slide.link);
      if (slide.productId) {
        gettingProduct(slide.productId);
      } else {
        setProduct(slide.product && slide.product);
      }
      setPreviewMode(true);
    } else {
      resetHandler();
    }
  }, [slide]);

  useEffect(() => {
    if (desktopBanner && mobileBanner && (product || link)) {
      setError(false);
    }
  }, [desktopBanner, link, mobileBanner, product]);

  const inputChangeHandler = (e) => {
    setLink(e.target.value);
  };

  const previewHandler = async () => {
    setSubmitted(true);
    if (desktopBanner && mobileBanner && (product || link)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (submitted && !error) {
      const desktopBannerFile = desktopBanner.file || desktopBanner;
      const mobileBannerFile = mobileBanner.file || mobileBanner;

      props.setSlider((prevSlider) => [
        {
          ...(product?.link && { link: product.link }),
          ...(!props.isLivePage && { product: product ? product : null }),
          ...(desktopBannerFile && {
            imageHorizontalPath: desktopBannerFile.replace(/^.*\/\/[^\/]+/, ""),
          }),
          ...(mobileBannerFile && {
            imageVerticalPath: mobileBannerFile.replace(/^.*\/\/[^\/]+/, ""),
          }),
          ...(props.isLivePage && {
            liveId: product ? product?.id : null,
          }),
        },
        ...prevSlider,
      ]);

      // slide to index 1, the first uploaded slider
      sliderRef.current.slickGoTo(1);

      setDesktopBanner(null);
      setMobileBanner(null);
      setSubmitted(false);
      setShouldResetSearchInput(true);
    }
  }, [error, submitted]);

  useEffect(() => {
    shouldResetSearchInput && setShouldResetSearchInput(false);
  }, [shouldResetSearchInput]);

  const closePreviewHandler = () => {
    const slider = [...props.slider];
    slider.splice(props.index, 1);
    props.setSlider(slider);
    resetHandler();
  };

  return (
    <SliderItemStyle
      backgroundBanner={
        previewMode &&
        (bannerType === "desktop" ? desktopBanner?.src : mobileBanner?.src)
      }
      className={`d-flex ${previewMode ? "previewMode" : ""}`}
      bannerType={bannerType === "desktop" ? "2 / 1" : "5 / 6"}
    >
      {!previewMode ? (
        <div className="d-flex flex-column col">
          <div className="d-flex col">
            <div className="col">
              <div className="fs-12 lh-description my-1">
                <p className="description-color">
                  <span className="text-danger">* </span>اسلایدر وب با فرمت بوده
                  و نسبت تناسب آن 3:1 و اندازه آن 640*1920 میابشد
                </p>
                <p className="description-color">
                  <span className="text-danger">* </span>اسلایدر موبایل با فرمت
                  بوده و نسبت تناسب آن 5:6 و اندازه آن 960*1152 میابشد
                </p>
                <p className="description-color">
                  <span className="text-danger">* </span>ترجیحا حجم فایل جهت
                  آپلود زیر 100 کیلوبایت باشد
                </p>
              </div>
              <div className="d-flex">
                {modeState &&
                  (modeState === "advertise" ? (
                    <div className="col-5 me-2">
                      <input
                        placeholder="لینک خارجی"
                        value={link}
                        onChange={inputChangeHandler}
                        className={`col-9 form-control ${
                          submitted && !link && "invalid"
                        }`}
                        type="text"
                      />
                    </div>
                  ) : (
                    <div className="col-5 me-2">
                      <SearchModal
                        className={`col-12 ms-0 ${
                          submitted && !product && "invalid"
                        }`}
                        confirm={false}
                        setProduct={setProduct}
                        searchApi={
                          props.isLivePage ? endpoints.LIVES : undefined
                        }
                        reset={shouldResetSearchInput}
                        allowedCategories={[
                          PRODUCT_CATEGORY.SERIES.id,
                          PRODUCT_CATEGORY.EPISODE.id,
                          PRODUCT_CATEGORY.MOVIE.id,
                          PRODUCT_CATEGORY.CERTIFICATED_COURSE.id,
                          PRODUCT_CATEGORY.COURSE.id,
                          PRODUCT_CATEGORY.OTHER.id,
                        ]}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="leftSection col">
              <button onClick={previewHandler} className="mt-5 saveBtn">
                پیش نمایش
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 col-12">
            <div className="mobileSection ms-4">
              <ImageVideoUploader
                value={mobileBanner}
                setFieldValue={setMobileBanner}
                imageFieldType={IMAGES_ITEM_FIELD_TYPE_ENUMS.SLIDER}
                videoFieldType={VIDEO_ITEM_FIELD_TYPE_ENUMS.LAYER}
                previewHorizontalRatio={5}
                previewVerticalRatio={6}
                hasError={submitted && !mobileBanner}
              />
            </div>
            <div className="desktopSection">
              <ImageVideoUploader
                value={desktopBanner}
                setFieldValue={setDesktopBanner}
                imageFieldType={IMAGES_ITEM_FIELD_TYPE_ENUMS.SLIDER}
                videoFieldType={VIDEO_ITEM_FIELD_TYPE_ENUMS.LAYER}
                previewHorizontalRatio={2}
                previewVerticalRatio={1}
                hasError={submitted && !desktopBanner}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {isVideoPath(
            bannerType === "desktop" ? desktopBanner?.src : mobileBanner?.src
          ) ? (
            <>
              <DeleteButton onClick={closePreviewHandler} />
              <video
                className="video-poster"
                playsInline
                autoPlay
                loop
                muted
                controls={false}
                preload="auto"
              >
                <source
                  type="video/mp4"
                  src={
                    bannerType === "desktop"
                      ? desktopBanner?.src
                      : mobileBanner?.src
                  }
                />
              </video>
            </>
          ) : (
            <>
              <DeleteButton onClick={closePreviewHandler} />
              {product ? (
                <div className="productInfo text-white">
                  <h3>{product.name}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                </div>
              ) : (
                <>
                  <a className="linkHolder" href={link}></a>
                </>
              )}
            </>
          )}
        </>
      )}
    </SliderItemStyle>
  );
};

export default SliderItem;
