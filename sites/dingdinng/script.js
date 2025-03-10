const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-button");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBdLNjgAqmrBxtZ7HE7Pz_Od9BgDzuuzOU";

sendBtn.addEventListener("click", sendMessage);

function appendMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", `${type}-message`);
  messageDiv.textContent = message;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;
  
    appendMessage(userText, "user");
    userInput.value = "";
  
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("chat-message", "bot-message");
    chatWindow.appendChild(botMessageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
        }),
      });
  
      if (!response.ok) throw new Error("Failed to connect to the API");
  
      const data = await response.json();
  
      const botMessage = data.candidates[0]?.content.parts[0]?.text.trim() || 
        "Sorry, I couldn't process that.";
  
      await typeText(botMessage, botMessageDiv);
    } catch (error) {
      botMessageDiv.textContent = "Error: Could not fetch response from API";
    }
  }
  
  async function typeText(text, element) {
    let currentText = "";
    for (const char of text) {
      currentText += char;
      element.textContent = currentText; // Werk het bericht live bij
      chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll naar beneden
      await delay(50); // Stel de snelheid van het typen in (50 ms per karakter)
    }
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const inputElement = document.querySelector('input');

// Add an event listener for the 'keydown' event
inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage()
    }
});