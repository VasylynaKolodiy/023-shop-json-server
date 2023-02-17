import React, {useState} from 'react';
import './SidebarCategories.scss'
import {ICategories} from "../../models/Interfaces";
import {useAppSelector} from "../../hooks/redux";
import {ReactComponent as EditIcon} from "../../assets/img/edit.svg";
import DialogEditCategory from "../DialogEditCategory/DialogEditCategory";

interface ISidebarCategories {
  categories: ICategories[],
  setCatName: (name: string) => void,
  catName: string,
  setPageNumber: (page: number) => void,
}

const SidebarCategories: React.FC<ISidebarCategories> = ({categories, catName, setCatName, setPageNumber}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [openEditor, setOpenEditor] = useState(false)
  const [indexCategory, setIndexCategory] = useState(0)

  const changeCategory = (category: string) => {
    setPageNumber(1);
    setCatName(category)
  }

  const onClickEditCategory = (index: number) => {
    setIndexCategory(index)
    setOpenEditor(true)
  }

  // const activeCategory = categories.filter((cat) => cat.name === catName)


   console.log(indexCategory, "indexCategory")

  return (
    <aside className='sidebar'>
      <h4 className='sidebar__title'>Categories:</h4>
      {categories.map((category, index) =>
        <div
          className={`sidebar__category ${catName === category.name ? 'active' : ''}`}
          onClick={() => changeCategory(category.name)}
          key={category.id}
        >
          {category.name !== '' ? category.name : 'all products'}
          {user?.role === 'admin' &&
          (
            <div className='sidebar__edit' onClick={() => onClickEditCategory(index)}>
              <EditIcon title='Edit category'/>
            </div>
          )}
        </div>
      )}

      <DialogEditCategory category={categories[indexCategory]} openEditor={openEditor} setOpenEditor={setOpenEditor}/>
    </aside>
  );
};

export default SidebarCategories;