import React from "react";

function Progress(props) {
  const { title, imgSrc, percent } = props;

  return (
    <div className="d-flex ">
      <img src={imgSrc} className="col-1" />
      <div className="col-11 px-2">
        <div className="col-12 d-flex justify-content-between px-2">
          <div>{title}</div>
          <div className="col-2 text-start">{`${percent}%`}</div>
        </div>
        <div className="progress p-0" style={{ height: ".3rem" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={`${percent}%`}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}
Progress.defaultProps = {
  imgSrc: "/icon/mp4.svg",
  title: "file.mp4",
};

export default Progress;
