import http from 'http'

const targetObject = {a: "a", b: "b", c: "c"};
const port = 3000;
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    if(req.method === "POST" && req.url === "/home") {
        req.on('data', (data) => {
            console.log("data = ", data);
            const stringData = data.toString();
            console.log("stringData = ", stringData);
            Object.assign(targetObject, JSON.parse(stringData));
        })

    } else {
        if(req.url === "/home") {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(targetObject));
        } else if (req.url === "/about") {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<body>');
            res.write('<h1>About page!</h1>');
            res.write('<body>');
            res.write('<html>');
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: '404 Page Not Found'}));
        }
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
