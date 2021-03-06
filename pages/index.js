import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `;
// função com nome Maiúscula tornase uma tag react.
// function Title(props) { //propcidades/propriedades <3
//   return (
//     <h1>{props.children}</h1>
//   )
// }

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

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

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // console.log('retorno do UseState', name, setName);

  return (
    <>
      {/* <Title>My page Teste</Title> */}
      <QuizBackground backgroundImage={db.bg}>
        <Head>
          <title>AluraQuiz - Base</title>
          <meta name="description" content="Alura quiz!" />
          <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
        </Head>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();

                router.push(`/quiz?name=${name}`);
                console.log('Fazendo submit com react');
              }}
              >
                <Input
                  name="nomeDoUsuario"
                  onChange={(infosDoEvento) => {
                    console.log(infosDoEvento.target.value);
                    // State
                    // name = infosDoEvento.target.value;
                    setName(infosDoEvento.target.value);
                  }}
                  placeholder="Diz ai o seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

                return (
                  <li>
                    <Widget.Topic 
                      // href={linkExterno}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}              
              </ul>
              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>

          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/omariosouto" />
      </QuizBackground>
    </>
  );
}
