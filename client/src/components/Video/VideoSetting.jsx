import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appID = "4f9300961297463dbc3ba41f83681ca8"
const token = "0064f9300961297463dbc3ba41f83681ca8IADhMhWKm6IZEY2YxvXa0cF21/7ASbP+MOIceEtSrrvcp2TNKL8AAAAAEAASVDxDFRp+YgEAAQAVGn5i"

export const config = {mode: "rtc", codec: "vp8", appid: appID, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";