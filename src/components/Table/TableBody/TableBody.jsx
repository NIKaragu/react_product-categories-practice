import { TableColumn } from '../TableColumn/TableColumn';

/* eslint-disable jsx-a11y/accessible-emoji */

export const TableBody = ({ products }) => {
  return (
    <tbody>
      {products.map(product => {
        return <TableColumn product={product} key={product.productId} />;
      })}
    </tbody>
  );
};
