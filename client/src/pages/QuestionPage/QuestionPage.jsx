import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPage.scss";
import FilterCheckBox from "../../components/FilterCheckBox/FilterCheckBox";
import axios from "axios";

const QuestionPage = () => {
  const [questionData, setQuestionData] = useState({});
  const [images, setImages] = useState([]);

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="question"
          value={questionData.question}
          onChange={handleChange}
        />
        <textarea
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
        />
        <button>UPDATE</button>
      </form>
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
      <form onSubmit={imageUpload} encType="multipart/form-data">
        <input type="file" name="image" onChange={selectImage} />
        <button>UPLOAD IMAGE</button>
      </form>
      {images.length > 0 &&
        images.map((image) => (
          <img src={`http://localhost:5000/${image.image}`} key={image.id} />
        ))}
    </>
  );
};

export default QuestionPage;
