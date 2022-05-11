import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appID = "6c7ad25860bf4a30b828a3742f85b01a"
const token = "0066c7ad25860bf4a30b828a3742f85b01aIAARpxjcRhs/xPXGAknFYtTvIbd43IGfkkrEavZmNtoc22TNKL8AAAAAEAA/6Ep2msV4YgEAAQCWxXhi"

export const config = {mode: "rtc", codec: "vp8", appid: appID, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";