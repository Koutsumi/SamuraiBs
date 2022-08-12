import loginPage from '../pages/login/index'
import dashPage from '../pages/dash'

describe('Dashboard', function() {
    context('Quando o cliente faz um agendamento no app mobile', function(){

        const data = {
            custumer: {
                name: 'Nikki Sixx',
                email: 'sixx@hotmail.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function(){
            cy.postUser(data.provider)
            cy.postUser(data.custumer)
            
            cy.apiLogin(data.custumer)
            cy.log('conseguimos pegar o token! ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })
        it('O mesmo deve ser exibido no dashboard', function(){
            console.log('id do ramom é ' + Cypress.env('providerId'))
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()
            dashPage.calendarShouldBeVisible()
            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)
            dashPage.appointmentShouldBe(data.custumer, data.appointmentHour)
        })
    })
})