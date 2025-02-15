Given(/^que acesso o site$/, () => {
    cy.server();

    cy.route('POST','**//api/1/databases/userdetails/collections/newtable?**')
   .as('postNewtable');
    cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**')
   .as('postUsertable');
    cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**')
   .as('getNewtable');
   
    // navegando até uma url
    cy.visit('Register.html');
});
