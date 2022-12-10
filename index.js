const {
    listContacts,
    getContactById,
    removeContact,
    addContact
  } = require("./contacts")
const {program} = require("commander")

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const contactsList = await listContacts();
            console.table(contactsList);
            break;
        case "get":
            const oneContact = await getContactById(id);
            console.log(oneContact);
            break;
        case "add":
            const newContact = await addContact(name, email, phone);
            console.log(newContact)
            break;
        case "remove": 
            const deleteContact = await removeContact(id);
            console.log(deleteContact);
            break;
       
        default: 
            console.log("Unknown action")
    }
}
program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options)