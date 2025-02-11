import styled from "styled-components";

export const SliderItemStyle = styled.div`
  display: flex;
  min-height: 390px;
  align-items: start;
  justify-content: center;
  background: url(${(props) => props.backgroundBanner});
  background-size: cover;
  background-position: center center;
  padding: 10px;
  direction: rtl;
  position: relative;
  border-radius: 10px;
  margin-bottom: 20px;
  aspect-ratio: ${(props) => props.bannerType};

  .video-poster {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    border-radius: 10px;
  }

  &.previewMode {
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: #0007;
      z-index: 0;
      border-radius: 10px;
    }
  }

  .productInfo {
    position: absolute;
    right: 30px;
    left: 30px;
    top: 50px;
  }
  .linkHolder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .mobileSection {
    width: 29.5%;
  }
  .desktopSection {
    width: 70.5%;
  }
  .uploadField {
    > div {
      height: 150px !important;
      background: #f3f5f8;
      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        box-shadow: 0 0 20px 0 rgba(70, 100, 125, 0.1);
      }
    }
  }

  .description-color {
    padding: 4.5px 0;
  }

  .leftSection {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .deleteButton {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
