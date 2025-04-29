import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the login page', () => {
  cy.visit('/auth');
});

When('I enter valid credentials and submit', () => {
  cy.get('#emailInput').type('alexey.shevchenko.04@gmail.com');
  cy.get('#passwordInput').type('12345678');
  cy.get('.login-submit').click();
});

Then('I should see the post list', () => {
  cy.url().should('include', '/main');
  cy.get('.post-list').should('exist');
  cy.get('app-post-item').should('have.length.greaterThan', 0);
});
