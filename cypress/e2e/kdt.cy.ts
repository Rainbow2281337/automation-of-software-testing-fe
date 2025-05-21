/* eslint-disable @typescript-eslint/no-explicit-any */
import loginScenario from '../fixtures/loginTest.json';
import registerScenario from '../fixtures/registerTest.json';
import passwordForgottenScenario from '../fixtures/passwordForgottenTest.json';
import viewPostsScenario from '../fixtures/viewPostTest.json';
import createPostScenario from '../fixtures/createPostTest.json';
import profileInfoScenario from '../fixtures/profileInfoTest.json';
import viewCommentTest from '../fixtures/viewCommentTest.json';
import createCommentTest from '../fixtures/createCommentTest.json';
import { keywords, KeywordFunction } from '../support/keywords';

interface Step {
  keyword: string;
  args: any[];
}

describe('Keyword Driven Login Test', () => {
  it('should login user and navigate to the main page', () => {
    (loginScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Keyword Driven Register Test', () => {
  it('should register user and navigate to the main page', () => {
    (registerScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Keyword Driven Password Forgotten Test', () => {
  it('should update password and navigate to the auth page', () => {
    (passwordForgottenScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Keyword Driven View Posts Test', () => {
  it('should load posts and open post details', () => {
    (viewPostsScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Keyword Driven Create Post Test', () => {
  it('should allow user to create a new post', () => {
    (createPostScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Keyword Driven Profile Info Test', () => {
  it('should show profile info after button click', () => {
    (profileInfoScenario as Step[]).forEach((step) => {
      const action: KeywordFunction | undefined = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Post Details View Test', () => {
  it('should display post with comments', () => {
    viewCommentTest.forEach((step) => {
      const action = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});

describe('Add Comment Test', () => {
  it('should allow user to add a comment', () => {
    createCommentTest.forEach((step) => {
      const action = keywords[step.keyword];
      if (!action) throw new Error(`Unknown keyword: ${step.keyword}`);
      action(...step.args);
    });
  });
});
