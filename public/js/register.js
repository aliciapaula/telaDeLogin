//Icone de exibição do valor dos campos senha e confirmar senha
const showPassword = document.querySelector('#showPassword');
const showConfirmPassword = document.querySelector('#showConfirmPassword');

//Input e label do campo nome
const nameU = document.querySelector('#name');
const labelName = document.querySelector('label[for="name"]');
let validName = false //Status do campo nome

//Input e label do campo Usuario
const username = document.querySelector('#username');
const labelUsername = document.querySelector('label[for="username"]');
let validUsername = false //Status do campo nome

//Input e label do campo Senha
const password = document.querySelector('#password');
const labelPassword = document.querySelector('label[for="password"]');
let validPassword = false //Status do campo nome

//Input e label do campo Confirmação de Senha
const confirmPassword = document.querySelector('#confirmPassword');
const labelConfirmPassword = document.querySelector('label[for="confirmPassword"]');
let validConfirmPassword = false //Status do campo nome

//Div contendo mensagens de erro e sucesso
const msgError = document.querySelector('#msgError');
const msgSucess = document.querySelector('#msgSucess');

//FUNÇÕES E EVENTOS
//Função que exibe valor da senha e da senha confirmada
showPassword.addEventListener('click', () => {
    //Input do campo senha
    if(password.getAttribute('type') === 'password'){
        password.setAttribute('type', 'text');
        showPassword.style.color = '#4038a0';
    }else{
        password.setAttribute('type', 'password');
        showPassword.style.color = '#000';
    }
});

showConfirmPassword.addEventListener('click', () => {
    //Input do campo Confirmar senha
    if(confirmPassword.getAttribute('type') === 'password'){
        confirmPassword.setAttribute('type', 'text');
        showConfirmPassword.style.color = '#4038a0';
    }else{
        confirmPassword.setAttribute('type', 'password');
        showConfirmPassword.style.color = '#000';
    }
});

//Função seguida de evento
//Função que valida o nome no registro
nameU.addEventListener('keyup', () => {
    if(nameU.value.length === 0){
        nameU.setAttribute('style', 'border-color: #0d009c');
        labelName.setAttribute('style', 'color: #0d009c');
        labelName.setAttribute('style', 'font-size: 13px');
        labelName.innerHTML = 'Nome';
        validName = false;
    } else{
        if(nameU.value.length <= 4){
            nameU.setAttribute('style', 'border-color: red');
            labelName.setAttribute('style', 'color: red');
            labelName.setAttribute('style', 'font-size: 13px');
            labelName.innerHTML = 'Nome (Insira no minimo 5 caracteres)';
            validName = false;
        } else{
            nameU.setAttribute('style', 'border-color: green');
            labelName.setAttribute('style', 'color: green');
            labelName.setAttribute('style', 'font-size: 13px');
            labelName.innerHTML = 'Nome';
            validName = true;
        }
    }
})

//Função que valida o nome de usuario no registro
username.addEventListener('keyup', () => {
    if(username.value.length === 0){
        username.setAttribute('style', 'border-color: #0d009c');
        labelUsername.setAttribute('style', 'color: #0d009c');
        labelUsername.setAttribute('style', 'font-size: 13px');
        labelUsername.innerHTML = 'Nome';
        validUsername = false;
    } else{
        if(username.value.length <= 4){
            username.setAttribute('style', 'border-color: red');
            labelUsername.setAttribute('style', 'color: red');
            labelUsername.setAttribute('style', 'font-size: 13px');
            labelUsername.innerHTML = 'Nome (Insira no minimo 5 caracteres)';
            validUsername = false;
        } else{
            username.setAttribute('style', 'border-color: green');
            labelUsername.setAttribute('style', 'color: green');
            labelUsername.setAttribute('style', 'font-size: 13px');
            labelUsername.innerHTML = 'Nome';
            validUsername = true;
        }
    }
});

//Função que confirma que o campo senha possui valores
password.addEventListener('keyup', () =>{
    if(password.value.length == 0){
        password.setAttribute('styel', 'border-color: #0d009c')
        labelPassword.setAttribute('style', 'color: #0d009c')
        labelPassword.setAttribute('style', 'font-size: 13px');
        labelPassword.innerHTML = 'Senha';
        validPassword = false;
    } else{
        checkPass()
    }
});

//Função que confirma que o campo senha possui valores
confirmPassword.addEventListener('keyup', () =>{
    if(confirmPassword.value.length == 0){
        confirmPassword.setAttribute('styel', 'border-color: #0d009c')
        labelConfirmPassword.setAttribute('style', 'color: #0d009c')
        labelConfirmPassword.setAttribute('style', 'font-size: 13px');
        labelConfirmPassword.innerHTML = 'Confirmar Senha';
        validConfirmPassword = false;
    } else{
        checkPass()
    }
});

//Função que executa a logica de validação de senha
function checkPass(){
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    if(passwordValue.length <= 7){
        password.setAttribute('style', 'border-color: red');
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.setAttribute('style', 'font-size: 13px');
        labelPassword.innerHTML = 'Senha (Insira no minimo 8 caracteres)';
        validPassword = false;
    }else{
        //Verifica se a senha possui pelo menos um caractere especial e uma letra
        let letterRegex = /[a-zA-Z]/;
        let specialRegex = /[!@#$%^&['*{},.;|<>|]/;
        if(!letterRegex.test(passwordValue) || !specialRegex.test(passwordValue)){
            password.setAttribute('style', 'border-color: red');
            labelPassword.setAttribute('style', 'color: red');
            labelPassword.setAttribute('style', 'font-size: 13px');
            labelPassword.innerHTML = 'Senha (Deve conter pelo menos uma letra e um caractere especial)';
            validPassword = false;
        } else{
            password.setAttribute('style', 'border-color: green');
            labelPassword.setAttribute('style', 'color: green');
            labelPassword.setAttribute('style', 'font-size: 13px');
            labelPassword.innerHTML = 'Senha';
            validPassword = true;
        }
    }

    //Conditional que compara os valores do campo senha e confirmar senha
    if(passwordValue != confirmPasswordValue || validPassword != true){
        confirmPassword.setAttribute('style', 'border-color: red');
        labelConfirmPassword.setAttribute('style', 'color: red');
        labelConfirmPassword.setAttribute('style', 'font-size: 13px');
        labelConfirmPassword.innerHTML = 'Senhas incorretas';
        validConfirmPassword = false;
    } else{
        confirmPassword.setAttribute('style', 'border-color: green');
        labelConfirmPassword.setAttribute('style', 'color: green');
        labelConfirmPassword.setAttribute('style', 'font-size: 13px');
        labelConfirmPassword.innerHTML = 'Senhas compativeis';
        validConfirmPassword = true;
    }
}

//Botão que submete o formulario
const submitButton = document.querySelector('#submitButton');

//Evento que realiza a checagem do valor dos campos: nome, usuario, senha e confirmação
//E submete os valores do formulario para a base de dados no servidor MySQL

submitButton.addEventListener('click', (e) => {
    if(!(validName && validUsername && validPassword && validConfirmPassword)){
        e.preventDefault()
    }
});

