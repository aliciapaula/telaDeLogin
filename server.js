//nodemon: Executa o servidor web e monitora em tempo real
//express: Framework pra criação de servidores web com NodeJS
//body-parser: Biblioteca que lida com as requisições e respostas no formato JSON
//bcryptjs: Biblioteca que lida com a criptografia e validação das senhas
//mysql2: Biblioteca responsavel por conectar e manipular a base de dados no MySQL
//ejs: Biblioteca que cria uma engine de visualização de arquivos HTML quando os mesmos precisam carregar dados gerados via JS.

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3003

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Login'
});

db.getConnection((error) => {
    if(error){
        console.error(`Error ao conectar com o banco de dados: ${error.message}`)
    } else{
        console.log('Conectado ao banco de dados!');
    }
});

//Middlewares
app.set('view engine, ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/view/html/register.html')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/view/html/login.html')
});

app.post('/logout', (req, res) => {
    res.redirect('/login')
});

//
app.post('/register', async(req, res) => {
    const {name, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const sql = 'insert into usuario(name, username, password) values(?, ?, ?)'

    db.query(sql, [name, username, hashedPassword], (error, result) => {
        if(error){
            const msg = "Erro ao registrar usuário:" + error.message
            res.render(__dirname + '/view/html/register.ejs', {msg});
        } else{
            const msg = "Usuário registrado com sucesso com o id: " + result.insertId
            console.log(msg);
            res.redirect('/login');
        }
    });
});

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM usuario WHERE username = ?';
    
//     db.query(sql, [username], async (error, result) => {
//         if (err) {
//             console.error("Erro ao fazer login:", err.message);
//             res.render('/view/html/login.ejs'); // Redireciona de volta para a página de login em caso de erro
//         } else {
//             if (results.length === 0) {
//                 const user = results[0];
//                 const passwordMatch = await bcrypt.compare(password, user.password);
                
//                 if (passwordMatch) {
//                     // Senha correta, redireciona para a página principal ou outra página desejada
//                     res.redirect('/page'); // Substitua 'homepage' pelo caminho da sua página principal
//                 } else {
//                     // Senha incorreta, redireciona de volta para a página de login
//                     res.redirect('/login');
//                 }
//             } else {
//                 // Usuário não encontrado, redireciona de volta para a página de login
//                 res.redirect('/login');
//             }
//         }
//     });
// });

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
   
   
    const sql = 'SELECT * FROM usuario WHERE username = ? '
   
    db.query(sql, [username] , async(error,result) => {
     
      if(error){
        const msg = `Erro ao encontrar usuario: ${error.message}`
        res.render(__dirname + '/view/html/login.ejs', {msg});
      }else{
        if(result.length == 0){
          const msg = `Não existe esse usuario: `
          res.render(__dirname + '/view/html/login.ejs', {msg});
        }else{
            const match = await bcrypt.compare(password, result[0].password);
            if(match){
                let msgW = result[0].name
                res.sendFile(__dirname + '/view/page.html');
                res.render(__dirname + '/view/page.ejs', {msgW});
            }else{
                const msg = `As senhas não conferem `
                res.render(__dirname + '/view/html/login.ejs', {msg});
            }
        }
      }
     
    })
});

app.listen(port, () =>{
    console.log(`Servidor rodando na porta: ${port}`)
});

