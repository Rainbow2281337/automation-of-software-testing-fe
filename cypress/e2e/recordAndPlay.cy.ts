const BASE_URL = 'http://localhost:4200';

describe('login', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/auth`);
  });

  it('should login with correct credentials', () => {
    const correctEmail = 'test123@gmail.com';
    const correctPassword = '2345678';

    cy.get('#emailInput').type(correctEmail);
    cy.get('#passwordInput').type(correctPassword);
    cy.get('.login-submit').click();

    cy.url().should('eq', `${BASE_URL}/main`);
  });

  it('should not login with incorrect email', () => {
    const wrongEmail = 'wrongEmail@gmail.com';
    const correctPassword = '2345678';

    cy.get('#emailInput').type(wrongEmail);
    cy.get('#passwordInput').type(correctPassword);
    cy.get('.login-submit').click();

    cy.url().should('eq', `${BASE_URL}/auth`);
  });

  it('should not login with incorrect password', () => {
    const correctEmail = 'test123@gmail.com';
    const wrongPassword = '23456789909988';

    cy.get('#emailInput').type(correctEmail);
    cy.get('#passwordInput').type(wrongPassword);
    cy.get('.login-submit').click();

    cy.url().should('eq', `${BASE_URL}/auth`);
  });
});

describe('registration', () => {
  const emailForRegistration = 'someEmailTest@gmail.com';
  const userNameForRegistration = 'Test123228';
  const passwordForRegistration = '12345678';

  beforeEach(() => {
    cy.visit(`${BASE_URL}/registration`);
  });

  afterEach(() => {
    cy.request(
      'DELETE',
      `http://localhost:5000/user/email/${emailForRegistration}`
    );
  });

  it('should register a new user with valid data', () => {
    cy.get('#emailInput').type(emailForRegistration);
    cy.get('#userNameInput').type(userNameForRegistration);
    cy.get('#passwordInput').type(passwordForRegistration);
    cy.get('.reg-submit').click();

    cy.url().should('eq', `${BASE_URL}/main`);
  });

  it('should not register a new user with invalid email', () => {
    const invalidEmail = 'invalidEmail';

    cy.get('#emailInput').type(invalidEmail);
    cy.get('#userNameInput').type(userNameForRegistration);
    cy.get('#passwordInput').type(passwordForRegistration);
    cy.get('.reg-submit').click();

    cy.get('#emailInput')
      .should('have.class', 'ng-invalid')
      .and('have.class', 'ng-dirty')
      .and('have.class', 'ng-touched')
      .and('have.class', 'is-invalid');
    cy.url().should('eq', `${BASE_URL}/registration`);
  });

  it('should not register a new user with invalid password', () => {
    const invalidPassword = '123';

    cy.get('#emailInput').type(emailForRegistration);
    cy.get('#userNameInput').type(userNameForRegistration);
    cy.get('#passwordInput').type(invalidPassword);
    cy.get('.reg-submit').click();

    cy.get('#passwordInput')
      .should('have.class', 'ng-invalid')
      .and('have.class', 'ng-dirty')
      .and('have.class', 'ng-touched')
      .and('have.class', 'is-invalid');
    cy.url().should('eq', `${BASE_URL}/registration`);
  });

  it('should not register a new user with invalid userName', () => {
    const invalidUserName = 'u';

    cy.get('#emailInput').type(emailForRegistration);
    cy.get('#userNameInput').type(invalidUserName);
    cy.get('#passwordInput').type(passwordForRegistration);
    cy.get('.reg-submit').click();

    cy.get('#userNameInput')
      .should('have.class', 'ng-invalid')
      .and('have.class', 'ng-dirty')
      .and('have.class', 'ng-touched')
      .and('have.class', 'is-invalid');
    cy.url().should('eq', `${BASE_URL}/registration`);
  });
});

describe('password forgotten', () => {
  const existingEmail = 'test2@gmail.com';
  const newPassword = '12345678';

  beforeEach(() => {
    cy.visit(`${BASE_URL}/auth/password-forgotten`);
  });

  it('should set password input visible if email exists', () => {
    cy.get('#emailInput').type(existingEmail);
    cy.get('.password-forgotten-submit').click();

    cy.should('be.visible', '#newpasswordInput');
  });

  it('should not set password input visible if email does not exist', () => {
    const invalidEmail = 'test';

    cy.get('#emailInput').type(invalidEmail);
    cy.get('.password-forgotten-submit').click();

    cy.get('#emailInput')
      .should('have.class', 'ng-invalid')
      .and('have.class', 'ng-dirty')
      .and('have.class', 'ng-touched')
      .and('have.class', 'is-invalid');
  });

  it('should change password with existing email', () => {
    cy.get('#emailInput').type(existingEmail);
    cy.get('.password-forgotten-submit').click();
    cy.get('#newpasswordInput').type(newPassword);
    cy.get('.password-forgotten-submit').click();

    cy.visit(`${BASE_URL}/auth`);
    cy.get('#emailInput').type(existingEmail);
    cy.get('#passwordInput').type(newPassword);
    cy.get('.login-submit').click();

    cy.url().should('eq', `${BASE_URL}/main`);
  });

  it('should not change password with less than 6 characters', () => {
    const invalidPassword = '123';

    cy.get('#emailInput').type(existingEmail);
    cy.get('.password-forgotten-submit').click();
    cy.get('#newpasswordInput').type(invalidPassword);
    cy.get('.password-forgotten-submit').click();

    cy.get('#newpasswordInput').should('have.class', 'is-invalid');
    cy.url().should('eq', `${BASE_URL}/auth/password-forgotten`);
  });
});

describe('profile', () => {
  const validEmail = 'test123@gmail.com';
  const validPassword = '2345678';

  beforeEach(() => {
    cy.visit(`${BASE_URL}/auth`);
    cy.get('#emailInput').type(validEmail);
    cy.get('#passwordInput').type(validPassword);
    cy.get('.login-submit').click();
    cy.visit(`${BASE_URL}/main`);
  });

  it('should open profile modal window', () => {
    cy.get('.profile-button-container > .btn').click();

    cy.should('be.visible', '.popup');
  });
});

describe('posts', () => {
  const validEmail = 'test123@gmail.com';
  const validPassword = '2345678';

  beforeEach(() => {
    cy.visit(`${BASE_URL}/auth`);
    cy.get('#emailInput').type(validEmail);
    cy.get('#passwordInput').type(validPassword);
    cy.get('.login-submit').click();
    cy.visit(`${BASE_URL}/main`);
  });

  it('should be visible', () => {
    cy.get('.post-list').should('be.visible');
  });

  it('should create a new post', () => {
    const REQUEST_URL = 'http://localhost:5000';

    cy.intercept('POST', `${REQUEST_URL}/posts`).as('createPost');

    cy.get('.add-post-button-container > .btn').click();
    cy.get('#title').type('New Post');
    cy.get('#content').type('New Post Content');
    cy.get('.modal-actions > .btn-primary').click();

    cy.wait('@createPost').its('response.statusCode').should('eq', 201);
  });
});
