import { ActorSectionStyle } from "./ActorSectionStyle";
import SearchModal from "components/common/SearchModal";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { Add } from "@styled-icons/remix-fill/Add";
import manPlaceholder from "statics/img/manPlaceholder.jpg";
import womanPlaceholder from "statics/img/womanPlaceholder.jpg";
import DeleteButton from "components/common/DeleteButton";
import { CONST_FEMALE, CONST_MALE } from "utilize/constant/constants";
import getPersonsMainPage from "services/personsMainPageServices/getPersonsMainPage";
import postPersonsMainPage from "services/personsMainPageServices/postPersonsMainPage";

const ActorSection = (props) => {
  const [addMode, setAddMode] = useState(false);
  const [selectedActor, setSelectedActor] = useState();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    (async () => {
      const personsData = await getPersonsMainPage();

      setActors(personsData);
    })();
  }, [props.menuId]);

  const submitActorHandler = () => {
    setActors((e) => [...e, { person: selectedActor }]);
    setSelectedActor(null);
    setAddMode(false);
  };

  const deleteHandler = (index) => {
    const _actors = [...actors];
    _actors.splice(index, 1);
    setActors(_actors);
  };

  const submitHandler = async () => {
    const requestBody = [];
    actors.forEach((actor, index) => {
      requestBody.push({ id: index + 1, personId: actor.person.id });
    });

    await postPersonsMainPage(JSON.stringify(requestBody));
  };

  const sliderOption = {
    speed: 700,
    rtl: true,
    dots: true,
    slidesToScroll: 4,
    infinite: false,
    lazyLoad: false,
    variableWidth: true,
  };

  return (
    <ActorSectionStyle>
      <div className="sectionTitle">دسته بندی بازیگران</div>
      <Slider {...sliderOption}>
        {actors.map((actor, index) => (
          <div className="actorHolder">
            {(actor.imagePath || actor.person.imagePath) && (
              <img
                src={
                  actor.imagePath
                    ? process.env.REACT_APP_API_URL_FILE + actor.imagePath
                    : process.env.REACT_APP_API_URL_FILE +
                      actor.person.imagePath
                }
                onError={({ target }) => {
                  target.src =
                    actor.gender === CONST_MALE ? manPlaceholder : "";
                  target.src =
                    actor.gender === CONST_FEMALE ? womanPlaceholder : "";
                }}
                alt={actor.name}
              />
            )}
            <p>{actor.person.name}</p>
            <p>{actor.person.translatedName}</p>
            <DeleteButton onClick={deleteHandler.bind(this, index)} />
          </div>
        ))}
        {addMode && (
          <div className="actorSelector">
            <span>انتخاب بازیگر</span>
            <SearchModal
              confirm={false}
              searchApi={"persons"}
              placeholder={"بازیگر"}
              setProduct={setSelectedActor}
              className="col-12"
            />
            <button
              onClick={submitActorHandler}
              className={`saveBtn mt-2 ${!selectedActor && "disabledBtn"}`}
            >
              ثبت بازیگر
            </button>
          </div>
        )}
        <button onClick={() => setAddMode(true)} className="addHolder ">
          <div>
            <span>افزودن مورد جدید</span>
            <Add />
          </div>
        </button>
      </Slider>

      <button
        onClick={submitHandler}
        className={`submitBtn ${actors.length < 1 && "disabledBtn"} mt-3`}
      >
        ذخیره دسته بندی بازیگران
      </button>
    </ActorSectionStyle>
  );
};

export default ActorSection;
