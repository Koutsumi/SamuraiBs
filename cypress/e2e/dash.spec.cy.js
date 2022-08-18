import dashPage from '../pages/dash'
import {custumer, provider, appointment} from '../support/factories/dash'

describe('Dashboard', function() {
    context('Quando o cliente faz um agendamento no app mobile', function(){

        before(function(){
            cy.postUser(provider)
            cy.postUser(custumer)
            
            cy.apiLogin(custumer)
            cy.log('conseguimos pegar o token! ' + Cypress.env('apiToken'))

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })
        it('O mesmo deve ser exibido no dashboard', function(){
            console.log('id do ramom é ' + Cypress.env('providerId'))
            cy.apiLogin(provider, true)
            // cy.uiLogin(provider)
            dashPage.calendarShouldBeVisible()
            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)
            dashPage.appointmentShouldBe(custumer, appointment.hour)
        })
    })
})