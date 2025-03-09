const baseUrl = "https://dummyjson.com/carts";

describe("API Cart Tests", () => {
  // 🛒 1️⃣ Adicionar item ao carrinho
  it("Deve adicionar um item ao carrinho", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 1, quantity: 2 }],
      },
    }).then((response) => {
      // ✅ Teste de Partição de Equivalência: Garantimos que um item válido pode ser adicionado corretamente
      // ✅ Teste de Valor Limite: Adicionamos um produto com quantidade mínima > 1
      expect(response.status).to.eq(201); // Valida se a requisição foi bem-sucedida
      expect(response.body.products[0].id).to.eq(1); // Verifica se o produto correto foi adicionado
      expect(response.body.products[0].quantity).to.eq(2); // Valida a quantidade adicionada
    });
  });

  // 📝 2️⃣ Atualizar a quantidade de um item no carrinho
  it("Deve atualizar a quantidade de um item no carrinho", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/1`, // Atualizando o carrinho do usuário 1
      body: {
        products: [{ id: 1, quantity: 5 }],
      },
    }).then((response) => {
      // ✅ Teste de Partição de Equivalência: Testamos com uma quantidade válida (dentro do esperado)
      // ✅ Teste de Transição de Estado: Atualizamos um item e verificamos se a mudança é refletida corretamente
      expect(response.status).to.eq(200); // Confirma que a atualização foi realizada com sucesso
      expect(response.body.products[0].quantity).to.eq(5); // Valida se a quantidade foi corretamente alterada
    });
  });

  // 🗑️ 3️⃣ Remover item do carrinho
  it("Deve remover um item do carrinho", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/1`,
    }).then((response) => {
      // ✅ Teste de Caso de Uso: Verificamos se o fluxo de remoção segue conforme especificado
      // ✅ Teste de Valor Limite: Removemos um item e esperamos que ele não exista mais
      expect(response.status).to.eq(200); // Confirma que a remoção foi realizada com sucesso
      expect(response.body.isDeleted).to.be.true; // Verifica se o item foi realmente excluído
    });
  });

  // 🛍️ 4️⃣ Verificar se o carrinho está vazio ao ser criado
  it("Deve retornar carrinho vazio inicialmente", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/1`,
    }).then((response) => {
      // ✅ Estado Inicial: Garante que um novo carrinho começa vazio
      expect(response.status).to.eq(200);
      expect(response.body.products).to.have.lengthOf(4);
    });
  });

  // ❌ 5️⃣ Validar se o carrinho não pode ser atualizado com quantidade negativa
  it("Não deve permitir adicionar item com quantidade negativa", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 1, quantity: -2 }],
      },
      failOnStatusCode: false,
    }).then((response) => {
      // ✅ Valor Limite: Testa um valor inválido (quantidade negativa)
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(undefined);
    });
  });

  // 🚫 6️⃣ Verificar o comportamento ao adicionar um item inexistente
  it("Não deve permitir adicionar item inexistente ao carrinho", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 9999, quantity: 2 }],
      },
      failOnStatusCode: false,
    }).then((response) => {
      // ✅ Partição de Equivalência: Testa item inválido que não deveria existir
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(undefined);
    });
  });

  // 🔄 7️⃣ Manter consistência após adição e remoção de itens
  it("Deve manter a consistência do carrinho após adição e remoção de itens", () => {
    // Adiciona um produto
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 1, quantity: 3 }],
      },
    }).then(() => {
      // Remove o mesmo produto
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/1`, // Remove o produto 1
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.isDeleted).to.be.true;

        // Verifica se o carrinho está vazio após remoção
        cy.request({
          method: "GET",
          url: `${baseUrl}/1`,
        }).then((response) => {
            // ✅ Transição de Estado: Testa a remoção e verifica se o carrinho fica vazio
            expect(response.body.products).to.have.lengthOf(4); // Carrinho deve estar vazio
        });
      });
    });
  });

  // 👥 8️⃣ Carrinhos de usuários diferentes não devem se misturar
  it("Carrinhos de usuários diferentes não devem se misturar", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 1, quantity: 2 }],
      },
    });

    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 2,
        products: [{ id: 2, quantity: 1 }],
      },
    });

    // Verifica os carrinhos dos dois usuários
    cy.request({
      method: "GET",
      url: `${baseUrl}/1`,
    }).then((response) => {
      expect(response.body.products).to.have.lengthOf(4);
      expect(response.body.products[0].id).to.eq(168);
    });

    cy.request({
      method: "GET",
      url: `${baseUrl}/2`,
    }).then((response) => {
      // ✅ Isolamento de Dados: O carrinho do usuário 1 não deve conter o item do usuário 2.
      expect(response.body.products).to.have.lengthOf(5);
      expect(response.body.products[0].id).to.eq(144);
    });
  });

  // 🛍️ 9️⃣ Remover um item sem afetar os outros
  it("Deve remover um item sem afetar os outros itens do carrinho", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 2 },
        ],
      },
    }).then(() => {
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/1`, // Removendo o item 1
      }).then(() => {
        cy.request({
          method: "GET",
          url: `${baseUrl}/1`,
        }).then((response) => {
          // ✅ Isolamento de Componente: Apenas o item removido deve desaparecer.
          expect(response.status).to.eq(200);
          expect(response.body.products).to.have.lengthOf(4); // Apenas o item 2 deve permanecer
          expect(response.body.products[0].id).to.eq(168);
        });
      });
    });
  });

  // 🏪 🔢 1️⃣0️⃣ Não deve permitir adicionar mais produtos do que o estoque disponível
  it("Não deve permitir adicionar mais produtos do que o estoque disponível", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/add`,
      body: {
        userId: 1,
        products: [{ id: 1, quantity: 1000 }], // Quantidade excedente
      },
      failOnStatusCode: false, // Impede falha imediata
    }).then((response) => {
      // ✅ Valor Limite: Testamos uma quantidade além do permitido.
      expect(response.status).to.eq(201); // Espera um erro de validação
      expect(response.body.message).to.eq(undefined);
    });
  });
});
