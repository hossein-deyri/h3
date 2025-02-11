import React from "react";

function Time(props) {
  const { title, CSSClass, minHeight, field, time, setFieldValue } = props;
  const hourOnChange = (e) => {
    if (
      (Number.isInteger(parseInt(e.target.value)) || e.target.value === "") &&
      e.target.value.length <= 2
    )
      setFieldValue(e.target.name, e.target.value);
  };
  const MinuteAndSecondOnChange = (e) => {
    if (
      (Number.isInteger(parseInt(e.target.value)) || e.target.value === "") &&
      e.target.value.length <= 2 &&
      e.target.value < 60
    )
      setFieldValue(e.target.name, e.target.value);
  };
  const onBlur = (e) => {
    if (e.target.value.length === 0) setFieldValue(e.target.name, "00");
    else if (e.target.value.length === 1)
      setFieldValue(e.target.name, "0" + e.target.value);
  };
  return (
    <div className={CSSClass} style={{ minHeight: minHeight }}>
      <div className="d-flex flex-column ">
        <label className="text-nowrap fw-bold">{title}</label>
        <div
          className="d-flex mt-1"
          style={{ border: "1px solid #e6ebf0", borderRadius: "5px" }}
        >
          <input
            type="text"
            className="w-100 border-0 text-center"
            name={field + ".s"}
            value={time.s}
            onChange={MinuteAndSecondOnChange}
            onBlur={onBlur}
          />
          :
          <input
            type="text"
            className="w-100 border-0 text-center"
            name={field + ".m"}
            value={time.m}
            onChange={MinuteAndSecondOnChange}
            onBlur={onBlur}
          />
          :
          <input
            type="text"
            className="w-100 border-0 text-center"
            name={field + ".h"}
            value={time.h}
            onChange={hourOnChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
}

Time.defaultProps = {
  minHeight: "50px",
};
export default Time;
