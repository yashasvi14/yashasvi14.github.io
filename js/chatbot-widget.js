/**
 * Chatbot Widget JavaScript
 * Controls the collapsible chatbot widget functionality
 */

// Initialize chatbot widget when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatPopup = document.getElementById('chatPopup');
    
    // Check if all elements exist
    if (!chatToggle || !chatClose || !chatPopup) {
      console.error('Chatbot elements not found');
      return;
    }
    
    // Open chat when button is clicked
    chatToggle.onclick = function(event) {
      event.preventDefault();
      chatPopup.classList.toggle('show');
      event.stopPropagation();
    };
    
    // Close chat when X button is clicked
    chatClose.onclick = function(event) {
      event.preventDefault();
      chatPopup.classList.remove('show');
      event.stopPropagation();
    };
    
    // Close chat when clicking outside the chatbot
    document.addEventListener('click', function(event) {
      if (!chatPopup.contains(event.target) && event.target !== chatToggle) {
        chatPopup.classList.remove('show');
      }
    });
  });