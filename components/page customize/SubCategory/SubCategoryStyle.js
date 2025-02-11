import styled from "styled-components";

export const SubCategoryStyle = styled.section`
  .titleSection {
    color: #111;
    font-size: 16px;
    font-weight: bold;
  }

  .createSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .previewSection{
    /* border-top:1px solid #111; */
    padding:20px 0;
  }
  .sliderOrder {
    margin: 30px auto;
    height: 50vh;
    overflow-y: auto;
    align-self: stretch;
    border: 1px solid #3e8bff;
    border-radius: 10px;
    padding: 10px;
    .orderBoxHolder {
      width: auto;
      display:flex;
      align-items: center;
      flex-direction: column;

      h3 {
        text-align: center;
        margin: 10px auto;
        font-size: 16px;
      }
      margin: 30px 0;
      background-color:white;
      height: 140px;
      position: relative;
      /* filter: drop-shadow(0 0 5px black); */

      img {
        width: 50%;
        height: 70%;
        user-select: none;
        object-fit: contain;
      }
      .closeHolder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 10px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5%;
        right: 10px;
        svg {
          width: 100%;
          height: 100%;
          color: red;
        }
      }
    }
  }
  .sliderHolder {
    width: 70%;
  }
  .dragHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    cursor: move;
    right: 10px;

    svg {
      color: #3e8bff;
      width: 20px;
      height: 20px;
    }
  }
`;
