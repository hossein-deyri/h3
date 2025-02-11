import { useRef, useState, useEffect } from "react";
import uploadApi from "utilize/apis/uploadApi";
import { actionRemoveApi, deleteVideosApi } from "utilize/apis/deleteApi";
import Progress from "components/content/add/upload/progress";
import { CONST_VIDEOS, ITEM_TYPE_ENUMS } from "utilize/constant/constants";
import { Button, Modal } from "react-bootstrap";
import { VideoUploaderStyles } from "./VideoUploaderStyles";

export default function UploadVideo({
  CSSClass,
  minHeight,
  field,
  productID,
  setFieldValue,
  setResolution,
  product,
  setIsFileChanged,
  hasLowerResolution,
  setVideoDuration,
  values,
  setValues,
  isAdFile = false,
}) {
  const [file, setFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(
    "مسیر فایل ویدیویی خود را انتخاب کنید."
  );
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (progress === 100) setFile(null);
  }, [progress]);

  useEffect(() => {
    if (product?.videos?.length > 0) {
      const _video = product?.videos.find((item) => item.type === field);
      if (_video) {
        const videoName = _video.src.split("/").pop();
        setFileName(videoName);
        setVideoFile(_video);
      }
    }
  }, [field, product?.videos, loadingState]);

  useEffect(() => {
    const _video = values?.fileUrl;
    if (isAdFile && !!_video) {
      const videoName = _video.split("/").pop();
      setFileName(videoName);
      setVideoFile(_video);
    }
  }, [isAdFile, values?.fileUrl, loadingState]);

  const inputChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const uploadHandler = async () => {
    setLoadingState(true);
    await uploadApi({
      fileProp: file,
      productID,
      itemType: ITEM_TYPE_ENUMS.VIDEOS.label,
      field,
      setFieldValue,
      setProgress,
      setResolution,
      values: product,
      hasLowerResolution,
    })
      .then(() => {
        setFileName(file.name);
        setVideoFile(file);
        setIsFileChanged && setIsFileChanged((e) => !e);
        if (isAdFile) {
          const videoElement = document.createElement("video");
          videoElement.src = URL.createObjectURL(file);
          videoElement.addEventListener("loadedmetadata", () => {
            setVideoDuration(videoElement.duration);
          });
        }
      })
      .finally(() => setLoadingState(false));
  };

  const removeItem = async (e) => {
    setShowModal(false);

    let _videos = [...(product?.videos || [])].filter(
      (video) => video.type === field
    );

    if (isAdFile || _videos.length) {
      setLoadingState(true);
      const api = _videos.length
        ? deleteVideosApi(productID, _videos)
        : actionRemoveApi(process.env.REACT_APP_API_URL_FILE, [values.fileUrl]);

      await api
        .then(() => {
          isAdFile &&
            setValues({
              ...values,
              fileUrl: "",
            });
        })
        .finally(() => {
          _videos.length && setFieldValue(CONST_VIDEOS);
          isAdFile && setVideoDuration(0);
          setProgress(0);
          setLoadingState(false);
        });
    }

    setVideoFile(null);
    setFile(null);
    e.stopPropagation();
    setFileName("مسیر فایل ویدیویی خود را انتخاب کنید.");
  };

  const Ref = useRef();

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <p>آیا از حذف فایل مطمئن هستید؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            autoFocus
            variant="secondary"
            onClick={() => setShowModal(false)}
            type="button"
          >
            خیر
          </Button>
          <Button type="button" variant="danger" onClick={removeItem}>
            بله
          </Button>
        </Modal.Footer>
      </Modal>
      <VideoUploaderStyles className={`${CSSClass} position-relative`}>
        <div
          className="d-flex flex-column align-content-center align-items-center uploadField"
          style={{
            background: "#e6ebf0",
            minHeight: minHeight,
            borderRadius: 5,
          }}
        >
          {videoFile || file ? (
            <button
              type="button"
              className={`my-3 btn btn-danger w-0 px-3 py-2 rounded-circle ${
                loadingState && "disabled"
              }`}
              onClick={() => setShowModal(true)}
            >
              x
            </button>
          ) : (
            <img
              role="button"
              onClick={() => Ref.current.click()}
              src="/icon/upload-cloud-fill.svg"
              className="uploadCloudIcon  bg-white p-2 my-3 col-2"
              alt="nobino"
            />
          )}
          <div>{fileName}</div>
          <button
            onClick={uploadHandler}
            type="button"
            className={`btn red-btn my-3  fs-12 ${
              loadingState && "disabledBtn"
            }`}
            disabled={!file}
          >
            {loadingState && (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            )}
            آپلود ویدیو
          </button>
          <input
            type="file"
            className="d-none"
            ref={Ref}
            onChange={inputChangeHandler}
            accept=".mp4"
            onClick={(e) => (e.target.value = "")}
          />
        </div>
        {file && (
          <Progress
            title={file.name}
            imgSrc="/icon/mp4.svg"
            percent={progress}
          />
        )}
      </VideoUploaderStyles>
    </>
  );
}
