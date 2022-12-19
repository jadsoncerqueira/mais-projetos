const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseJson = await response.json();
  return responseJson.token;
};

export default getToken;
