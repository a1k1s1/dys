export const questionData = {
    letterIdentification: {
        easy: [
            { 
                type: "single_letter",
                question: "What letter is this?",
                content: "A",
                answer: "A"
            },
            {
                type: "multiple_choice",
                question: "Which one is 'B'?",
                options: ["B", "D", "P", "Q"],
                answer: "B"
            },
            {
                type: "matching",
                question: "Which small letter matches 'M'?",
                options: ["m", "w", "n", "u"],
                answer: "m"
            },
            {
                type: "word_identification",
                question: "Where do you see the letter 'C' in 'CAT'?",
                content: "CAT",
                answer: "C"
            },
            {
                type: "sequence",
                question: "Which letter is missing? A _ C D",
                answer: "B"
            },
            {
                type: "group_identification",
                question: "Circle all the 'E's in this group: E, F, E, G, E, H.",
                content: ["E", "F", "E", "G", "E", "H"],
                answer: ["E", "E", "E"]
            },
            {
                type: "tracing",
                question: "Can you trace this letter 'L' with your finger?",
                content: "L",
                answer: "L"
            },
            {
                type: "audio_identification",
                question: "I will say three letters. Tap on 'T' when I say it: A, T, K.",
                audioSequence: ["A", "T", "K"],
                answer: "T"
            },
            {
                type: "sound_identification",
                question: "Which of these letters makes the 'sss' sound?",
                options: ["S", "P", "T", "F"],
                answer: "S"
            },
            {
                type: "word_start",
                question: "Which letter does 'Dog' start with?",
                options: ["D", "C", "T", "A"],
                answer: "D"
            }
        ],
        medium: [
            {
                type: "similar_letters",
                question: "Which one is 'p' and which one is 'q'?",
                content: ["p", "q"],
                answer: ["p", "q"]
            },
            {
                type: "odd_one_out",
                question: "Which letter does NOT belong? B, D, P, O.",
                options: ["B", "D", "P", "O"],
                answer: "O"
            },
            {
                type: "flipped_letter",
                question: "Is this a 'b' or a 'd'?",
                content: "b", // This would be a flipped 'b' in the UI
                answer: "b"
            },
            {
                type: "alphabet_order",
                question: "What comes after 'N' in the alphabet?",
                answer: "O"
            },
            {
                type: "scrambled_set",
                question: "Find all the letter 'M' in this set: W, M, H, N, M, M.",
                content: ["W", "M", "H", "N", "M", "M"],
                answer: ["M", "M", "M"]
            },
            {
                type: "letter_sorting",
                question: "Group these letters into capitals and small letters: A, t, B, c, d, E.",
                content: ["A", "t", "B", "c", "d", "E"],
                answer: {
                    uppercase: ["A", "B", "E"],
                    lowercase: ["t", "c", "d"]
                }
            },
            {
                type: "font_variations",
                question: "Which one is 'G'?",
                options: ["G", "𝒢", "𝔊", "𝕲"],
                answer: "G"
            },
            {
                type: "letter_count",
                question: "How many 'R's are in the word 'RABBIT'?",
                content: "RABBIT",
                answer: 2
            },
            {
                type: "missing_letter",
                question: "What letter is missing in 'C_T'?",
                options: ["O", "A", "E", "T"],
                answer: "A"
            },
            {
                type: "rotated_letter",
                question: "Is this an 'n' or a 'u'?",
                content: "n", // This would be a slightly rotated 'n' in the UI
                answer: "n"
            }
        ],
        hard: [
            {
                type: "hidden_letters",
                question: "Find every 'K' in: M, K, H, K, N, X, K, P.",
                content: ["M", "K", "H", "K", "N", "X", "K", "P"],
                answer: ["K", "K", "K"]
            },
            {
                type: "non_standard_fonts",
                question: "Which of these is 'A'?",
                options: ["A", "𝒜", "𝔄", "𝕬", "ᗅ"],
                answer: ["A", "𝒜", "𝔄", "𝕬"]
            },
            {
                type: "distracting_background",
                question: "Find the 'S' hidden in this group:",
                content: ["X", "Y", "Z", "S", "W", "V", "U", "T"],
                answer: "S"
            },
            {
                type: "rotated_letter",
                question: "If I turn the letter 'b' upside down, what does it look like?",
                content: "b", // This would be shown upside down in the UI
                answer: "p"
            },
            {
                type: "missing_letter_complex",
                question: "What letter is missing? 'E _ P H A N T'",
                answer: "L"
            },
            {
                type: "letter_grid",
                question: "Find the letter 'X' in this grid of letters",
                content: [
                    ["A", "B", "C"],
                    ["D", "X", "F"],
                    ["G", "H", "I"]
                ],
                answer: { row: 1, col: 1 }
            },
            {
                type: "handwriting_styles",
                question: "Which one is a 'G'?",
                options: ["G", "𝓰", "𝒢", "𝔾", "ℊ"],
                answer: ["G", "𝓰", "𝒢", "𝔾", "ℊ"]
            },
            {
                type: "letter_in_sentence",
                question: "Find the letter 'R' in this sentence: 'The rabbit ran really fast.'",
                content: "The rabbit ran really fast.",
                answer: ["r", "r", "r", "r"]
            },
            {
                type: "scrambled_sequence",
                question: "What letters do you see? 'R Z T P Q'.",
                content: ["R", "Z", "T", "P", "Q"],
                answer: ["R", "Z", "T", "P", "Q"]
            },
            {
                type: "reverse_sequence",
                question: "Say the alphabet backward from 'F'.",
                startLetter: "F",
                answer: ["F", "E", "D", "C", "B", "A"]
            }
        ]
    },
    wordIdentification: {
        easy: [
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Cat",
                answer: "Cat"
            },
            {
                type: "word_pronunciation",
                question: "Can you say this word?",
                content: "Dog",
                answer: "Dog"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Sun",
                answer: "Sun"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word aloud?",
                content: "Hat",
                answer: "Hat"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Pen",
                answer: "Pen"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Bat",
                answer: "Bat"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Cup",
                answer: "Cup"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this?",
                content: "Red",
                answer: "Red"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Top",
                answer: "Top"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Bus",
                answer: "Bus"
            }
        ],
        medium: [
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Ship",
                answer: "Ship"
            },
            {
                type: "word_pronunciation",
                question: "Can you say this word?",
                content: "Tree",
                answer: "Tree"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Clock",
                answer: "Clock"
            },
            {
                type: "word_pronunciation",
                question: "Say this word aloud",
                content: "Black",
                answer: "Black"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Frog",
                answer: "Frog"
            },
            {
                type: "word_pronunciation",
                question: "Read this word",
                content: "Brush",
                answer: "Brush"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Train",
                answer: "Train"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word?",
                content: "Bread",
                answer: "Bread"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Chair",
                answer: "Chair"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Smile",
                answer: "Smile"
            }
        ],
        hard: [
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Knight",
                answer: "Knight"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word?",
                content: "Daughter",
                answer: "Daughter"
            },
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Island",
                answer: "Island"
            },
            {
                type: "word_pronunciation",
                question: "Say this word aloud",
                content: "Castle",
                answer: "Castle"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Through",
                answer: "Through"
            },
            {
                type: "word_pronunciation",
                question: "Read this word",
                content: "Whistle",
                answer: "Whistle"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Chaos",
                answer: "Chaos"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word?",
                content: "Gnome",
                answer: "Gnome"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Schedule",
                answer: "Schedule"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Wristwatch",
                answer: "Wristwatch"
            }
        ]
    },
    complexWords: {
        easy: [
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Replay",
                answer: "Replay"
            },
            {
                type: "word_pronunciation",
                question: "Can you say this word?",
                content: "Unhappy",
                answer: "Unhappy"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Careful",
                answer: "Careful"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word aloud?",
                content: "Dislike",
                answer: "Dislike"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Quickly",
                answer: "Quickly"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Preview",
                answer: "Preview"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Hopeful",
                answer: "Hopeful"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this?",
                content: "Misplace",
                answer: "Misplace"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Teacher",
                answer: "Teacher"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Rewrite",
                answer: "Rewrite"
            }
        ],
        medium: [
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Beautiful",
                answer: "Beautiful"
            },
            {
                type: "word_pronunciation",
                question: "Can you say this word?",
                content: "Unfriendly",
                answer: "Unfriendly"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Carefully",
                answer: "Carefully"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word aloud?",
                content: "Disappear",
                answer: "Disappear"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Quickness",
                answer: "Quickness"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Prehistoric",
                answer: "Prehistoric"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Hopelessness",
                answer: "Hopelessness"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this?",
                content: "Misunderstand",
                answer: "Misunderstand"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Photographer",
                answer: "Photographer"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Reconsider",
                answer: "Reconsider"
            }
        ],
        hard: [
            {
                type: "word_recognition",
                question: "What word is this?",
                content: "Antibiotic",
                answer: "Antibiotic"
            },
            {
                type: "word_pronunciation",
                question: "Can you say this word?",
                content: "Biodegradable",
                answer: "Biodegradable"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Circumnavigate",
                answer: "Circumnavigate"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this word aloud?",
                content: "Dehydration",
                answer: "Dehydration"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Extraterrestrial",
                answer: "Extraterrestrial"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Hypersensitive",
                answer: "Hypersensitive"
            },
            {
                type: "word_recognition",
                question: "What is this word?",
                content: "Intercontinental",
                answer: "Intercontinental"
            },
            {
                type: "word_pronunciation",
                question: "Can you read this?",
                content: "Microorganism",
                answer: "Microorganism"
            },
            {
                type: "word_recognition",
                question: "What does this word say?",
                content: "Photosynthesis",
                answer: "Photosynthesis"
            },
            {
                type: "word_pronunciation",
                question: "Say this word",
                content: "Thermodynamics",
                answer: "Thermodynamics"
            }
        ]
    },
    sentenceReading: {
        easy: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The cat sat on the mat.",
                answer: "The cat sat on the mat."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "I see a big red ball.",
                answer: "I see a big red ball."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "She has a new hat.",
                answer: "She has a new hat."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The sun is very hot.",
                answer: "The sun is very hot."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "We went to the park.",
                answer: "We went to the park."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "My dog likes to run.",
                answer: "My dog likes to run."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "The book is on the table.",
                answer: "The book is on the table."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "I can see three birds.",
                answer: "I can see three birds."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "He has a blue car.",
                answer: "He has a blue car."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The fish swims in the water.",
                answer: "The fish swims in the water."
            }
        ],
        medium: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "After the rain stopped, we went outside.",
                answer: "After the rain stopped, we went outside."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The children played while their parents watched.",
                answer: "The children played while their parents watched."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "Although it was cold, we decided to go hiking.",
                answer: "Although it was cold, we decided to go hiking."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The book, which was very old, had a red cover.",
                answer: "The book, which was very old, had a red cover."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "If you study hard, you will do well on the test.",
                answer: "If you study hard, you will do well on the test."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The dog barked loudly when the mailman arrived.",
                answer: "The dog barked loudly when the mailman arrived."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "Because it was late, we decided to go home.",
                answer: "Because it was late, we decided to go home."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The cake, which was chocolate, tasted delicious.",
                answer: "The cake, which was chocolate, tasted delicious."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "While I was reading, the phone rang.",
                answer: "While I was reading, the phone rang."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The flowers bloomed after the spring rain.",
                answer: "The flowers bloomed after the spring rain."
            }
        ],
        hard: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "Despite the fact that it was raining heavily, we decided to continue our hike.",
                answer: "Despite the fact that it was raining heavily, we decided to continue our hike."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The professor, who had been teaching for over thirty years, decided to retire.",
                answer: "The professor, who had been teaching for over thirty years, decided to retire."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "Although the project was challenging, the team managed to complete it on time.",
                answer: "Although the project was challenging, the team managed to complete it on time."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The museum, which houses an impressive collection of modern art, is located downtown.",
                answer: "The museum, which houses an impressive collection of modern art, is located downtown."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "If you had studied more diligently, you might have achieved better results.",
                answer: "If you had studied more diligently, you might have achieved better results."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The conference, which was attended by experts from around the world, lasted three days.",
                answer: "The conference, which was attended by experts from around the world, lasted three days."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "While the initial results were promising, further research is needed to confirm the findings.",
                answer: "While the initial results were promising, further research is needed to confirm the findings."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The novel, which explores themes of identity and belonging, has received critical acclaim.",
                answer: "The novel, which explores themes of identity and belonging, has received critical acclaim."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "Although the technology is still in its early stages, it shows great potential for future applications.",
                answer: "Although the technology is still in its early stages, it shows great potential for future applications."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The committee, which was formed to address the issue, will present its findings next week.",
                answer: "The committee, which was formed to address the issue, will present its findings next week."
            }
        ]
    },
    moreComplexSentences: {
        easy: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "When the bell rang, the students left the classroom.",
                answer: "When the bell rang, the students left the classroom."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Because it was cold, she wore a jacket.",
                answer: "Because it was cold, she wore a jacket."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "If you finish your homework, you can play outside.",
                answer: "If you finish your homework, you can play outside."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Although it was late, they continued working.",
                answer: "Although it was late, they continued working."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "While I was cooking, the phone rang.",
                answer: "While I was cooking, the phone rang."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Since it was raining, we stayed indoors.",
                answer: "Since it was raining, we stayed indoors."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "Unless you study, you won't pass the test.",
                answer: "Unless you study, you won't pass the test."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "After the movie ended, we went for ice cream.",
                answer: "After the movie ended, we went for ice cream."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "Before you leave, please turn off the lights.",
                answer: "Before you leave, please turn off the lights."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Even though it was difficult, she didn't give up.",
                answer: "Even though it was difficult, she didn't give up."
            }
        ],
        medium: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The book, which was on the table, belonged to my sister.",
                answer: "The book, which was on the table, belonged to my sister."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "If I had known about the meeting, I would have attended.",
                answer: "If I had known about the meeting, I would have attended."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "The man, who was wearing a blue hat, asked for directions.",
                answer: "The man, who was wearing a blue hat, asked for directions."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Although it was raining heavily, the game continued as planned.",
                answer: "Although it was raining heavily, the game continued as planned."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The house, which was built in 1920, needed extensive repairs.",
                answer: "The house, which was built in 1920, needed extensive repairs."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "If you had told me earlier, I could have helped.",
                answer: "If you had told me earlier, I could have helped."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "The cake, which was made by my grandmother, tasted delicious.",
                answer: "The cake, which was made by my grandmother, tasted delicious."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Even though he was tired, he stayed up to finish the project.",
                answer: "Even though he was tired, he stayed up to finish the project."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The car, which had been parked outside, was covered in snow.",
                answer: "The car, which had been parked outside, was covered in snow."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "If we had left earlier, we wouldn't have missed the train.",
                answer: "If we had left earlier, we wouldn't have missed the train."
            }
        ],
        hard: [
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The professor, who had been teaching for over thirty years, decided to retire, which surprised everyone.",
                answer: "The professor, who had been teaching for over thirty years, decided to retire, which surprised everyone."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "If I had known that the meeting was canceled, I wouldn't have rushed to get there on time.",
                answer: "If I had known that the meeting was canceled, I wouldn't have rushed to get there on time."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "The book, which was written by a famous author, became a bestseller, even though it received mixed reviews.",
                answer: "The book, which was written by a famous author, became a bestseller, even though it received mixed reviews."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "Although the project was challenging, the team managed to complete it on time, which impressed the client.",
                answer: "Although the project was challenging, the team managed to complete it on time, which impressed the client."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "The museum, which houses an impressive collection of modern art, is located downtown, and it attracts thousands of visitors every year.",
                answer: "The museum, which houses an impressive collection of modern art, is located downtown, and it attracts thousands of visitors every year."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "If you had studied more diligently, you might have achieved better results, but it's not too late to improve.",
                answer: "If you had studied more diligently, you might have achieved better results, but it's not too late to improve."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence aloud",
                content: "The conference, which was attended by experts from around the world, lasted three days, and it was considered a great success.",
                answer: "The conference, which was attended by experts from around the world, lasted three days, and it was considered a great success."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The novel, which explores themes of identity and belonging, has received critical acclaim, and it has been translated into multiple languages.",
                answer: "The novel, which explores themes of identity and belonging, has received critical acclaim, and it has been translated into multiple languages."
            },
            {
                type: "sentence_reading",
                question: "Read this sentence",
                content: "Although the technology is still in its early stages, it shows great potential for future applications, and many companies are investing in it.",
                answer: "Although the technology is still in its early stages, it shows great potential for future applications, and many companies are investing in it."
            },
            {
                type: "sentence_reading",
                question: "What does this sentence say?",
                content: "The committee, which was formed to address the issue, will present its findings next week, and it is expected to recommend significant changes.",
                answer: "The committee, which was formed to address the issue, will present its findings next week, and it is expected to recommend significant changes."
            }
        ]
    }
};
