# Desafio Técnico - Garantindo a Qualidade no Coco Bambu

Este projeto contém testes automatizados para autenticação de usuário, cadastro de endereço e interações com a API de carrinho de compras. Os testes são realizados utilizando o Cypress para garantir o funcionamento adequado da aplicação e a integridade das APIs.

## Estrutura de Arquivos

- `autenticacao_e_cadastro_endereco.cy.js`: Testes para a funcionalidade de login do usuário e cadastro de endereço.
- `cart_api.cy.js`: Testes para a API do carrinho de compras, incluindo adição, atualização e remoção de itens no carrinho.

## Requisitos

Para executar os testes, você precisa de:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Cypress](https://www.cypress.io/) para execução de testes

## 1. Identificação de Fluxos Importantes

Abaixo, estão três fluxos essenciais para o funcionamento da plataforma de delivery:

### 1.1 Cadastro de Endereço
**Motivo:** O usuário precisa cadastrar um endereço para prosseguir com a compra. Caso essa etapa falhe, o cliente não conseguirá finalizar o pedido.
- **Cenários Críticos:**
  - Usuário tenta cadastrar um endereço inválido.
  - Falha no autocomplete do endereço.
  - Endereço salvo não aparece na lista de endereços cadastrados.

### 1.2 Adição de Itens ao Carrinho
**Motivo:** Se o cliente não conseguir adicionar itens ao carrinho, a compra não pode ser realizada.
- **Cenários Críticos:**
  - Item não é adicionado ao carrinho após clicar no botão.
  - O valor total do carrinho não é atualizado corretamente.
  - O botão de adição de itens está desabilitado.

### 1.3 Finalização do Pedido
**Motivo:** O cliente deve conseguir revisar e confirmar o pedido sem erros.
- **Cenários Críticos:**
  - O pedido é finalizado, mas não é registrado no sistema.
  - Erro ao selecionar forma de pagamento.
  - O resumo do pedido exibe valores incorretos.

## Instalação do Cypress

1. Clone o repositório:
    ```bash
    git clone https://github.com/Fernando32117/Desafio-Tecnico-QA-Engineer.git
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

**Fluxo do Teste 1:**
1. O teste visita a página inicial e clica na opção de login.
2. O usuário preenche as credenciais de login e o código OTP (fixo).
3. O teste navega até o menu de endereços e cadastra um novo endereço, preenchendo os campos necessários como rua e número.
4. O endereço é marcado como "padrão" e salvo.

**Fluxo do Teste 2:**
1. O teste visita a página inicial e clica na opção de login.
2. O usuário preenche as credenciais de login e o código OTP (fixo).
3. O teste navega até o menu de endereços e cadastra um novo endereço, preenchendo o campo rua.
4. O endereço é salvo como endereço sem número S/N.

### Testes de API do Carrinho

O arquivo `cart_api.cy.js` contém testes para interagir com a API de carrinho de compras utilizando o método `cy.request`.

**Fluxo do Teste:**
1. **Adicionar um item ao carrinho.**
2. **Atualizar a quantidade de um item.**
3. **Remover um item do carrinho.**
4. **Verificar se o carrinho está vazio ao ser criado.**
5. **Validar se o carrinho não pode ser atualizado com quantidade negativa.**
6. **Verificar o comportamento ao adicionar um item inexistente.**
7. **Manter consistência após adição e remoção de itens.**
8. **Carrinhos de usuários diferentes não devem se misturar.**
9. **Remover um item sem afetar os outros.**
10. **Não deve permitir adicionar mais produtos do que o estoque disponível.**
11. **Obter todos os carrinhos.**
12. **Obter um único carrinho.**
13. **Obter carrinhos de um usuário específico.**

## Como Executar os Testes

1. Abra o terminal e navegue até o diretório do projeto.

2. Execute o Cypress com o comando:
    ```bash
    npx cypress open
    ```
3. Na interface do Cypress, clique em um dos testes para executá-lo. O Cypress irá abrir um navegador de testes e mostrar o progresso de cada teste.
