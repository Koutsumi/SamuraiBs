import loginPage from '../pages/login/index'

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
            }
        }

        before(function(){
            cy.postUser(data.provider)
            cy.postUser(data.custumer)
            
            cy.apiLogin(data.custumer)
            cy.log('conseguimos pegar o token! ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment()
        })
        it('O mesmo deve ser exibido no dashboard', function(){
            console.log('id do ramom é ' + Cypress.env('providerId'))
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()
            cy.wait(3000)
        })
    })
})

import moment from 'moment'

Cypress.Commands.add('createAppointment', function() {
    let now = new Date()

    now.setDate(now.getDate() + 1)

    cy.log(now.getDate())

    const date = moment(now).format('YYYY-MM-DD 14:00:00')

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date,
    }

    cy.request(
        {
            method:'POST', 
            url:'http://localhost:3333/appointments', 
            body: payload,
            headers: {
                authorization: 'Bearer ' + Cypress.env('apiToken')
            }
        })
            .then(function(response){
        expect(response.status).to.eq(200)
        
    })
})

Cypress.Commands.add('apiLogin',function(user){
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({method:'POST', url:'http://localhost:3333/sessions', body: payload}).then(function(response){
        expect(response.status).to.eq(200)
        // console.log(response.body.token)
        Cypress.env('apiToken',response.body.token)
        console.log(Cypress.env('apiToken'))
    })
})