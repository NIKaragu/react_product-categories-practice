import classNames from 'classnames';

export const User = ({ user, setUserQuery, currentQuery }) => {
  return (
    <a
      data-cy="FilterUser"
      href="#/"
      onClick={() => setUserQuery(user.userName)}
      className={classNames({ 'is-active': user.userName === currentQuery })}
    >
      {user.userName}
    </a>
  );
};
