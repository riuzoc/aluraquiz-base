/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import db from '../../db.json';

import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import Widget from '../../src/components/Widget';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}  */}
          {results.filter((x) => x).length}
          {' '}
          perguntas.
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #{index+1} {' '} Resultado: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

export const QuizGame = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  color: #4B772D;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

function QuestionWidget({ 
  question, 
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions} `} 
          </h3>
        </Widget.Header>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}  //react
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>

          <AlternativesForm onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setQuestionSubmited(false);
                setSelectedAlternative(undefined);
              }, 0.5 * 1000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />                  
                  {alternative}
                  <p/>
                </Widget.Topic>
              )
            })}

            {/* <pre> Mostrar na tela.
              {JSON.stringify(question.alternatives)}
              {JSON.stringify(question, null, 4)}
            </pre> */}

            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>

            {/* <p>selectedAlternative: `${selectedAlternative}`</p> */}
            {isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>}

          </AlternativesForm>
        </Widget.Content>
      </Widget>
  );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {  
  // console.log('Perguntas: ', db.questions);  
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);  //const screenState = 'QUIZ';
  const [results, setResults] = React.useState([]);  //const [results, setResults] = React.useState([true, false, true]);
  const totalQuestions = db.questions.length;
  // const questionIndex = 0;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  
  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ])
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect  ///React.useState   
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetcH() ...
    setTimeout(() => {
        setScreenState(screenStates.QUIZ);
        // console.log('State QUIZ');
    }, 0,1 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    console.log('nextQuestion: ' + nextQuestion);
    console.log('totalQuestions: ' + totalQuestions);
    if (nextQuestion < totalQuestions) {
      console.log('handleSubmiQuiz'+'totalQuestions: ' + totalQuestions);
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
      console.log('setScreenState(screenStates.RESULT)');
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      {/* <Title>My page Teste</Title> */}
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
            <QuestionWidget 
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )
        }

        {screenState === screenStates.LOADING && (
            <LoadingWidget />
          )
        }

        {screenState === screenStates.RESULT && (
            <ResultWidget results={results}> </ResultWidget>
          )
        }
      </QuizContainer>
    </QuizBackground>  
  );
}
