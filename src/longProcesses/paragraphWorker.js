const paramWorkerFn = () => {
    const createParagraph = (title) => {
        let paragraph = `Ho Ho Ho "${title}" da da da...${Math.round(Math.random() * 20)}`
        return paragraph
    }

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (!event) return;

        const title = event.data
        const paragraph = createParagraph(title)

        console.log('paragraph=', paragraph)  // paragraph= to ... da da da...

        postMessage(paragraph);  // in main thread, event.data  ==== paragraph
    })
}

export default paramWorkerFn


