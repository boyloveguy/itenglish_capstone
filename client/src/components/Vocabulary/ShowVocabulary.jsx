import React, { useState, useEffect } from 'react';
import { Loader, Container, Label, Header, Icon, List, Segment, Grid } from 'semantic-ui-react';
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
        majors: [],
        meaning_list: [],
        example_list: []
    });

    const url = "http://localhost:8000/api/get_info";

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voc_id: voc_id,
                type: "none"
            })
        })
            .then((data) => data.json())
            .then((data) => {
                data.voc_info.map((key) => {
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
                    majors: data.major_list,
                    meaning_list: data.meaning_list,
                    example_list: data.example_list,
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

    const handleClickShowVoc = (type) => {
        setVocShow(prev => ({
            ...prev,
            isLoading: true
        }))
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                voc_id: voc_id,
                type: type
            })
        })
            .then((data) => data.json())
            .then((data) => {
                data.voc_info.map((key) => {
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
                    majors: data.major_list,
                    meaning_list: data.meaning_list,
                    example_list: data.example_list,
                }));
            })
            .catch(error => {
                console.log(error);
                setVocShow(prev => ({
                    ...prev,
                    isLoading: false
                }))
            });
    }

    return (
        <div className="pad-top-150">
            <Helmet>
                <title>ITEnglish | Show Vocabulary</title>
            </Helmet>
            <MenuDiv activeItem={'learn'} />
            <Loader active={vocShow.isLoading} size='big' />
            <Container className='div-voca mar-bot-20'>
                <Grid columns={3}>
                    <Grid.Column width={2} className='voc-parent'>
                        <div className='voc-child'>
                            <Icon 
                                name='arrow alternate circle left' 
                                style={{fontSize: "2em", color: "#db2828", cursor: "pointer"}}
                                onClick={()=>handleClickShowVoc("pre")}
                            />
                        </div>                        
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header size='huge'>{vocShow.voc_name}</Header>
                        <p>{
                            vocShow.parts_of_speech.map((key) => {
                                return (
                                    <Label>{key.label}</Label>
                                );
                            })
                        }</p>
                        <input
                            hidden
                            value={vocShow.voc_name}
                        />
                        <p>{
                            vocShow.majors.map((key) => {
                                return (
                                    <Label>{key.label}</Label>
                                );
                            })
                        }</p>
                        <List horizontal>
                            <List.Item>
                                <Icon
                                    name='volume up'
                                    onClick={() => speak({ text: vocShow.voc_name })}
                                />
                            </List.Item>
                            <List.Item>
                                <strong>{'/' + vocShow.spelling + '/'}</strong>
                            </List.Item>
                        </List>
                        <Segment.Group>
                            {
                                vocShow.meaning_list.length > 0 ?
                                    (vocShow.meaning_list).map((key, index) => {
                                        return (
                                            <Segment>
                                                <strong>{'Meaning number ' + (index + 1) + ": "}</strong>{key.vocValue}
                                            </Segment>
                                        );
                                    }) : 
                                    (
                                        <Segment>
                                            <strong>No meaning added yet.</strong>
                                        </Segment>
                                    )
                            }
                        </Segment.Group>
                        <Segment.Group>
                            {
                                vocShow.example_list.length > 0 ?
                                    (vocShow.example_list).map((key, index) => {
                                        return (
                                            <Segment>
                                                <strong>{'Example number ' + (index + 1) + ": "}</strong>{key.vocValue}
                                            </Segment>
                                        );
                                    }) :  
                                    (
                                        <Segment>
                                            <strong>No meaning added yet.</strong>
                                        </Segment>
                                    )
                            }
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width={2} className='voc-parent'>
                        <div className='voc-child'>
                            <Icon 
                                name='arrow alternate circle right' 
                                style={{fontSize: "2em", color: "#db2828", cursor: "pointer"}}
                                onClick={()=>handleClickShowVoc("next")}
                            />
                        </div>
                    </Grid.Column>
                </Grid>
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