import forgotPassPage from '../pages/forgot-password'
import resetPassPage from '../pages/resetPass'

describe('Resgate de senha', function(){
    before(function () {
        cy.fixture('recovery').then(function(recovery) {
            this.data = recovery
        })
    })

    context('Quando o usuário esquece a senha', function(){

        before(function() {
            cy.postUser(this.data)
        })
        it('Deve poder resgatar por email', function() {
            forgotPassPage.go()
            forgotPassPage.form(this.data.email)
            forgotPassPage.submit()

            const msg = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            forgotPassPage.toast.shouldHaveText(msg)
        })
    })

    context('Quando o usuário solicita o resgate', function(){

        before(function(){
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })
        it('Deve poder cadastrar uma nova senha', function(){
            const token = Cypress.env('recoveryToken')
            
            resetPassPage.go(token)
            resetPassPage.form('abc123', 'abc123')
            resetPassPage.submit()

            const msg = 'Agora você já pode logar com a sua nova senha secreta.'

            resetPassPage.toast.shouldHaveText(msg)
        })
    })
})