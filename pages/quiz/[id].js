import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({dbExterno}) { //QuizDaGaleraPage(props) 
  return (
    <div>
      {/* Desafio da próxima AULA. */}
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen 
          externalQuestions={dbExterno.questions} 
          externalBg={dbExterno.bg}
        />

        {/* <pre style={{ color: 'black' }}> */}
          {/* {JSON.stringify(props, null, 4)} */}
          {/* {JSON.stringify(dbExterno.questions, null, 4)} */}
        {/* </pre> */}
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)

  //const dbExterno = await fetch('http://localhost:3000/api/db')
  //const dbExterno = await fetch('https://aluraquiz-devsoutinho.omariosouto.vercel.app/api/db')
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }

      throw new Error('Falha ao receber dados.');
    })
    .then((respostaConvertidaEmObjeto) => {
      console.log(respostaConvertidaEmObjeto);
      return respostaConvertidaEmObjeto;
    })
    .catch((err) => {
      console.error(err);
    });

  // console.log('Infos que o Next dá para nós', context.query, context.query.id);
  // console.log('dbExterno->', dbExterno);

  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
