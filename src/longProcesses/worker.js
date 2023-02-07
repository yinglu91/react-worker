const myFunction = () => {
    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (!event) return;

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

