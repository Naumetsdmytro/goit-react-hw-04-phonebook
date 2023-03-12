import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './ContactForm.module.css';

export const ContactForm = ({ onSubmit, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (
      !contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      onSubmit({ name, number });
      formReset();
      return;
    }
    alert(`${name} is already in contacts.`);
  };

  const formReset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className={style.contactForm}>
      <label className={style.inputTitle}>
        <span className={style.inputText}>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          className={style.formInput}
        />
      </label>
      <label className={style.inputTitle}>
        <span className={style.inputText}>Number</span>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          className={style.formInput}
        />
      </label>
      <button type="submit" className={style.formBtn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
