// cypress/integration/full.spec.ts
import { baseUrl } from "../support/variables"


/// <reference types="cypress" />

// Descreva o teste usando o comando 'describe'

describe('Teste E2E 1 - Caminho simples', () => {
  it('Abrir home page', () => {
    cy.visit(baseUrl)
    cy.wait(5000)
    cy.contains("WeMovies")
      .should('be.visible');

  })

  it('adiciona no carrinho produto do index 0', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-0"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })

  it('adiciona no carrinho produto do index 1', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-1"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })
  it('adiciona no carrinho produto do index 2', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-0"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })

  it('adiciona no carrinho produto do index 3', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-0"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })
  it('adiciona no carrinho produto do index 4', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-0"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })
  it('adiciona no carrinho produto do index 5', () => {
    cy.visit(baseUrl);
    cy.wait(5000);
    cy.get('[data-cy="card.button-0"]')
      .click()
    cy.wait(5000)


    cy.get('[data-cy="cart-button"]')
      .click()
      .wait(5000);

    cy.contains('Finalizar pedido')
      .click();
    cy.wait(3000)

    cy.contains('VOLTAR').click()
    cy.wait(3000)
  })



}

)