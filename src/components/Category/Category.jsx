import classNames from 'classnames';

export const Category = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => {
  const isSelected = selectedCategory.includes(category.title);

  return (
    <a
      data-cy="Category"
      href="#/"
      className={classNames('button mr-2 my-1', {
        'is-info': isSelected,
      })}
      onClick={() => {
        if (isSelected) {
          setSelectedCategory(
            selectedCategory.filter(cat => cat !== category.title),
          );
        } else {
          setSelectedCategory(selectedCategory.concat([category.title]));
        }
      }}
    >
      {category.title}
    </a>
  );
};
