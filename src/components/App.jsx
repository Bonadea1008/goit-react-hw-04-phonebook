import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { InputForm } from './Form/Form';
import { Section } from './Section/Section';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts.length !== this.state.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const getContacts = newContact => {
    setContacts([newContact, ...contacts]);
  };

  const filterInputChange = ({ target }) => {
    setFilter(target.value);
  };

  const filterInputSearch = () => {
    const normalizedFilterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
  };

  const contactDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Section title="Phonebook">
        <InputForm newContactAdding={getContacts} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter filterInputHandler={filterInputChange} value={filter} />
        <Contacts
          contacts={filter.length > 0 ? filterInputSearch() : contacts}
          contactDeleteHandler={contactDelete}
        ></Contacts>
      </Section>
    </>
  );
}
