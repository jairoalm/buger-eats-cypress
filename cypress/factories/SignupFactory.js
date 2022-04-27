
var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: 'jairo@bol.com.br',
            whatsapp: '8399885522',
            address: {
                postalcode: '58706362',
                street: 'Rua América Palmeira dos Santos',
                number: '150',
                details: 'Apto 01',
                district: 'São Sebastião',
                city_state: 'Patos/PB'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}