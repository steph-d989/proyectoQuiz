const contenedorPreguntas = document.querySelector('.contenedorPreguntas');
const fragment = document.createDocumentFragment();

const getQuestions = async () => {
    try {
        const resp = await fetch('https://opentdb.com/api.php?amount=10');

        if (resp.ok) {
            const data = await resp.json();
            console.log(data.results);
            const questionsArray = data.results;
            pintarQuestions(questionsArray);
        } else {
            throw resp;
        }

    } catch (error) {
        throw console.log(error.status);
    }
};

const pintarQuestions = (arr) => {
    arr.forEach((element, index)=> {
        const card = document.createElement('article');
        const contenedorOptions = document.createElement('div');
        const question = document.createElement('h4');
        const category = document.createElement('h5');
        const option1 = document.createElement('button'); 
        const option2 = document.createElement('button');
        const option3 = document.createElement('button');
        const option4 = document.createElement('button');
        const next = document.createElement('button');
        (option1, option2, option3, option4).classList.add('respuestaBtn');
        next.classList.add('nextBtn');
        question.textContent = `${index + 1}. ${element.question}`;
        category.textContent = element.category;
        const incorrectAnswersArr = element.incorrect_answers;
        shuffle(incorrectAnswersArr, element.correct_answer);
        console.log(element.incorrect_answers);
        
        // option1.textContent = element.incorrect_answers[0];
        // option2.textContent = element.incorrect_answers[1];
        // option3.textContent = element.incorrect_answers[2];
        // option4.textContent = element.incorrect_answers[3];
        contenedorOptions.append(option1, option2, option3, option4);
        card.append(question, category, contenedorOptions, next);
        fragment.append(card);
    });
    contenedorPreguntas.append(fragment);
};

const shuffle = (arr, correctAnswer) => {
    const random = Math.floor(Math.random() * arr.length);
    return arr.splice(random, 0, correctAnswer);
};

getQuestions();