import React from "react";

import "./CategoryTitle.scss";

function CategoryTitle({ title }) {
  return (
    <div>
      <h3 className="category-title">{title}</h3>
    </div>
  );
}

const MemorizedCategoryTitle = React.memo(CategoryTitle);

export default MemorizedCategoryTitle;
