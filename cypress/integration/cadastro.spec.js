/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it.only('Cadastro de Usuário no site', () => {
        //rotas
        //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
       // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
       // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // trabalhando com rotas - api

        cy.server();

        cy.route('POST','**//api/1/databases/userdetails/collections/newtable?**')
       .as('postNewtable');
        cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**')
       .as('postUsertable');
        cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**')
       .as('getNewtable');
       
        // navegando até uma url
        cy.visit('Register.html');

        // type - digitar no elemento
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[placeholder^="Last"]').type(chance.last());
        cy.get('input[ng-model="EmailAdress"]').type(chance.email());
        cy.get('input[ng-model="Phone"]').type(chance.phone({formatted: false}));

        // check - interage com radio e check
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        // select - select2 (combo)

        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('India', { force: true });
        cy.get('select#yearbox').select('1985');
        cy.get('select[ng-model^=month]').select('February');
        cy.get('select#daybox').select('24');

        cy.get('input#firstpassword').type("Agilizei@2020");
        cy.get('input#secondpassword').type("Agilizei@2020");

        // upload - attachFile
        cy.get('input#imagesrc').attachFile('anexo.png');

        // button - click
        cy.get('button#submitbtn').click();

        // espera da rota e resposta da rota - asserçoes

        cy.wait('@postNewtable').then ((resNewtable) =>{
            cy.log(resNewtable.status);
            //chai
            expect(resNewtable.status).to.eq(200);
        })

        cy.wait('@postUsertable').then ((resUsertable) =>{
            //chai
            expect(resUsertable.status).to.eq(200);
        })

        cy.wait('@getNewtable').then ((resNewtable) =>{
            //chai
            expect(resNewtable.status).to.eq(200);
        })

        cy.url().should('contain', 'WebTable');
    });
});

//elementos

/*
input[placeholder="First Name"]
input[placeholder^="Last"]
input[ng-model="EmailAdress"]
input[ng-model="Phone
*/