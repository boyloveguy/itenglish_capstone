import React, { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";
import MenuDiv from '../MenuDiv/MenuDiv';
import { Helmet } from 'react-helmet';
import { Container, Grid, Header } from 'semantic-ui-react';

const VideoCheck = () => {
    const [inCall, setInCall] = useState(false);
    return (
        <div style={{height: "100%"}}>
            <Helmet>
                <title>ITEnglish | Video Call</title>
            </Helmet>
            {
                inCall ?
                    <VideoCall setInCall={setInCall} />
                    :
                    <div className="pad-top-150">

                        <div>
                            <MenuDiv activeItem={'learn'} />
                            <Container className='div-video-check mar-bot-20'>
                                <Grid celled='internally' className="video-check-grid">
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header>Before join the call</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <p><strong>1. You should turn off or silence loud notifications.</strong></p>
                                            <p><strong>2. Do not use vulgar and inappropriate words while chatting.</strong></p>
                                            <p><strong>3. Do not chat offensively in ITEnglish Video Call.</strong></p>
                                            <p><strong>4. Healthy exchange in line with ITEnglish's development policy.</strong></p>
                                            <p><strong>5. Do not attack, quarrel or create trouble with each other while participating in a video call.</strong></p>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setInCall(true)}
                                            >
                                                Join Call
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
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
                    </div>
            }
        </div>
    )
}

export default VideoCheck;