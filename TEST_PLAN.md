# Plano de Teste - API Cart

## Introdução

Este documento detalha os cenários de teste, técnicas utilizadas e a abordagem adotada para validar a API do carrinho de compras. O objetivo é garantir que as funcionalidades de adição, atualização, remoção de itens no carrinho funcionem corretamente dentre outras funcionalidades descritas nessa documentação.

## Escopo

Os testes cobrem as seguintes funcionalidades da API:

- Adição de itens ao carrinho
- Atualização da quantidade de itens no carrinho
- Remoção de itens do carrinho
- Verificar se o carrinho está vazio ao ser criado
- Validar se o carrinho não pode ser atualizado com quantidade negativa
- Verificar o comportamento ao adicionar um item inexistente
- Manter consistência após adição e remoção de itens
- Carrinhos de usuários diferentes não devem se misturar
- Remover um item sem afetar os outros itens do carrinho
- Não deve permitir adicionar mais produtos do que o estoque disponível

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

### 4. Verificar se o carrinho está vazio ao ser criado

**Objetivo:** Assegurar que um novo carrinho começa vazio.

**Passos:**

1. Enviar uma requisição `GET` para `/carts/{id}`.
2. Confirmar que o status de resposta é `200 OK`.
3. Verificar que o carrinho está vazio na resposta.

**Técnica utilizada:** **Estado Inicial**\
Essa técnica garante que um novo carrinho de compras comece sem itens, validando o estado inicial do carrinho.

---

### 5. Validar se o carrinho não pode ser atualizado com quantidade negativa

**Objetivo:** Garantir que não é permitido adicionar itens com quantidade negativa ao carrinho.

**Passos:**

1. Enviar uma requisição `POST` para `/carts/add` com uma quantidade negativa de produtos.
2. Confirmar que o status de resposta indica falha.
3. Verificar a mensagem de erro retornada pela API.

**Técnica utilizada:** **Teste de Valor Limite**\
Essa técnica testa o comportamento da API ao receber valores inválidos, como uma quantidade negativa.

---

### 6. Verificar o comportamento ao adicionar um item inexistente

**Objetivo:** Assegurar que a API não permite adicionar produtos inexistentes ao carrinho.

**Passos:**

1. Enviar uma requisição `POST` para `/carts/add` com um ID de produto inexistente.
2. Confirmar que o status de resposta indica falha.
3. Verificar a mensagem de erro retornada pela API.

**Técnica utilizada:** **Partição de Equivalência**\
Essa técnica testa com entradas inválidas (produtos que não existem no sistema), validando a robustez da API.

---

### 7. Manter consistência após adição e remoção de itens

**Objetivo:** Verificar se a consistência do carrinho é mantida após a adição e remoção de itens.

**Passos:**

1. Adicionar um produto ao carrinho enviando uma requisição `POST` para `/carts/add`.
2. Remover o mesmo produto enviando uma requisição `DELETE` para `/carts/{id}`.
3. Confirmar que o carrinho está vazio enviando uma requisição `GET` para `/carts/{id}`.

**Técnica utilizada:** **Teste de Transição de Estado**\
Essa técnica assegura que a transição de estados (adição e remoção de itens) resulta no estado esperado do carrinho.

---

### 8. Carrinhos de usuários diferentes não devem se misturar

**Objetivo:** Garantir que os carrinhos de usuários diferentes são mantidos separados.

**Passos:**

1. Adicionar itens ao carrinho de dois usuários diferentes.
2. Verificar que cada usuário tem apenas os itens adicionados por ele.

**Técnica utilizada:** **Isolamento de Dados**\
Essa técnica valida que dados de diferentes usuários são isolados corretamente.

---

### 9. Remover um item sem afetar os outros

**Objetivo:** Assegurar que a remoção de um item não afeta os outros itens do carrinho.

**Passos:**

1. Adicionar múltiplos itens ao carrinho.
2. Remover um dos itens.
3. Verificar que apenas o item removido desapareceu e os outros itens permanecem.

**Técnica utilizada:** **Isolamento de Componente**\
Essa técnica assegura que operações em um item específico não afetam outros itens.

---

### 10. Não deve permitir adicionar mais produtos do que o estoque disponível

**Objetivo:** Verificar se a API impede a adição de produtos além do estoque disponível.

**Passos:**

1. Enviar uma requisição `POST` para `/carts/add` com uma quantidade excedente de produtos.
2. Confirmar que o status de resposta indica falha.
3. Verificar a mensagem de erro retornada pela API.

**Técnica utilizada:** **Teste de Valor Limite**\
Essa técnica valida que a API trata corretamente situações onde a quantidade solicitada excede o estoque disponível.

---

## Como Executar os Testes

1. Abra o terminal e navegue até o diretório do projeto.
2. Execute o Cypress com o comando:
   ```bash
   npx cypress open

**Considerações Finais**
Os testes foram projetados para validar as funcionalidades críticas do carrinho de compras, assegurando que operem conforme o esperado. As técnicas de teste utilizadas cobrem uma ampla gama de cenários, desde casos de uso comuns até situações de borda. Desta forma, garantimos uma cobertura robusta e abrangente dos testes, assegurando a confiabilidade e a qualidade da API. A automação dos testes com Cypress não só facilita a execução repetida e consistente dos testes, como também proporciona uma detecção mais rápida e eficiente de defeitos, contribuindo para um desenvolvimento mais ágil e eficiente.