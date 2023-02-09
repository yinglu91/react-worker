import React, { useState, useMemo } from 'react';
import ReactCountdownClock from 'react-countdown-clock'
import worker1 from './longProcesses/worker';
import paragraphWorker from './longProcesses/paragraphWorker';

import WebWorker from './workerSetup';
import './App.css';

import workerpool from 'workerpool'

function add(a, b) {
    return a + b
}

function fetchUser() {
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

    return users;
}

const Home = () => {
    // const worker = useMemo(() => new WebWorker(worker1), [])
    const [count, setCount] = useState(0)

    //const pool1 = useMemo(() => workerpool.pool(), []);

    const fetchWebWorker = async () => {
        const titles1 = ['Feel Good', 'f1', "f2"]
        let st = ''
        for (let title of titles1) {
            setCount(0)

            // https://www.youtube.com/watch?v=yI1PjfXhIpk
            // https://javascript.plainenglish.io/multitasking-in-node-js-using-worker-pool-201ac6dfd0f4
            try {
                const pool = workerpool.pool()
                const result = await pool.exec(fetchUser, [])
                setCount(result.length)
                st += ', ' + result.length
                console.log(title, ', ', st)
            } catch (error) {
                console.log(error)
            } finally {
                // pool.terminate()
            }

        }

        setBlog(st)

        // pool1
        //     // .exec(add, [2, 4])
        //     .exec(fetchUser, [])
        //     .then(function (result) {
        //         console.log(result); // will output 6
        //         setCount(result.length)
        //     })
        //     .catch(function (err) {
        //         console.error(err);
        //     });

        // const worker = new WebWorker(worker1)
        // worker.postMessage('Fetch Users');

        // worker.addEventListener('message', event => {
        //     setCount(event.data.length)     // event.data is users which is an array
        // });

        // worker.close()
    }

    // ids=[2, 1]

    // 1: {id: 1, name: 'Mary So', age: 43}
    // 2: {id: 2, name: 'Joe Ho', age: 16}

    /*
    {
        'Look Good': {title: 'Look Good', paragraph: 
        ''},
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
                setBlog(event.data)  // by now, remove later
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
                <button className="btn-worker" onClick={handleCreateBlog}>
                    Generate Blog with Web Worker
                </button>
                {blog && <p className="text-center">blog created: {blog}</p>}

                <br />
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
