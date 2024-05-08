//Icone de olho em login.html
const showPassword = document.querySelector('#showPassword');

showPassword.addEventListener('click', () => {
    //Input do campo senha
    const passwordInput = document.querySelector('#password')
    if(passwordInput.getAttribute('type') === 'password'){
        passwordInput.setAttribute('type', 'text');
        showPassword.style.color = '#4038a0';
    }else{
        passwordInput.setAttribute('type', 'password');
        showPassword.style.color = '#000';
    }
});