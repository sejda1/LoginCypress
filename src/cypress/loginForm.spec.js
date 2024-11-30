describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the login form', () => {
    cy.get('[data-cy="form-header"]').should('contain', 'ZİYARETÇİ KAYIT FORMU');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  it('should show an error when name is less than 3 characters', () => {
    cy.get('[data-cy="input-name"]').type('A');
    cy.get('[data-cy="login-form"]').submit();
    cy.get('[data-cy="error-name"]').should('contain', 'İsim en az 3 karakter olmalı.');
  });

  it('should show an error when email is invalid', () => {
    cy.get('[data-cy="input-email"]').type('invalidemail');
    cy.get('[data-cy="login-form"]').submit();
    cy.get('[data-cy="error-email"]').should('contain', 'Geçerli bir e-posta adresi giriniz.');
  });

  it('should enable submit button when form is valid', () => {
    cy.get('[data-cy="input-name"]').type('Sejda');
    cy.get('[data-cy="input-surname"]').type('Ficici');
    cy.get('[data-cy="input-email"]').type('sejdaficici@example.com');
    cy.get('[data-cy="input-password"]').type('password123');
    cy.get('[data-cy="input-phone"]').type('555-555-5555');
    cy.get('[data-cy="input-gender-female"]').check();
    cy.get('[data-cy="input-confirmation"]').check();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });

  it('should redirect to success page after valid form submission', () => {
    cy.get('[data-cy="input-name"]').type('Sejda');
    cy.get('[data-cy="input-surname"]').type('Ficici');
    cy.get('[data-cy="input-email"]').type('sejdaficici@example.com');
    cy.get('[data-cy="input-password"]').type('password123');
    cy.get('[data-cy="input-phone"]').type('555-555-5555');
    cy.get('[data-cy="input-gender-female"]').check();
    cy.get('[data-cy="input-confirmation"]').check();
    cy.get('[data-cy="login-form"]').submit();
    cy.url().should('include', '/go');
  });

  it('should show an error when the confirmation checkbox is not checked', () => {
    cy.get('[data-cy="input-name"]').type('Sejda');
    cy.get('[data-cy="input-surname"]').type('Ficici');
    cy.get('[data-cy="input-email"]').type('sejdaficici@example.com');
    cy.get('[data-cy="input-password"]').type('password123');
    cy.get('[data-cy="input-phone"]').type('555-555-5555');
    cy.get('[data-cy="input-gender-female"]').check();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-confirmation"]').should('contain', 'Onay kutusunu işaretlemeniz gerekiyor.');
  });
});
