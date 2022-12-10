const fs  = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json")
// const contactsPath = path.resolve("db/contacts.json");
// console.log(contactsPath);



async function listContacts() {
const list = await fs.readFile(contactsPath, "utf8");
// console.log(JSON.parse(list));
// console.log(list)
return JSON.parse(list);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1){
      return null
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact= {
      id: nanoid(),
      name,
      email, 
      phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
  }

  // Export all func
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }