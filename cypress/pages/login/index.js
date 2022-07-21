import {el} from './elements'

class loginPage {
    go(){
        cy.visit('/')

    }

    form(user){
        cy.get(el.email)
            .type(user.email)

        cy.get(el.password)
            .type(user.password)
    }

    submit(){
        cy.contains(el.submit)
            .click()
    }
}

export default new loginPage()