import React, { FC } from 'react';
import { User } from '../../types/user';
import {
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  ListItemContent,
} from '@mui/joy';
import Person from '@mui/icons-material/Person';

import './UsersList.scss';

interface UsersListProps {
  users: User[];
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <List variant='outlined' id='users-list'>
      {users.map((user, index) => (
        <>
          <ListItem className='user-item'>
            <ListItemDecorator>
              <Person />
            </ListItemDecorator>
            <ListItemContent className='user-content'>
              <h4>{user.email}</h4>
              <span>{user.number}</span>
            </ListItemContent>
          </ListItem>
          {index !== users.length - 1 && <ListDivider inset='gutter' />}
        </>
      ))}
    </List>
  );
};

export default UsersList;
