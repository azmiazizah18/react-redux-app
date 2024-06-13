describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="leejeno@gmail.com"]').should('be.visible');
    cy.get('input[placeholder="LeeJeno123"]').should('be.visible');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="LeeJeno123"]').type('admin123');
    cy.get('button').contains(/^Masuk$/).should('be.visible');
    cy.get('button').contains(/^Masuk$/).click;
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email is required');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="leejeno@gmail.com"]').type('test@gmail.com');
    cy.get('button').contains(/^Masuk$/).click;
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password is required');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="leejeno@gmail.com"]').type('test@gmail.com');
    cy.get('input[placeholder="LeeJeno123"]').type('wrong_password');
    cy.get('button').contains(/^Masuk$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="leejeno@gmail.com"]').type('zaenalalfian@gmail.com');
    cy.get('input[placeholder="LeeJeno123"]').type('admin123');
    cy.get('button').contains(/^Masuk$/).click();
    cy.get('div').contains(/^Kategori Teratas$/).should('be.visible');
  });
});
