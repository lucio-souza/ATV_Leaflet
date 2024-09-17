describe('Testar formulário de cadastro', () => {
  beforeEach(() => {
    // Antes de cada teste, visitar a página do formulário
    cy.visit('http://127.0.0.1:5500/index.html'); // URL correta do seu ambiente local
  });

  it('Preenchendo formulário e enviando', () => {
    cy.get('#nome')
      .type('João da Silva')
      .should('have.value', 'João da Silva');

    cy.get('#idade')
      .type('30')
      .should('have.value', '30');

    cy.get('#email')
      .type('joao.silva@example.com')
      .should('have.value', 'joao.silva@example.com');

    cy.get('#button').click();
    cy.get('#msg').should('contain.text','Usuario criado com sucesso')
  });

  it('Verificando se é possivel cadastrar 2 usuarios com mesmo email', () => {
    cy.get('#nome')
      .type('João da Silva')

    cy.get('#idade')
      .type('30')
    cy.get('#email')
      .type('joao.silva@example.com')

    cy.get('#button').click();

    cy.get('#msg').should('contain.text','Já existe um usuario com esse email')
  });

  it('Verifica se os campos são obrigatórios', () => {
    cy.get('#button').click();

    cy.get('#msg').should('contain.text', 'Todos os campos são obrigatórios!')
  });


    it('Pesquisando um usuário e verificando o resultado', () => {
  
      cy.get('a.links').eq(1).click();
  
      cy.get('#email').type('joao.silva@example.com'); 
  
      cy.get('#btn-enviar').click();
  
      cy.get('#dados').should('contain.text', 'joao.silva@example.com');
      
      });

      it('apagando usuario', () => {
        cy.get('a.links').eq(1).click(); 
    
        cy.get('.img-apagar').should('exist').last().click();
        cy.get('#dados').should('not.contain.text', 'joao.silva@example.com');
      });
    
});
