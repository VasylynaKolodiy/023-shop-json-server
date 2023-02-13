import React from 'react';
import './UserPage.scss'
import {useAppSelector} from "../../hooks/redux";

const UserPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <main className='userPage'>
      <h2> Hello, {user.name}!</h2>
      <section className='userPage__history'>

      </section>

      <section className='userPage__info'>

      </section>

    </main>
  );
};

export default UserPage;