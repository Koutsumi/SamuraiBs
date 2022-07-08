import {el} from './elements'
import toast from '../../support/components/toast/index'

class SignupPage {

    constructor() {
        this.toast = toast
    }

    go(){
        cy.visit("/signup");
    }

    form(user){
        cy.get(el.name).type(user.name);
    
        cy.get(el.email).type(user.email);
    
        cy.get(el.password).type(user.password, { log: false });
    }

    submit(){
        cy.contains(el.signupButton).click();
    }

    

}
export default new SignupPage