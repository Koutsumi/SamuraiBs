import {el} from './elements'
import toast from '../../support/components/toast'
import alert from '../../support/components/alert'

class loginPage {

    constructor(){
        this.toast = toast
        this.alert = alert
    }

    go(){
        cy.visit('/')
        cy.contains(el.title, 'Faça seu login')
            .should('be.visible')
    }

    form(user){
        cy.get(el.email)
            .clear()
                .type(user.email)

        cy.get(el.password)
            .clear()
                .type(user.password)
    }

    submit(){
        cy.contains(el.submit)
            .click()
    }

    alertHaveText(expectedText){
        cy.contains(el.alertError, expectedText)
            .should('be.visible')
    }
}

export default new loginPage()