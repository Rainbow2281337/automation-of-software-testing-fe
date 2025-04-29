import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the login page', () => {
  cy.visit('/auth');
});

When('I click the login button', () => {
  cy.get('.login-submit').click();
});

Then('I should see validation messages', () => {
  cy.get('.invalid-feedback span').should('contain', 'Value is required');
});

When('I type {string} and {string}', (email: string, password: string) => {
  cy.get('#emailInput').type(email);
  cy.get('#passwordInput').type(password);
});

Then('I should be redirected to the main page', () => {
  cy.url().should('include', '/main');
});
