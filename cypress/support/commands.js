import moment from 'moment'

 
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginPage from '../pages/login'
import dashPage from '../pages/dash'

Cypress.Commands.add('uiLogin', function(user) {
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    dashPage.header.userLoggedIn(user.name)
})

Cypress.Commands.add('postUser', function(user) {
    cy.task('removeUser', user.email)
    .then(function (result) {
        console.log(result)
    })

    cy.request('POST', 'https://samuraibs-api-fernanda.herokuapp.com/users', user)
    .then(function(response) {
        expect(response.status).eq(200)
    })
})

Cypress.Commands.add('recoveryPass', function(email){
    cy.request('POST', 'https://samuraibs-api-fernanda.herokuapp.com/password/forgot', {email:email}).then(function(response) {
        expect(response.status).eq(204)

        cy.task('findToken', email)
                .then(function(result){
                    // console.log(result.token)
                    Cypress.env('recoveryToken', result.token)
                })
    })
})

Cypress.Commands.add('setProviderId', function(providerEmail) {
    cy.request({
        method:'GET',
        url: 'https://samuraibs-api-fernanda.herokuapp.com/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
        }).then(function(response) {
            expect(response.status).eq(200)
            console.log(response.body)

            const providerList = response.body
            providerList.forEach(provider => {
                if(provider.email === providerEmail){
                    Cypress.env('providerId', provider.id)
                }
            });
        })
})

Cypress.Commands.add('createAppointment', function(hour) {
    let now = new Date()

    now.setDate(now.getDate() + 1)

    Cypress.env('appointmentDate', now)

    cy.log(now.getDate())

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date,
    }
    
    cy.log(payload)

    cy.request(
        {
            method:'POST', 
            url:'https://samuraibs-api-fernanda.herokuapp.com/appointments', 
            body: payload,
            headers: {
                authorization: 'Bearer ' + Cypress.env('apiToken')
            }
        })
            .then(function(response){
        expect(response.status).to.eq(200)
        
    })
})

Cypress.Commands.add('apiLogin',function(user, setLStorage = false){
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({method:'POST', url:'https://samuraibs-api-fernanda.herokuapp.com/sessions', body: payload}).then(function(response){
        expect(response.status).to.eq(200)
        // console.log(response.body.token)
        Cypress.env('apiToken',response.body.token)
        console.log(Cypress.env('apiToken'))

        if(setLStorage){
            const {token, user} = response.body

            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }

       
    })
    if(setLStorage) cy.visit('/dashboard')
})