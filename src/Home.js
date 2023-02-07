import React, { useState, useMemo } from 'react';
import ReactCountdownClock from 'react-countdown-clock'
import worker1 from './longProcesses/worker';
import paragraphWorker from './longProcesses/paragraphWorker';

import WebWorker from './workerSetup';
import './App.css';

const Home = () => {
    // const worker = useMemo(() => new WebWorker(worker1), [])
    const [count, setCount] = useState(0)

    const fetchWebWorker = () => {
        const worker = new WebWorker(worker1)
        worker.postMessage('Fetch Users');

        worker.addEventListener('message', event => {
            setCount(event.data.length)     // event.data is users which is an array
        });

        // worker.close()
    }

    // ids=[2, 1]

    // 1: {id: 1, name: 'Ying Lu', age: 63}
    // 2: {id: 2, name: 'Selena Siri', age: 26}

    /*
    {
        'Look Good': {title: 'Look Good', paragraph: ''},
        'Feel Good, makeover!': {title: 'Feel Good, makeover!', paragraph: ''},
        'Feel Great': {title: 'Feel Great', paragraph: '...'}
    }
    */
    const [titleParagraph, setTitleParagraph] = useState({ 'Look Good': { title: 'Look Good', paragraph: '' } })

    const [titles, setTitles] = useState([])
    //const titles = ['Look good', 'Feel good, makeover!']

    const [blog, setBlog] = useState('')

    // button event handler
    const handleCreateBlog = () => {
        const titles1 = ['Feel Good']
        for (let title of titles1) { // title: 'Feel Great'
            const worker = new WebWorker(paragraphWorker)

            worker.postMessage(title); // event.data

            worker.addEventListener('message', event => {
                console.log(event.data)
                setBlog(event.data)  // tempary, remove later
                // event.data
                // setTitleParagraph(prev => (
                //     { ...prev, [title]: { title: title, paragraph: event.data } }
                // ))
            });
        }

        // worker.close()

        // let tmpBlog = ''
        // for (let title of titles) { // title: 'Feel Great'
        //     const { title, paragraph } = titleParagraph[title]
        //     tmpBlog += <><h3>{title}</h3><p>{paragraph}</p></>
        //     //....
        // }

        // setBlog(tmpBlog)
    }


    return (
        <div className="App-bottom">
            <section className="App-right">
                {blog && <p className="text-center">blog created: {blog}</p>}
                <button className="btn-worker" onClick={handleCreateBlog}>Generate Blog with Web Worker</button>

                <ReactCountdownClock seconds={100}
                    color="#e56"
                    alpha={0.9}
                    size={300} />
                <p className="text-center">Total User Count: {count}</p>
                <button className="btn-worker" onClick={fetchWebWorker}>Fetch Users with Web Worker</button>
            </section>
            <br /><br />
        </div>
    );
}

export default Home;
