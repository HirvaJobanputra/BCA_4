  document.addEventListener('DOMContentLoaded', function() {
   const questionNumberDisplay = document.getElementById('question-number');
    const questionTextDisplay = document.getElementById('question-text');
    const answerButtons = document.querySelectorAll('.answer-button');
    const nextButton = document.getElementById('next-button');
    const quizArea = document.getElementById('quiz-area');
  
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let questions =[];
    
  // Get subject and question count from URL
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject');
  const questionCount = parseInt(urlParams.get('questions')) || 10;

    // Inline question data (separate arrays for each subject)
    const arQuestions = [
      {
        "question": "What does FPS stand for in gaming?",
        "answers": ["a) Frames Per Second", "b) First Person Shooter", "c) Fast Paced Strategy", "d) Fighting Point System"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of these is a popular game engine?",
        "answers": ["a) Unity", "b) Unreal Engine", "c) Both a and b", "d) Neither a nor b"],
        "correctAnswer": "c"
      },
      {
        "question": "What is the term for a game played over a network?",
        "answers": ["a) Single-player game", "b) Multiplayer game", "c) Offline game", "d) Local game"],
        "correctAnswer": "b"
      },
      {
        "question": "Which genre of games focuses on storytelling and character development?",
        "answers": ["a) Action", "b) Adventure", "c) Role-playing (RPG)", "d) Strategy"],
        "correctAnswer": "c"
      },
      {
        "question": "What is the term for a game's storyline?",
        "answers": ["a) Gameplay", "b) Narrative", "c) Mechanics", "d) Level design"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of these is a popular esports game?",
        "answers": ["a) League of Legends", "b) Fortnite", "c) Counter-Strike: Global Offensive", "d) All of the above"],
        "correctAnswer": "d"
      },
      {
        "question": "What is the term for in-game items that can be purchased with real money?",
        "answers": ["a) DLC", "b) Microtransactions", "c) Loot boxes", "d) All of the above"],
        "correctAnswer": "d"
      },
      {
        "question": "What is the term for modifying a game to gain an unfair advantage?",
        "answers": ["a) Cheating", "b) Glitching", "c) Exploiting", "d) All of the above"],
        "correctAnswer": "d"
      },
      {
        "question": "Which platform is known for its indie game scene?",
        "answers": ["a) PC", "b) PlayStation", "c) Xbox", "d) Nintendo Switch"],
        "correctAnswer": "a"
      },
      {
        "question": "What is the term for a game designed to teach a specific skill?",
        "answers": ["a) Serious game", "b) Casual game", "c) Simulation game", "d) Educational game"],
        "correctAnswer": "a"
      },
      {
        "question": "What does MMORPG stand for?",
        "answers": ["a) Massive Multiplayer Online Role-Playing Game", "b) Modern Multiplayer Online Racing Platform Game", "c) Mainframe Multiplayer Online Resource Program Game", "d) Media Multiplayer Online Real-Time Game"],
        "correctAnswer": "a"
      },
      {
        "question": "Which company developed the PlayStation console?",
        "answers": ["a) Microsoft", "b) Nintendo", "c) Sony", "d) Sega"],
        "correctAnswer": "c"
      },
      {
        "question": "What is the name of the main character in the 'Legend of Zelda' series?",
        "answers": ["a) Zelda", "b) Link", "c) Ganon", "d) Impa"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of these is a popular streaming platform for gamers?",
        "answers": ["a) Vimeo", "b) Twitch", "c) Dailymotion", "d) Flickr"],
        "correctAnswer": "b"
      },
      {
        "question": "Which game is known for its 'block-building' gameplay?",
        "answers": ["a) Grand Theft Auto", "b) Minecraft", "c) Call of Duty", "d) FIFA"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the name of the plumber character in the 'Super Mario Bros.' series?",
        "answers": ["a) Luigi", "b) Bowser", "c) Mario", "d) Peach"],
        "correctAnswer": "c"
      },
      {
        "question": "Which company developed the Xbox console?",
        "answers": ["a) Nintendo", "b) Sony", "c) Microsoft", "d) Sega"],
        "correctAnswer": "c"
      },
      {
        "question": "What is 'eSports'?",
        "answers": ["a) Electronic Sports", "b) Extreme Sports", "c) Educational Sports", "d) Entertaining Sports"],
        "correctAnswer": "a"
      },
      {
        "question": "Which game series features the character 'Master Chief'?",
        "answers": ["a) Halo", "b) Gears of War", "c) Metroid", "d) Doom"],
        "correctAnswer": "a"
      },
      {
        "question": "Which of these is a popular MOBA (Multiplayer Online Battle Arena) game?",
        "answers": ["a) World of Warcraft", "b) Counter-Strike", "c) League of Legends", "d) Tetris"],
        "correctAnswer": "c"
      },
      {
        "question": "What is 'latency' in online gaming?",
        "answers": ["a) The speed of the processor", "b) The delay between input and response", "c) The quality of the graphics", "d) The loudness of the audio"],
        "correctAnswer": "b"
      },
      {
        "question": "Which company developed the Nintendo Switch?",
        "answers": ["a) Sony", "b) Microsoft", "c) Nintendo", "d) Valve"],
        "correctAnswer": "c"
      },
      {
        "question": "What is a 'roguelike' game?",
        "answers": ["a) A racing simulation", "b) A game with permadeath and procedural generation", "c) A sports game", "d) A puzzle game"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of these is a popular battle royale game?",
        "answers": ["a) Candy Crush", "b) Fortnite", "c) Farmville", "d) Solitaire"],
        "correctAnswer": "b"
      },
      {
        "question": "What does 'NPC' stand for?",
        "answers": ["a) Non-Player Character", "b) New Player Challenge", "c) Network Performance Control", "d) Normal Processing Core"],
        "correctAnswer": "a"
      },
      {
        "question": "Which game series features the character 'Lara Croft'?",
        "answers": ["a) Uncharted", "b) Tomb Raider", "c) Assassin's Creed", "d) Prince of Persia"],
        "correctAnswer": "b"
      },
      {
        "question": "What is 'DLC' in gaming?",
        "answers": ["a) Downloadable Content", "b) Digital Level Creation", "c) Direct Line Communication", "d) Dynamic Lighting Control"],
        "correctAnswer": "a"
      },
      {
        "question": "Which company developed the 'Grand Theft Auto' series?",
        "answers": ["a) Ubisoft", "b) Rockstar Games", "c) Electronic Arts", "d) Activision"],
        "correctAnswer": "b"
      },
      {
        "question": "What is a 'sandbox' game?",
        "answers": ["a) A game with linear levels", "b) A game with open-ended gameplay and freedom", "c) A game with limited interaction", "d) A game with strict rules and objectives"],
        "correctAnswer": "b"
      },
      
          {
            "question": "What does FPS stand for in gaming?",
            "answers": ["a) Frames Per Second", "b) First Person Shooter", "c) Fast Paced Strategy", "d) Fighting Point System"],
            "correctAnswer": "b"
          },
          {
            "question": "Which of these is a popular game engine?",
            "answers": ["a) Unity", "b) Unreal Engine", "c) Both a and b", "d) Neither a nor b"],
            "correctAnswer": "c"
          },
          {
            "question": "What is the term for a game played over a network?",
            "answers": ["a) Single-player game", "b) Multiplayer game", "c) Offline game", "d) Local game"],
            "correctAnswer": "b"
          },
          {
            "question": "Which genre of games focuses on storytelling and character development?",
            "answers": ["a) Action", "b) Adventure", "c) Role-playing (RPG)", "d) Strategy"],
            "correctAnswer": "c"
          },
          {
            "question": "What is the term for a game's storyline?",
            "answers": ["a) Gameplay", "b) Narrative", "c) Mechanics", "d) Level design"],
            "correctAnswer": "b"
          },
          {
            "question": "Which of these is a popular esports game?",
            "answers": ["a) League of Legends", "b) Fortnite", "c) Counter-Strike: Global Offensive", "d) All of the above"],
            "correctAnswer": "d"
          },
          {
            "question": "What is the term for in-game items that can be purchased with real money?",
            "answers": ["a) DLC", "b) Microtransactions", "c) Loot boxes", "d) All of the above"],
            "correctAnswer": "d"
          },
          {
            "question": "What is the term for modifying a game to gain an unfair advantage?",
            "answers": ["a) Cheating", "b) Glitching", "c) Exploiting", "d) All of the above"],
            "correctAnswer": "d"
          },
          {
            "question": "Which platform is known for its indie game scene?",
            "answers": ["a) PC", "b) PlayStation", "c) Xbox", "d) Nintendo Switch"],
            "correctAnswer": "a"
          },
          {
            "question": "What is the term for a game designed to teach a specific skill?",
            "answers": ["a) Serious game", "b) Casual game", "c) Simulation game", "d) Educational game"],
            "correctAnswer": "a"
          },
          {
            "question": "What does MMORPG stand for?",
            "answers": ["a) Massive Multiplayer Online Role-Playing Game", "b) Modern Multiplayer Online Racing Platform Game", "c) Mainframe Multiplayer Online Resource Program Game", "d) Media Multiplayer Online Real-Time Game"],
            "correctAnswer": "a"
          },
          {
            "question": "Which company developed the PlayStation console?",
            "answers": ["a) Microsoft", "b) Nintendo", "c) Sony", "d) Sega"],
            "correctAnswer": "c"
          },
          {
            "question": "What is the name of the main character in the 'Legend of Zelda' series?",
            "answers": ["a) Zelda", "b) Link", "c) Ganon", "d) Impa"],
            "correctAnswer": "b"
          },
          {
            "question": "Which of these is a popular streaming platform for gamers?",
            "answers": ["a) Vimeo", "b) Twitch", "c) Dailymotion", "d) Flickr"],
            "correctAnswer": "b"
          },
          {
            "question": "Which game is known for its 'block-building' gameplay?",
            "answers": ["a) Grand Theft Auto", "b) Minecraft", "c) Call of Duty", "d) FIFA"],
            "correctAnswer": "b"
          },
          {
            "question": "What is the name of the plumber character in the 'Super Mario Bros.' series?",
            "answers": ["a) Luigi", "b) Bowser", "c) Mario", "d) Peach"],
            "correctAnswer": "c"
          },
          {
            "question": "Which company developed the Xbox console?",
            "answers": ["a) Nintendo", "b) Sony", "c) Microsoft", "d) Sega"],
            "correctAnswer": "c"
          },
          {
            "question": "What is 'eSports'?",
            "answers": ["a) Electronic Sports", "b) Extreme Sports", "c) Educational Sports", "d) Entertaining Sports"],
            "correctAnswer": "a"
          },
          {
            "question": "Which game series features the character 'Master Chief'?",
            "answers": ["a) Halo", "b) Gears of War", "c) Metroid", "d) Doom"],
            "correctAnswer": "a"
          },
          {
            "question": "Which of these is a popular MOBA (Multiplayer Online Battle Arena) game?",
            "answers": ["a) World of Warcraft", "b) Counter-Strike", "c) League of Legends", "d) Tetris"],
            "correctAnswer": "c"
          },
          {
            "question": "What is 'latency' in online gaming?",
            "answers": ["a) The speed of the processor", "b) The delay between input and response", "c) The quality of the graphics", "d) The loudness of the audio"],
            "correctAnswer": "b"
          },
          {
            "question": "Which company developed the Nintendo Switch?",
            "answers": ["a) Sony", "b) Microsoft", "c) Nintendo", "d) Valve"],
            "correctAnswer": "c"
          },
          {
            "question": "What is a 'roguelike' game?",
            "answers": ["a) A racing simulation", "b) A game with permadeath and procedural generation", "c) A sports game", "d) A puzzle game"],
            "correctAnswer": "b"
          },
          {
            "question": "Which of these is a popular battle royale game?",
            "answers": ["a) Candy Crush", "b) Fortnite", "c) Farmville", "d) Solitaire"],
            "correctAnswer": "b"
          },
          {
            "question": "What does 'NPC' stand for?",
            "answers": ["a) Non-Player Character", "b) New Player Challenge", "c) Network Performance Control", "d) Normal Processing Core"],
            "correctAnswer": "a"
          },
          {
            "question": "Which game series features the character 'Lara Croft'?",
            "answers": ["a) Uncharted", "b) Tomb Raider", "c) Assassin's Creed", "d) Prince of Persia"],
            "correctAnswer": "b"
          },
          {
            "question": "What is 'DLC' in gaming?",
            "answers": ["a) Downloadable Content", "b) Digital Level Creation", "c) Direct Line Communication", "d) Dynamic Lighting Control"],
            "correctAnswer": "a"
          },
          {
            "question": "Which company developed the 'Grand Theft Auto' series?",
            "answers": ["a) Ubisoft", "b) Rockstar Games", "c) Electronic Arts", "d) Activision"],
            "correctAnswer": "b"
          },
          {
            "question": "What is a 'sandbox' game?",
            "answers": ["a) A game with linear levels", "b) A game with open-ended gameplay and freedom", "c) A game with limited interaction", "d) A game with strict rules and objectives"],
            "correctAnswer": "b"
          },
          {
            "question": "What is 'VR' in gaming?",
             "answers": ["a) Virtual Reality", "b) Variable Resolution", "c) Visual Rendering", "d) Video Recording"],
             "correctAnswer": "a"
          }
       
    ];

    const aiQuestions = [
      { "question": "What does AI stand for?", "answers": ["a) Advanced Intelligence", "b) Artificial Information", "c) Artificial Intelligence", "d) Automated Interface"], "correctAnswer": "c" },
      { "question": "Which of the following is a subset of AI that focuses on enabling machines to learn from data?", "answers": ["a) Robotics", "b) Machine Learning", "c) Computer Vision", "d) Natural Language Processing"], "correctAnswer": "b" },
      
      {"question": "What does AI stand for?",
          "answers": ["a) Advanced Intelligence", "b) Artificial Information", "c) Artificial Intelligence", "d) Automated Interface"],
          "correctAnswer": "c"
      },
      {
          "question": "Which of the following is a subset of AI that focuses on enabling machines to learn from data?",
          "answers": ["a) Robotics", "b) Machine Learning", "c) Computer Vision", "d) Natural Language Processing"],
          "correctAnswer": "b"
      },
      {
          "question": "What is the term for AI systems that can understand and process human language?",
          "answers": ["a) Expert Systems", "b) Neural Networks", "c) Natural Language Processing (NLP)", "d) Fuzzy Logic"],
          "correctAnswer": "c"
      },
      {
          "question": "Which type of machine learning involves training a model on labeled data?",
          "answers": ["a) Unsupervised Learning", "b) Reinforcement Learning", "c) Supervised Learning", "d) Deep Learning"],
          "correctAnswer": "c"
      },
      {
          "question": "What is a neural network inspired by?",
          "answers": ["a) The human brain", "b) Computer algorithms", "c) Mathematical equations", "d) Chemical reactions"],
          "correctAnswer": "a"
      },
      {
          "question": "Which AI technique is used in self-driving cars to detect objects?",
          "answers": ["a) NLP", "b) Expert Systems", "c) Computer Vision", "d) Fuzzy Logic"],
          "correctAnswer": "c"
      },
      {
          "question": "What type of learning involves an agent interacting with an environment and learning through trial and error?",
          "answers": ["a) Supervised Learning", "b) Unsupervised Learning", "c) Reinforcement Learning", "d) Deep Learning"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the term for AI systems that can mimic human decision-making?",
          "answers": ["a) Neural Networks", "b) Expert Systems", "c) Machine Learning", "d) Robotics"],
          "correctAnswer": "b"
      },
      {
          "question": "Which of these is a popular deep learning framework?",
          "answers": ["a) Java", "b) Python", "c) TensorFlow", "d) HTML"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the goal of unsupervised learning?",
          "answers": ["a) To predict labels from input data.", "b) To find patterns in unlabeled data.", "c) To train an agent to maximize rewards.", "d) To create expert systems."],
          "correctAnswer": "b"
      },
      {
          "question": "What is a chatbot an example of?",
          "answers": ["a) Computer Vision", "b) NLP", "c) Robotics", "d) Expert Systems"],
          "correctAnswer": "b"
      },
      {
          "question": "What is the 'Turing Test' designed to evaluate?",
          "answers": ["a) Machine's ability to perform complex calculations.", "b) Machine's ability to understand human language.", "c) Machine's ability to exhibit intelligent behavior indistinguishable from that of a human.", "d) Machine's ability to control robots."],
          "correctAnswer": "c"
      },
      {
          "question": "Which of the following is a risk associated with AI?",
          "answers": ["a) Increased productivity.", "b) Job displacement.", "c) Improved healthcare.", "d) Enhanced communication."],
          "correctAnswer": "b"
      },
      {
          "question": "What is the process of training a neural network called?",
          "answers": ["a) Compilation", "b) Optimization", "c) Backpropagation", "d) Debugging"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the term for a computer's ability to 'see' and interpret visual information?",
          "answers": ["a) NLP", "b) Computer Vision", "c) Robotics", "d) Expert Systems"],
          "correctAnswer": "b"
      },
      {
          "question": "Which of the following is an application of AI in healthcare?",
          "answers": ["a) Weather forecasting", "b) Fraud detection", "c) Disease diagnosis", "d) Stock market prediction"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the term for AI that can perform a wide range of intellectual tasks like a human?",
          "answers": ["a) Narrow AI", "b) Weak AI", "c) General AI", "d) Specialized AI"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the purpose of an activation function in a neural network?",
          "answers": ["a) To store data", "b) To perform calculations", "c) To introduce non-linearity", "d) To manage memory"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the 'singularity' in the context of AI?",
          "answers": ["a) A point where AI becomes useless.", "b) A point where AI surpasses human intelligence.", "c) A point where AI can only perform one task.", "d) A point where AI becomes predictable."],
          "correctAnswer": "b"
      },
      {
          "question": "Which of these is a common application of AI in finance?",
          "answers": ["a) Image editing", "b) Music composition", "c) Fraud detection", "d) Video game development"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the term for bias in AI algorithms due to biased training data?",
          "answers": ["a) Algorithm efficiency", "b) Data integrity", "c) Algorithmic bias", "d) Computational speed"],
          "correctAnswer": "c"
      },
      {
          "question": "What is a 'knowledge base' in an expert system?",
          "answers": ["a) A collection of algorithms.", "b) A database of facts and rules.", "c) A set of neural networks.", "d) A user interface."],
          "correctAnswer": "b"
      },
      {
          "question": "What is the purpose of a 'loss function' in machine learning?",
          "answers": ["a) To measure the accuracy of the model.", "b) To calculate the speed of the algorithm.", "c) To track the memory usage.", "d) To define the user interface."],
          "correctAnswer": "a"
      },
      {
          "question": "Which of these is an example of a 'narrow AI' application?",
          "answers": ["a) A robot that can perform any human task.", "b) A chess-playing program.", "c) An AI that can write novels.", "d) An AI that can understand all languages."],
          "correctAnswer": "b"
      },
      {
          "question": "What is the term for AI systems that can learn and adapt over time?",
          "answers": ["a) Static AI", "b) Adaptive AI", "c) Fixed AI", "d) Rigid AI"],
          "correctAnswer": "b"
      },
      {
          "question": "What is a 'convolutional neural network' (CNN) commonly used for?",
          "answers": ["a) Text analysis", "b) Image recognition", "c) Speech synthesis", "d) Database management"],
          "correctAnswer": "b"
      },
      {
          "question": "What is the term for the process of converting human speech into text?",
          "answers": ["a) Text-to-speech", "b) Speech recognition", "c) Language translation", "d) Natural language generation"],
          "correctAnswer": "b"
      },
      {
          "question": "Which of the following is a challenge in developing ethical AI?",
          "answers": ["a) Increasing computational power.", "b) Ensuring fairness and transparency.", "c) Reducing data storage costs.", "d) Improving algorithm speed."],
          "correctAnswer": "b"
      },
      {
          "question": "What is 'deep learning' characterized by?",
          "answers": ["a) Using simple algorithms.", "b) Having multiple hidden layers in neural networks.", "c) Requiring minimal data for training.", "d) Being easily interpretable."],
          "correctAnswer": "b"
      },
      {
          "question": "What is the term for using AI to create realistic images or videos?",
          "answers": ["a) Virtual Reality (VR)", "b) Augmented Reality (AR)", "c) Deepfake", "d) Hologram"],
          "correctAnswer": "c"
      },
      {
          "question": "What is the term for a machine learning model that is trained on a massive dataset and can be fine-tuned for specific tasks?",
          "answers": ["a) Capsule Network", "b) Generative Adversarial Network (GAN)", "c) Foundation Model", "d) Recurrent Neural Network (RNN)"],
          "correctAnswer": "c"
      },
      {
          "question": "Which of the following is an example of AI being used in customer service?",
          "answers": ["a) Personalized product recommendations", "b) Chatbots answering frequently asked questions", "c) Fraud detection in online transactions", "d) Medical diagnosis based on patient data"],
          "correctAnswer": "b"
      },
      {
          "question": "What is the purpose of a Recurrent Neural Network (RNN)?",
          "answers": ["a) Image recognition", "b) Processing sequential data", "c) Data compression", "d) Generating random numbers"],
          "correctAnswer": "b"
      }
  
    ]

    const gamingQuestions = [
      {
        "question": "What does AR stand for?",
        "answers": ["a) Advanced Reality", "b) Artificial Reality", "c) Augmented Reality", "d) Alternate Reality"],
        "correctAnswer": "c"
      },
      {
        "question": "What does VR stand for?",
        "answers": ["a) Virtual Reality", "b) Visual Reality", "c) Versatile Reality", "d) Virtual Realism"],
        "correctAnswer": "a"
      },
      {
        "question": "Which technology overlays digital information onto the real world?",
        "answers": ["a) AR", "b) VR", "c) Both AR and VR", "d) Neither AR nor VR"],
        "correctAnswer": "a"
      },
      {
        "question": "Which technology immerses users in a completely virtual environment?",
        "answers": ["a) AR", "b) VR", "c) Both AR and VR", "d) Neither AR nor VR"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of these is a popular AR device?",
        "answers": ["a) Oculus Rift", "b) HTC Vive", "c) Microsoft HoloLens", "d) PlayStation VR"],
        "correctAnswer": "c"
      },
      {
        "question": "Which of these is a popular VR device?",
        "answers": ["a) Google Glass", "b) Magic Leap", "c) Oculus Quest", "d) Nintendo Switch"],
        "correctAnswer": "c"
      },
      {
        "question": "What is the term for the feeling of presence in a virtual environment?",
        "answers": ["a) Immersion", "b) Interaction", "c) Simulation", "d) Telepresence"],
        "correctAnswer": "a"
      },
      {
        "question": "Which of these is a common use case for AR in gaming?",
        "answers": ["a) Creating immersive virtual worlds", "b) Providing real-time feedback on player performance", "c) Enhancing the real world with virtual objects", "d) Simulating realistic physics"],
        "correctAnswer": "c"
      },
      {
        "question": "Which of these is a common use case for VR in training?",
        "answers": ["a) Providing interactive simulations of real-world scenarios", "b) Delivering lectures remotely", "c) Creating virtual tours of museums", "d) Designing 3D models"],
        "correctAnswer": "a"
      },
      {
        "question": "What is the term for the technology that tracks a user's movements in VR?",
        "answers": ["a) Motion tracking", "b) Eye tracking", "c) Haptic feedback", "d) Spatial audio"],
        "correctAnswer": "a"
      },
      {
        "question": "What is the term for feedback that simulates the sense of touch?",
        "answers": ["a) Spatial audio", "b) Haptic feedback", "c) Motion tracking", "d) Eye tracking"],
        "correctAnswer": "b"
      },
      {
        "question": "Which industry uses AR for virtual try-on experiences?",
        "answers": ["a) Healthcare", "b) Retail", "c) Education", "d) Manufacturing"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the primary purpose of a head-mounted display (HMD) in VR?",
        "answers": ["a) To project images onto a wall", "b) To capture user movements", "c) To display virtual environments", "d) To provide audio feedback"],
        "correctAnswer": "c"
      },
      {
        "question": "Which AR application helps with navigation by overlaying directions on the real world?",
        "answers": ["a) Social media filters", "b) Location-based AR", "c) Virtual reality tours", "d) Medical imaging"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the visual discomfort experienced by some users in VR?",
        "answers": ["a) Motion sickness", "b) Cyber sickness", "c) Simulator sickness", "d) All of the above"],
        "correctAnswer": "d"
      },
      {
        "question": "Which technology allows users to interact with virtual objects using hand gestures?",
        "answers": ["a) Eye tracking", "b) Gesture recognition", "c) Spatial audio", "d) Haptic feedback"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the field that studies the interaction between humans and computers in virtual environments?",
        "answers": ["a) Human-computer interaction (HCI)", "b) Artificial intelligence (AI)", "c) Computer graphics", "d) Game design"],
        "correctAnswer": "a"
      },
      {
        "question": "Which industry uses VR for surgical training and simulations?",
        "answers": ["a) Automotive", "b) Education", "c) Healthcare", "d) Retail"],
        "correctAnswer": "c"
      },
      {
        "question": "What is the term for the creation of a realistic sound environment in VR?",
        "answers": ["a) Haptic feedback", "b) Spatial audio", "c) Motion tracking", "d) Eye tracking"],
        "correctAnswer": "b"
      },
      {
        "question": "Which of the following is a key challenge in AR development?",
        "answers": ["a) Creating immersive virtual worlds", "b) Accurately tracking the real world", "c) Simulating realistic physics", "d) Providing haptic feedback"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the range of view that a user can see in a VR headset?",
        "answers": ["a) Resolution", "b) Field of view (FOV)", "c) Refresh rate", "d) Latency"],
        "correctAnswer": "b"
      },
      {
        "question": "Which AR/VR application is used for virtual museum tours and historical recreations?",
        "answers": ["a) Social media filters", "b) Educational tours", "c) Gaming applications", "d) Medical imaging"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the delay between a user's action and the corresponding response in VR?",
        "answers": ["a) Refresh rate", "b) Latency", "c) Resolution", "d) Field of view (FOV)"],
        "correctAnswer": "b"
      },
      {
        "question": "Which technology allows for the tracking of a user's gaze in VR?",
        "answers": ["a) Motion tracking", "b) Eye tracking", "c) Haptic feedback", "d) Spatial audio"],
        "correctAnswer": "b"
      },
      {
        "question": "Which industry uses AR for maintenance and repair instructions?",
        "answers": ["a) Entertainment", "b) Manufacturing", "c) Finance", "d) Agriculture"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the level of detail displayed by a VR headset?",
        "answers": ["a) Refresh rate", "b) Latency", "c) Resolution", "d) Field of view (FOV)"],
        "correctAnswer": "c"
      },
      {
        "question": "Which AR feature allows users to try out furniture in their own homes?",
        "answers": ["a) Location based AR", "b) Virtual placement", "c) Social Media filters", "d) Educational tours"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for the number of times a VR display updates per second?",
        "answers": ["a) Resolution", "b) Latency", "c) Refresh rate", "d) Field of view (FOV)"],
        "correctAnswer": "c"
      },
      {
        "question": "Which of the following is a potential ethical concern related to AR/VR?",
        "answers": ["a) Increased productivity", "b) Data privacy", "c) Improved communication", "d) Enhanced creativity"],
        "correctAnswer": "b"
      },
      {
        "question": "What is the term for a virtual space where users can interact with each other and virtual objects?",
        "answers": ["a) Hologram", "b) Metaverse", "c) Simulation", "d) Render"],
        "correctAnswer": "b"
      }

    ]

    function loadQuestions(subject) {
      if (subject === "ai") {
          return aiQuestions;
      } else if (subject === "ar") {
          return arQuestions;
      } else if (subject === "gaming") {
          return gamingQuestions;
      } else {
          return null;
      }
  }

  // Generate questions (select random questions)
  function generateQuestions(allQuestions, count) {
      let selectedQuestions = [];
      let questionCopy = [...allQuestions]; // Create a copy to avoid modifying the original

      for (let i = 0; i < count; i++) {
          if (questionCopy.length === 0) {
              // Handle case where there are fewer questions than requested
              break;
          }
          const randomIndex = Math.floor(Math.random() * questionCopy.length);
          selectedQuestions.push(questionCopy[randomIndex]);
          questionCopy.splice(randomIndex, 1);
      }
      return selectedQuestions;
  }

  // Initialize the quiz
  function initQuiz() {
    
    const allQuestions = loadQuestions(subject);
    console.log("All Questions:", allQuestions); // Check the loaded questions
    if (allQuestions) {
        questions = generateQuestions(allQuestions, questionCount);
        console.log("Selected Questions:", questions); // Check the selected questions
        displayQuestion();
    } else {
        quizArea.innerHTML = "<p>Failed to load questions.</p>";
    }
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      console.log("Current Question:", currentQuestion); // Check the question object
      console.log("Question Text:", currentQuestion.question); // Check the question text
      console.log("Options:", currentQuestion.options); // Check the options array

      questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
      questionTextDisplay.textContent = currentQuestion.question;

      answerButtons.forEach((button, index) => {
          button.textContent = currentQuestion.options[index];
          button.dataset.answer = String.fromCharCode(97 + index);
          button.disabled = false;
          button.classList.remove('correct', 'incorrect');
      });

      selectedAnswer = null;
      nextButton.style.display = 'none';
  } else {
      endQuiz();
  }
}
  answerButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (selectedAnswer !== null) return;

          selectedAnswer = button.dataset.answer;
          checkAnswer();
      });
  });

  function checkAnswer() {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.answer; // Use 'answer' instead of 'correctAnswer'

      answerButtons.forEach(button => {
          button.disabled = true;
          if (button.dataset.answer === currentQuestion.answer) {
              button.classList.add('correct');
          } else if (button.dataset.answer === selectedAnswer) {
              button.classList.add('incorrect');
          }
      });

      if (isCorrect) {
          score++;
      }

      nextButton.style.display = 'block';
  }

  nextButton.addEventListener('click', () => {
      currentQuestionIndex++;
      displayQuestion();
  });

  function endQuiz() {
      quizArea.innerHTML = `<h2>Quiz Complete!</h2><p>Your score: ${score} out of ${questions.length}</p>`;
  }

  initQuiz(); 
});