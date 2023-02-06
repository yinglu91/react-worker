import React, { useState, useMemo } from 'react';
import ReactCountdownClock from 'react-countdown-clock'
import worker1 from './longProcesses/worker';
import WebWorker from './workerSetup';
import './App.css';

const Home = () => {
    const worker = useMemo(() => new WebWorker(worker1), [])
    const [count, setCount] = useState(0)

    const fetchWebWorker = () => {
        worker.postMessage('Fetch Users');

        worker.addEventListener('message', event => {
            setCount(event.data.length)     // event.data is users which is an array
        });
    }

    return (
        <div className="App-bottom">
            <section className="App-right">
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
