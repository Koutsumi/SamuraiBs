import { el } from './element'
import toast from '../../support/components/toast'

class ForgotPassPage{

    constructor(){
        this.toast = toast
    }

    go(){
        cy.visit('/forgot-password')
        cy.contains(el.title, 'Recuperar senha')
            .should('be.visible')
    }

    form(email){
        cy.get(el.email)
            .type(email)
    }

    submit(){

        cy.get(el.submit)
            .click()
    }

}

export default new ForgotPassPage()