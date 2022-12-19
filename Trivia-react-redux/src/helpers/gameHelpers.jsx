// 1 - função para embaralhar as respostas

// A constante shuffled foi retirada de: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (data) => {
  const unshuffled = [
    { answer: data.correct_answer, index: 'correct-answer' },
    ...(data.incorrect_answers.map((wrong, index) => ({ answer: wrong, index }))),
  ];
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
};

// 2 - função para transformar a dificuldade em valores

const THREE = 3;
export const diff = ({ difficulty }) => {
  if (difficulty === 'easy') {
    return 1;
  }
  if (difficulty === 'medium') {
    return 2;
  }
  if (difficulty === 'hard') {
    return THREE;
  }
};
