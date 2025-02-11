import { UserInfoStyle } from "./UserInfoStyle";
import facePlaceHolder from "statics/img/facePlaceHolder.png";
import { useState, useEffect } from "react";
import { CONST_NOBINO } from "utilize/constant/constants";
import hidePhoneDigits from "utilize/hidePhoneDigits";

const UserInfo = ({ userInfo }) => {
  const [hue, setHue] = useState(0);

  const generateUserInformation = () => {
    const userDisplayName =
      userInfo?.firstName && userInfo?.lastName
        ? `${userInfo.firstName} ${userInfo.lastName}`
        : userInfo?.firstName || userInfo?.lastName;

    const isLtr = !userDisplayName && (!!userInfo?.email || !!userInfo?.mobile);

    return {
      title:
        userDisplayName ||
        userInfo?.email ||
        (userInfo?.mobile ? hidePhoneDigits(userInfo.mobile) : "ادمین"),
      isLtr,
    };
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 360);
    setHue(random);
  }, []);

  return (
    <UserInfoStyle hue={hue}>
      <img src={facePlaceHolder} alt={CONST_NOBINO} />
      <div>
        <span
          className={
            "userInformation" +
            (generateUserInformation().isLtr ? " ltr" : "")
          }
        >
          {generateUserInformation().title}
        </span>
      </div>
    </UserInfoStyle>
  );
};

export default UserInfo;
