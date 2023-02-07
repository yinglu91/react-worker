const paramWorkerFn = () => {
    const createParaWithTitle = (title) => {
        let paragraph = 'ddddd' // .....
        return paragraph
    }

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (!event) return;

        const title = event.data
        let paragraph = createParaWithTitle(title)

        console.log('paragraph=', paragraph)  // paragraph= ddddd

        postMessage(paragraph);  // in main thread, event.data  ==== paragraph
    })
}

export default paramWorkerFn


