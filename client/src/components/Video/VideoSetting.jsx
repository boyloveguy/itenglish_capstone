import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appID = "4f9300961297463dbc3ba41f83681ca8"
const token = "0064f9300961297463dbc3ba41f83681ca8IADF7QXmXw67ryV1nfGJuNY7W/k2K+1uoCtVakhlt8cvPGTNKL8AAAAAEACucvvFgeuJYgEAAQB/64li"

export const config = {mode: "rtc", codec: "vp8", appid: appID, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";