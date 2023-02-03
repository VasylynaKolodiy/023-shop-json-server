import React from 'react';
import './SidebarCategories.scss'
import {ICategories} from "../../models/Interfaces";

interface ISidebarCategories {
  categories: ICategories[],
  setCatName: (name: string) => void
  catName: string
}

const SidebarCategories: React.FC<ISidebarCategories> = ({categories, catName, setCatName}) => {
  return (
    <aside className='sidebar'>
      <h4 className='sidebar__title' >Categories:</h4>
      {categories.map((category) =>
        <div
          className={`sidebar__category ${catName.replace('all products', '') === category.name.replace('all products', '') ? 'active' : ''}`}
          onClick={() => setCatName(category.name)}
          key={category.id}
        >{category.name}</div>
      )}
    </aside>
  );
};

export default SidebarCategories;