// Translation data for all languages
const translations = {
    hy: {
        welcome: "Բարի գալուստ մեր դասարան",
        welcome_sub: "Միացեք մեր սմարթ ուսումնական հարթակին",
        schedule: "Դասացուցակ",
        upcoming_tests: "Առաջիկա թեստեր",
        ai_assistant: "AI Օգնական",
        educational_games: "Ուսումնական խաղեր",
        math: "Մաթեմատիկա",
        georgian: "Վրացերեն",
        armenian: "Հայերեն",
        time: "Ժամ",
        location: "Սենյակ",
        date: "Ամսաթիվ",
        topic: "Թեմա",
        math_game: "Մաթեմատիկական խաղ",
        georgian_game: "Վրացերեն խաղ",
        memory_game: "Հիշողության խաղ",
        puzzle_game: "Հանելուկ",
        quiz_game: "Վիկտորինա"
    },
    ka: {
        welcome: "კეთილი იყოს თქვენი მობრძანება ჩვენს კლასში",
        welcome_sub: "შეუერთდით ჩვენს ჭკვიან საგანმანათლებლო პლატფორმას",
        schedule: "გაკვეთილების განრიგი",
        upcoming_tests: "მომავალი ტესტები",
        ai_assistant: "AI ასისტენტი",
        educational_games: "საგანმანათლებლო თამაშები",
        math: "მათემატიკა",
        georgian: "ქართული",
        armenian: "სომხური",
        time: "დრო",
        location: "ოთახი",
        date: "თარიღი",
        topic: "თემა",
        math_game: "მათემატიკური თამაში",
        georgian_game: "ქართული თამაში",
        memory_game: "მეხსიერების თამაში",
        puzzle_game: "თავსატეხი",
        quiz_game: "ვიქტორინა"
    },
    ru: {
        welcome: "Добро пожаловать в наш класс",
        welcome_sub: "Присоединяйтесь к нашей умной образовательной платформе",
        schedule: "Расписание уроков",
        upcoming_tests: "Предстоящие тесты",
        ai_assistant: "AI Помощник",
        educational_games: "Обучающие игры",
        math: "Математика",
        georgian: "Грузинский",
        armenian: "Армянский",
        time: "Время",
        location: "Кабинет",
        date: "Дата",
        topic: "Тема",
        math_game: "Математическая игра",
        georgian_game: "Грузинская игра",
        memory_game: "Игра на память",
        puzzle_game: "Головоломка",
        quiz_game: "Викторина"
    },
    en: {
        welcome: "Welcome to our classroom",
        welcome_sub: "Join our smart educational platform",
        schedule: "Class Schedule",
        upcoming_tests: "Upcoming Tests",
        ai_assistant: "AI Assistant",
        educational_games: "Educational Games",
        math: "Mathematics",
        georgian: "Georgian",
        armenian: "Armenian",
        time: "Time",
        location: "Room",
        date: "Date",
        topic: "Topic",
        math_game: "Math Game",
        georgian_game: "Georgian Game",
        memory_game: "Memory Game",
        puzzle_game: "Puzzle",
        quiz_game: "Quiz Game"
    }
};

// Current language (default Armenian)
let currentLanguage = 'hy';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update input placeholder
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.placeholder = lang === 'hy' ? 'Հարցրեք Ձեր հարցը...' : 
                              lang === 'ka' ? 'დასვით თქვენი შეკითხვა...' :
                              lang === 'ru' ? 'Задайте ваш вопрос...' : 'Ask your question...';
    }
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-select');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
    
    // Simple AI chat functionality
    const aiChat = document.getElementById('ai-chat');
    const aiInput = document.getElementById('ai-input');
    const aiSend = document.getElementById('ai-send');
    
    if (aiChat && aiInput && aiSend) {
        aiSend.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = aiInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'text-right mb-2';
                userMessage.innerHTML = `<span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">${message}</span>`;
                aiChat.appendChild(userMessage);
                aiInput.value = '';
                
                // Scroll to bottom
                aiChat.scrollTop = aiChat.scrollHeight;
                
                // Simulate AI response
                setTimeout(() => {
                    const responses = {
                        hy: ["Բարի գալուստ: Ինչպե՞ս կարող եմ օգնել Ձեզ այսօր:", "Ինչպե՞ս կարող եմ օգնել Ձեզ ուսումնական հարցերով:", "Հարցրեք ինձ Ձեր ուսումնական հարցերը:"],
                        ka: ["გამარჯობა: როგორ შემიძლია დაგეხმაროთ დღეს?", "როგორ შემიძლია დაგეხმაროთ საგანმანათლებლო საკითხებში?", "მისთვაინეთ თქვენი საგანმანათლებლო შეკითხვები."],
                        ru: ["Здравствуйте: Как я могу вам помочь сегодня?", "Как я могу помочь вам с учебными вопросами?", "Задайте мне свои учебные вопросы."],
                        en: ["Hello: How can I help you today?", "How can I assist you with educational questions?", "Ask me your educational questions."]
                    };
                    
                    const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
                    
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'text-left mb-2 fade-in';
                    aiMessage.innerHTML = `<span class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">${randomResponse}</span>`;
                    aiChat.appendChild(aiMessage);
                    
                    // Scroll to bottom
                    aiChat.scrollTop = aiChat.scrollHeight;
                }, 1000);
            }
        }
    }
    
    // Feather icons replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Function to load schedule and test data (to be filled by teacher)
function loadClassData() {
    // This would be replaced with actual data loading
    console.log("Loading class data...");
}

for (let i = 0; i < 20; i++) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.width = `${Math.random() * 60 + 20}px`;
  bubble.style.height = bubble.style.width;
  bubble.style.left = `${Math.random() * 100}vw`;
  bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
  document.body.appendChild(bubble);
}
