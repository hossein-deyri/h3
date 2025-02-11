import styled from "styled-components";

export const ChannelTimingStyle = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  margin-top: 15px;
  height: 500px;
  .confirmHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #919baa;
    padding-bottom: 15px;
  }
  .activeText {
    color: #00d278;
    text-shadow: 0 0 15px #00d278;
  }
  .disableText {
    color: #e11220;
    text-shadow: 0 0 15px #e11220;
  }
  .statusBtn {
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 10px;
    background: #e11220;
    box-shadow: 0 0 10px #e11220;
    margin: 0 10px;
    &:nth-of-type(2) {
      background-color: #00d278;
      box-shadow: 0 0 10px #00d278;
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.4;
      box-shadow: none;
    }
  }

  .info {
    opacity: 0.8;
    font-size: 12px;
  }
`;

export const ContentContainer = styled.div`
  /* border:1px solid #919baa; */
  display: flex;
  flex-direction: column;
`;

export const PreviewChannelContent = styled.div`
  /* background-color:#e6ebf0; */
  background: ${(props) => (props.isDragging ? "#3e8bff" : "#e6ebf0")};
  /* order:${(props) => props.order}; */
  border-radius: 10px;
  padding: 15px;
  display: flex;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;

  .editModeInputs {
    width: 60%;
    span {
      display: block;
      width: 100px;
    }
    > div {
      margin-bottom: 5px;
    }
  }
  .iconHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 10px;
      &:nth-of-type(1) {
        background-color: #e21221;
      }
      &:nth-of-type(2) {
        background-color: #3e8bff;
        margin: 0 10px;
      }
      &:nth-of-type(3) {
        background-color: #919baa;
        cursor: move;
      }
      svg {
        width: 16px;
        height: 16px;
        color: white;
      }
    }
  }
`;
