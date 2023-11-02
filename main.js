const http = require("http");

const daftar = [
    { id: 1, text: 'Halo hanif'},
    { id: 2, text: 'Halo Farhan'},
    { id: 3, text: 'Halo Reza'},
];

const server = http.createServer((req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    //res.setHeader('X-Powered-By', 'Node.js ');

    const {method, url} = req;

    /*res.writeHead(404, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js',
    });

    const data = JSON.stringify({
        success: false,
        error: 'NotFound',
        data: null,
    });*/

    let body = [];
    
    req
    .on('data', chunk => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 404;
        
        const response  = {
            success: false,
            result: [],
            error: ''
        };

        if (method === 'GET' && url === '/daftar') {
            status = 200;
            response.success = true;
            response.result = daftar;

        } else if (method === 'POST' && url === '/daftar') {

            const { id, text } = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Tolong tambahkan id dan txt';
            } else {
                daftar.push({id, text});
                status = 201;
                response.success = true;
                response.results = daftar;
            }
        }

        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js',
        });

        res.end(JSON.stringify(response));
    });
})

const port = 5000;

server.listen(port, () => {
    console.log(`Sudah jalan mas.. di ${port}`);
});