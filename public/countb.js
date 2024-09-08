document.getElementById('counterb').addEventListener('click', () => {
    fetch('/clickedb', { method: 'POST' })
        .then(response => response.json())
        .then(data => {      
            localStorage.setItem('countb', data.countb);
        })
        .catch(error => console.log(error));
});