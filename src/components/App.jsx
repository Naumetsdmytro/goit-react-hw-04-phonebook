import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { FilterContactForm } from 'components/FilterContactForm';

import style from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsSaved = localStorage.getItem('contacts');
    if (contactsSaved !== null) {
      const parsedContacts = JSON.parse(contactsSaved);
      return parsedContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevstate => [contact, ...prevstate]);
  };

  const deleteContact = contactId =>
    setContacts(prevstate =>
      prevstate.filter(contact => contact.id !== contactId)
    );

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.includes(normalizedFilter);
    });
  };

  return (
    <div
      style={{
        fontSize: 40,
        color: '#010101',
      }}
      className={style.container}
    >
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <h2 className={style.title}>Contacts</h2>
      <FilterContactForm value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
