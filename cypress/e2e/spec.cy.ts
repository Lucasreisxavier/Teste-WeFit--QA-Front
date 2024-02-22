import { baseUrl } from "../support/variables";

/// <reference types="cypress" />
interface Movie {
    id: string;
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
}

let movies: Movie[] = [];

describe('Teste de exemplo', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.intercept('/movie', async (req) => {
            req.reply((res) => {
                if (Array.isArray(res.body) && res.body.length > 0) {
                    movies = res.body;
                } else {
                    movies = [];
                }
            });
        }).as('getMovies');
    });

    it('Teste de compra de produtos', () => {

        cy.visit(baseUrl);

        cy.wait('@getMovies').then(() => {
            if (movies.length === 0) {
                cy.fixture<Movie[]>('products.json').then((products) => {
                    movies = products;
                    clickMovieButtons();
                });
            } else {
                clickMovieButtons();
            }
        });

        function clickMovieButtons() {

            movies.forEach((movie, index) => {

                cy.get(`[data-cy="card.button-${index}"]`).click();
                cy.wait(5000);

                cy.get('[data-cy="cart-button"]')
                    .click()
                    .wait(5000);

                cy.contains('Finalizar pedido')
                    .click();
                cy.wait(3000)

                cy.get('[data-cy="back"]').click()
                cy.wait(3000)

                cy.log(`Filme: ${movie.name} comprado com Sucesso.`);

            });
        }
    });

    it('Teste de adição e subtração de produtos', () => {

        cy.visit(baseUrl);

        cy.wait('@getMovies').then(() => {
            if (movies.length === 0) {
                cy.fixture<Movie[]>('products.json').then((products) => {
                    movies = products;
                    clickMovieButtons();
                });
            } else {
                clickMovieButtons();
            }
        });

        function clickMovieButtons() {

            movies.forEach((movie, index) => {

                cy.get(`[data-cy="card.button-${index}"]`).click();
                cy.wait(5000);

                cy.get('[data-cy="cart-button"]')
                    .click()
                    .wait(10000);



                cy.get('[data-cy="add"]')
                    .click({ multiple: true })

                cy.contains('Finalizar pedido')
                    .click();
                cy.wait(3000)

                cy.get('[data-cy="back"]').click()
                cy.wait(3000)

                cy.log(`Filme: ${movie.name} comprado com Sucesso.`);


            });
        }
    });


});
