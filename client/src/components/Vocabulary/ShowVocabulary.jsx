import React, { useState, useEffect } from 'react';
import { Button, Loader, Container, Input, Form, TextArea, Label, Header, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Vocabulary.css';
import MenuDiv from '../MenuDiv/MenuDiv';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import Select, { StylesConfig } from 'react-select';
import { useSpeechSynthesis } from "react-speech-kit";

const cookies = new Cookies();

const ShowVocabulary = (props) => {
    const { voc_id } = useParams();
    const { speak } = useSpeechSynthesis();
    const [value, setValue] = useState("computer");
    const [vocShow, setVocShow] = useState({
        isLoading: true,
        voc_name: "",
        voc_desc: "",
        parts_of_speech: [],
        spelling: "",
        majors: []
    });

    const url = "http://localhost/itenglish_capstone/server/public/api/get_info";

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voc_id: voc_id
            })
        })
            .then((data) => data.json())
            .then((data) => {
                data.voc_info.map((key)=>{
                    setVocShow(prev => ({
                        ...prev,
                        voc_desc: key.voc_desc,
                        voc_name: key.voc_name,
                        spelling: key.spelling,
                        voc_id: key.voc_id,
                        isLoading: false
                    }));
                });

                setVocShow(prev => ({
                    ...prev,
                    parts_of_speech: data.pos_list,
                    majors: data.major_list
                }));
            })
            .catch(error => {
                console.log(error);
                setVocShow(prev => ({
                    ...prev,
                    isLoading: false
                }))
            });
    }, []);

    const handleShowPOS = () => {
        vocShow.parts_of_speech.map((key) => {
            alert(key.label);
        })
    }

    return (
        <div className="pad-top-150">
            <Helmet>
                <title>ITEnglish | Show Vocabulary</title>
            </Helmet>
            <MenuDiv activeItem={'learn'} />
            <Loader active={vocShow.isLoading} size='big' />
            <Container className='div-voca mar-bot-20'>
                <Header size='huge'>{vocShow.voc_name}</Header>   
                <p>{
                    vocShow.parts_of_speech.map((key) => {
                        return(
                            <Label>{ key.label}</Label>                           
                        );
                    })
                }</p>             
                <input
                    hidden
                    value={vocShow.voc_name}
                />
                <Icon style={{fontSize: "2em"}} name='volume up' onClick={() => speak({ text: vocShow.voc_name })}/>
            </Container>
            <div
                style={{
                    textAlign: 'center',
                    paddingTop: 80,
                    paddingBottom: 20
                }}
            >
                <p>© ITEnglish Copyright 2022</p>
            </div>
        </div>
    )
}

export default ShowVocabulary;