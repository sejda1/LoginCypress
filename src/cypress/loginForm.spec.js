describe('Login Form Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the login form', () => {
      cy.get('h1').should('contain', 'KAYIT FORMU'); // Form başlığının doğru olduğundan emin olalım
      cy.get('form').should('be.visible'); // Formun görünür olduğuna emin olalım
    });
  
    it('should show an error when name is less than 3 characters', () => {
      cy.get('input[name="name"]').type('A'); // Çok kısa bir isim giriyoruz
      cy.get('form').submit(); // Formu gönderiyoruz
      cy.get('.invalid-feedback').should('contain', 'İsim en az 3 karakter olmalı.');
    });
  
    it('should show an error when email is invalid', () => {
      cy.get('input[name="email"]').type('invalidemail'); // Geçersiz e-posta giriyoruz
      cy.get('form').submit(); // Formu gönderiyoruz
      cy.get('.invalid-feedback').should('contain', 'Geçerli bir e-posta adresi giriniz.');
    });
  
    it('should enable submit button when form is valid', () => {
      // Geçerli veriler giriyoruz
      cy.get('input[name="name"]').type('Sejda');
      cy.get('input[name="surname"]').type('Ficici');
      cy.get('input[name="email"]').type('sejdaficici@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="phone"]').type('555-555-5555');
      cy.get('input[name="gender"]').check('Female');
      cy.get('input[name="confirmation"]').check(); // Onay kutusunu işaretliyoruz
      // Submit butonunun aktif olduğundan emin oluyoruz
      cy.get('button[type="submit"]').should('not.be.disabled');
    });
  
    it('should redirect to success page after valid form submission', () => {
      // Geçerli form verilerini giriyoruz
      cy.get('input[name="name"]').type('Sejda');
      cy.get('input[name="surname"]').type('Ficici');
      cy.get('input[name="email"]').type('sejdaficici@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="phone"]').type('555-555-5555');
      cy.get('input[name="gender"]').check('Female');
      cy.get('input[name="confirmation"]').check();
      
      // Formu gönderiyoruz
      cy.get('form').submit();
      
      // "/go" sayfasına yönlendirildiğimizi kontrol ediyoruz
      cy.url().should('include', '/go');
    });
  
    it('should show an error when the confirmation checkbox is not checked', () => {
      cy.get('input[name="name"]').type('Sejda');
      cy.get('input[name="surname"]').type('Ficici');
      cy.get('input[name="email"]').type('sejdaficici@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="phone"]').type('555-555-5555');
      cy.get('input[name="gender"]').check('Female');
      cy.get('button[type="submit"]').click();
      cy.get('.invalid-feedback').should('contain', 'Onay kutusunu işaretlemeniz gerekiyor.');
    });
  });
  