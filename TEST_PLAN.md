# Plano de Teste - API Cart

## Introdução

Este documento detalha os cenários de teste, técnicas utilizadas e a abordagem adotada para validar a API de carrinho de compras. O objetivo é garantir que as funcionalidades de adição, atualização e remoção de itens no carrinho funcionem corretamente.

## Escopo

Os testes cobrem as seguintes funcionalidades da API:

- Adição de itens ao carrinho
- Atualização da quantidade de itens no carrinho
- Remoção de itens do carrinho

## Ferramentas Utilizadas

- [Cypress](https://www.cypress.io/) para automação dos testes de API
- [Node.js](https://nodejs.org/) como ambiente de execução

## Cenários de Teste

### 1. Adicionar um item ao carrinho

**Objetivo:** Verificar se um item pode ser adicionado corretamente ao carrinho.

**Passos:**

1. Enviar uma requisição `POST` para `/carts/add` com os detalhes do produto.
2. Verificar se a resposta retorna `201 Created`.
3. Confirmar que o produto foi adicionado corretamente na resposta.

**Técnica utilizada:** **Partição de Equivalência**\
A divisão de equivalência foi usada para garantir que os diferentes tipos de entradas válidas sejam testadas (exemplo: produtos com diferentes IDs e quantidades).

---

### 2. Atualizar a quantidade de um item no carrinho

**Objetivo:** Validar se a API permite alterar a quantidade de um item no carrinho corretamente.

**Passos:**

1. Enviar uma requisição `PUT` para `/carts/{id}` para modificar a quantidade de um item.
2. Confirmar que o status de resposta é `200 OK`.
3. Validar que a quantidade do item foi atualizada corretamente.

**Técnica utilizada:** **Teste de Caso de Uso**\
Esta técnica foi utilizada porque reflete um fluxo de negócio real onde o usuário pode querer modificar um item previamente adicionado ao carrinho.

---

### 3. Remover um item do carrinho

**Objetivo:** Assegurar que um item pode ser removido corretamente do carrinho.

**Passos:**

1. Enviar uma requisição `DELETE` para `/carts/{id}`.
2. Verificar se a resposta retorna `200 OK`.
3. Confirmar que o item foi removido com sucesso.

**Técnica utilizada:** **Teste de Valor Limite**\
Aqui, testamos diferentes cenários, incluindo remoção do último item do carrinho e tentativa de remover um item que não existe, para validar o comportamento em limites extremos.

---

## Como Executar os Testes

1. Abra o terminal e navegue até o diretório do projeto.
2. Execute o Cypress com o comando:
   ```bash
   npx cypress open
   ```
3. Na interface do Cypress, selecione o arquivo de teste e execute.

## Considerações Finais

Os testes foram projetados para garantir que as funcionalidades críticas do carrinho de compras operem conforme o esperado. A escolha das técnicas mencionadas visa cobrir diferentes tipos de entradas, fluxos reais de uso e cenários de borda, proporcionando uma cobertura de testes robusta.
