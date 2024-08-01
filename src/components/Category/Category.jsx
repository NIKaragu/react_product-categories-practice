export const Category = ({ category, buttonIsActive, setButtonIsActive }) => {
  return (
    <a
      data-cy="Category"
      className="button mr-2 my-1 is-info"
      href="#/"
      onClick={() => {}}
    >
      {category.title}
    </a>
  );
};
