const API_KEY = "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"; // Replace this

async function sendMessage() {
  const input = document.getElementById('userInput');
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage(userInput, 'user');
  input.value = '';

  appendMessage("Infina AI is thinking...", 'ai');

  const response = await getAIResponse(userInput);

  // Remove placeholder message and show real response
  const aiMessages = document.querySelectorAll('.ai-message');
  aiMessages.forEach(el => {
    if (el.textContent === "Infina AI is thinking...") el.remove();
  });

  appendMessage(response, 'ai');
}

function appendMessage(message, sender) {
  const chatBox = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(input) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen3-30b-a3b:free",
        messages: [{ role: "user", content: input }]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    return "Error: " + err.message;
  }
}
