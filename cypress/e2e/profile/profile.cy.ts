import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in', () => {
  cy.visit('/auth');
  cy.get('#emailInput').type('alexey.shevchenko.04@gmail.com');
  cy.get('#passwordInput').type('12345678');
  cy.get('.login-submit').click();
  cy.url().should('include', '/main');
});

When('I click the profile button', () => {
  cy.get('.profile-btn').click();
});

Then('I should see my profile info', () => {
  cy.get('.popup').should('be.visible');
  cy.get('.popup').contains('Email: alexey.shevchenko.04@gmail.com');
  cy.get('.popup').contains('Username: iAlex228');
});
