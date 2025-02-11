import { useState, useEffect } from "react";
import Select from "react-select";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import * as qs from "qs";

import { endpoints } from "endpoints";
import { showError } from "utilize/toast";
import { get } from "services/httpService";
import { personsRole } from "utilize/data/data";
import notFound from "statics/img/notFound.png";
import { CarouselItemStyle, ProductHolder } from "./CarouselItemStyle";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import getQueries from "services/queriesServices/getQueries";
import UploadImage from "components/content/add/upload/image";
import postQueries from "services/queriesServices/postQueries";
import deleteQueries from "services/queriesServices/deleteQueries";

const CarouselItem = ({
  menuId,
  persons,
  wholeTags,
  imagePath,
  initialTag,
  isKidsPage,
  isTriggered,
  id: queryId,
  setIsTriggered,
  setIsSliderAdded,
}) => {
  const [role, setRole] = useState("");
  const [count, setCount] = useState(8);
  const [title, setTitle] = useState("");
  const [endYear, setEndYear] = useState("");
  const [products, setProducts] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [personId, setPersonId] = useState("");
  const [startYear, setStartYear] = useState("");
  const [queryBgImg, setQueryBgImg] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const getQueriesData = async () => {
    const queriesData = await getQueries(menuId, isKidsPage, queryId);

    setPreviewMode(true);
    setTitle(queriesData.title);
    gettingProducts(queriesData);
  };

  const inputChangeHandler = (setState, e) => {
    setState(e.target.value);
  };

  const resetHandler = () => {
    setRole("");
    setTitle("");
    setEndYear("");
    setTagState([]);
    setPersonId("");
    setStartYear("");
    setQueryBgImg("");
    setPreviewMode(false);

    if (menuId) setIsSliderAdded(false);
  };

  const settingQuery = async () => {
    const tagStateTemp = [...tagState];
    const removedRepetitious = tagStateTemp.findIndex(
      (item) => item === initialTag
    );
    if (removedRepetitious !== -1) {
      tagStateTemp.splice(removedRepetitious, 1);
    }

    const queryBody = {
      count: count,
      title: title,
      role: role ? role.value : null,
      ...((!menuId || isKidsPage) && { id: queryId }),
      endYear: endYear ? endYear : null,
      ...(menuId && !isKidsPage && { menuIdList: [menuId] }),
      startYear: startYear ? startYear : null,
      personId: personId ? personId.value : null,
      ...(queryBgImg && { imagePath: queryBgImg }),
    };

    queryBody.tags =
      initialTag && initialTag.length
        ? [initialTag, ...tagStateTemp.map(({ value }) => value)]
        : [...tagStateTemp.map(({ value }) => value)];
    await postQueries(menuId, isKidsPage, JSON.stringify(queryBody));
    getQueriesData();
    setIsTriggered(!isTriggered);
    resetHandler();
  };

  const gettingProducts = async (productData) => {
    try {
      let params = {};

      if (productData) {
        if (initialTag) {
          const a = productData.tags.findIndex((item) => item === initialTag);
          productData.tags.splice(a, 1);
        }

        params = {
          offset: 0,
          size: productData?.count > 0 ? productData?.count : 8,
          ...(productData?.endYear && {
            endYear: productData?.endYear,
          }),
          ...(productData?.startYear && {
            startYear: productData?.startYear,
          }),
          ...(productData?.personId && {
            persons: productData?.personId,
          }),
          ...(productData?.role && { role: productData?.role }),
        };

        params.tags = initialTag?.length
          ? [initialTag, ...productData?.tags.map((tag) => tag)]
          : [...productData?.tags.map((tag) => tag)];
      } else if (tagState.length) {
        const tagStateTemp = [...tagState];
        const removedRepetitious = tagStateTemp.findIndex(
          (item) => item === initialTag
        );
        if (removedRepetitious !== -1) {
          tagStateTemp.splice(removedRepetitious, 1);
        }

        params = {
          offset: 0,
          size: count > 0 ? count : 8,
          ...(endYear && { endYear }),
          ...(startYear && { startYear }),
          ...(personId && { startYear }),
          ...(personId && {
            persons: personId.value ? personId.value : personId,
          }),
          ...(role && { role: role.value }),
        };

        params.tags = initialTag?.length
          ? [initialTag, ...tagStateTemp.map(({ value }) => value)]
          : [...tagStateTemp.map(({ value }) => value)];
      }

      const { data, status } = await get(endpoints.PRODUCTS(), {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      if (status !== 200)
        throw Error("There was an error in fetching products data");

      let _data = data.data.items;
      _data?.forEach((item) => {
        item.images?.forEach((image) => {
          image.src = `${process.env.REACT_APP_API_URL_FILE}${image.src}`;
          if (image.imageType === IMAGES_ITEM_FIELD_TYPE_ENUMS.POSTER.label) {
            item.poster = image.src;
          }
        });
      });
      setProducts(_data);
      setPreviewMode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closePreviewHandler = async () => {
    resetHandler();
    if (menuId && !isKidsPage) {
      await deleteQueries(menuId, queryId);
      setIsTriggered(!isTriggered);
    }
  };

  const previewHandler = (mode) => {
    if (title && (tagState.length > 0 || endYear || personId || startYear)) {
      if (tagState.length <= 3) {
        if (mode) {
          settingQuery();
        }
        gettingProducts();
        setPreviewMode(true);
      } else {
        if (mode) {
          showError("لطفا حداکثر 3 تگ انتخاب نمایید");
        }
      }
    } else {
      if (mode) {
        showError("لطفا حداقل یکی از موارد برای کروسل را انتخاب نمایید");
      }
    }
  };

  const selectStyle = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f5f8",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#919baa",
        fontSize: "14px",
      };
    },
  };

  // set the query's background
  useEffect(() => {
    if (imagePath) setQueryBgImg(imagePath);
  }, [imagePath]);

  // get whole queries data
  useEffect(() => {
    getQueriesData();
  }, [menuId, queryId]);

  return (
    <>
      <CarouselItemStyle>
        <div className="sectionTitle">دسته بندی اسلایدر فیلم ها</div>
        {!previewMode ? (
          <div className="creationHolder">
            <div className="row">
              <div className="titleHolder col-6">
                <div className="col-8 d-flex align-items-center ">
                  <span className="d-block ms-3">عنوان</span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="نوشتن عنوان دسته"
                    value={title}
                    onChange={inputChangeHandler.bind(this, setTitle)}
                  />
                </div>
                <div className="col-4 d-flex align-items-center">
                  <span className="d-block mx-2">تعداد آیتم ها</span>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="نوشتن عنوان دسته"
                    value={count}
                    onChange={inputChangeHandler.bind(this, setCount)}
                  />
                </div>
              </div>
              <div className="tagHolder col-6">
                <span>تگ ها</span>
                <div className="col-11">
                  <Select
                    isMulti
                    options={wholeTags}
                    styles={selectStyle}
                    placeholder="حداکثر 3 تگ انتخاب نمایید"
                    value={tagState}
                    onChange={(value) => setTagState(value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3 ps-3 d-flex align-items-center ">
                <span>سال شروع </span>
                <input
                  value={startYear}
                  placeholder="سال شروع"
                  type="number"
                  className="form-control"
                  onChange={inputChangeHandler.bind(this, setStartYear)}
                />
              </div>
              <div className="col-3 px-3 d-flex align-items-center ">
                <span>سال پایان </span>
                <input
                  value={endYear}
                  placeholder="سال پایان"
                  type="number"
                  className="form-control"
                  onChange={inputChangeHandler.bind(this, setEndYear)}
                />
              </div>
              <div className="col-3 d-flex align-items-center">
                <span>شخص</span>
                <div className="col">
                  <Select
                    styles={selectStyle}
                    value={personId}
                    onChange={(value) => setPersonId(value)}
                    options={persons}
                    placeholder="انتخاب شخص"
                  />
                </div>
              </div>
              <div className="col-3  d-flex align-items-center">
                <span>سمت</span>
                <div className="col">
                  <Select
                    styles={selectStyle}
                    value={role}
                    onChange={(value) => setRole(value)}
                    options={personsRole}
                    placeholder="سمت مورد نظر"
                  />
                </div>
              </div>
            </div>

            <br />

            {menuId && !isKidsPage && (
              <div className="col-12">
                <UploadImage
                  field={IMAGES_ITEM_FIELD_TYPE_ENUMS.QUERY_BG.label}
                  value={queryBgImg}
                  setFieldValue={setQueryBgImg}
                  minHeight="150px "
                  CSSClass={false && "invalid"}
                  isCarousel
                />
              </div>
            )}

            <div className="d-flex align-items-center justify-content-start mt-3">
              <button
                onClick={previewHandler.bind(this, true)}
                className="submitBtn ms-3"
              >
                ذخیره دسته بندی اسلایدر
              </button>

              <button
                onClick={previewHandler.bind(this, false)}
                className="saveBtn"
              >
                پیش نمایش
              </button>
            </div>
          </div>
        ) : (
          <div className="previewHolder">
            <h2>{title}</h2>
            {products.length > 0 ? (
              <div className="sliderHolder">
                <Swiper {...sliderOption}>
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductHolder>
                        <div>
                          <img src={product.poster} alt={product.name} />
                          <div className="hoverElement">
                            <span>{product.name}</span>
                            <p>
                              {product.shortDescription?.substr(0, 60)}
                              &hellip;
                            </p>
                          </div>
                        </div>
                      </ProductHolder>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="notFound">
                <img alt="nobino" src={notFound} />
                <span>متاسفانه محصولی یافت نشد</span>
              </div>
            )}

            <br />

            <div className="col-12">
              {queryBgImg && (
                <UploadImage
                  isCarousel
                  value={queryBgImg}
                  minHeight="150px "
                  setFieldValue={setQueryBgImg}
                  CSSClass={false && "invalid"}
                  field={IMAGES_ITEM_FIELD_TYPE_ENUMS.QUERY_BG.label}
                />
              )}
            </div>

            <div className="d-flex align-items-center justify-content-start mt-3">
              <button
                onClick={previewHandler.bind(this, true)}
                className="submitBtn ms-3"
              >
                ذخیره دسته بندی اسلایدر
              </button>

              <button onClick={closePreviewHandler} className="saveBtn">
                {menuId && !isKidsPage ? "حذف" : "تنظیم مجدد"}
              </button>
            </div>
          </div>
        )}
      </CarouselItemStyle>
    </>
  );
};

const sliderOption = {
  navigation: true,
  modules: [Navigation],
  slidesPerView: 5.5,
};

export default CarouselItem;
