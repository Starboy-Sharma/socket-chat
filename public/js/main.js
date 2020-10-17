const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const userList = document.querySelector("#users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", (data) => {
  console.log(data);

  // Message from server
  outputMessage(data);

  // Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value; // msg is id

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear Input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `<p class="meta">
    ${msg.username} <span> ${msg.time} </span>
  </p>
  <p class="text">
    ${msg.text}
  </p>`;

  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  console.log(users);

  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
