import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

/* eslint-disable jsx-a11y/accessible-emoji */
export const Table = () => {
  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <TableHead />

      <TableBody />
    </table>
  );
};
