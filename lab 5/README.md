# Лабораторная работа №5 - Стек MEVN

## Markdown editor

Сервис аналогичный [https://dillinger.io](https://dillinger.io)

Доступна функциональность просмотра и редактирования markdown-документов с возможностью хранения их на сервере. Веб-сервис без авторизации с общим списком всех md документов. 

### Запуск

Для запуска в директории `/server/src/database` необходимо создать файл `credentials.js` следующего содержания
```
module.exports = {
    user: <DB_USER>,
    password: <DB_PASSWORD>,
    address: <DB_ADDRESS>
};
```