import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Checkbox } from '@material-ui/core';
import { Button, Loader, Container, Image, Grid, Card, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Video.css';
import { useParams } from "react-router-dom";
import MenuDiv from '../MenuDiv/MenuDiv';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
cookies.set('user_id', '3', { path: '' });
cookies.set('user_name', 'Administrator', { path: '' });
cookies.set('user_role', '1', { path: '' });

const Video = (props) => {
    const [videoInfo, setVideoInfo] = useState({
        isLoading: true,
        listUserOnline: []
    })

    const url = "http://localhost:8000/api/get_user_online";

    useEffect(async () => {
        let formData = new FormData();
        formData.append('user_id', cookies.get('user_id'));
        await axios({
            method: 'POST',
            url: url,
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
                setVideoInfo(prev => ({
                    ...prev,
                    listUserOnline: response.data.list_user_online,
                    isLoading: false
                }))
            })
            .catch(error => {
                setVideoInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))
                console.log(error)
            });
    }, []);

    const handleClickCall = () => {
        console.log(1);
    }

    return (
        <div className="pad-top-150">
            <Helmet>
                <title>ITEnglish | Video Call</title>
            </Helmet>
            <MenuDiv activeItem={'learn'} />
            <Loader active={videoInfo.isLoading} size='big' />
            <Container className='div-video mar-bot-20'>
                {/* <VideoChat/> */}
                <Grid columns={3} divided>
                    <Card.Group style={{ margin: 0, padding: 0 }} className='card-group'>
                        {
                            videoInfo.listUserOnline.length > 0 ?
                                videoInfo.listUserOnline.map((key) => {
                                    return (
                                        <Grid.Column style={{ padding: 20 }}>
                                            <Card>
                                                <Card.Content>
                                                    <Image
                                                        floated='right'
                                                        // size='mini'
                                                        src={key.user_avatar == '' || key.user_avatar == null ? '/images/profile/avatar_default.jpg' : 'images/profile/' + key.user_avatar}
                                                    />
                                                    <Card.Header>{key.user_name}</Card.Header>
                                                    <Card.Meta>{key.user_fname + '' + key.user_lname}</Card.Meta>
                                                    <Card.Description className='video-desc'>
                                                        <strong>{key.user_name}</strong> wants to call you. Call now!
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <div className='ui two buttons'>
                                                        <Button 
                                                            animated='vertical' 
                                                            color='green'
                                                            onClick={()=>{
                                                                console.log(key.user_id)
                                                            }}
                                                            className='ahaha'
                                                        >
                                                            <Button.Content hidden><strong>Call</strong></Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name='video' />
                                                            </Button.Content>
                                                        </Button>
                                                    </div>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    )
                                })
                                : ''
                        }
                    </Card.Group>
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

export default Video