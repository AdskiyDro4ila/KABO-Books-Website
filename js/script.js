document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Add initial bot message
    addMessage("Hello! I'm your KABO Books assistant. How can I help you find your next great read today?", 'bot');

    // Event listeners
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Here you would normally send the message to your GPT agent
        // and handle the response
        
        // For demonstration, let's simulate a response
        setTimeout(() => {
            simulateBotResponse(message);
        }, 1000);
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender + '-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateBotResponse(userMessage) {
        // This is a placeholder - in a real implementation,
        // you would integrate with your GPT agent here
        
        let botResponse = "I'd be happy to help you find a book! Could you tell me what genres you enjoy or any specific themes you're interested in?";
        
        if (userMessage.toLowerCase().includes('fiction')) {
            botResponse = "Great! I have some fantastic fiction recommendations. Are you looking for contemporary, classic, or genre fiction like sci-fi or fantasy?";
        } else if (userMessage.toLowerCase().includes('mystery')) {
            botResponse = "Mystery novels are perfect for engaging reads! Would you prefer a classic whodunit, a thriller, or a cozy mystery?";
        } else if (userMessage.toLowerCase().includes('recommend')) {
            botResponse = "I'd recommend 'The Midnight Library' by Matt Haig - it's a thoughtful exploration of life's possibilities that many readers have enjoyed recently.";
        }
        
        addMessage(botResponse, 'bot');
    }
}); 