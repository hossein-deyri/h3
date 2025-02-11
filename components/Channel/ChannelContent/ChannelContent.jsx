import Progress from "components/content/add/upload/progress";
import { ChannelContentStyle } from "./ChannelContentStyle";
import { useState, useRef } from "react";
import uploadApi from "utilize/apis/uploadApi";
import { UploadCloud2 } from "@styled-icons/remix-fill/UploadCloud2";
import { post } from "services/httpService";
import { endpoints } from "endpoints";
import {
  ITEM_TYPE_ENUMS,
  VIDEO_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";

const ChannelContent = (props) => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [, setLoadingState] = useState(false);
  const [, setVideoPath] = useState();
  const [title, setTitle] = useState("");
  // const [duration , setDuration] = useState()
  // const [durationSeconds, setDurationSeconds] = useState("");
  const [description, setDescription] = useState("");

  const Ref = useRef();

  const inputChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = async () => {
    setLoadingState(true);
    await uploadApi({
      setProgress,
      fileProp: file,
      isChannel: true,
      setFieldValue: setVideoPath,
      itemType: ITEM_TYPE_ENUMS.VIDEOS.label,
      field: VIDEO_ITEM_FIELD_TYPE_ENUMS.CHANNEL_PROGRAM.label,
    })
      .then(async (data) => {
        //Number(duration * 3600 + durationSeconds * 60)
        const requestBody = {
          channelId: props.channelId,
          description: description,
          duration: Number(data.result[0]?.duration),
          // duration :44400,
          title: title,
          videoPath: data.result[0]?.file,
          order: props.order,
        };

        await post(endpoints.CHANNELPROGRAMS(), JSON.stringify(requestBody))
          .then(({ data }) => {
            props.setChannelPrograms((e) => [...e, data.data]);
            setDescription("");
            setTitle("");
            setVideoPath(null);
            setProgress(0);
            setFile(null);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingState(false);
      });
  };
  return (
    <ChannelContentStyle>
      <>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column inputsHolder col-6">
            <span>ورود محتوای شبکه</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control "
              placeholder="نام فارسی"
            />
            {/* <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-control "
              placeholder="مدت زمان برنامه به ساعت"
              style={{marginTop:'10px'}}
            />
            <input
              type="number"
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(e.target.value)}
              className="form-control "
              placeholder="مدت زمان برنامه به دقیقه"
              style={{marginTop:'10px'}}
            /> */}
            <textarea
              rows="3"
              columns="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control my-2"
              placeholder="توضیحات کوتاه"
            />
          </div>
          <div>
            <div className="position-relative uploadField mb-2">
              <div className="d-flex flex-column align-content-center align-items-center">
                <img
                  role="button"
                  onClick={() => {
                    Ref.current.click();
                  }}
                  src="/icon/upload-cloud-fill.svg"
                  className="uploadCloudIcon  bg-white p-2 mt-5 mb-2 col-2"
                  alt="nobino"
                />
                <span>مسیر فایل ویدئویی خود را انتخاب کنید</span>
                <input
                  type="file"
                  className="d-none"
                  ref={Ref}
                  accept=".mp4"
                  onChange={inputChangeHandler}
                  onClick={(e) => (e.target.value = "")}
                />
              </div>
            </div>
            {file && (
              <Progress
                title={file.name}
                imgSrc="/icon/mp4.svg"
                percent={progress}
              />
            )}
          </div>
        </div>
        <button
          className={`submitBtn ${
            (!file || title.length <= 1) && "disabledBtn"
          }`}
          onClick={uploadHandler}
        >
          <UploadCloud2 />
          ثبت برنامه
        </button>
      </>
    </ChannelContentStyle>
  );
};

export default ChannelContent;
