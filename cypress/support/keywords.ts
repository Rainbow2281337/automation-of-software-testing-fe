// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeywordFunction = (...args: any[]) => void;

export const keywords: Record<string, KeywordFunction> = {
  openPage: (url: string) => cy.visit(url),
  type: (selector: string, text: string) => cy.get(selector).type(text),
  click: (selector: string) => cy.get(selector).click(),
  shouldBeUrl: (url: string) => cy.url().should('include', url),
  shouldExist: (selector: string) => cy.get(selector).should('exist'),
  shouldNotExist: (selector: string) => cy.get(selector).should('not.exist'),
  shouldContain: (selector: string, text: string) =>
    cy.get(selector).should('contain', text),
};
