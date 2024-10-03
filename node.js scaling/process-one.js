process.on('message', (msg) => {
    if (msg.type === 'add') {
        // Создаем случайный объект
        const data = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date()
        };
        // Отправляем объект обратно в главный процесс
        process.send(data);
    }
});
