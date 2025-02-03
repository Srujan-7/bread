function userData(){
const userData = JSON.parse(localStorage.getItem('userData')) || [];
    if (userData.length != 0) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('address').value = userData.address || '';
    }
}
userData();

// Save user data to local storage
function saveUserData(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const userData = {
        name: name,
        email: email,
        address: address
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Profile updated successfully!');
    userData();
}