describe('Success Page Tests', () => {
    it('should render success message and navigate back to home', () => {
        // SuccessPage sayfasına git
        cy.visit('/success'); 

        // Başarı mesajlarının doğru şekilde görünmesi
        cy.get('[data-cy=success-page]').should('exist');
        cy.get('[data-cy=success-message]').should('contain', 'Form Başarıyla Gönderildi!');
        cy.get('[data-cy=info-saved]').should('contain', 'Bilgileriniz kaydedildi.');
        cy.get('[data-cy=thank-you-message]').should('contain', 'Teşekkür ederiz!');

        // Anasayfaya dön linkinin varlığını kontrol et
        cy.get('[data-cy=back-to-home-link]').should('have.attr', 'href', '/');
        
        // Linke tıklayıp anasayfaya yönlendirildiğini doğrula
        cy.get('[data-cy=back-to-home-link]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
