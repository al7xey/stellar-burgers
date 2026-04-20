describe('Конструктор бургера', () => {
  describe('Добавление ингредиентов', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
        'getIngredients'
      );

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('добавляет булку и начинку из списка в конструктор', () => {
      cy.get('[data-cy="ingredient-card-bun-1"]')
        .contains('button', /добавить/i)
        .click();
      cy.get('[data-cy="ingredient-card-main-1"]')
        .contains('button', /добавить/i)
        .click();

      cy.get('[data-cy="constructor-bun-top"]').should('contain.text', 'Test Bun');
      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain.text',
        'Test Bun'
      );
      cy.get('[data-cy="constructor-filling-item"]').should('have.length', 1);
      cy.get('[data-cy="constructor-fillings"]').should('contain.text', 'Test Main');
    });
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
        'getIngredients'
      );

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('открывает модальное окно ингредиента и показывает корректные данные', () => {
      cy.get('[data-cy="ingredient-link-main-1"]').click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details-name"]').should('have.text', 'Test Main');
    });

    it('закрывает модальное окно по клику на крестик', () => {
      cy.get('[data-cy="ingredient-link-main-1"]').click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрывает модальное окно по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-link-main-1"]').click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
        'getIngredients'
      );
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );

      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', 'test-refresh-token');
          win.document.cookie = 'accessToken=test-access-token';
        }
      });

      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.clearLocalStorage('refreshToken');
    });

    it('создаёт заказ, показывает номер и очищает конструктор после закрытия модалки', () => {
      cy.get('[data-cy="ingredient-card-bun-1"]')
        .contains('button', /добавить/i)
        .click();
      cy.get('[data-cy="ingredient-card-main-1"]')
        .contains('button', /добавить/i)
        .click();
      cy.get('[data-cy="ingredient-card-sauce-1"]')
        .contains('button', /добавить/i)
        .click();

      cy.get('[data-cy="constructor-actions"]').find('button').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain.text', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-filling-item"]').should('have.length', 0);
      cy.get('[data-cy="constructor-empty-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-empty-bun-bottom"]').should('exist');
      cy.get('[data-cy="constructor-empty-fillings"]').should('exist');
    });
  });
});
