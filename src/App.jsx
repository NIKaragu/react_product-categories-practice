/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import { Table } from './components/Table/Table';
import { User } from './components/User/User';
import { Category } from './components/Category/Category';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

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

function filterProductsByUser(products_, userNameQuery) {
  const visibleProductsDataByUser = [...products_];

  if (userNameQuery === 'All') {
    return visibleProductsDataByUser;
  }

  return visibleProductsDataByUser.filter(
    userProducts => userProducts.ownerName === userNameQuery,
  );
}

function filterProductsByCategory(products_, categoryQuery, query) {
  let visibleProducts = [...products_];

  if (categoryQuery.length === 0) {
    return visibleProducts.filter(product =>
      product.productName.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  visibleProducts = visibleProducts.filter(
    product =>
      categoryQuery.includes(product.categoryTitle) &&
      product.productName.toLowerCase().includes(query.toLowerCase().trim()),
  );

  return visibleProducts;
}

export const App = () => {
  const [currentQueryByUserName, setCurrentQueryByUserName] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const visibleProductsByUserName = filterProductsByUser(
    products,
    currentQueryByUserName,
  );
  const [selectedCategories, setSelectedCategories] = useState([]);
  const visibleProductsByCategory = filterProductsByCategory(
    visibleProductsByUserName,
    selectedCategories,
    searchQuery,
  );
  const resetFilters = () => {
    if (selectedCategories.length !== 0) {
      setSelectedCategories([]);
    }
  };
  // console.log(selectedCategories.length === 0)

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames({
                  'is-active': currentQueryByUserName === 'All',
                })}
                onClick={() => setCurrentQueryByUserName('All')}
              >
                All
              </a>

              {userProductData.map(user => (
                <User
                  user={user}
                  setUserQuery={setCurrentQueryByUserName}
                  currentQuery={currentQueryByUserName}
                  key={user.userName}
                />
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => {
                    setSearchQuery(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery.length > 0 && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => {
                        setSearchQuery('');
                      }}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedCategories.length !== 0,
                })}
                onClick={resetFilters}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <Category
                  category={category}
                  selectedCategory={selectedCategories}
                  setSelectedCategory={setSelectedCategories}
                  key={category.title}
                />
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProductsByCategory.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <Table products={visibleProductsByCategory} />
          )}
        </div>
      </div>
    </div>
  );
};
