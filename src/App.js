// src/App.js
import { useState } from "react";
import "./App.css";
import contactsJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJson.slice(0, 5));
  function generateRandomContact() {
    if (contacts.length >= contactsJson.length) return;
    //Por alguna razon, esta forma no funciona...
    // const slicedContacts = contactsJson.slice(contacts.length);
    const filteredContacts = contactsJson.filter(
      (contact) => !contacts.includes(contact)
    );
    console.log(filteredContacts);
    const newContacts = [
      ...contacts,
      filteredContacts[Math.floor(Math.random() * filteredContacts.length)],
    ];
    setContacts(newContacts);
  }

  function sortContacts(attribute) {
    let sortedContacts = [...contacts].sort((a, b) =>
      a[attribute] == b[attribute] ? 0 : a[attribute] > b[attribute] ? 1 : -1
    );
    console.log(sortedContacts);
    setContacts(sortedContacts);
  }

  function deleteContact(id) {
    let filteredContacts = contacts.filter(contact=>contact.id !== id)
    setContacts(filteredContacts);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={generateRandomContact}>Generate Random Contact</button>
      <button onClick={() => sortContacts("name")}>Sort by name</button>
      <button onClick={() => sortContacts("popularity")}>
        Sort by popularity
      </button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popultarity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Delete</th>
        </tr>
        {contacts.map((contact) => {
          const { pictureUrl, popularity, name, id, wonOscar, wonEmmy } =
            contact;
          return (
            <tr key={id}>
              <td>
                <img width={"200px"} src={pictureUrl}></img>
              </td>
              <td>{popularity}</td>
              <td>{name}</td>

              <td>{wonOscar && "🏆"}</td>
              <td>{wonEmmy && "🌟"}</td>
              <td>
                <button onClick={() => deleteContact(id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default App;
