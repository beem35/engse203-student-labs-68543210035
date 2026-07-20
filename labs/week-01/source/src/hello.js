const student = {
  name: "ปัณณวัฒน์ สิทธิตัน",
  studentId: "68543210035",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));