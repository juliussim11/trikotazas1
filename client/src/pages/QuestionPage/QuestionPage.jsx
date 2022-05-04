import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";
import FilterCheckBox from "../../components/FilterCheckBox/FilterCheckBox";
import Image from "../../components/Image/Image";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState({});
  const [images, setImages] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  const [listOfPositions, setListOfPositions] = useState([]);
  const [newListOfPositions, setNewListOfPositions] = useState([]);
  const [checkedPositions, setCheckedPositions] = useState([]);
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [newListOfPrograms, setNewListOfPrograms] = useState([]);
  const [checkedPrograms, setCheckedPrograms] = useState([]);
  const [listOfDepartaments, setListOfDepartaments] = useState([]);
  const [newListOfDepartaments, setNewListOfDepartaments] = useState([]);
  const [checkedDepartaments, setCheckedDepartaments] = useState([]);
  console.log("LIST OF PROGRAMS: ", newListOfPrograms);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/byId/${id}`).then((response) => {
      setQuestionData(response.data);
    });
    axios.get(`http://localhost:5000/images/byId/${id}`).then((response) => {
      setImages(response.data);
    });
    axios.get("http://localhost:5000/positions").then((response) => {
      setListOfPositions(response.data);
    });
    axios
      .get(`http://localhost:5000/questions/positions/${id}`)
      .then((response) => {
        setCheckedPositions(response.data);
      });
    axios.get("http://localhost:5000/programs").then((response) => {
      setListOfPrograms(response.data);
    });
    axios
      .get(`http://localhost:5000/questions/programs/${id}`)
      .then((response) => {
        setCheckedPrograms(response.data);
      });
    axios.get("http://localhost:5000/departaments").then((response) => {
      setListOfDepartaments(response.data);
    });
    axios
      .get(`http://localhost:5000/questions/departaments/${id}`)
      .then((response) => {
        setCheckedDepartaments(response.data);
      });
  }, []);

  useEffect(() => {
    const programList = listOfPrograms.map((program) => {
      if (checkedPrograms.includes(program.id)) {
        program.checked = true;
        return program;
      } else {
        program.checked = false;
        return program;
      }
    });
    setNewListOfPrograms(programList);
  }, [checkedPrograms]);

  useEffect(() => {
    const positionList = listOfPositions.map((position) => {
      if (checkedPositions.includes(position.id)) {
        position.checked = true;
        return position;
      } else {
        position.checked = false;
        return position;
      }
    });
    setNewListOfPositions(positionList);
  }, [checkedPositions]);

  useEffect(() => {
    const departamentList = listOfDepartaments.map((departament) => {
      if (checkedDepartaments.includes(departament.id)) {
        departament.checked = true;
        return departament;
      } else {
        departament.checked = false;
        return departament;
      }
    });
    setNewListOfDepartaments(departamentList);
  }, [checkedDepartaments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/questions/${id}`, questionData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Question Updated");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };
  console.log("POST DATA: ", questionData);

  // FILTERS !!!!!!!!!!!!!!!!!!!

  const onProgramCheck = (identificator) => {
    console.log("PROGRAM ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/add/${id}/program/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onProgramUncheck = (identificator) => {
    console.log("PROGRAM ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/delete/${id}/program/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onPositionCheck = (identificator) => {
    console.log("POSITION ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/add/${id}/position/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onPositionUncheck = (identificator) => {
    console.log("POSITION ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/delete/${id}/position/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onDepartamentCheck = (identificator) => {
    console.log("DEPARTAMENT ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/add/${id}/departament/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const onDepartamentUncheck = (identificator) => {
    console.log("DEPARTAMENT ID: ", identificator);
    axios
      .get(
        `http://localhost:5000/questions/delete/${id}/departament/${identificator}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          return;
        }
      });
  };

  const [image, setImage] = useState(null);
  const selectImage = (e) => {
    setImage(e.target.files[0]);
    console.log("IMAGE: ", e.target.files[0]);
  };

  const imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("QuestionId", id);
    axios
      .post("http://localhost:5000/images", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setImages([...images, response.data]);
      });
  };
  console.log("IMAGES: ", images);

  const onImageDelete = (identificator, filename) => {
    axios
      .delete(`http://localhost:5000/images/${identificator}/${filename}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("Question Deleted");
        setImages(
          images.filter((val) => {
            return val.id != identificator;
          })
        );
      });
  };

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="forms">
          <div className="question-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="question-wrapper__textarea">
                <textarea
                  name="question"
                  value={questionData.question}
                  onChange={handleChange}
                />
              </div>
              <div className="question-wrapper__textarea">
                <textarea
                  name="answer"
                  value={questionData.answer}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button>UPDATE</button>
              </div>
            </form>
            <form onSubmit={imageUpload} encType="multipart/form-data">
              <div className="question-wrapper__row">
                <div>
                  <input type="file" name="image" onChange={selectImage} />
                </div>
                <div className="upload-wrapper__row__button">
                  <button>UPLOAD IMAGE</button>
                </div>
              </div>
            </form>
            {images.length > 0 &&
              images.map((image) => (
                <Image
                  name={image.image}
                  key={image.id}
                  onDelete={() => onImageDelete(image.id, image.image)}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="forms">
          <div className="question-wrapper">
            <h3>{questionData.question}</h3>
            <div className="question-wrapper__answer">
              {questionData.answer}
            </div>
            {images.length > 0 &&
              images.map((image) => (
                <Image
                  name={image.image}
                  key={image.id}
                  onDelete={() => onImageDelete(image.id, image.image)}
                />
              ))}
          </div>
        </div>
      )}
      {isLoggedIn ? (
        <div className="forms">
          <div className="checkbox-wrapper">
            <div className="checkbox-wrapper__row">
              <div className="checkbox-wrapper__row__column">
                <h4>PROGRAMOS</h4>
                {newListOfPrograms.length > 0 &&
                  newListOfPrograms.map((program) => (
                    <FilterCheckBox
                      title={program.title}
                      name={program.title}
                      id={program.id}
                      key={program.id}
                      onCheck={onProgramCheck}
                      onUncheck={onProgramUncheck}
                      checked={program.checked}
                    />
                  ))}
              </div>
              <div className="checkbox-wrapper__row__column">
                <h4>PAREIGOS</h4>
                {newListOfPositions.length > 0 &&
                  newListOfPositions.map((position) => (
                    <FilterCheckBox
                      title={position.title}
                      name={position.title}
                      key={position.id}
                      id={position.id}
                      onCheck={onPositionCheck}
                      onUncheck={onPositionUncheck}
                      checked={position.checked}
                    />
                  ))}
              </div>
              <div className="checkbox-wrapper__row__column">
                <h4>DEPARTAMENTAS</h4>
                {newListOfDepartaments.length > 0 &&
                  newListOfDepartaments.map((departament) => (
                    <FilterCheckBox
                      title={departament.title}
                      name={departament.title}
                      key={departament.id}
                      id={departament.id}
                      onCheck={onDepartamentCheck}
                      onUncheck={onDepartamentUncheck}
                      checked={departament.checked}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuestionPage;
