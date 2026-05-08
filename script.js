console.log("JavaScript working");

const currentSessionList = document.getElementById('currentSessionList');
const completeSessionBtn = document.getElementById('completeSessionBtn');
const sessionForm = document.getElementById('sessionForm');
const scenarioInput = document.getElementById('scenario');
const scoreInput = document.getElementById('score');
const categoryInput = document.getElementById('category');
const sessionList = document.getElementById('sessionList');
const sessionLengthInput = document.getElementById('sessionLength');
const subCategoryInput = document.getElementById('subCategory');

let currentSession = [];
const savedSessions = localStorage.getItem('completedSessions');
let completedSessions = savedSessions ? JSON.parse(savedSessions) : [];

sessionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (
        scenarioInput.value === '' ||
        scoreInput.value === '' ||
        categoryInput.value === ''
    ){
        alert('Please fill out all required fields.');
    return;
    }

    const session = {
        scenario: scenarioInput.value,
        score: scoreInput.value,
        category: categoryInput.value,
        subCategory: subCategoryInput.value  
    };

    currentSession.push(session);

    const sessionCard = document.createElement('div');
    sessionCard.classList.add('session-card');

    sessionCard.innerHTML = `
        <h3>${session.scenario}</h3>
        <p>Score: ${session.score}</p>
        <p>Category: ${session.category}</p>
        <small>Sub-Category: ${session.subCategory}</small>
    `;

    currentSessionList.appendChild(sessionCard);

    scenarioInput.value = '';
    scoreInput.value = '';
    subCategoryInput.value = '';
    categoryInput.value = '';

    console.log(currentSession);
});

completeSessionBtn.addEventListener('click', function() {
        if (currentSession.length === 0) {
        alert('Add at least one scenario before completing a session.');
        return;
    }

    if (sessionLengthInput.value === '') {
        alert('Please enter the session length.');
        return;
    }

    const today = new Date().toLocaleDateString();

    const completedSession = {
        date: today,
        length: sessionLengthInput.value,
        scenarios: [...currentSession]
    };

    completedSessions.push(completedSession);

    localStorage.setItem('completedSessions', JSON.stringify(completedSessions));

    const historyCard = document.createElement('div');
    historyCard.classList.add('history-card');
    historyCard.innerHTML = `
        <h3>${completedSession.date}</h3>
        <p>Length: ${completedSession.length}</p>
        <button class="delete-btn">Delete Session</button>
`;
    completedSession.scenarios.forEach(function(scenario) {
    historyCard.innerHTML += `
        <p>
            ${scenario.scenario} -
            ${scenario.score} -
            ${scenario.category}
        </p>
      ${scenario.subCategory ? `<small>Sub-Category: ${scenario.subCategory}</small>` : ''}
    `;
});

    const deleteBtn = historyCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function(){
            historyCard.remove();

            completedSessions = completedSessions.filter(function(session){
                return session !== completedSession;
            });

            localStorage.setItem('completedSessions', JSON.stringify(completedSessions));

        });

    sessionList.appendChild(historyCard);
    
    currentSession = [];
    currentSessionList.innerHTML = '';
    sessionLengthInput.value = '';

    console.log(completedSession);
    console.log(completedSessions);
});

    function renderHistory() {
    sessionList.innerHTML = '';

    completedSessions.forEach(function(completedSession) {
        const historyCard = document.createElement('div');
        historyCard.classList.add('history-card');

        historyCard.innerHTML = `
            <h3>${completedSession.date}</h3>
            <p>Length: ${completedSession.length}</p>
            <button class="delete-btn">Delete Session</button>
        `;

        completedSession.scenarios.forEach(function(scenario) {
            historyCard.innerHTML += `
                <p>
                    ${scenario.scenario} -
                    ${scenario.score} -
                    ${scenario.category}
                </p>
                ${scenario.subCategory ? `<small>Sub-Category: ${scenario.subCategory}</small>` : ''}
            `;
        });

        const deleteBtn = historyCard.querySelector('.delete-btn');

                deleteBtn.addEventListener('click', function() {
                    historyCard.remove();

        completedSessions = completedSessions.filter(function(session) {
            return session !== completedSession;
    });

        localStorage.setItem('completedSessions', JSON.stringify(completedSessions));
});
        
        sessionList.appendChild(historyCard);
    });
}

    renderHistory();