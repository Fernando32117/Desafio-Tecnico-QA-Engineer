# Cypress Testing: Autenticação e API Cart

Este projeto contém testes automatizados para autenticação de usuário, cadastro de endereço e interações com a API de carrinho de compras. Os testes são realizados utilizando o Cypress para garantir o funcionamento adequado da aplicação e a integridade das APIs.

## Estrutura de Arquivos

- `autenticacao_e_cadastro_endereco.cy.js`: Testes para a funcionalidade de login do usuário e cadastro de endereço.
- `cart_api.cy.js`: Testes para a API do carrinho de compras, incluindo adição, atualização e remoção de itens no carrinho.

## Requisitos

Para executar os testes, você precisa de:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Cypress](https://www.cypress.io/) para execução de testes

## Instalação do Cypress

1. Clone o repositório:
    ```bash
    git clone (https://github.com/Fernando32117/Desafio-Tecnico-QA-Engineer.git)
    cd Desafio-Tecnico-QA-Engineer
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Abra o Cypress:
    ```bash
    npx cypress open
    ```

## Testes

### Testes de Autenticação e Cadastro de Endereço

O arquivo `autenticacao_e_cadastro_endereco.cy.js` contém os testes para realizar o login e o cadastro de um novo endereço.

**Fluxo do Teste:**
1. O teste visita a página inicial e clica na opção de login.
2. O usuário preenche as credenciais de login e o código OTP (fixo).
3. O teste navega até o menu de endereços e cadastra um novo endereço, preenchendo os campos necessários como rua e número.
4. O endereço é marcado como "padrão" e salvo.

### Testes de API do Carrinho

O arquivo `cart_api.cy.js` contém testes para interagir com a API de carrinho de compras utilizando o método `cy.request`.

**Fluxo do Teste:**
1. **Adicionar um item ao carrinho:**
    - Um item é adicionado ao carrinho utilizando o método `POST` na API de carrinho, e o teste verifica se a resposta tem status `201` e o item é adicionado corretamente.

2. **Atualizar a quantidade de um item:**
    - O teste utiliza o método `PUT` para atualizar a quantidade de um item no carrinho e verifica se a resposta retorna o status `200` e a quantidade foi atualizada corretamente.

3. **Remover um item do carrinho:**
    - O teste utiliza o método `DELETE` para remover um item do carrinho e verifica se a resposta retorna o status `200` e o item foi removido corretamente.

## Como Executar os Testes

1. Abra o terminal e navegue até o diretório do projeto.

2. Execute o Cypress com o comando:
    ```bash
    npx cypress open
    ```
3. Na interface do Cypress, clique em um dos testes para executá-lo. O Cypress irá abrir um navegador de testes e mostrar o progresso de cada teste.
