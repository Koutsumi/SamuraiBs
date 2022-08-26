import {el} from './elements'
import toast from '../../support/components/toast/index'
import alert from '../../support/components/alert'

class SignupPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go(){
        cy.visit("/signup");
        cy.contains(el.title, 'Faça seu cadastro')
            .should('be.visible')
    }

    form(user){
        cy.get(el.name).type(user.name);
    
        cy.get(el.email).type(user.email);
    
        cy.get(el.password).type(user.password, { log: false });
    }

    submit(){
        cy.contains(el.signupButton).click();
    }

    alertHaveText(expectedMessage){
        cy.contains('.alert-error', expectedMessage)
        .should('be.visible')
    }

}
export default new SignupPage