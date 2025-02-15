/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();



When(/^informar os dados$/, () => {
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

});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
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
