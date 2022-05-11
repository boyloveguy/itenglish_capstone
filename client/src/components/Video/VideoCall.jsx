import React, { useState, useEffect } from "react";
import { channelName, config, useClient, useMicrophoneAndCameraTracks } from "./VideoSetting";
import { Grid } from "@material-ui/core";
import Controls from "./Controls";
import VideoInCall from "./VideoInCall";

export default function VideoCall(props) {
    const { setInCall } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        let init = async (name) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }

                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }

                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            try {
                await client.join(config.appid, name, config.token, null)
            } catch (error) {
                console.log(error);
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channelName);
            } catch (error) {
                console.log(error);
            }
        }
    }, [channelName, client, ready, tracks]);

    return (
        <Grid container style={{ height: "100%", backgroundColor: "#282828", margin: 0}}>
                <Grid item style={{
                    padding: 10,
                    position: "absolute",
                    display: "inline-block",
                    top: "80%",
                    zIndex: "999",
                    right:"40%"
                }}>
                    {ready && tracks && (
                        <Controls
                            tracks={tracks}
                            setStart={setStart}
                            setInCall={setInCall}
                        />
                    )}
                </Grid>
                <Grid item style={{ height: "100%", width: "100%" }}>
                    {start && tracks && (
                        <VideoInCall
                            tracks={tracks}
                            users={users}
                        />
                    )}
                </Grid>
        </Grid>
    );
}