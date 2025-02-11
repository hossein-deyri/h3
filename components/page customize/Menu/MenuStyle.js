import styled from "styled-components";
export const MenuStyle = styled.div`
  .menu-wrapper {
    display: flex;
    flex-wrap: wrap;
    .menuHolder {
      display: flex !important;
      justify-content: center;
      span {
        text-align: center;
        display: flex;
        align-items: center;
      }
    }
  }
  .creationHolder {
    margin: 10px;
    padding: 10px;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background:rgb(245, 245, 245); */
    .disabled {
      opacity: 0.45;
      pointer-events: none;
    }

    .field-radiobutton {
      display: flex;
      align-items: center;
      label {
        padding: 0 1rem;
        cursor: pointer;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: start;
      width: 100%;
    }
    > div > div {
      display: flex;
      align-items: center;
      /* width:100%; */
      margin-bottom: 15px;
      span {
        display: block;
        font-size: 14px;
        white-space: nowrap;
        margin-left: 10px;
      }
    }
    input {
      background-color: #f3f5f8;
      ::placeholder {
        color: #919baa;
        font-size: 14px;
      }
    }
    /* .titleHolder{
        input{
            width:50%;
        }
    } */
  }

  .menuHolder {
    border: 1px solid #3e8bff;
    border-radius: 10px;
    background: white;
    width: fit-content;
    padding: 0.2rem 2.5rem;
    margin: 0.5rem;
    position: relative;

    .closeHolder {
      position: absolute;
      right: 0.5rem;
      svg {
        width: 20px;
        height: 20px;
      }
      color: red;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
    }
  }
  .dragHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #919baa;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: move;
    left: 2px;

    svg {
      color: white;
      width: 15px;
      height: 15px;
    }
  }
  .menuPreview {
    height: 50px;
    width: 100%;
    overflow-x: scroll;
  }
  .submitBtn {
    width: fit-content;
  }
`;
