import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from '../Form/Form.module.css';
import PropTypes from 'prop-types';

export function InputForm({ contacts, newContactAdding }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputHandler = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        return;
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts!`);
      setName('');
      setNumber('');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    newContactAdding(newContact);

    setName('');
    setNumber('');
  };

  return (
    <div>
      <form name="inputForm" onSubmit={submitHandler}>
        <label htmlFor="name">
          <p>Name: </p>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={inputHandler}
            value={name}
          />
        </label>
        <label htmlFor="number">
          <p>Number: </p>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={inputHandler}
            value={number}
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}

InputForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
