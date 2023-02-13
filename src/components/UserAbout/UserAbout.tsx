import React from 'react';
import "./UserAbout.scss"
import Avatar from "@mui/material/Avatar";
import {IUsers} from "../../models/Interfaces";

interface IUserAboutProps {
  user: IUsers
}

const UserAbout: React.FC<IUserAboutProps> =  ({user}) => {
  return (
    <section className='userAbout'>
      <div className='userAbout__info'>
        <div><span>Name: </span>{user.name}</div>
        <div><span>Email: </span>{user.email}</div>
        <div><span>Password: </span>{user.password}</div>
        <div><span>Role: </span>{user.role}</div>
      </div>

      <div className='userAbout__photo'>
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{width: 200, height: 200}}
        />
      </div>
    </section>
  );
};

export default UserAbout;