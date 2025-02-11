import styled from "styled-components";

export const SpecialItemStyle = styled.div`
  > p {
    font-size: 14px;
    color: #111;
    font-weight: 500;
  }
  .SpecialItemContainer {
    background: #f5f5f5 url(${(props) => props.image});
    background-size: cover;
    direction: rtl;
    padding: 10px 20px;
    height: 450px;
    position: relative;
    border-radius: 10px;
    .hoverElement {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.3s;
      opacity: 0;
      visibility: hidden;
      color: white;
      border-radius: 10px;
    }
    :hover .hoverElement {
      opacity: 1;
      visibility: visible;
    }
  }
  .productInfo {
    margin-top: 50px;
    color: white;
    span {
      display: block;
      margin: 10px auto;
      width: 90%;
    }
    p {
      width: 90%;
      margin: 0 auto;
    }
  }
  .progressBar {
    width: 100%;
    position: absolute;
    background-color: rgba(62, 139, 255, 0.4);
    z-index: 5;
    color: white;
    font-size: 20px;
    text-align: center;
  }
  .uploadField {
    margin: 10px auto;
    position: relative;
    min-height: 250px;
    > div {
      background-color: #f3f5f8 !important;
      background-size: contain !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      height: 270px !important;
      img {
        border-radius: 10px;
        box-shadow: 0 0 20px 0 rgba(70, 100, 125, 0.1);
      }
    }
  }
  .deleteButton {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
