import React, { useState } from 'react';
import Form from '../form/Form';
import UsersList from '../users/UsersList';
import { User } from '../../types/user';

import './App.scss';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className='app'>
      <Form users={users} setUsers={setUsers} />
      {users.length > 0 ? (
        <UsersList users={users} />
      ) : (
        <p role='alert'>Users not found</p>
      )}
    </div>
  );
}

export default App;
