// JS for toggling nav
const menu = document.getElementById('menu');
const close = document.getElementById('close');
const navlist = document.getElementById('navlist');

menu.addEventListener('click', () => {
    navlist.style.display = 'flex';
    menu.style.display = 'none';
    close.style.display = 'flex';
});

close.addEventListener('click', () => {
    navlist.style.display = 'none';
    menu.style.display = 'flex';
    close.style.display = 'none';
});


document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const feedbackDiv = document.getElementById('form-feedback');
    const nameInput = form.querySelector('input[name="name"]').value.trim();
    const emailInput = form.querySelector('input[name="email"]').value.trim();
    const messageInput = form.querySelector('textarea[name="message"]').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Client-side validation
    if (nameInput === '') {
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = 'Please enter your name.';
        return;
    }
    if (!emailPattern.test(emailInput)) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = 'Please enter a valid email address.';
        return;
    }
    if (messageInput === '') {
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = 'Please enter your message.';
        return;
    }

    feedbackDiv.style.display = 'none'; // Hide previous feedback
    feedbackDiv.textContent = ''; // Clear previous message

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
        });
        
        console.log('Response status:', response.status);
        const text = await response.text(); // Get raw response text for debugging
        console.log('Raw response:', text);

        let result;
        try {
            result = JSON.parse(text); // Attempt to parse as JSON
        } catch (e) {
            throw new Error('Invalid JSON response from server');
        }

        if (response.ok) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.color = 'green';
            feedbackDiv.textContent = result.message || 'Message sent successfully!';
            form.reset(); // Clear form fields
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'red';
        feedbackDiv.textContent = error.message || 'An error occurred. Please try again.';
    }
});