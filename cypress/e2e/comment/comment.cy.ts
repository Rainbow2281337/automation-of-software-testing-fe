import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in', () => {
  cy.visit('/auth');
  cy.get('#emailInput').type('alexey.shevchenko.04@gmail.com');
  cy.get('#passwordInput').type('12345678');
  cy.get('.login-submit').click();
  cy.url().should('include', '/main');
});

When('I click on a post', () => {
  cy.get('.post-item').first().click();
});

Then('I should see the post details with its comments', () => {
  cy.get('.post-title').should('be.visible');
  cy.get('.post-content').should('be.visible');
  cy.get('.comments-section').should('be.visible');
});

When('I add a new comment', () => {
  cy.get('#newComment').type('This is a new comment');
  cy.get('button.btn-primary').click();
});

Then('I should see my new comment in the list', () => {
  cy.get('.list-group-item')
    .last()
    .should('contain.text', 'This is a new comment');
});
