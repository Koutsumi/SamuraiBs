import _ from 'underscore'

exports.custumer = {

    name: 'Nikki Sixx',
    email: 'sixx@hotmail.com',
    password: 'pwd123',
    is_provider: false

}

exports.provider = {

    name: 'Ramon Valdes',
    email: 'ramon@samuraibs.com',
    password: 'pwd123',
    is_provider: true

}

exports.appointment = {
    // hour: '14:00'

    hour: _.sample(['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'])

}
