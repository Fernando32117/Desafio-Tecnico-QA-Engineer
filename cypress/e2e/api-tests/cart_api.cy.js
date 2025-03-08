const baseUrl = 'https://dummyjson.com/carts';

describe('API Cart Tests', () => {

    // 🛒 1️⃣ Adicionar item ao carrinho
    it('Deve adicionar um item ao carrinho', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/add`,
            body: {
                userId: 1,
                products: [{ id: 1, quantity: 2 }]
            }
        }).then((response) => {
            // ✅ Teste de Partição de Equivalência: Garantimos que um item válido pode ser adicionado corretamente
            // ✅ Teste de Valor Limite: Adicionamos um produto com quantidade mínima > 1
            expect(response.status).to.eq(201); // Valida se a requisição foi bem-sucedida
            expect(response.body.products[0].id).to.eq(1); // Verifica se o produto correto foi adicionado
            expect(response.body.products[0].quantity).to.eq(2); // Valida a quantidade adicionada
        });
    });

    // 📝 2️⃣ Atualizar a quantidade de um item no carrinho
    it('Deve atualizar a quantidade de um item no carrinho', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/1`, // Atualizando o carrinho do usuário 1
            body: {
                products: [{ id: 1, quantity: 5 }]
            }
        }).then((response) => {
            // ✅ Teste de Partição de Equivalência: Testamos com uma quantidade válida (dentro do esperado)
            // ✅ Teste de Transição de Estado: Atualizamos um item e verificamos se a mudança é refletida corretamente
            expect(response.status).to.eq(200); // Confirma que a atualização foi realizada com sucesso
            expect(response.body.products[0].quantity).to.eq(5); // Valida se a quantidade foi corretamente alterada
        });
    });

    // 🗑️ 3️⃣ Remover item do carrinho
    it('Deve remover um item do carrinho', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/1`
        }).then((response) => {
            // ✅ Teste de Caso de Uso: Verificamos se o fluxo de remoção segue conforme especificado
            // ✅ Teste de Valor Limite: Removemos um item e esperamos que ele não exista mais
            expect(response.status).to.eq(200); // Confirma que a remoção foi realizada com sucesso
            expect(response.body.isDeleted).to.be.true; // Verifica se o item foi realmente excluído
        });
    });
});
