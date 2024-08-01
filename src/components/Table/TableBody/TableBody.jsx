/* eslint-disable jsx-a11y/accessible-emoji */
export const TableBody = () => {
  return (
    <tbody>
      <tr data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          1
        </td>

        <td data-cy="ProductName">Milk</td>
        <td data-cy="ProductCategory">🍺 - Drinks</td>

        <td data-cy="ProductUser" className="has-text-link">
          Max
        </td>
      </tr>

      <tr data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          2
        </td>

        <td data-cy="ProductName">Bread</td>
        <td data-cy="ProductCategory">🍞 - Grocery</td>

        <td data-cy="ProductUser" className="has-text-danger">
          Anna
        </td>
      </tr>

      <tr data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          3
        </td>

        <td data-cy="ProductName">iPhone</td>
        <td data-cy="ProductCategory">💻 - Electronics</td>

        <td data-cy="ProductUser" className="has-text-link">
          Roma
        </td>
      </tr>
    </tbody>
  );
};
