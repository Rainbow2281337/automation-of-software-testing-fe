import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the password forgotten page', () => {
  cy.visit('/auth/password-forgotten');
});

When('I enter a valid email and submit', () => {
  cy.get('#emailInput').type('alexey.shevchenko.03@gmail.com');
  cy.get('button.password-forgotten-submit').click();
});

When('I enter a new valid password and submit', () => {
  cy.get('#newpasswordInput').type('NewPass123');
  cy.get('button.password-forgotten-submit').click();
});

Then('I should be redirected to the auth page', () => {
  cy.url().should('include', '/auth');
});
