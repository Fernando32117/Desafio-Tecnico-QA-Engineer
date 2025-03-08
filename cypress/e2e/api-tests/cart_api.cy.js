describe('API Cart Tests', () => {
    const baseUrl = 'https://dummyjson.com/carts';

    it('Deve adicionar um item ao carrinho', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/add`,
            body: {
                userId: 1,
                products: [{ id: 1, quantity: 2 }]
            }
        }).then((response) => {
            expect(response.status).to.eq(201);  // Alterado para 201
            expect(response.body.products[0].id).to.eq(1);
            expect(response.body.products[0].quantity).to.eq(2);
        });
    });

    // 2️⃣ Atualizar o carrinho
    it('Deve atualizar a quantidade de um item no carrinho', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/1`, // Atualizando o carrinho do usuário 1
            body: {
                products: [{ id: 1, quantity: 5 }]
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.products[0].quantity).to.eq(5);
        });
    });

    // 3️⃣ Remover item do carrinho
    it('Deve remover um item do carrinho', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/1`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.isDeleted).to.be.true;
        });
    });
});
