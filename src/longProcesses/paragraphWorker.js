// title
const paramWorkerFn = () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;

        const title = e.data

        let paragraph = createParaWithTitle(title)

        console.log('sssss paragraph=', paragraph)

        postMessage(paragraph);  // in main thread, event.data  ==== paragraph
    })
}

function createParaWithTitle(title) {
    let paragraph = 'ddddd' // .....
    return paragraph
}

export default paramWorkerFn


