let person = {
  id: 9,
  name: "Isabel Scott",
};

// name should be present
// email and expirience are requered
// position should be valid [customer success,product owner, security analist ]
const employee = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  experience: 3,
  position: "product owner",
};

function validation(person) {
  if (!person.name || !person.email || !position || !person.experience) {
    throw new Error("name is not found");
  }
}

try {
  validation(employee);
} catch (error) {
  console.log(error);
}
console.log("cheking..");
