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

      <td data-cy="ProductUser" className="has-text-link">
        {product.ownerName}
      </td>
    </tr>
  );
};
