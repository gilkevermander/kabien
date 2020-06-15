import React, { useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import VideoRecorder from 'react-video-recorder';
import style from "./Record.module.css";
import { ReactMic } from 'react-mic';
import MediaCapturer from 'react-multimedia-capture';
// import { render } from 'react-dom';
// import MediaCapturer from 'react-multimedia-capture';

const Record = ({ nextStep, prevStep, values }) => {

    const [granted, setGranted] = useState(false);
    const [rejectedReason, setRejectedReason] = useState("");
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);

    // handleRequest = handleRequest.bind(this);
    // handleGranted = handleGranted.bind(this);
    // handleDenied = handleDenied.bind(this);
    // handleStart = handleStart.bind(this);
    // handleStop = handleStop.bind(this);
    // handlePause = handlePause.bind(this);
    // handleResume = handleResume.bind(this);
    // handleStreamClose = handleStreamClose.bind(this);
    // setStreamToVideo = setStreamToVideo.bind(this);
    // releaseStreamFromVideo = releaseStreamFromVideo.bind(this);
    // downloadVideo = downloadVideo.bind(this);

    const handleRequest = () => {
        console.log('Request Recording...');
    }
    const handleGranted = () => {
        setGranted(true)
        console.log('Permission Granted!');
    }
    const handleDenied = (err) => {
        setRejectedReason(err.name)
        console.log('Permission Denied!', err);
    }
    const handleStart = (stream) => {
        setRecording(true)

        setStreamToVideo(stream);
        console.log('Recording Started.');
    }
    const handleStop = (blob) => {
        setRecording(false)

        //releaseStreamFromVideo();

        console.log('Recording Stopped.');
        downloadVideo(blob);
    }
    const handlePause = () => {
        releaseStreamFromVideo();

        setPaused(true);
    }
    const handleResume = (stream) => {
        setStreamToVideo(stream);

        setPaused(false);
    }

    const handleError = (err) => {
        console.log(err);
    }

    const handleStreamClose = () => {
        setGranted(false)
    }
    const setStreamToVideo = (stream) => {
        //let video = refs.app.querySelector('video');

        if (window.URL) {
            //video.src = window.URL.createObjectURL(stream);
        }
        else {
            //video.src = stream;
        }
    }
    const releaseStreamFromVideo = () => {
        //refs.app.querySelector('video').src = '';
    }
    const downloadVideo = (blob) => {
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
    }

    

    const [record, setRecord] = useState("");

    const saveAndContinue = (e) => {
        e.preventDefault();
        nextStep();
    }

    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    console.log(values);

    const startRecording = () => {
        setRecord(true)
    }

    const stopRecording = () => {
        setRecord(false)
    }

    const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
    }

    if (values.selectedoption === 'video') {
        console.log('video');
        return (
            <div>
                <div className={style.container}>
                    <h1 className="ui centered">details</h1>
                    <List>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>Selected option: {values.selectedoption}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>land:{values.land}</List.Content>
                        </List.Item>
                    </List>

                    <MediaCapturer
                        constraints={{ audio: true, video: true }}
                        timeSlice={10}
                        onRequestPermission={handleRequest}
                        onGranted={handleGranted}
                        onDenied={handleDenied}
                        onStart={handleStart}
                        onStop={handleStop}
                        onPause={handlePause}
                        onResume={handleResume}
                        onError={handleError}
                        onStreamClosed={handleStreamClose}
                        render={({ request, start, stop, pause, resume }) =>
                            <div>
                                <p>Granted: {granted.toString()}</p>
                                <p>Rejected Reason: {rejectedReason}</p>
                                <p>Recording: {recording.toString()}</p>
                                <p>Paused: {paused.toString()}</p>

                                {!granted && <button onClick={request}>Get Permission</button>}
                                <button onClick={start}>Start</button>
                                <button onClick={stop}>Stop</button>
                                <button onClick={pause}>Pause</button>
                                <button onClick={resume}>Resume</button>

                                <p>Streaming test</p>
                                <video autoPlay></video>
                            </div>
                        } />
                </div>

                <Button onClick={back}>Back</Button>
                <Button onClick={saveAndContinue}>Confirm</Button>
            </div >
        )

    } else {
        console.log('audio');
        return (
            < div >
                <h1 className="ui centered">details</h1>
                <List>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Selected option: {values.selectedoption}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>land:{values.land}</List.Content>
                    </List.Item>
                </List>
                <ReactMic
                    record={record}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                <button onClick={startRecording} type="button">Start</button>
                <button onClick={stopRecording} type="button">Stop</button>
                <Button onClick={back}>Back</Button>
                <Button onClick={saveAndContinue}>Confirm</Button>
            </div >

        )
    }
}

export default Record;