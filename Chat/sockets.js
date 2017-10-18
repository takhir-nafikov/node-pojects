const MessageModel = require('./models/messages.model');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connected', 'YEAH!');

        socket.join('all');

        socket.on('msg', (content) => {
            const obj = {
                date: new Date(),
                content: content,
                username: socket.id,
            };

            MessageModel.create(obj, (err) => {
                if (err) return console.error('MessageModel', err);
                socket.emit('message', obj);
                socket.to('all').emit('message', obj);
            });
        });

        socket.on('receiveHistory', () => {
            MessageModel
                .find({})
                .sort({date: -1})
                .limit(10)
                .sort({date: 1})
                .lean()
                .exec((err, messages) => {
                    if (!err) socket.emit('history', messages);
                });
        });
    });
};
