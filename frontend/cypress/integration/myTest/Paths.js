import { checkPropTypes } from 'prop-types';

context('Happy Path for App', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('Happy path', () => {
    cy.get('h1').then((text) => {
      expect(text.text()).to.contain('Welcome to BigBrain!');
    });

    cy.get('#TabRegister').click();
    const name = 'Me';
    const email = 'me@email.com';
    const password = 'QaQ123456!';
    cy.get('#emailRegister').focus().type(email);
    cy.get('#passwordRegister').focus().type(password);
    cy.get('#nameRegister').focus().type(name);
    cy.get('#registerConfirm').click();

    // cy.get('[id=TabLogin]').click();
    // const email = 'me@email.com';
    // const password = 'QaQ123456!';
    // cy.get('#loginEmail').focus().type(email).should('have.value', email);
    // cy.get('[id=loginPassword]').clear().focus().type(password).should('have.value', password);
    // cy.get('[id=loginConfirm]').click();

    // cy.wait(3000);

    // Create New Quiz
    const quiz = 'Maths';
    cy.get('#buttonCreateQuiz').click();
    cy.get('#standard-basic').focus().type('Maths').should('have.value', 'Maths');
    cy.get('#buttonQuizSubmit').click();
    cy.get('.Style_cardPanel__REyE0').find('button');
    // expect quizname = math

    // Edit quiz
    cy.get('.Style_cardPanel__REyE0').find('button').eq(1).click();
    // newQuestion
    cy.get('#newQuestion').click();
    // cy.wait(1000);
    cy.get('#questionName').focus().type('Question Name').should('value', 'Question Name');
    cy.get('#Option-0').focus().type('Option 1').should('value', 'Option 1');
    cy.get('#Option-1').focus().type('Option 2').should('value', 'Option 2');
    cy.get('#questionConfirm').click();
    // check the quiz is successfully created
    cy.contains('Question Name').should('be.visible');
    cy.get('#newQuestion').then((text) => {
      expect(text.text()).to.contain('Create New Question');
    });

    // Navigate to dashboard
    cy.get('#TabDashboard').click();
    // cy.wait(3000);

    // Start quiz
    cy.get('.Style_cardPanel__REyE0').find('button').eq(0).click();
    // cy.wait(1000);
    cy.get('#butonCopy').click();
    // cy.window().its('navigator.clipboard').invoke('readText').should('contain', 'play');
    // cy.wait(1000);

    // Stop quiz
    cy.get('.Style_cardPanel__REyE0').find('button').first().click();

    // View Result
    cy.get('#resultView').click();
    // cy.wait(1000);
    cy.get('h3')
      .first()
      .then((text) => {
        expect(text.text()).to.contain('Top 5 players');
      });
    cy.get('h3')
      .eq(1)
      .then((text) => {
        expect(text.text()).to.contain('Statistics');
      });

    // Navigate back to dashboard
    cy.get('#TabDashboard').click();
    // cy.wait(3000);

    // // Delete Quiz
    // cy.get('.Style_cardPanel__REyE0').find('button').eq(2).click();
    // cy.get('#deleteConfirm').click();
    // cy.wait(5000);

    // Logout
    cy.get('#TabLogout').click();
    cy.get('h1').then((text) => {
      expect(text.text()).to.contain('Welcome to BigBrain!');
    });
    // cy.contains('Welcome to BigBrain!').should('be.visible');
    // cy.wait(1000);

    // Login Back
    cy.get('[id=TabLogin]').click();
    cy.get('#loginEmail').focus().type(email).should('have.value', email);
    cy.get('[id=loginPassword]').clear().focus().type(password).should('have.value', password);
    cy.get('[id=loginConfirm]').click();

    // cy.wait(3000);

    // Check it is dashboard
    cy.get('#buttonCreateQuiz').then((text) => {
      expect(text.text()).to.contain('Create New Quiz');
    });
  });

  it('Another Path', () => {
    cy.get('[id=TabLogin]').click();
    const email = 'me@email.com';
    const wrongPassword = 'qaq123456!';
    const password = 'QaQ123456!';

    // unsuccessful login
    cy.get('#loginEmail').focus().type(email).should('have.value', email);
    cy.get('#loginPassword').focus().type(wrongPassword).should('have.value', wrongPassword);
    cy.on('window:alert', (text) => {
      expect(text).toEqual('Invalid username or password');
    });

    // successful login
    cy.get('[id=loginPassword]').clear().focus().type(password).should('have.value', password);
    cy.get('[id=loginConfirm]').click();

    // upload json file
    cy.get('#uploadQuiz').attachFile('upload.json');
    // cy.wait(3000);
    cy.contains('English').should('be.visible');
    cy.contains('Number of Questions : 2').should('be.visible');
    cy.contains('Time Limit : 60 seconds').should('be.visible');

    // Edit quiz
    cy.get('.Style_cardPanel__REyE0').find('button').eq(1).click();
    // edit question

    const newName = 'New Question Name';
    const option = 'New Option';
    cy.get('.MuiPaper-root').find('button').eq(1).click();
    cy.get('h3')
      .first()
      .then((text) => {
        expect(text.text()).to.contain('Question Information:');
      });
    cy.get('h3')
      .eq(1)
      .then((text) => {
        expect(text.text()).to.contain('Options:');
      });

    // check question original name is prefilled
    cy.get('#questionName').then((name) => {
      expect(name.val()).to.contain('Question 1');
    });
    // edit question name
    cy.get('#questionName').clear().focus().type(newName).should('have.value', newName);
    // add new option
    cy.get('#optionAdd').click();
    cy.contains('Answer 6').should('be.visible');
    cy.get('#Option-5').focus().type(option).should('value', option);
    cy.get('#questionConfirm').click();
    //check question name and new option exists
    cy.contains(newName).should('be.visible');
    cy.contains(option).should('be.visible');

    // delete question
    cy.get('.MuiPaper-root').find('button').eq(0).click();
    cy.contains(newName).should('not.exist');

    // Logout
    cy.get('#TabLogout').click();
    cy.get('h1').then((text) => {
      expect(text.text()).to.contain('Welcome to BigBrain!');
    });
  });
});
