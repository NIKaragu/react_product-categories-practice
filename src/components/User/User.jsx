export const User = ({ user }) => {
  return (
    <a data-cy="FilterUser" href="#/">
      {user.userName}
    </a>
  );
};
