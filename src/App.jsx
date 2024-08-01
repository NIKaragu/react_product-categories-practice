/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';
import { Table } from './components/Table/Table';

import { User } from './components/User/User';
import { Category } from './components/Category/Category';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    category_ => category_.id === product.categoryId,
  );

  const user = usersFromServer.find(user_ => user_.id === category.ownerId);

  return {
    productId: product.id,
    productName: product.name,
    categoryId: category.id,
    categoryTitle: category.title,
    categoryIcon: category.icon,
    ownerId: user.id,
    ownerName: user.name,
    ownerSex: user.sex,
  };
});

const userProductData = usersFromServer.map(user => {
  const userCategories = categoriesFromServer.filter(
    category => category.ownerId === user.id,
  );

  const userProducts = productsFromServer.filter(product =>
    userCategories.some(category => category.id === product.categoryId),
  );

  return {
    userId: user.id,
    userName: user.name,
    userSex: user.sex,
    categories: userCategories.map(category => ({
      categoryId: category.id,
      categoryTitle: category.title,
      categoryIcon: category.icon,
    })),
    products: userProducts.map(product => ({
      productId: product.id,
      productName: product.name,
      categoryId: product.categoryId,
    })),
  };
});

// console.log(products);

export const App = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs has-text-weight-bold">
            <a data-cy="FilterAllUsers" href="#/">
              All
            </a>

            {userProductData.map(user => (
              <User user={user} key={user.userId} />
            ))}
          </p>

          <div className="panel-block">
            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value="qwe"
              />

              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>

              <span className="icon is-right">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                />
              </span>
            </p>
          </div>

          <div className="panel-block is-flex-wrap-wrap">
            <a
              href="#/"
              data-cy="AllCategories"
              className="button is-success mr-6 is-outlined"
            >
              All
            </a>

            {categoriesFromServer.map(category => (
              <Category category={category} key={category.title} />
            ))}
          </div>

          <div className="panel-block">
            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
            >
              Reset all filters
            </a>
          </div>
        </nav>
      </div>

      <div className="box table-container">
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>

        <Table products={products} />
      </div>
    </div>
  </div>
);
