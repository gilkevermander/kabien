import React, { useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import VideoRecorder from 'react-video-recorder';
import style from "./Record.module.css";
import { ReactMic } from 'react-mic';
import { Player } from 'video-react';
import paris from "./paris.jpeg"
//let cloudinary = require('cloudinary-core').Cloudinary.new()
// import { render } from 'react-dom';
// import MediaCapturer from 'react-multimedia-capture';

const Record = ({ nextStep, prevStep, values }) => {

    const [record, setRecord] = useState("");
    const [src, setSrc] = useState("");

    const saveAndContinue = (e) => {
        e.preventDefault();
        nextStep();
    }

    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    console.log(values);

    const fetchAsBlob = url => fetch(url)
        .then(response => response.blob());

    const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    const startRecording = () => {
        //this.setState({ record: true });
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


                <VideoRecorder
                    onRecordingComplete={(videoBlob, startedAt, thumbnailBlob, duration) => {


                        const urlCreator = window.URL || window.webkitURL
                        const thumbUrl = thumbnailBlob && urlCreator.createObjectURL(thumbnailBlob)
                        const videoUrl = urlCreator.createObjectURL(videoBlob)

                        fetchAsBlob(urlCreator);
                        convertBlobToBase64(videoBlob);

                        //let url = videoBlob.toBlobUrl();
                        //console.log(url);
                        console.log(window);
                        console.log(thumbUrl);
                        console.log(videoUrl);
                        console.log('Video Blob', videoBlob.size, videoBlob, videoUrl)
                        console.log(videoBlob);
                        console.log('Thumb Blob', thumbnailBlob, thumbUrl)
                        console.log('Started:', startedAt)
                        console.log('Duration:', duration)

                        setSrc(`blob:${videoUrl}`);

                        // var blob = videoBlob.getAsFile();

                        // var reader = new FileReader();
                        // reader.readAsDataURL(videoBlob); 
                        // reader.onloadend = function() {
                        //     var base64data = reader.result;                
                        //     console.log(base64data);
                        //     console.log( base64data.substr(base64data.indexOf(',')+1) );
                        // }

                        // let reader = new FileReader();
                        // reader.readAsDataURL(videoBlob);
                        // reader.onload = function () {
                        //     console.log(reader.result);
                        //     //setSrc(reader.result)
                        // }

                    }}
                    className={style.video}
                    isFlipped={true}

                />

                <Player
                    playsInline
                    poster={paris}
                    src={src}
                />
                <link
                    rel="stylesheet"
                    href="https://video-react.github.io/assets/video-react.css"
                />

                <Button onClick={back}>Back</Button>
                <Button onClick={saveAndContinue}>Confirm</Button>
            </div>
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