const express = require('express');
const fs = require('fs'); // экспорт модуля fs
const app = express(); // обработка запроса от сервера
const cart = require('./cartRouter'); //обработчик всех запросов корзины

app.use(express.json()); // активируем json
app.use('/', express.static('public')); // при открытии главной страницы открывается папка public
app.use('/api/cart', cart);


// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => {
    // читаем файл products.json с пом-ю средств файл.системы, проверяем коровку и существования файла
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err})); // если файла нет, выводим ошибку 404
        } else {
            res.send(data); // возвращаем содержимое файла
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));