import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { saveScore } from '../redux/actions';
import { shuffleArray, diff } from '../helpers/gameHelpers';

import Header from '../components/Header';

export default function Game() {
  const oneSec = 1000;
  const TEN = 10;
  const thirtySec = 30;
  const thirtyTwo = 32;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [waitingAnswer, setWaitingAnswer] = useState(true);
  const [time, setTime] = useState(thirtySec);
  const { results } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const history = useHistory();
  const question = results[currentQuestion];
  const wrongAnswer = 'wrong-answer';

  const [answers, setAnswers] = useState(shuffleArray(question));

  const handleAnswer = (event) => {
    document.getElementById('correct_answer').style
      .cssText = 'border-color: rgb(6, 240, 15); border-style: solid; border-width: 3px';
    const wrong = document.querySelectorAll(`#${wrongAnswer}`);
    wrong.forEach((option) => {
      option.style
        .cssText = 'border-color: rgb(255, 0, 0); border-style: solid; border-width: 3px';
    });
    setTime(thirtyTwo);
    setWaitingAnswer(false);
    if (event.target.id === 'correct_answer') {
      const payload = TEN + (time * diff(results[currentQuestion]));
      console.log(event.target.id);
      console.log(payload);
      dispatch(saveScore(payload));
    }
  };

  const handleNext = () => {
    document.getElementById('correct_answer').removeAttribute('style');
    const wrong = document.querySelectorAll(`#${wrongAnswer}`);
    wrong.forEach((option) => { option.removeAttribute('style'); });
    if (results[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
      const newQuest = results[currentQuestion + 1];
      setAnswers(shuffleArray(newQuest));
      setTime(thirtySec);
      setWaitingAnswer(true);
    } else {
      history.push('/feedback');
    }
  };

  const CA = 'border-color: rgb(6, 240, 15); border-style: solid; border-width: 3px';
  const WA = 'border-color: rgb(255, 0, 0); border-style: solid; border-width: 3px';

  useEffect(() => {
    if (time > 0 && waitingAnswer) {
      setTimeout(() => {
        setTime(time - 1);
      }, oneSec);
    }
    if (time === 0) {
      document.getElementById('correct_answer').style
        .cssText = CA;
      const wrong = document.querySelectorAll(`#${wrongAnswer}`);
      wrong.forEach((option) => {
        option.style
          .cssText = WA;
      });
      setTime(thirtyTwo);
      setWaitingAnswer(false);
    }
  }, [time, waitingAnswer]);

  const createAnswers = () => {
    const result = answers.map((answer) => {
      if (answer.answer === question.correct_answer) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            id="correct_answer"
            key={ answer.index }
            onClick={ handleAnswer }
            disabled={ !(waitingAnswer) }
          >
            { answer.answer }
          </button>
        );
      }
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${answer.index}` }
          id={ wrongAnswer }
          key={ answer.index }
          onClick={ handleAnswer }
          disabled={ !(waitingAnswer) }
        >
          {answer.answer}
        </button>
      );
    });
    return (result);
  };
  const returnBtn = (
    <button data-testid="btn-next" type="button" onClick={ handleNext }>
      Próxima
    </button>
  );
  return (
    <>
      <Header />
      <h1>{`Pergunta ${currentQuestion + 1}`}</h1>
      <h2 data-testid="question-category">{question.category}</h2>
      <h3 data-testid="question-text">{ question.question }</h3>
      <div data-testid="answer-options">{ createAnswers() }</div>
      {waitingAnswer
        ? <p>{`Tempo: ${time}`}</p>
        : returnBtn }
    </>
  );
}
