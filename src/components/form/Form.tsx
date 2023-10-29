import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { MaskedInput, createDefaultMaskGenerator } from 'react-hook-mask';
import { User } from '../../types/user';
import axios from 'axios';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Button from '../button/Button';

import './Form.scss';

interface FormProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const maskGenerator = createDefaultMaskGenerator('99-99-99');

const Form: FC<FormProps> = ({ users, setUsers }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        params: {
          email: data.email,
          number: data.number,
        },
      })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          className='input'
          placeholder='example@gmail.com'
          {...register('email', {
            required: true,
            pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i,
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p role='alert'>
            <InfoOutlined /> Email is required and must be valid
          </p>
        )}
      </div>

      <div className='row'>
        <label htmlFor='number'>Number</label>
        <Controller
          render={({ field }) => (
            <MaskedInput
              id='number'
              className='input'
              maskGenerator={maskGenerator}
              placeholder='99-99-99'
              {...field}
              aria-invalid={errors.number ? 'true' : 'false'}
            />
          )}
          rules={{ minLength: 6 }}
          control={control}
          name='number'
        />
        {errors.number?.type === 'minLength' && (
          <p role='alert'>
            <InfoOutlined /> Number must contain 6 digits
          </p>
        )}
      </div>
      <Button type='submit' children='Submit' className='submit-btn' />
    </form>
  );
};

export default Form;
