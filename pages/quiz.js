import React from 'react';
import styled from 'styled-components';

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

export default function PudimComBatata() {
  return (
    <QuizGame>
      <h1>Pagina do Quiz. sssssssssssss</h1>
    </QuizGame>
  );
}
