describe('Dashboard', function() {
    context('Quando o cliente faz um agendamento no app mobile', function(){

        const data = {
            custumer: {
                name: 'Nikki Sixx',
                email: 'sixx@hotmail.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Ramon Valdes',
                email: 'ramon@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(function(){
            cy.postUser(data.custumer)
            cy.postUser(data.samurai)

            cy.apiLogin(data.custumer)
            cy.log('conseguimos pegar o token! ' + Cypress.env('apiToken'))
        })
        it('O mesmo deve ser exibido no dashboard', function(){
            console.log(data)
        })
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