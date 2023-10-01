
import './App.css';
import { BsPeopleFill, BsFillTelephoneFill, BsCircleHalf } from "react-icons/bs"
import React, { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(null)

  const [questionNumber, setquestionNumber] = useState(0)
  const url = `https://the-trivia-api.com/v2/questions`

  const [answers, setAnswers] = useState([0, 0, 0, 0]);


  useEffect(() => {

    fetchData();
    randomAnswer(); 
  }, []);



  const randomAnswer = () => {
    if (data !== null && data[questionNumber]) {
      let answerIndex = Math.floor(Math.random() * 4);
      let tempAnswers = ["", "", "", ""];
      let incorrectAnswersIndex = 0;
  
      for (let i = 0; i < 4; i++) {
        if (i === answerIndex) {
          tempAnswers[i] = data[questionNumber].correctAnswer;
        } else {
          tempAnswers[i] = data[questionNumber].incorrectAnswers[incorrectAnswersIndex];
          incorrectAnswersIndex++;
        }
      }
      
      setAnswers(tempAnswers);
    }
  };

  const fetchData = async () => {
    return await fetch(url)
      .then((res) => res.json())
      .then((d) => { setData(d); }).catch((err) => console.log(err))

  }

  const levels = [["1,000,000", "12"], ["500,000", "11"], ["200,000", "10"], ["100,000", "9"], ["50,000", "8"], ["25,000", "7"], ["15,000", "6"], ["10,000", "5"], ["7,000", "4"], ["5,000", "3"], ["2,000", "2"], ["1,000", "1"],["0-nothing","0"]]

  const onAnswer = (e) => {

    if (questionNumber === 12) {
      alert("game done")
    }
    setquestionNumber(questionNumber + 1)
    //check is it correct
    randomAnswer()
  

  }

  return (
    <>
      <div class="wrapper">
        <svg>
          <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            QUIZILLA!
          </text>
        </svg>
      </div>
      {data === null ? (<div>null</div>) : <div class="flex md:px-20 gap-5 sm:px-0 ">
        {/* JOKERS AND LEVELS */}
        <div class="w-1/4 p-4 border-r">
          <div class="mb-4">
            <div class="flex  justify-around flex-row mb-2">
              <button class="flex justify-center items-center w-20 h-20 rounded-full bg-gray-800 hover:shadow-lg transition focus:outline-none">
                <BsPeopleFill color='white' size={32} />
              </button>
              <button class="flex justify-center items-center w-20 h-20 rounded-full bg-gray-800 hover:shadow-lg transition focus:outline-none">
                <BsFillTelephoneFill color='white' size={32} />
              </button>
              <button class="flex justify-center items-center w-20 h-20 rounded-full bg-gray-800 hover:shadow-lg transition focus:outline-none">
                <BsCircleHalf color="white" size={32} />
              </button>
            </div>
            <ul>
              {levels.map((e, i) => {
                return <li key={i} class={" flex justify-between items-center mb-2 "+ (questionNumber.toString()=== e[1]?"border border-red-500  p-1 rounded-xl":"")} >
                  <span className={(e[1] === "1" || e[1] === "7" || e[1] === "12" ? 'text-orange-500' : "")}>Level {e[1]}</span>
                  <span className={(e[1] === "1" || e[1] === "7" || e[1] === "12" ? 'text-orange-500' : "")}>${e[0]}</span>
                </li>
              })}
            </ul>
          </div>
        </div>
        {/* QUESTION LAYOUT */}
        <div class="w-3/4 p-4">
          <div class="mt-8">
            <div class="mb-6">
              <h3 class="text-xl font-semibold">Question:</h3>
              <p>
                {data[questionNumber].question.text}
              </p>
              <div class="flex space-x-2">
                <span class="bg-gray-600 text-white py-2 px-3 rounded-full text-sm m-2">{data[questionNumber].difficulty.toUpperCase()}</span>
                <span class="bg-gray-600 text-white py-2 px-3 rounded-full text-sm m-2">{data[questionNumber].tags[0].toUpperCase()}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-9">
              {[...Array(4)].map((e, i) => (
                <button key={i} onClick={e => onAnswer()} class="bg-white border-black    text-black font-semibold py-2  rounded-lg transition transform hover:scale-105">
                  <div className='w-full h-full'>{answers[i]} </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>}
    </>

  );
}

export default App;
