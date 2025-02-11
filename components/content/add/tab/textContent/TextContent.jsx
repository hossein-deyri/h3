import { useEffect, useState } from "react";
import Select from "react-select";
import { Field, ErrorMessage } from "formik";
import makeAnimated from "react-select/animated";
import { StickyNote } from "utilize/icon/addContent";
import { Save } from "@styled-icons/remix-fill/Save";
import RelationModal from "components/common/RelationModal";
import { productTypeOptions, productAgeOptions } from "utilize/data/data";
import { TextContentStyles } from "./TextContentStyles";
import ExclusiveSection from "./components/exclusiveSection/ExclusiveSection";
import { EXCLUSIVE_SECTION } from "utilize/constant/exclusive";
import CustomEditor from "components/common/customEditor/CustomEditor";
import PRODUCT_SCREENING_STATE from "utilize/constant/productScreeningState";
import CustomDatePicker from "components/common/CustomDatePicker/CustomDatePicker";
import NewFeatureBadge from "components/common/NewFeatureBadge/NewFeatureBadge";

const TextContent = ({
  values,
  errors,
  touched,
  setFieldValue,
  setValues,
  SSRTags,
  SSRPerson,
  SSRCountries,
  SSROwners,
  onClick,
  loadingState,
  setCategory,
  setIV,
}) => {
  const [modalState, setModalState] = useState();
  const [isFreeExclusive, setIsFreeExclusive] = useState(false);

  const handleDateChange = (newOrderDate) => {
    const validDate = newOrderDate ? new Date(newOrderDate) : new Date();
    setFieldValue("orderDate", validDate);
  };

  useEffect(() => {
    setCategory(values.category);
  }, [values.category]);

  useEffect(() => {
    const { fixedTags } = values;
    let _fixedTags = [...SSRTags?.filter((tag) => tag.fixed)];
    _fixedTags?.forEach((tag) => {
      fixedTags?.every((t) => {
        if (tag.id === t.id) {
          tag.checked = true;
          return false;
        } else {
          tag.checked = false;
          return true;
        }
      });
    });
  }, [SSRTags, values.fixedTags]);

  const selectStyle = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#3e8bff",
      display: "flex",
      borderRadius: "5px",
      padding: "2px 4px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#e21221",
      order: 1,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      fontSize: "12px",
      order: 2,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f5f8",
    }),
  };

  const relationHandler = () => {
    setModalState(true);
  };

  const hasExclusive =
    values.category === "SERIES" ||
    values.category === "MOVIE" ||
    values.category === "CERTIFICATED_COURSE" ||
    values.category === "COURSE";

  // Reset exclusive form values when category changes to non-exclusive
  useEffect(() => {
    if (!hasExclusive) {
      setValues({
        ...values, // Spread the existing values
        [EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE]: 0,
        [EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT]: 0,
        [EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR]: 0,
        [EXCLUSIVE_SECTION.ROW.ACCESS_TIME]:
          EXCLUSIVE_SECTION.OPTIONS.UNLIMITED,
        [EXCLUSIVE_SECTION.ROW.SCREEN_TYPE]:
          EXCLUSIVE_SECTION.OPTIONS.SUBSCRIPTION,
      });

      setIsFreeExclusive(false);
    }
  }, [hasExclusive]);

  return (
    <TextContentStyles>
      <div className="content-text d-flex flex-wrap w-100">
        {modalState && (
          <RelationModal
            onClick={setIV}
            values={values}
            setModalState={setModalState}
          />
        )}
        <div className="right col-12 col-lg-6 border-start ps-3 mb-2">
          <div className="d-grid">
            <div className="d-grid gap-2">
              <div className="d-flex flex-column">
                <div className="product-type d-flex ">
                  <Field
                    component="select"
                    className={`form-select fs-14 ${
                      touched.category
                        ? errors.category
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    style={{ width: "85%" }}
                    name="category"
                    value={values.category}
                  >
                    <option value="" disabled selected hidden>
                      انتخاب نوع محصول
                    </option>
                    {productTypeOptions?.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </Field>
                  <button
                    dir="ltr"
                    className="blueBtn col-3 me-1 d-flex align-items-center justify-content-center fs-14"
                  >
                    <span className="me-1">یادداشت</span>
                    <StickyNote color="white" />
                  </button>
                </div>
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="category"
                />
              </div>
              <div className="row g-0 ">
                <div className="d-flex  ">
                  <Field
                    component="select"
                    className={`form-select  fs-14 ${
                      touched.screeningState
                        ? errors.screeningState
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="screeningState"
                    value={values.screeningState}
                    style={{ width: "85%" }}
                  >
                    <option value="" disabled selected hidden>
                      انتخاب وضعیت اکران
                    </option>
                    {Object.values(PRODUCT_SCREENING_STATE)?.map(
                      (screeningState) => (
                        <option value={screeningState.id}>
                          {screeningState.label}
                        </option>
                      )
                    )}
                  </Field>
                  <button
                    onClick={relationHandler}
                    dir="ltr"
                    className="blueBtn col-3 me-1 d-flex align-items-center justify-content-center fs-14"
                  >
                    <span className="me-1">
                      <span>...</span>
                      گرفتن الگو از
                    </span>
                  </button>
                </div>
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="screeningState"
                />
              </div>
              <div className="row">
                <div className="col-12 mb-2 has-validation">
                  <Field
                    className={`form-control  fs-14 ${
                      touched.name
                        ? errors.name
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="name"
                    value={values.name}
                    placeholder="نام فارسی"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="col-12 dir-ltr has-validation">
                  <Field
                    className={`form-control dir-ltr  fs-14 ${
                      touched.translatedName
                        ? errors.translatedName
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="translatedName"
                    value={values.translatedName}
                    placeholder="نام لاتین"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="translatedName"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 has-validation">
                  <Select
                    isMulti
                    components={makeAnimated()}
                    options={SSRCountries?.map((country) => ({
                      value: country.id,
                      label: country.name,
                    }))}
                    value={values.countries}
                    onChange={(value, e) => setFieldValue("countries", value)}
                    placeholder="انتخاب کشور های سازنده"
                    className={`${
                      touched.countries
                        ? errors.countries
                          ? "border border-danger rounded"
                          : "border border-success rounded"
                        : ""
                    }`}
                    styles={selectStyle}
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="countries"
                  />
                </div>
                <div className="col-4 has-validation">
                  <Field
                    className={`form-control  fs-14 ${
                      touched.productionYear
                        ? errors.productionYear
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="productionYear"
                    value={values.productionYear}
                    placeholder="سال ساخت"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="productionYear"
                  />
                </div>
                <div className="col-4 has-validation">
                  <Field
                    component="select"
                    className={`form-select ageRange  fs-14 ${
                      touched.ages
                        ? errors.ages
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="ages"
                    value={values.ages}
                    style={{ padding: "0" }}
                  >
                    <option value="" disabled selected hidden>
                      رده سنی
                    </option>
                    {productAgeOptions?.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="ages"
                  />
                </div>
              </div>
              <div className="">
                <CustomEditor
                  value={values.shortDescription}
                  setFieldValue={(plainText) =>
                    setFieldValue("shortDescription", plainText)
                  }
                />
              </div>
              <div className="has-validation">
                <CustomEditor
                  value={values.longDescription}
                  setFieldValue={(plainText) =>
                    setFieldValue("longDescription", plainText)
                  }
                />
              </div>
              <div className="row">
                <div className="col has-validation">
                  <Field
                    component="select"
                    name="ownerId"
                    value={values.ownerId}
                    className={`form-control py-2  fs-14 ${
                      touched.ownerId
                        ? errors.ownerId
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                  >
                    <option value="" disabled selected hidden>
                      نام مالک
                    </option>

                    {SSROwners &&
                      SSROwners?.map((owner) => (
                        <option value={owner.id}>{owner.name}</option>
                      ))}
                  </Field>
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="ownerId"
                  />
                </div>
                <div className="col has-validation">
                  <Field
                    className={`form-control py-2  fs-14 ${
                      touched.imdbCode
                        ? errors.imdbCode
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="imdbCode"
                    value={values.imdbCode}
                    placeholder="imdbCode"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="imdbCode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left d-flex flex-column justify-content-start align-items-end col-12 col-lg-6 px-3 position-relative">
          <div className="d-grid w-100 gap-4">
            <div className="d-flex align-items-center">
              <label className="col-3 fw-bold">انتخاب تگ اصلی</label>
              <div className="col-9">
                <Select
                  isMulti
                  components={makeAnimated()}
                  options={SSRTags?.filter((i) => i.fixed).map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))}
                  value={
                    values?.fixedTags[0]?.label
                      ? values.fixedTags
                      : values.fixedTags.map(({ id, name }) => ({
                          label: name,
                          value: id,
                        }))
                  }
                  onChange={(value, e) => setFieldValue("fixedTags", value)}
                  placeholder=""
                  styles={selectStyle}
                  className={`${
                    touched.fixedTags
                      ? errors.fixedTags
                        ? "border border-danger rounded"
                        : "border border-success rounded"
                      : ""
                  }`}
                />
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="fixedTags"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label className="col-3 fw-bold">انتخاب تگ پنهان</label>
              <div className="col-9">
                <Select
                  isMulti
                  components={makeAnimated()}
                  options={SSRTags?.filter((i) => !i.fixed).map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))}
                  value={values.tags}
                  onChange={(value, e) => setFieldValue("tags", value)}
                  placeholder=""
                  styles={selectStyle}
                  className={`${
                    touched.tags
                      ? errors.tags
                        ? "border border-danger rounded"
                        : "border border-success rounded"
                      : ""
                  }`}
                />
                <ErrorMessage className="redText" component="div" name="tags" />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label className="col-3 fw-bold">انتخاب کارگردان (ها)</label>
              <div className="col-9">
                <Select
                  isMulti
                  components={makeAnimated()}
                  options={SSRPerson?.map((person) => ({
                    value: person.id,
                    label: person.name,
                    searchLabel: {
                      name: person.name,
                      translatedName: person.translatedName,
                    },
                  }))}
                  filterOption={(option, inputValue) => {
                    const { name, translatedName } = option.data.searchLabel;

                    return (
                      name?.toLowerCase()?.includes(inputValue.toLowerCase()) ||
                      translatedName
                        ?.toLowerCase()
                        ?.includes(inputValue.toLowerCase())
                    );
                  }}
                  value={values.directors}
                  onChange={(value, e) => setFieldValue("directors", value)}
                  placeholder=""
                  styles={selectStyle}
                  className={`${
                    touched.directors
                      ? errors.directors
                        ? "border border-danger rounded"
                        : "border border-success rounded"
                      : ""
                  }`}
                />
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="directors"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label className="col-3 fw-bold">انتخاب بازیگران</label>
              <div className="col-9">
                <Select
                  isMulti
                  components={makeAnimated()}
                  options={SSRPerson?.map((person) => ({
                    value: person.id,
                    label: person.name,
                    searchLabel: {
                      name: person.name,
                      translatedName: person.translatedName,
                    },
                  }))}
                  filterOption={(option, inputValue) => {
                    const { name, translatedName } = option.data.searchLabel;

                    return (
                      name?.toLowerCase()?.includes(inputValue.toLowerCase()) ||
                      translatedName
                        ?.toLowerCase()
                        ?.includes(inputValue.toLowerCase())
                    );
                  }}
                  value={values.actors}
                  onChange={(value, e) => setFieldValue("actors", value)}
                  placeholder=""
                  styles={selectStyle}
                  className={`${
                    touched.actors
                      ? errors.actors
                        ? "border border-danger rounded"
                        : "border border-success rounded"
                      : ""
                  }`}
                />
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="actors"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label className="col-3 fw-bold">
                تاریخ ترتیب نمایش <NewFeatureBadge />
              </label>
              <div className="col-9">
                <CustomDatePicker
                  value={values?.orderDate}
                  onDateChange={handleDateChange}
                  maxDate={new Date()}
                  placeholder="تاریخ نمایش"
                  error={errors.orderDate}
                  touched={touched.orderDate}
                />
                <ErrorMessage
                  className="redText"
                  component="div"
                  name="orderDate"
                />
              </div>
            </div>
            {hasExclusive && (
              <ExclusiveSection
                values={values}
                setFieldValue={setFieldValue}
                setIsFreeExclusive={setIsFreeExclusive}
                errors={errors}
                touched={touched}
              />
            )}
          </div>
          <button
            type="submit"
            onClick={onClick}
            className={`saveBtn mt-5 ${loadingState && "disabledBtn"} ${
              isFreeExclusive && "green-btn"
            }`}
          >
            {loadingState ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <Save />
            )}
            <span className="me-2">ذخیره</span>
          </button>
        </div>
      </div>
    </TextContentStyles>
  );
};

export default TextContent;
