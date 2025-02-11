import { ConvertButtonStyle } from "./ConvertButtonStyle";
import { useState, useEffect, useCallback } from "react";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { DELETE, get, post } from "services/httpService";
import { endpoints } from "endpoints";
import {
  CONST_DONE,
  CONST_IN_QUEUE,
  CONST_PROGRESS,
  CONST_READY,
} from "utilize/constant/constants";

const ConvertButton = (props) => {
  const [refId, setRefId] = useState(props?.refId);
  const [loading, setLoading] = useState(false);
  const [intervalTime, setIntervalTime] = useState(7);
  const [btnState, setBtnState] = useState("ready");
  const [progress, setProgress] = useState(0);
  let apiCall;

  const gettingConvertState = async (referenceId) => {
    if (referenceId && props.stopConverting) {
      await get(endpoints.VIDEOS.CONVERTS["/"](referenceId)).then(
        ({ data }) => {
          //change the time for calling api if the convert is not started yet
          data.data?.started ? setIntervalTime(7) : setIntervalTime(15);

          if (data.data?.started && !data.data?.done) {
            setBtnState(CONST_PROGRESS);
            setLoading(false);
          } else {
            setBtnState(CONST_IN_QUEUE);
          }
          if (data.data?.done) {
            setBtnState(CONST_DONE);
            setLoading(false);
            setProgress(0);
            clearInterval(apiCall);
          }
          setProgress(data.data?.percentage);
        }
      );
    }
  };

  useEffect(() => {
    if (props.refId && props.stopConverting) {
      gettingConvertState(props.refId);
      setRefId(props.refId);
      if (btnState === CONST_READY) {
        apiCall = setInterval(async () => {
          await gettingConvertState(props.refId);
        }, intervalTime * 1000);
      }
    } else {
      setProgress(0);
      setBtnState(CONST_READY);
    }
    return () => clearInterval(apiCall);
  }, [props.refId, props.stopConverting]);

  useEffect(() => {
    if (refId && props.stopConverting) {
      clearInterval(apiCall);
      apiCall = setInterval(async () => {
        await gettingConvertState(refId);
      }, intervalTime * 1000);
    }
    return () => clearInterval(apiCall);
  }, [intervalTime, props.stopConverting]);

  const handleClick = useCallback(async () => {
    setLoading(true);
    await post(endpoints.VIDEOS.CONVERTS["/"](props.videoId), null, {
      params: { videoSize: props.resolution },
    })
      .then(async ({ data }) => {
        setBtnState(CONST_IN_QUEUE);
        setRefId(data.data?.referenceId);
        apiCall = setInterval(async () => {
          if (props.stopConverting) {
            await gettingConvertState(data.data.referenceId);
          }
        }, intervalTime * 1000);
      })
      .catch((err) => console.log(err));
  }, [props.stopConverting]);

  const deleteHandler = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await DELETE(endpoints.VIDEOS.CONVERTS["/"](refId)).then(() => {
      setBtnState(CONST_READY);
      setProgress(0);
      setLoading(false);
    });
  };

  return (
    <>
      <ConvertButtonStyle className={loading && "loading"} btnState={btnState}>
        <button onClick={handleClick}>
          {btnState === CONST_PROGRESS && (
            <div
              style={{ width: `${progress}%` }}
              className="progressBar"
            ></div>
          )}
          <span>
            {btnState !== "done" && loading && (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            )}
            {btnState === CONST_PROGRESS && progress > 0 && progress < 100
              ? progress + " %"
              : (progress === 0 || progress === 100) && btnState !== "inQueue"
              ? props.name
              : btnState === CONST_IN_QUEUE && "در صف انتظار"}
            {btnState === CONST_DONE && (
              <button onClick={deleteHandler} className="closeHolderBtn">
                <Close />
              </button>
            )}
          </span>
        </button>
      </ConvertButtonStyle>
    </>
  );
};

export default ConvertButton;
