const signupForm=document.getElementById('signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            let users = JSON.parse(localStorage.getItem('users')) ||[]
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            // Redirect to login page or display success message
            alert('Signup successful! You can now log in.');
            window.location.href = 'log-in.html'; // Redirect to login page
        });

