import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import './App.css';

type Inputs = {
  email: string;
  number: string;
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    axios
      .get('http://127.0.0.1:3001/users', {
        params: {
          email: 'jim@gmail.com',
          number: '221122',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          // type='email'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>Email is required and must be valid</p>}

        <input {...register('number')} />

        {/* <input type='submit' /> */}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
