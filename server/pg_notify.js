const createSubscriber = require('pg-listen');
const dbConfig = require('./config/dbconfig.js');
const { subscribe } = require('./controllers/exams.js');

let clientsToNotify = [];
const subscriber = createSubscriber(dbConfig);

subscriber.notifications.on("new_exam", payload => {
    console.log("Notification for a new exam :", payload);
    notify({
        type: "notification",
        text: `Uusi tentti julkaistiin: ${payload.name}`
    });
})

subscriber.notifications.on("exam_changed", payload => {
    console.log("Notification for changed exam:", payload);
    notify({
        type: "notification",
        text: `Tentin #${payload.exam_id} nimi muuttui: ${payload.name}`
    });
})

subscriber.events.on("error", (error) => {
    console.error("db connection error:", error);
    process.exit(1);
})

process.on("exit", () => {
    subscriber.close();
})

const connect = async () => {
    await subscriber.connect();
    await subscriber.listenTo("new_exam");
    await subscriber.listenTo("exam_changed");
}

const updateClients = clients => {
    clientsToNotify = clients;
}

const notify = (msg) => {
    clientsToNotify.forEach(client => client.send(JSON.stringify(msg)));
}

module.exports = { connect, updateClients };