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
});
