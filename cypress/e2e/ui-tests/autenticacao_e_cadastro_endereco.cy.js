describe('Autenticação e Cadastro de Endereço', () => {

    // Variáveis para os seletores
    const selectors = {
        loginButtonNav: '.nav-bar-content > :nth-child(4)',
        loginOption: '.ng-star-inserted > .option-item',
        usernameField: '#username > .input-wrapper > .native-wrapper',
        passwordField: ':nth-child(3) > .ng-pristine > .input-wrapper > .native-wrapper',
        enterButton: '.buttons-container > :nth-child(1)',
        closeButton: '.is-primary',
        otpInputs: 'ng-otp-input input',
        addressMenu: '.fake-select',
        addressList: 'address-list.ng-star-inserted > .content-ltr',
        addAddressButton: '.add-button',
        addressForm: 'main.ng-star-inserted',
        streetField: '#rua',
        numberField: '#numero',
        defaultAddressToggle: '.default-div',
        saveButton: '.is-primary',
        noNumberOption: '.confirm'
    };

    beforeEach(() => {
        cy.visit('/');

        // Acessar a tela de login
        cy.get(selectors.loginButtonNav).click();
        cy.get(selectors.loginOption).click();

        // Preencher login
        cy.get(selectors.usernameField).type('nando.code32117@gmail.com');
        cy.get(selectors.passwordField).type('5SH03?tq2!');
        cy.get(selectors.enterButton).click();

        // Fechar pop-up
        cy.get(selectors.closeButton).click();

        // Preencher código OTP (fixo)
        cy.get(selectors.otpInputs).should('have.length', 6)
            .each(($el) => cy.wrap($el).type('A'));

        // Acessar a plataforma
        cy.get(selectors.enterButton).click();
    });

    it('Deve permitir ao usuário cadastrar um Endereço', () => {
        // Abrir menu de endereços
        cy.get(selectors.addressMenu, { timeout: 5000 }).should('be.visible').first().click();
        cy.get(selectors.addressList).should('exist');

        // Cadastrar novo endereço
        cy.get(selectors.addAddressButton).should('exist').click();
        cy.get(selectors.addressForm).should('exist');

        // Inserir nome do endereço
        cy.get('#autocomplete', { timeout: 5000 }).type('brasilia');
        cy.get('.pac-container > :nth-child(1)', { timeout: 5000 }).click();

        // Preencher endereço
        cy.get(selectors.streetField).should('be.visible').type('Qd 01 Lt 280 Lago Sul', { timeout: 5000 });
        cy.get(selectors.numberField).should('be.visible').type('280', { timeout: 5000 });

        // Marcar como endereço padrão e salvar
        cy.get(selectors.defaultAddressToggle).click();
        cy.get(selectors.saveButton).click();
    });

    it('Deve permitir ao usuário cadastrar um Endereço sem número', () => {
        // Abrir menu de endereços
        cy.get(selectors.addressMenu, { timeout: 5000 }).should('be.visible').first().click();
        cy.get(selectors.addressList).should('exist');

        // Cadastrar novo endereço
        cy.get(selectors.addAddressButton).should('exist').click();
        cy.get(selectors.addressForm).should('exist');

        // Inserir nome do endereço
        cy.get('#autocomplete', { timeout: 5000 }).type('brasilia');
        cy.get('.pac-container > :nth-child(1)', { timeout: 5000 }).click();

        // Preencher endereço
        cy.get(selectors.streetField).should('be.visible').type('Qd 58 Rua Testando Endereço', { timeout: 5000 });

        // Clicar em Salvar
        cy.get(selectors.saveButton).click();

        // Verificar se a opção "Endereço sem número" aparece
        cy.get(selectors.noNumberOption).should('be.visible').click();
    });

});
