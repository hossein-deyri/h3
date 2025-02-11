import { Field, ErrorMessage } from "formik";
import { ExclusiveSectionStyles } from "./ExclusiveSectionStyles";
import Num2persian from "num2persian";
import { useEffect } from "react";
import { EXCLUSIVE_SECTION } from "utilize/constant/exclusive";

const ExclusiveSection = ({
  values,
  setFieldValue,
  setIsFreeExclusive,
  errors,
  touched,
}) => {
  const getPersianPrice = (value) => {
    return Num2persian(Math.floor(value / 10));
  };
  const exclusivePriceText = getPersianPrice(values.price);
  const exclusiveDiscountText = getPersianPrice(values.finalPrice);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const calculateDiscount = Math.floor(
    ((values.price - values.finalPrice) / values.price) * 100
  );

  const onChangePriceValueFill = (e) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/^0+(?!$)/, "");
    setFieldValue(EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE, trimmedValue);
    setFieldValue(EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT, trimmedValue);
  };

  const onChangeDiscountValueFill = (e) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/^0+(?!$)/, "");

    setFieldValue(
      EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT,
      Math.min(trimmedValue, values.price)
    );
  };

  const handleRadioChange = (field, value) => {
    setFieldValue(field, value);

    if (
      field === EXCLUSIVE_SECTION.ROW.SCREEN_TYPE &&
      value === EXCLUSIVE_SECTION.OPTIONS.SUBSCRIPTION
    ) {
      setFieldValue(EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE, "0");
      setFieldValue(EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT, "0");
      setFieldValue(
        EXCLUSIVE_SECTION.ROW.ACCESS_TIME,
        EXCLUSIVE_SECTION.OPTIONS.UNLIMITED
      );
      setFieldValue(EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR, "0");
    }

    if (
      field === EXCLUSIVE_SECTION.ROW.SCREEN_TYPE &&
      value === EXCLUSIVE_SECTION.OPTIONS.EXCLUSIVE
    ) {
      setFieldValue(
        EXCLUSIVE_SECTION.ROW.ACCESS_TIME,
        EXCLUSIVE_SECTION.OPTIONS.UNLIMITED
      );
      setFieldValue(EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR, "0");
    }

    if (
      field === EXCLUSIVE_SECTION.ROW.ACCESS_TIME &&
      value === EXCLUSIVE_SECTION.OPTIONS.UNLIMITED
    ) {
      setFieldValue(EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR, "0");
    }
  };

  useEffect(() => {
    if (
      values.subscriptionType === EXCLUSIVE_SECTION.OPTIONS.EXCLUSIVE &&
      !values.finalPrice
    )
      setIsFreeExclusive(true);
    else setIsFreeExclusive(false);
  }, [values.subscriptionType, values.finalPrice]);

  return (
    <ExclusiveSectionStyles>
      <hr />
      <h4 className="title">نحوه اکران</h4>
      <div
        className="radios row align-items-center"
        role="group"
        aria-labelledby={EXCLUSIVE_SECTION.ROW.SCREEN_TYPE}
      >
        <label className="fw-bold title-label col-4">اکران به صورت:</label>
        <div className="form-check form-check-inline col">
          <Field
            className="form-check-input"
            type="radio"
            name={EXCLUSIVE_SECTION.ROW.SCREEN_TYPE}
            id="typeRadio1"
            value={EXCLUSIVE_SECTION.OPTIONS.SUBSCRIPTION}
            onChange={() =>
              handleRadioChange(
                EXCLUSIVE_SECTION.ROW.SCREEN_TYPE,
                EXCLUSIVE_SECTION.OPTIONS.SUBSCRIPTION
              )
            }
          />
          <label className="form-check-label" htmlFor="typeRadio1">
            اشتراک نوبینو
          </label>
        </div>
        <div className="form-check form-check-inline col">
          <Field
            className="form-check-input"
            type="radio"
            name={EXCLUSIVE_SECTION.ROW.SCREEN_TYPE}
            id="typeRadio2"
            value={EXCLUSIVE_SECTION.OPTIONS.EXCLUSIVE}
            onChange={() =>
              handleRadioChange(
                EXCLUSIVE_SECTION.ROW.SCREEN_TYPE,
                EXCLUSIVE_SECTION.OPTIONS.EXCLUSIVE
              )
            }
          />
          <label className="form-check-label" htmlFor="typeRadio2">
            اختصاصی
          </label>
        </div>
        <ErrorMessage
          className="redText"
          component="div"
          name={EXCLUSIVE_SECTION.ROW.SCREEN_TYPE}
        />
      </div>
      {values.subscriptionType === EXCLUSIVE_SECTION.OPTIONS.EXCLUSIVE && (
        <>
          <ul className="description">
            <li>
              در صورتی که می‌خواهید تخفیف برای فیلم، دوره یا سریال بگذارید،
              لطفاً در فیلد «واردکردن مبلغ نهایی»، مبلغ نهایی با اعمال تخفیف را
              وارد نمایید.
            </li>
            <li>
              در صورتی که قصد نمایش فیلم، دوره یا سریال را به صورت رایگان دارید،
              فیلد مبلغ را خالی یا صفر بگذارید
            </li>
          </ul>
          <div className="row align-items-center mt-2 sub-input">
            <label className="col-4">مبلغ</label>
            <Field
              className="form-control form-control-sm col"
              type="text"
              placeholder="مبلغ"
              id={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE}
              name={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="14"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              value={values.price}
              onChange={(e) => onChangePriceValueFill(e)}
            />
            <p
              data-toggle="tooltip"
              title={`${exclusivePriceText} تومان`}
              data-bs-placement="top"
              className={`col-4 mb-0 ${
                (values.price === "" || values.price === "0") && `green-label`
              }`}
            >
              {values.price === "" || values.price === "0"
                ? `رایگان`
                : values.price?.length < 4
                ? ""
                : `${truncateText(exclusivePriceText, 20) || ""} تومان`}
            </p>
          </div>
          <ErrorMessage
            className="redText"
            component="div"
            name={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_PRICE}
          />
          <div className="row align-items-center mt-2 sub-input">
            <label className="col-4">
              مبلغ نهایی
              {!(values.price === values.finalPrice) &&
                values.finalPrice !== "0" && (
                  <span className="discount">{`${calculateDiscount}% تخفیف`}</span>
                )}
            </label>
            <Field
              className="form-control form-control-sm col"
              type="text"
              placeholder="مبلغ نهایی"
              id={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT}
              name={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="14"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              value={values.finalPrice}
              onChange={(e) => onChangeDiscountValueFill(e)}
            />
            <p
              data-toggle="tooltip"
              title={`${exclusiveDiscountText} تومان`}
              data-bs-placement="top"
              className={`col-4 mb-0 ${
                (values.finalPrice === "" || values.finalPrice === "0") &&
                `green-label`
              }`}
            >
              {values.finalPrice === "" || values.finalPrice === "0"
                ? `رایگان`
                : values.finalPrice?.length < 4
                ? ""
                : `${truncateText(exclusiveDiscountText, 20) || ""} تومان`}
            </p>
          </div>
          <ErrorMessage
            className="redText"
            component="div"
            name={EXCLUSIVE_SECTION.INPUT.EXCLUSIVE_DISCOUNT}
          />
          <div
            className="radios row align-items-center"
            role="group"
            aria-labelledby={EXCLUSIVE_SECTION.ROW.ACCESS_TIME}
          >
            <label className="fw-bold title-label col-4">
              نحوه استفاده از بلیط:
            </label>
            <div className="form-check form-check-inline col">
              <Field
                className="form-check-input"
                type="radio"
                name={EXCLUSIVE_SECTION.ROW.ACCESS_TIME}
                id="timeRadio1"
                value={EXCLUSIVE_SECTION.OPTIONS.UNLIMITED}
                onChange={() =>
                  handleRadioChange(
                    EXCLUSIVE_SECTION.ROW.ACCESS_TIME,
                    EXCLUSIVE_SECTION.OPTIONS.UNLIMITED
                  )
                }
              />
              <label className="form-check-label" htmlFor="timeRadio1">
                نامحدود
              </label>
            </div>
            <div className="form-check form-check-inline col">
              <Field
                className="form-check-input"
                type="radio"
                name={EXCLUSIVE_SECTION.ROW.ACCESS_TIME}
                id="timeRadio2"
                value={EXCLUSIVE_SECTION.OPTIONS.LIMITED}
                onChange={() =>
                  handleRadioChange(
                    EXCLUSIVE_SECTION.ROW.ACCESS_TIME,
                    EXCLUSIVE_SECTION.OPTIONS.LIMITED
                  )
                }
              />
              <label className="form-check-label" htmlFor="timeRadio2">
                محدود
              </label>
            </div>
            <ErrorMessage
              className="redText"
              component="div"
              name={EXCLUSIVE_SECTION.ROW.ACCESS_TIME}
            />
          </div>
          {values.accessTime === EXCLUSIVE_SECTION.OPTIONS.LIMITED && (
            <>
              <div className="row align-items-center mt-2 sub-input">
                <label className="col-4">زمان دسترسی</label>
                <Field
                  className={`form-control form-control-sm col ${
                    touched.subscriptionLifeTime
                      ? errors.subscriptionLifeTime
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="مدت زمان"
                  id={EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR}
                  name={EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR}
                  maxLength="6"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  value={values.subscriptionLifeTime}
                  onChange={(e) =>
                    setFieldValue(
                      EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR,
                      e.target.value
                    )
                  }
                />
                <p className="col-4 mb-0">ساعت</p>
                <ErrorMessage
                  className="redText"
                  component="div"
                  name={EXCLUSIVE_SECTION.INPUT.ACTIVE_TIME_HOUR}
                />
              </div>
            </>
          )}
        </>
      )}
    </ExclusiveSectionStyles>
  );
};

export default ExclusiveSection;
