const questionsQtd = 5;

const getQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${questionsQtd}&token=${token}`);
  const responseJson = await response.json();
  return responseJson;
};

export default getQuestions;
