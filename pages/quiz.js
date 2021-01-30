import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;
// função com Maiúscula tornase uma tag react.
// function Title(props) { //propcidades/propriedades <3
//   return (
//     <h1>{props.children}</h1>
//   )
// }

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Quiz() {
  return (
    <>
      <Title>My page Teste</Title>
      <BackgroundImage>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>The legend of zelda</h1>
            </Widget.Header>

            <Widget.Content>
              <p>teste</p>
            </Widget.Content>
          </Widget>

          <Widget>
            <h1>The legend of zelda</h1>

            <p>teste</p>
          </Widget>
        </QuizContainer>
      </BackgroundImage>
    </>
  );
}
