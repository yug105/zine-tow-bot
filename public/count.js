document.getElementById('countera').addEventListener('click', () => {
    fetch('/clickeda', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('counta', data.counta);
        })
        .catch(error => console.log(error));
});


setInterval(() => {
    fetch('/count', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("countera").innerHTML = `Button A was clicked ${data.counta} times`;
            document.getElementById("counterb").innerHTML = `Button B was clicked ${data.countb} times`;
            
        })
        .catch(error => console.log(error));
}, 1000);
