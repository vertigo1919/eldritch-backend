function formatQuestions(data) {
  const newQuestionArray = [];

  const optionsArr = ['a', 'b', 'c', 'd'];

  for (let question of data) {
    const n = Math.floor(Math.random() * 4);

    const newQuestionObject = {};

    newQuestionObject.prompt = question.question;
    newQuestionObject.correct_option = optionsArr[n];
    newQuestionObject[`option_${optionsArr[n]}`] = question.correct_answer;
    newQuestionObject[`option_${optionsArr[(n + 1) % 4]}`] = question.incorrect_answers[0];
    newQuestionObject[`option_${optionsArr[(n + 2) % 4]}`] = question.incorrect_answers[1];
    newQuestionObject[`option_${optionsArr[(n + 3) % 4]}`] = question.incorrect_answers[2];

    newQuestionObject.difficulty = question.difficulty;
    newQuestionObject.category = question.category;

    newQuestionArray.push(newQuestionObject);
  }

  return newQuestionArray;
}

export { formatQuestions };
