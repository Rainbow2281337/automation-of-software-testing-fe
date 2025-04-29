import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the registration page', () => {
  cy.visit('/registration');
});

When('I fill the registration form with valid data', () => {
  cy.get('#emailInput').type('test@example.com');
  cy.get('#userNameInput').type('TestUser');
  cy.get('#passwordInput').type('SecurePass123');
});

When('I submit the registration form', () => {
  cy.get('.reg-submit').click();
});

Then('I should be redirected to the main page', () => {
  cy.url().should('include', '/main');
});
