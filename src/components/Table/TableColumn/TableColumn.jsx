import classNames from 'classnames';

/* eslint-disable jsx-a11y/accessible-emoji */
export const TableColumn = ({ product }) => {
  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.productId}
      </td>

      <td data-cy="ProductName">{product.productName}</td>
      <td data-cy="ProductCategory">
        {product.categoryIcon} - {product.categoryTitle}
      </td>

      <td
        data-cy="ProductUser"
        className={classNames({
          'has-text-link': product.ownerSex === 'm',
          'has-text-danger': product.ownerSex === 'f',
        })}
      >
        {product.ownerName}
      </td>
    </tr>
  );
};
