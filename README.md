# Node-projects
### Console App Github
Простое приложение, которое взаимодействует с API Github для вывода
списка репозиториев конкретного пользователя. Имя пользователя передается параметром.

```sh
$ node app takhir-nafikov
```
---
### Console App Notes
Простое приложение для записи заметок. Данные хранятся в формате json.
Поддерживает следующие комманды: 
 - **list**.  Выводит заголовки всех заметок.
 - **view {title}**. Выводит заметку с данным заголовком.
 - **create {title} {content}**. Создает заметку с данным заголовком и сообщением.
 - **remove {title}**. Удаляет заметку с данным заголовком.
```sh
$ node app list
$ node app view "Express"
$ node app create "Koa" "New Node.js framework"
$ node app remove "Koa"
```
---
### Chat
Чат с использованием [Express], [Socket], [Mongoose], [Passport].
В чате реализована одна комната. 
---
### Now That`s Delicious
Сайт на котором пользователи могут оставлять обзор о заведении(с пометкой на карте, где находится это заведение), 
оставлять комментарии, "ставить лайк" обзору и также оставить ему комментарии. 
Проект выполнен на основе курса от [wesbos].

Чтобы заполнить БД данными: 
```bash
$ npm run sample
```
Если вы ранее загрузили эти данные, то очистить БД можно с помощью команды:
```bash
$ npm run blowitallaway
```

Стандартные данные представляют из себя 3 авторов, 16 обзоров, 41 отзыв.
Вход для авторов:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


License
----
MIT

[express]: <http://expressjs.com>
[socket]: <https://socket.io/>
[passport]: <http://www.passportjs.org/>
[mongoose]:<http://mongoosejs.com/>
[wesbos]: <https://learnnode.com/>

 
