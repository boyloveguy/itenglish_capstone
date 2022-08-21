import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appID = "c619e5bd0b424bcc97760b21c91e5ffe"
const token = "007eJxTYAhvPGYkwe3e0uS+4a7Tk3kce0ULZD713CxKOn1WNlLpsKgCQ7KZoWWqaVKKQZKJkUlScrKlubmZQZKRYbKlYappWlrqi/2MyZmCzMnac1WZGBkgEMRnYchNzMxjYAAA7HAeOg=="

export const config = {mode: "rtc", codec: "vp8", appid: appID, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";