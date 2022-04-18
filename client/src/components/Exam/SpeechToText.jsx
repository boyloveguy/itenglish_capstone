import React, {useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Icon, Button } from 'semantic-ui-react'

const SpeechToText = (props) => {
    const commands = [
        {
            command: "open *",
            callback: (website) => {
                window.open("http://" + website.split(" ").join(""));
            },
        },
        {
            command: "change background colour to *",
            callback: (color) => {
                document.body.style.background = color;
            },
        },
        {
            command: "reset",
            callback: () => {
                handleReset();
            },
        },
        ,
        {
            command: "reset background colour",
            callback: () => {
                document.body.style.background = `rgba(0, 0, 0, 0.8)`;
            },
        },
    ];

    const { transcript, resetTranscript }   = useSpeechRecognition({ commands });
    const [isListening, setIsListening]     = useState(false);
    const microphoneRef                     = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };

    return (
        <div className="microphone-wrapper">
            <div className="mircophone-container">
                <div
                    className="microphone-icon-container"
                    ref={microphoneRef}
                    onClick={handleListing}
                >
                    <Icon name='microphone' className="microphone-icon-exam"/>
                </div>
                <div className="microphone-status">
                    {isListening ? "Listening........." : "Click to start Listening"}
                </div>
                {isListening && (
                    <Button color='blue' className="microphone-stop btn" onClick={stopHandle}>Stop</Button>
                )}
            </div>
            {transcript && (
                <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>
                    <Button color='blue' className="microphone-reset btn" onClick={handleReset}>Reset</Button>
                </div>
            )}
        </div>
    );
};
export default SpeechToText;