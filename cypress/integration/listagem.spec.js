/// <reference types="cypress" />

context('Listagem', () => {
    it.only('listagem sem registros', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtagle-get-vazio'
        }).as('getNewtable');
        
        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length',1);
    });

    it.only('listagem com apenas um registro', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-unico'
        });
        
        cy.visit('WebTable.html');

        // asserçoes em tabela

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '5408196723' );

    });
});