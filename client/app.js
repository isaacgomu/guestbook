const form = document.getElementById("form");
const guestbookWrapper = document.getElementById("guestbookWrapper");

async function getMessages() {
  const response = await fetch("http://localhost:1937/guestbook");
  const messages = await response.json();
  console.log("hi");
  guestbookWrapper.textContent = "";
  messages.forEach(function (newMessage) {
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");

    h2.textContent = newMessage.name;
    p.textContent = newMessage.message;

    guestbookWrapper.appendChild(h2);
    guestbookWrapper.appendChild(p);

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteMessage(newMessage.id));
    guestbookWrapper.appendChild(deleteButton);
  });
}

async function deleteMessage(messageId) {
  const response = await fetch(`http://localhost:1937/message/${messageId}`, {
    method: "DELETE",
  });
  getMessages();
}

getMessages();

async function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(form);
  const formValues = Object.fromEntries(data);
  const addmessage = await fetch("http://localhost:1937/messageadd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log("hello i am working");
  getMessages();
  form.reset();
}

form.addEventListener("submit", handleSubmit);
