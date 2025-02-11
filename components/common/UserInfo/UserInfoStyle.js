import styled from "styled-components";

export const UserInfoStyle = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-right: 10px;
  }

  .userInformation {
    width: 110px;
    font-size: 14px;
    font-weight: bold;
    color: #46647d;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.ltr {
      direction: ltr;
      text-align: right;
    }
  }
  img {
    border-radius: 50%;
    filter: hue-rotate(${(props) => props.hue}deg);
  }
`;
