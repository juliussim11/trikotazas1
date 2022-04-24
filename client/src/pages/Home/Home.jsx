import TopBar from "../../components/TopBar/TopBar";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownFilter from "../../components/DropdownFilter/DropdownFilter";
import Title from "../../components/Title/Title";
import "./Home.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [programa, setPrograma] = useState("");
  const [skyrius, setSkyrius] = useState("");
  const [pareigos, setPareigos] = useState("");
  const posts = [
    {
      id: "1",
      question: "This first pošt is about React",
      answer: "aa",
      programa: "111",
      skyrius: "1111",
      pareigos: "11111",
    },
    {
      id: "2",
      question: "This next post is about Preact",
      answer: "bb",
      programa: "111",
      skyrius: "2222",
      pareigos: "33333",
    },
    {
      id: "2",
      question: "This next post is about Preact",
      answer: "bbb",
      programa: "222",
      skyrius: "2222",
      pareigos: "22222",
    },
    {
      id: "3",
      question: "We have yet another React post!",
      answer: "cc",
      programa: "333",
      skyrius: "3333",
      pareigos: "33333",
    },
    {
      id: "4",
      question: "This is the fourth and final post",
      answer: "dd",
      programa: "222",
      skyrius: "2222",
      pareigos: "22222",
    },
  ];

  const handleProgramaChange = (e) => {
    setPrograma(e.target.value);
  };

  const handleSkyriusChange = (e) => {
    setSkyrius(e.target.value);
  };

  const handlePareigosChange = (e) => {
    setPareigos(e.target.value);
  };

  return (
    <>
      <TopBar />
      <Title />
      <SearchBar onChange={(e) => setQuery(e.target.value)} />
      <div className="filters">
        <DropdownFilter
          title="Programa"
          handleChange={handleProgramaChange}
          value={programa}
          filters={posts}
        />
        <DropdownFilter
          title="Skyrius"
          handleChange={handleSkyriusChange}
          value={skyrius}
          filters={posts}
        />
        <DropdownFilter
          title="Pareigos"
          handleChange={handlePareigosChange}
          value={pareigos}
          filters={posts}
        />
      </div>
      {posts
        .filter((post) => {
          if (
            query === "" &&
            programa === "" &&
            skyrius === "" &&
            pareigos === ""
          ) {
            //if query is empty
            return post;
          } else if (
            post.question.toLowerCase().includes(query.toLowerCase()) &&
            post.programa.toLowerCase().includes(programa.toLowerCase()) &&
            post.skyrius.toLowerCase().includes(skyrius.toLowerCase()) &&
            post.pareigos.toLowerCase().includes(pareigos.toLowerCase())
          ) {
            //returns filtered array
            return post;
          }
        })
        .map((post) => (
          <Link to={`/question/${post.id}`} className="link">
            <QuestionCard
              key={post.id}
              post={post}
              linkTo={`question/${post.id}`}
            />
          </Link>
        ))}
    </>
  );
};

export default Home;
