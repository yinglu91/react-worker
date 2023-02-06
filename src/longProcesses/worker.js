const myFunction = () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;

        const users = [];

        const userDetails = {
            name: 'Jane Doe',
            email: 'jane.doe@gmail.com',
            id: 1
        };

        for (let i = 0; i < 10000000; i++) {

            userDetails.id = i++
            userDetails.dateJoined = Date.now()

            users.push(userDetails);
        }

        console.log('yyyyy users length=', users.length)

        postMessage(users);  // in main thread, event.data  ==== users
    })
}

export default myFunction

