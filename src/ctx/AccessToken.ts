let accessToken = "";

const setAccessToken = (token: string) => {
  accessToken = token;
};

const getAccessToken = (token: string) => {
  accessToken = token;
};

export { setAccessToken, getAccessToken };
