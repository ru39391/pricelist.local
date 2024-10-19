/**
* Имитация API для тестирования форм
* @param {String} data - данные формы
* @returns {Object} - объект данных формы
*/
function handleDepts(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
              "success": true,
              "data": [
                {
                  "id": 10,
                  "item_id": 4,
                  "name": "Медицина",
                  "createdon": "2024-03-09 01:30:45",
                  "updatedon": null
                },
                {
                  "id": 9,
                  "item_id": 1,
                  "name": "Стоматология",
                  "createdon": "2024-03-09 01:30:45",
                  "updatedon": "2024-03-31 23:13:30"
                },
                {
                  "id": 13,
                  "item_id": 5,
                  "name": "Новая категория",
                  "createdon": "2024-04-01 22:21:26",
                  "updatedon": null
                }
              ],
              "meta": {
                "total_time": "1.9108 s",
                "query_time": "0.0096 s",
                "php_time": "1.9012 s",
                "queries": 4,
                "source": "cache",
                "memory": "8 192 KB"
              }
            });
            //reject('Поля формы заполнены неверно');
        }, 1000);
    });
}

export default handleDepts;
