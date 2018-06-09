const server = require('./server')
const port = 3000

server.listen(port, () => {
    console.log('YUSSS, THE SERVER IS LISTENING ON PORT 3000!!!!', port)
})