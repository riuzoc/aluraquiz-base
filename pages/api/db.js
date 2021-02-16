import db from '../../db.json';



export default function dbHandler(request, response){
    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    response.json(db);

    // Teste no console.
    // fetch('http://localhost:3000/api/db').then(async (respostaServer) => {const resposta = await respostaServer.json(); console.log(resposta)})
    
}