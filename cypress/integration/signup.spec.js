import cypressDark from 'cypress-dark'
import signup from '../pages/SignupPage'
import signupFactory from  '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'


describe('Signup', function () {


    // beforeEach(() => {
    //     cy.fixture('deliver.json').then((d) => {
    //         this.deliver = d
    //     })
    // })
    // ganchos do cypress

    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de testes')
    // })

    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de testes')
    // })

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        // Mensagem de sucesso
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '956963310we'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'jairo.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        //signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })


    // O cypress continua com os testes mesmo encontrando uma falha no meio da execução
    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome'},
            { field: 'cpf', output: 'É necessário informar o CPF'},
            { field: 'email', output: 'É necessário informar o email'},
            { field: 'postalcode', output: 'É necessário informar o CEP'},
            { field: 'number', output: 'É necessário informar o número do endereço'},
            { field: 'delivery_method', output: 'Selecione o método de entrega'},
            { field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    // Teste normal com cypress interropendo assim que encontra um problema
    // it.only('Required fields', function() {
    //     SignupPage.go()
    //     SignupPage.submit()
    //     SignupPage.alertMessageShouldBe('É necessário informar o nome')
    //     SignupPage.alertMessageShouldBe('É necessário informar o CPF')
    //     SignupPage.alertMessageShouldBe('É necessário informar o email')
    //     SignupPage.alertMessageShouldBe('É necessário informar o CEP')
    //     SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //     SignupPage.alertMessageShouldBe('Selecione o método de entrega')
    //     SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    // })
})