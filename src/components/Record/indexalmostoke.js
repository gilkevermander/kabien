import React, { useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import VideoRecorder from 'react-video-recorder';
import style from "./Record.module.css";
import { ReactMic } from 'react-mic';
import { saveAs } from 'file-saver';
let cloudinary = require('cloudinary/lib/cloudinary');

//let cloudinary = require('cloudinary-core').Cloudinary.new()
// import { render } from 'react-dom';
// import MediaCapturer from 'react-multimedia-capture';

const Record = ({ nextStep, prevStep, values }) => {

    cloudinary.config({
        cloud_name: 'int4',
        api_key: '212861344353933',
        api_secret: 'F-TVHSfBpJXvrvu1H8sdn64l4P4'
    });

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

                        //let url = videoBlob.toBlobUrl();
                        //console.log(url);
                        console.log(urlCreator);
                        console.log(thumbUrl);
                        console.log(videoUrl);
                        console.log('Video Blob', videoBlob.size, videoBlob, videoUrl)
                        console.log(videoBlob);
                        console.log('Thumb Blob', thumbnailBlob, thumbUrl)
                        console.log('Started:', startedAt)
                        console.log('Duration:', duration)

                        var FileSaver = require('file-saver');
                        FileSaver.saveAs(videoBlob, "hello world.mp4");

                        // cloudinary.uploader.upload(`blob:${videoUrl}`,
                        //     {
                        //         responsive_breakpoints:
                        //         {
                        //             create_derived: true,
                        //             bytes_step: 20000,
                        //             min_width: 200,
                        //             max_width: 1000
                        //         }
                        //     },
                        //     function (error, result) { console.log(result, error); });
                    }}
                    className={style.video}
                    isFlipped={true}

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