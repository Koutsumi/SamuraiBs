import signupPage from '../pages/signup/index'

describe("Cadastro", function () {
  context("Quando o usuário é novato", function () {
    const user = {
      name: "Fernanda M",
      email: "febaccarini@yahoo.com",
      password: "pwd123",
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("Deve cadastrar com sucesso", function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText("Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!")
      
    });
  });

  context("Quando o e-mail já existe", function () {
    const user = {
      name: "Joao Lucas",
      email: "joaolucas@yahoo.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("Deve exibir email ja cadastrado", function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText("Email já cadastrado para outro usuário.")
    });
  });

  context("Quando o e-mail é incorreto", function () {
    const user = {
      name: "Elizanth Owsen",
      email: "liza.yahoo.com",
      password: "pwd123",
    };

    it('Deve exibir a mensagem de alerta', function() {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      
      signupPage.alertHaveText('Informe um email válido')
    })
  });

  context("Quando a senha é muito curta", function() {

    const passwords = [
      '1','12', '123', '1234', '12345'
    ]

    beforeEach(function () {
      signupPage.go()
    })

    passwords.forEach(function (p) {
      it('Não deve cadastrar com a senha ' + p, function() {

        const user = {
          name: 'Jason Friday',
          email: 'jason@gmail.com',
          password: p
        }

        signupPage.form(user)
        signupPage.submit()
          
      })
    })

    afterEach(function () {
      signupPage.alertHaveText('Pelo menos 6 caracteres')
    }) 
  })

  context("Quando não preencho nenhum dos campos", function() {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function () {
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function(alert){
      it('Deve exibir ' + alert.toLocaleLowerCase(), function(){
        signupPage.alertHaveText(alert)
      })
    })
  })
});
