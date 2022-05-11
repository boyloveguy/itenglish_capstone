import React, { useState, useEffect } from 'react';
import { Button, Loader, Container, Table, Icon, Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Vocabulary.css';
import MenuDiv from '../MenuDiv/MenuDiv';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import $ from 'jquery';

const cookies = new Cookies();
cookies.set('user_id', '3', { path: '' });
cookies.set('user_name', 'Administrator', { path: '' });
cookies.set('user_role', '1', { path: '' });

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const Vocabulary = (props) => {
    const [vocaInfo, setVocaInfo] = useState({
        isLoading: true,
        list_vocabulary: [],
        listOptionSearch: [],
        list_vocabulary_word: [],
        selected_letter: "a",
        user_role: cookies.get('user_role')
    });

    const url = "http://localhost/itenglish_capstone/server/public/api/get_vocabulary";

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_word: "a"
            })
        })
            .then((data) => data.json())
            .then((data) => {
                setVocaInfo(prev => ({
                    ...prev,
                    list_vocabulary: data.vocabulary,
                    list_vocabulary_word: data.list_voca,
                    isLoading: false
                }))
            })
            .catch(error => {
                console.log(error);
                setVocaInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))
            });
    }, []);

    const listOptionVoca = () => {
        try {
            let result = (vocaInfo.list_vocabulary).map((key) => {
                return {
                    label: key.voc_name,
                    year: key.voc_name
                }
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickLetter = (value) => {
        setVocaInfo(prev => ({
            ...prev,
            isLoading: true,
            selected_letter: value
        }))

        let formData = new FormData();
        formData.append('first_word', value);
        const search_word_url = "http://localhost/itenglish_capstone/server/public/api/get_vocabulary_by_word"

        axios({
            method: 'POST',
            url: search_word_url,
            dataType: 'jsonp',
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                }
            }
        })
            .then(response => {
                setVocaInfo(prev => ({
                    ...prev,
                    list_vocabulary_word: response.data.list_voca,
                    isLoading: false
                }))
            })
            .catch(error => {
                setVocaInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))
                console.log(error)
            });
    }

    const handleRenderAlpha = () => {
        try {
            let result = alphabet.map((key) => {
                if (key === vocaInfo.selected_letter) {
                    return <Button
                        color='yellow'
                        style={{ margin: 10 }}
                        circular
                        id={"bnt_" + key}
                        className="btn-alpha"
                        onClick={handleClickLetter(key)}
                    >{key}
                    </Button>
                }
                return <Button
                    color='primary'
                    style={{ margin: 10 }}
                    circular
                    id={"bnt_" + key}
                    className="btn-alpha"
                    onClick={handleClickLetter(key)}
                >{key}
                </Button>
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="pad-top-150">
            <Helmet>
                <title>ITEnglish | Vocabulary</title>
            </Helmet>
            <MenuDiv activeItem={'learn'} />
            <Loader active={vocaInfo.isLoading} size='big' />
            <Container style={{ marginBottom: 20, textAlign: 'right' }}>
                <Button
                    color='primary'
                    onClick={() => {
                        window.location.href = `/vocabulary-details/${0}`
                    }}
                >Add new vocabulary
                </Button>
            </Container>
            <Container className='div-voca mar-bot-20'>
                <div>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        style={{ margin: "0 auto", boxShadow: "none" }}
                    >
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={listOptionVoca()}
                            sx={{ ml: 1, flex: 1 }}
                            renderInput={(params) => <TextField {...params} label="Search Vocabulary" />}
                        />
                    </Paper>
                </div>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    {/* {handleRenderAlpha()} */}
                    <Button color={vocaInfo.selected_letter === "a" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("a")}>a</Button>
                    <Button color={vocaInfo.selected_letter === "b" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("b")}>b</Button>
                    <Button color={vocaInfo.selected_letter === "c" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("c")}>c</Button>
                    <Button color={vocaInfo.selected_letter === "d" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("d")}>d</Button>
                    <Button color={vocaInfo.selected_letter === "e" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("e")}>e</Button>
                    <Button color={vocaInfo.selected_letter === "f" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("f")}>f</Button>
                    <Button color={vocaInfo.selected_letter === "g" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("g")}>g</Button>
                    <Button color={vocaInfo.selected_letter === "h" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("h")}>h</Button>
                    <Button color={vocaInfo.selected_letter === "i" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("i")}>i</Button>
                    <Button color={vocaInfo.selected_letter === "j" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("j")}>j</Button>
                    <Button color={vocaInfo.selected_letter === "k" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("k")}>k</Button>
                    <Button color={vocaInfo.selected_letter === "l" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("l")}>l</Button>
                    <Button color={vocaInfo.selected_letter === "m" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("m")}>m</Button>
                    <Button color={vocaInfo.selected_letter === "n" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("n")}>n</Button>
                    <Button color={vocaInfo.selected_letter === "o" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("o")}>o</Button>
                    <Button color={vocaInfo.selected_letter === "p" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("p")}>p</Button>
                    <Button color={vocaInfo.selected_letter === "q" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("q")}>q</Button>
                    <Button color={vocaInfo.selected_letter === "r" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("r")}>r</Button>
                    <Button color={vocaInfo.selected_letter === "s" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("s")}>s</Button>
                    <Button color={vocaInfo.selected_letter === "t" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("t")}>t</Button>
                    <Button color={vocaInfo.selected_letter === "u" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("u")}>u</Button>
                    <Button color={vocaInfo.selected_letter === "v" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("v")}>v</Button>
                    <Button color={vocaInfo.selected_letter === "w" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("w")}>w</Button>
                    <Button color={vocaInfo.selected_letter === "x" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("x")}>x</Button>
                    <Button color={vocaInfo.selected_letter === "y" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("y")}>y</Button>
                    <Button color={vocaInfo.selected_letter === "z" ? 'yellow' : 'primary'} style={{ margin: 10 }} circular className="btn-alpha" onClick={() => handleClickLetter("z")}>z</Button>
                </div>
                <div>
                    <Grid celled='internally'>
                        <Grid.Row>
                            <Grid.Column width={vocaInfo.user_role !== '1' ? 16 : 14}>
                                <Table celled fixed singleLine id="tbl_voca" selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Vocabulary</Table.HeaderCell>
                                            <Table.HeaderCell>Parts of speech</Table.HeaderCell>
                                            <Table.HeaderCell>Spelling</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            vocaInfo.list_vocabulary_word !== undefined && vocaInfo.list_vocabulary_word.length > 0 ?
                                                vocaInfo.list_vocabulary_word.map((key) => {
                                                    return (
                                                        <Table.Row
                                                            onClick={() => {
                                                                window.location.href = `/show-vocabulary/${key.voc_id}`
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <Table.Cell>{key.voc_name}</Table.Cell>
                                                            <Table.Cell>{key.pos_name}</Table.Cell>
                                                            <Table.Cell>{key.spelling}</Table.Cell>
                                                        </Table.Row>
                                                    )
                                                })
                                                :
                                                (
                                                    <Table.Row>
                                                        <Table.Cell colSpan='3' style={{ textAlign: "center" }}>Empty Data</Table.Cell>
                                                    </Table.Row>
                                                )
                                        }
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            {vocaInfo.user_role === "1" ?
                                <Grid.Column width={2}>
                                    <Table celled fixed singleLine selectable style={{ textAlign: "center" }}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                vocaInfo.list_vocabulary_word !== undefined && vocaInfo.list_vocabulary_word.length > 0 ?
                                                    vocaInfo.list_vocabulary_word.map((key) => {
                                                        return (
                                                            <Table.Row
                                                                onClick={() => {
                                                                    window.location.href = `/vocabulary-details/${key.voc_id}`
                                                                }}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <Table.Cell><Icon name="pencil" /></Table.Cell>
                                                            </Table.Row>
                                                        )
                                                    })
                                                    :
                                                    (
                                                        <Table.Row>
                                                            <Table.Cell style={{ textAlign: "center" }}>None</Table.Cell>
                                                        </Table.Row>
                                                    )
                                            }
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                : ""
                            }
                        </Grid.Row>
                    </Grid>
                </div>
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

export default Vocabulary