import signupPage from '../pages/signup/index'

describe("Cadastro", function () {

  before(function() {
    cy.fixture('signup').then((signup) => {
      this.success = signup.success
      this.email_dup = signup.email_dup
      this.email_inv = signup.email_inv
      this.short_password = signup.short_password
    })
  })

  context("Quando o usuário é novato", function () {
    const user = {
      name: "Fernanda M",
      email: "febaccarini@yahoo.com",
      password: "pwd123",
    };

    before( function () {
      cy.task("removeUser", this.success.email).then(function (result) {
        console.log(result); 
      });
    });

    it("Deve cadastrar com sucesso", function () {
      signupPage.go()
      signupPage.form(this.success)
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

    before(function () {
      cy.postUser(this.email_dup);
    });

    it("Deve exibir email ja cadastrado", function () {
      signupPage.go()
      signupPage.form(this.email_dup)
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
      signupPage.form(this.email_inv)
      signupPage.submit()
      
      signupPage.alert.haveText('Informe um email válido')
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

        this.short_password.password = p

        signupPage.form(this.short_password)
        signupPage.submit()
          
      })
    })

    afterEach(function () {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
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
        signupPage.alert.haveText(alert)
      })
    })
  })
});
