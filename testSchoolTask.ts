
const main = async () => {
    const token = process.env.TOKEN;
    const headers = new Headers({ 'Authorization': `Bearer ${token}` });

    fetch('https://learningsuite.byu.edu/.85T5/cid-WsQ6rtOzeJAR/student/gradebook', { headers })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

main();