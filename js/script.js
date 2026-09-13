/* ==========================================================
   SIMEP
   JAVASCRIPT - LOGIN
   ========================================================== */


/* ==========================================================
   ELEMENTOS
   ========================================================== */

const loginForm =
  document.getElementById("loginForm");

const loginInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginLabel =
  document.getElementById("loginLabel");

const emailError =
  document.getElementById("emailError");

const passwordError =
  document.getElementById("passwordError");

const loginMessage =
  document.getElementById("loginMessage");

const togglePassword =
  document.getElementById("togglePassword");

const forgotPassword =
  document.getElementById("forgotPassword");

const createAccount =
  document.getElementById("createAccount");

const govLogin =
  document.getElementById("govLogin");

const loginTabs =
  document.querySelectorAll(".login-tab");


/* ==========================================================
   TIPO DE LOGIN
   ========================================================== */

let loginType = "responsavel";


loginTabs.forEach(function (tab) {

  tab.addEventListener("click", function () {

    loginTabs.forEach(function (item) {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    loginType =
      tab.dataset.tab;

    clearErrors();


    /* Responsável / aluno */

    if (loginType === "responsavel") {

      loginLabel.textContent =
        "CPF ou E-mail";

      loginInput.placeholder =
        "Digite seu CPF ou e-mail";

    }


    /* Escola / gestão */

    if (loginType === "escola") {

      loginLabel.textContent =
        "E-mail institucional";

      loginInput.placeholder =
        "Digite seu e-mail institucional";

    }

  });

});


/* ==========================================================
   MOSTRAR / ESCONDER SENHA
   ========================================================== */

togglePassword.addEventListener(
  "click",

  function () {

    if (passwordInput.type === "password") {

      passwordInput.type =
        "text";

      togglePassword.setAttribute(
        "aria-label",
        "Ocultar senha"
      );

    } else {

      passwordInput.type =
        "password";

      togglePassword.setAttribute(
        "aria-label",
        "Mostrar senha"
      );

    }

  }
);


/* ==========================================================
   LIMPAR ERROS
   ========================================================== */

function clearErrors() {

  emailError.textContent = "";

  passwordError.textContent = "";

  loginInput.classList.remove(
    "input-error"
  );

  passwordInput.classList.remove(
    "input-error"
  );

  loginMessage.className =
    "login-message";

  loginMessage.textContent = "";

}


/* ==========================================================
   VALIDAR E-MAIL
   ========================================================== */

function validateEmail(email) {

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);

}


/* ==========================================================
   VALIDAR CPF
   ========================================================== */

function validateCPFFormat(cpf) {

  const cleaned =
    cpf.replace(/\D/g, "");

  return cleaned.length === 11;

}


/* ==========================================================
   VERIFICA SE É CPF
   ========================================================== */

function isCPF(value) {

  const cleaned =
    value.replace(/\D/g, "");

  return /^\d{11}$/.test(cleaned);

}


/* ==========================================================
   FORMATAÇÃO AUTOMÁTICA CPF
   ========================================================== */

loginInput.addEventListener(
  "input",

  function () {

    /*
      Só formata se o usuário estiver
      digitando números.
    */

    const original =
      loginInput.value;

    if (!/^[\d.\-]*$/.test(original)) {
      return;
    }

    let value =
      original.replace(/\D/g, "");

    value =
      value.substring(0, 11);

    if (value.length > 9) {

      value =
        value.replace(
          /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
          "$1.$2.$3-$4"
        );

    } else if (value.length > 6) {

      value =
        value.replace(
          /(\d{3})(\d{3})(\d{1,3})/,
          "$1.$2.$3"
        );

    } else if (value.length > 3) {

      value =
        value.replace(
          /(\d{3})(\d{1,3})/,
          "$1.$2"
        );

    }

    loginInput.value =
      value;

  }
);


/* ==========================================================
   SUBMIT
   ========================================================== */

loginForm.addEventListener(
  "submit",

  function (event) {

    event.preventDefault();

    clearErrors();

    const login =
      loginInput.value.trim();

    const password =
      passwordInput.value.trim();

    let valid = true;


    /* ======================================================
       LOGIN
       ====================================================== */

    if (login === "") {

      emailError.textContent =
        loginType === "responsavel"
          ? "Informe seu CPF ou e-mail."
          : "Informe seu e-mail institucional.";

      loginInput.classList.add(
        "input-error"
      );

      valid = false;

    } else {

      /*
        Responsável / Aluno:
        aceita CPF ou e-mail
      */

      if (loginType === "responsavel") {

        const cpfCandidate =
          login.replace(/\D/g, "");

        const looksLikeCPF =
          /^[\d.\-]+$/.test(login);


        if (looksLikeCPF) {

          if (!validateCPFFormat(login)) {

            emailError.textContent =
              "Informe um CPF válido.";

            loginInput.classList.add(
              "input-error"
            );

            valid = false;

          }

        } else {

          if (!validateEmail(login)) {

            emailError.textContent =
              "Informe um e-mail válido.";

            loginInput.classList.add(
              "input-error"
            );

            valid = false;

          }

        }

      }


      /*
        Escola / gestão:
        aceita somente e-mail
      */

      if (
        loginType === "escola" &&
        !validateEmail(login)
      ) {

        emailError.textContent =
          "Informe um e-mail institucional válido.";

        loginInput.classList.add(
          "input-error"
        );

        valid = false;

      }

    }


    /* ======================================================
       SENHA
       ====================================================== */

    if (password === "") {

      passwordError.textContent =
        "Informe sua senha.";

      passwordInput.classList.add(
        "input-error"
      );

      valid = false;

    } else if (password.length < 6) {

      passwordError.textContent =
        "A senha deve possuir pelo menos 6 caracteres.";

      passwordInput.classList.add(
        "input-error"
      );

      valid = false;

    }


    if (!valid) {
      return;
    }


    /* ======================================================
       SIMULAÇÃO DE LOGIN
       ====================================================== */

    const button =
      loginForm.querySelector(
        ".btn-login"
      );

    const buttonText =
      button.querySelector("span");


    buttonText.textContent =
      "Entrando...";

    button.disabled =
      true;


    loginMessage.className =
      "login-message success";

    loginMessage.textContent =
      "Dados válidos. Preparando acesso ao SIMEP...";


    setTimeout(
      function () {

        buttonText.textContent =
          "Entrar";

        button.disabled =
          false;

      },
      1500
    );

  }
);


/* ==========================================================
   ESQUECI SENHA
   ========================================================== */

forgotPassword.addEventListener(
  "click",

  function (event) {

    event.preventDefault();

    alert(
      "A recuperação de senha será conectada ao back-end posteriormente."
    );

  }
);


/* ==========================================================
   CADASTRO
   ========================================================== */

createAccount.addEventListener(
  "click",

  function (event) {

    event.preventDefault();

    alert(
      "A tela de cadastro será implementada posteriormente."
    );

  }
);


/* ==========================================================
   GOV.BR
   ========================================================== */

govLogin.addEventListener(
  "click",

  function () {

    alert(
      "A autenticação com o gov.br será integrada posteriormente."
    );

  }
);