```react
import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION FOR "画龍点睛" ---
const TEXTBOOK_PAGES = [
  {
    title: "1. 張僧繇與佛寺 (張僧繇と仏寺)",
    japanese: "【ナレーション】昔々、張僧繇（ちょうそうよう）という偉大な画家がいました。花草、動物、人像など、彼は何でも本物そっくり（維妙維肖）に描くことができました。\nある仏寺では、屋根の梁に止まる野鳥の糞に和尚さんたちがとても困っていました。張僧繇が壁に二羽の鷲（老鷹）を描くと、野鳥は怖がって寄り付かなくなりました。",
    paragraphs: [
      {
        chinese: "很久以前，有個大畫家，名叫張僧繇。不管是花草、動物還是人像，他都畫得維妙維肖。",
        zhuyin: "ㄏㄣˇ ㄐㄧㄡˇ ㄧˇ ㄑㄧㄢˊ，ㄧㄡˇ ㄍㄜ˙ ㄉㄚˋ ㄏㄨㄚˋ ㄐㄧㄚ，ㄇㄧㄥˊ ㄐㄧㄠˋ ㄓㄤ ㄙㄥ ㄧㄠˊ。ㄅㄨˋ ㄍㄨㄢˇ ㄕˋ ㄏㄨㄚ ㄘㄠˇ、ㄉㄨㄥˋ ㄨˋ ㄏㄞˊ ㄕˋ ㄖㄣˊ ㄒㄧㄤˋ，ㄊㄚ ㄉㄡ ㄏㄨㄚˋ ㄉㄜ˙ ㄨㄟˊ ㄇㄧㄠˋ ㄨㄟˊ ㄒㄧㄠˋ。"
      },
      {
        chinese: "有間佛寺常被屋梁上的野鳥留下鳥糞，和尚們很困擾。張僧繇畫了兩隻老鷹，野鳥就不敢靠近了。",
        zhuyin: "ㄧㄡˇ ㄐㄧㄢ ㄈㄛˊ ㄙˋ ㄔㄤˊ ㄅㄟˋ ㄨ ㄌㄧㄤˊ ㄕㄤˋ ㄉㄜ˙ ㄧㄝˇ ㄋㄧㄠˇ ㄌㄧㄡˊ ㄒㄧㄚˋ ㄋㄧㄠˇ ㄈㄣˋ，ㄏㄜˊ ㄕㄤˋ ㄇㄣ˙ ㄏㄣˇ ㄎㄨㄣˋ ㄖㄠˇ。ㄓㄤ ㄙㄥ ㄧㄠˊ ㄏㄨㄚˋ ㄌㄜ˙ ㄌㄧㄤˇ ㄓ ㄌㄠˇ ㄧㄥ，ㄧㄝˇ ㄋㄧㄠˇ ㄐㄧㄡˋ ㄅㄨˋ ㄍㄢˇ ㄎㄠˋ ㄐㄧㄣˋ ㄌㄜ˙。"
      }
    ],
    chinese: "很久以前，有個大畫家，名叫張僧繇。不管是花草、動物還是人像，他都畫得維妙維肖。有間佛寺常被屋梁上的野鳥留下鳥糞，和尚們很困擾。張僧繇畫了兩隻老鷹，野鳥就不敢靠近了。"
  },
  {
    title: "2. 安樂寺畫龍 (安楽寺で龍を描く)",
    japanese: "張僧繇は安楽寺で龍を描くよう招待されました。彼が壁に直接筆を走らせると、あっという間に四匹の龍が描き上がりました。\nあまりにも本物そっくり（逼真）だったため、人々は感嘆してやみませんでした。お婆さんが驚いて孫の手を引いて逃げようとしましたが、孫は言いました。「おばあちゃん、この龍には目玉がないから偽物だよ、怖がらないで。」",
    paragraphs: [
      {
        chinese: "張僧繇受邀到安樂寺畫龍。只見他直接在牆上揮動畫筆，四條龍就畫好了。因為畫得十分逼真，大家都讚嘆不已。",
        zhuyin: "ㄓㄤ ㄙㄥ ㄧㄠˊ ㄕㄡˋ ㄧㄠ ㄉㄠˋ ㄢ ㄌㄜˋ ㄙˋ ㄏㄨㄚˋ ㄌㄨㄥˊ。ㄓˇ ㄐㄧㄢˋ ㄊㄚ ㄓˊ ㄐㄧㄝ ㄗㄞˋ ㄑㄧㄤˊ ㄕㄤˋ ㄏㄨㄟ ㄉㄨㄥˋ ㄏㄨㄚˋ ㄅㄧˇ，ㄙˋ ㄊㄧㄠˊ ㄌㄨㄥˊ ㄐㄧㄡˋ ㄏㄨㄚˋ ㄏㄠˇ ㄌㄜ˙。ㄧㄣ ㄨㄟˋ ㄏㄨㄚˋ ㄉㄜ˙ ㄕˊ ㄈㄣ ㄅㄧ ㄓㄣ，ㄉㄚˋ ㄐㄧㄚ ㄉㄡ ㄗㄢˋ ㄊㄢˋ ㄅㄨˋ ㄧˇ。"
      },
      {
        chinese: "老奶奶被嚇著了，拉著孫子的手要跑，小孫子說：「奶奶，這些龍沒有眼珠子，是假的，別怕。」",
        zhuyin: "ㄌㄠˇ ㄋㄞˇ ㄋㄞ˙ ㄅㄟˋ ㄒㄧㄚˋ ㄓㄠˊ ㄌㄜ˙，ㄌㄚ ㄓㄜ˙ ㄙㄨㄣ ㄗ˙ ㄉㄜ˙ ㄕㄡˇ ㄧㄠˋ ㄆㄠˇ，ㄒㄧㄠˇ ㄙㄨㄣ ㄗ˙ ㄕㄨㄛ：「ㄋㄞˇ ㄋㄞ˙，ㄓㄜˋ ㄒㄧㄝ ㄌㄨㄥˊ ㄇㄟˊ ㄧㄡˇ ㄧㄢˇ ㄓㄨ ㄗ˙，ㄕˋ ㄐㄧㄚˇ ㄉㄜ˙，ㄅㄧㄝˊ ㄆㄚˋ。」"
      }
    ],
    chinese: "張僧繇受邀到安樂寺畫龍。只見他直接在牆上揮動畫筆，四條龍就畫好了。因為畫得十分逼真，大家都讚嘆不已。老奶奶被嚇著了，拉著孫子的手要跑，小孫子說：「奶奶，這些龍沒有眼珠子，是假的，別怕。」"
  },
  {
    title: "3. 點睛與飛走 (点睛と飛び去る)",
    japanese: "大人が「なぜ龍に目を描かないのですか？」と聞くと、張僧繇は「目玉を描き入れると、龍は飛んでいってしまうのだ」と答えました。\n突然、晴れ渡っていた空に雷と稲妻が交錯し、目玉を描き入れられた二匹の龍が力強く壁から飛び出し、空の彼方へ消えていきました。壁には、目玉のない二匹の龍だけが残されていました。",
    paragraphs: [
      {
        chinese: "大人問：「為什麼不幫龍畫眼睛？」張僧繇說：「一畫上眼珠子，龍就會飛走。」",
        zhuyin: "ㄉㄚˋ ㄖㄣˊ ㄨㄣˋ：「ㄨㄟˋ ㄕㄣˊ ㄇㄜ˙ ㄅㄨˋ ㄅㄤ ㄌㄨㄥˊ ㄏㄨㄚˋ ㄧㄢˇ ㄐㄧㄥ？」ㄓㄤ ㄙㄥ ㄧㄠˊ ㄕㄨㄛ：「ㄧˋ ㄏㄨㄚˋ ㄕㄤˋ ㄧㄢˇ ㄓㄨ ㄗ˙，ㄌㄨㄥˊ ㄐㄧㄡˋ ㄏㄨㄟˋ ㄈㄟ ㄗㄡˇ。」"
      },
      {
        chinese: "突然間，晴朗的天空雷電交加，點了眼珠子的兩條龍，奮力飛出牆壁，消失在天際。牆上只剩下兩條沒有眼珠子的龍。",
        zhuyin: "ㄊㄨˊ ㄖㄢˊ ㄐㄧㄢ，ㄑㄧㄥˊ ㄌㄤˇ ㄉㄜ˙ ㄊㄧㄢ ㄎㄨㄥ ㄌㄟˊ ㄉㄧㄢˋ ㄐㄧㄠ ㄐㄧㄚ，ㄉㄧㄢˇ ㄌㄜ˙ ㄧㄢˇ ㄓㄨ ㄗ˙ ㄉㄜ˙ ㄌㄧㄤˇ ㄊㄧㄠˊ ㄌㄨㄥˊ，ㄈㄣˋ ㄌㄧˋ ㄈㄟ ㄔㄨ ㄑㄧㄤˊ ㄅㄧˋ，ㄒㄧㄠ ㄕ ㄗㄞˋ ㄊㄧㄢ ㄐㄧˋ。ㄑㄧㄤˊ ㄕㄤˋ ㄓˇ ㄕㄥˋ ㄒㄧㄚˋ ㄌㄧㄤˇ ㄊㄧㄠˊ ㄇㄟˊ ㄧㄡˇ ㄧㄢˇ ㄓㄨ ㄗ˙ ㄉㄜ˙ ㄌㄨㄥˊ。"
      }
    ],
    chinese: "大人問：「為什麼不幫龍畫眼睛？」張僧繇說：「一畫上眼珠子，龍就會飛走。」突然間，晴朗的天空雷電交加，點了眼珠子的兩條龍，奮力飛出牆壁，消失在天際。牆上只剩下兩條沒有眼珠子的龍。"
  }
];

const VOCABULARY = [
  { char: "畫家", zhuyin: "ㄏㄨㄚˋ ㄐㄧㄚ", meaning: "画家", example: "他是個大畫家。", exMeaning: "彼は偉大な画家です。" },
  { char: "維妙維肖", zhuyin: "ㄨㄟˊ ㄇㄧㄠˋ ㄨㄟˊ ㄒㄧㄠˋ", meaning: "本物そっくりである", example: "畫得維妙維肖。", exMeaning: "本物そっくりに描かれている。" },
  { char: "屋梁", zhuyin: "ㄨ ㄌㄧㄤˊ", meaning: "屋根の梁(はり)", example: "野鳥停在屋梁上。", exMeaning: "野鳥が屋根の梁に止まる。" },
  { char: "困擾", zhuyin: "ㄎㄨㄣˋ ㄖㄠˇ", meaning: "困る、悩まされる", example: "和尚們很困擾。", exMeaning: "和尚さんたちはとても困っていました。" },
  { char: "老鷹", zhuyin: "ㄌㄠˇ ㄧㄥ", meaning: "鷲(わし)・鷹", example: "畫了兩隻老鷹。", exMeaning: "二羽の鷲を描いた。" },
  { char: "逼真", zhuyin: "ㄅㄧ ㄓㄣ", meaning: "本物に迫る、リアルだ", example: "畫得十分逼真。", exMeaning: "とてもリアルに描かれている。" },
  { char: "讚嘆", zhuyin: "ㄗㄢˋ ㄊㄢˋ", meaning: "感嘆する、ほめたたえる", example: "大家都讚嘆不已。", exMeaning: "みんな感嘆してやみませんでした。" },
  { char: "眼珠子", zhuyin: "ㄧㄢˇ ㄓㄨ ㄗ˙", meaning: "目玉", example: "龍沒有眼珠子。", exMeaning: "龍には目玉がありません。" },
  { char: "晴朗", zhuyin: "ㄑㄧㄥˊ ㄌㄤˇ", meaning: "晴れ渡っている", example: "晴朗的天空。", exMeaning: "晴れ渡った空。" },
  { char: "雷電交加", zhuyin: "ㄌㄟˊ ㄉㄧㄢˋ ㄐㄧㄠ ㄐㄧㄚ", meaning: "雷と稲妻が交錯する", example: "突然雷電交加。", exMeaning: "突然雷と稲妻が鳴り響いた。" },
  { char: "奮力", zhuyin: "ㄈㄣˋ ㄌㄧˋ", meaning: "力を振り絞る", example: "龍奮力飛出牆壁。", exMeaning: "龍は力強く壁から飛び出した。" },
  { char: "消失", zhuyin: "ㄒㄧㄠ ㄕ", meaning: "消える、消失する", example: "消失在天際。", exMeaning: "空の彼方へ消えた。" }
];

const DAILY_PLANS = [
  {
    day: 1,
    title: "第一天: 張僧繇與佛寺 🖌️",
    description: "學習第一段故事，了解張僧繇高超的畫技！",
    tasks: [
      { id: "read1", type: "read", text: "閱讀第一幕 & 大聲全文朗讀", target: 0 },
      { id: "vocab1", type: "vocab", text: "學習生字：畫家、維妙維肖、屋梁、困擾", target: [0, 1, 2, 3] },
      { id: "game1", type: "game", text: "張僧繇的魔法畫筆測驗" }
    ]
  },
  {
    day: 2,
    title: "第二天: 安樂寺畫龍 🐉",
    description: "張僧繇畫了四條龍，但為什麼不畫眼睛呢？",
    tasks: [
      { id: "read2", type: "read", text: "閱讀第二幕 & 大聲全文朗讀", target: 1 },
      { id: "vocab2", type: "vocab", text: "學習生字：老鷹、逼真、讚嘆、眼珠子", target: [4, 5, 6, 7] },
      { id: "game2", type: "game", text: "安樂寺的奇妙發現" }
    ]
  },
  {
    day: 3,
    title: "第三天: 點睛與飛走 ⚡",
    description: "加上眼睛的龍，到底發生了什麼神奇的事？",
    tasks: [
      { id: "read3", type: "read", text: "閱讀結局 & 大聲全文朗讀", target: 2 },
      { id: "vocab3", type: "vocab", text: "學習生字：晴朗、雷電交加、奮力、消失", target: [8, 9, 10, 11] },
      { id: "game3", type: "game", text: "畫龍點睛事件重組" }
    ]
  },
  {
    day: 4,
    title: "第四天: 漢字與語法特訓 📝",
    description: "綜合複習本課字詞，並練習「一... 就...」的句型！",
    tasks: [
      { id: "vocab4", type: "vocab_all", text: "單字卡總複習 (全 12 個)", target: null },
      { id: "game4", type: "game", text: "句型拼圖：「一... 就...」" },
      { id: "notebook4", type: "notebook", text: "【紙本任務】生字與注音書寫練習" }
    ]
  },
  {
    day: 5,
    title: "第五天: 四字成語大師 🏆",
    description: "故事中出現了許多四字成語，一起來把它們記熟吧！",
    tasks: [
      { id: "game5_1", type: "game", text: "成語配對：維妙維肖 vs 雷電交加" },
      { id: "game5_2", type: "game", text: "看圖選詞：天空的變化" },
      { id: "notebook5", type: "notebook", text: "【紙本任務】筆記本造句練習" }
    ]
  },
  {
    day: 6,
    title: "第六天: 畫龍點睛大會考 🎓",
    description: "挑戰最終測驗，證明你已經完全掌握了這個經典故事！",
    tasks: [
      { id: "final6", type: "game", text: "畫龍點睛 終極大會考 (7題)" },
      { id: "notebook6", type: "notebook", text: "【最終任務】給家長看筆記本並領取通關證明！" }
    ]
  }
];

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  // 30 Minutes Timer (1800 seconds)
  const [studyTime, setStudyTime] = useState(1800); 
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [tutorMessage, setTutorMessage] = useState("你好！準備好聽「畫龍點睛」的故事了嗎？請從第 1 天開始吧！");
  const [speechPitch, setSpeechPitch] = useState(1.1); 
  const [speechRate, setSpeechRate] = useState(0.85); 

  // Audio Reading AI States
  const [currentReadStep, setCurrentReadStep] = useState(0); 
  const [readProgress, setReadProgress] = useState([false, false]); 
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [matchingScore, setMatchingScore] = useState(null);
  const [speechError, setSpeechError] = useState("");
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const recognitionRef = useRef(null);
  const accumulatedSpeechRef = useRef(""); 

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [gameFeedback, setGameFeedback] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.lang = 'zh-TW'; 
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError("");
        setSpokenText("");
        setHasEvaluated(false);
        accumulatedSpeechRef.current = ""; 
      };

      rec.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        accumulatedSpeechRef.current += currentTranscript;
      };

      rec.onerror = (event) => {
        if (event.error === "no-speech") {
        } else if (event.error === "not-allowed") {
          setSpeechError("請允許麥克風權限以使用 AI 聽力評分。");
          setIsListening(false);
        } else {
          setSpeechError("語音系統暫時有小狀況。");
          setIsListening(false);
        }
      };
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, [currentReadStep, selectedTask]);

  const evaluateSpeech = async (spoken) => {
    if (!selectedTask || selectedTask.type !== 'read') return;
    const pageIdx = selectedTask.target;
    const targetText = TEXTBOOK_PAGES[pageIdx].chinese; 

    const cleanString = (str) => str.replace(/[，。、！？「」：\n\s]/g, "").trim();
    const cleanTarget = cleanString(targetText);
    const cleanSpoken = cleanString(spoken);

    let matches = 0;
    const targetChars = cleanTarget.split("");
    targetChars.forEach(char => {
      if (cleanSpoken.includes(char)) matches++;
    });

    const scorePct = Math.round((matches / Math.max(cleanTarget.length, 1)) * 100);
    const finalScore = scorePct > 100 ? 100 : scorePct;
    
    setSpokenText(spoken);
    setMatchingScore(finalScore);
    setHasEvaluated(true);

    if (finalScore >= 35) {
      handleCorrect();
      setReadProgress(prev => {
        const next = [...prev];
        next[currentReadStep] = true;
        return next;
      });
      updateTutor("太棒了！你的全文朗讀挑戰成功！相似度：" + finalScore + "%", "素晴らしい！");
    } else {
      handleWrong();
      updateTutor("AI 評分：" + finalScore + "%。可以再大聲、清晰地多讀一次喔！", "もう少し大聲で！");
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setSpokenText(""); setMatchingScore(null); setHasEvaluated(false);
        recognitionRef.current.start();
      } catch (e) {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    } else {
      setSpeechError("您的瀏覽器不支援 Speech API，請使用「手動驗證」。");
    }
  };

  const stopListeningAndEvaluate = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setTimeout(() => { evaluateSpeech(accumulatedSpeechRef.current || ""); }, 500);
    }
  };

  const simulateCorrectReading = () => {
    if (!selectedTask) return;
    const pageIdx = selectedTask.target;
    setSpokenText(TEXTBOOK_PAGES[pageIdx].chinese);
    setMatchingScore(100); setHasEvaluated(true); handleCorrect();
    setReadProgress(prev => { const next = [...prev]; next[currentReadStep] = true; return next; });
    updateTutor("太棒了！你順利完成了第 " + (currentReadStep + 1) + " 次全文音讀挑戰！", "よくできました！");
  };

  const playBeep = (freq, duration, type = "sine") => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type; oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      oscillator.connect(gainNode); gainNode.connect(audioCtx.destination);
      oscillator.start(); oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) { }
  };

  const handleCorrect = () => { playBeep(600, 0.2, "triangle"); setTimeout(() => playBeep(800, 0.3, "triangle"), 150); };
  const handleWrong = () => { playBeep(250, 0.4, "sawtooth"); };

  useEffect(() => {
    let interval = null;
    if (timerActive && studyTime > 0) {
      interval = setInterval(() => setStudyTime((prev) => prev - 1), 1000);
    } else if (studyTime === 0) {
      setTimerActive(false); setTutorMessage("太棒了！今天 30 分鐘的學習時間結束囉！"); playBeep(880, 0.8, "sine");
    }
    return () => clearInterval(interval);
  }, [timerActive, studyTime]);

  const speakText = (text, lang = "zh-TW") => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang; utterance.pitch = speechPitch; utterance.rate = speechRate;
      const voices = window.speechSynthesis.getVoices();
      if (lang.startsWith("zh")) {
        const twVoice = voices.find(v => v.lang.includes("ZH-TW") || v.lang.includes("zh-TW"));
        if (twVoice) utterance.voice = twVoice;
      } else if (lang.startsWith("ja")) {
        const jaVoice = voices.find(v => v.lang.includes("JA") || v.lang.includes("ja-JP"));
        if (jaVoice) utterance.voice = jaVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60); const remainingSecs = secs % 60;
    return mins.toString().padStart(2, '0') + ":" + remainingSecs.toString().padStart(2, '0');
  };

  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => {
      const newState = { ...prev, [taskId]: !prev[taskId] };
      const completedCount = Object.keys(newState).filter(k => newState[k]).length;
      setScore(completedCount * 15); return newState;
    });
    playBeep(523.25, 0.15); 
  };

  const updateTutor = (zhMsg, jaMsg = "") => {
    setTutorMessage(zhMsg + (jaMsg ? " (" + jaMsg + ")" : "")); speakText(zhMsg, "zh-TW");
  };

  // --- RENDERING VIEWS ---
  const renderReadTask = (page, taskId) => {
    const allReadCompleted = readProgress.every(v => v === true);
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold text-emerald-800">{page.title}</h3>
          <button onClick={() => { toggleTaskCompletion(taskId); if (!allReadCompleted) setReadProgress([true, true]); }}
            className={"px-4 py-2 rounded-full text-xs font-bold transition-all " + (completedTasks[taskId] ? "bg-emerald-500 text-white shadow" : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200")}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>
        <div className="space-y-6">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/50 space-y-1">
              <p className="text-lg font-bold text-slate-800 tracking-wide leading-relaxed">{para.chinese}</p>
              <p className="text-xs font-semibold text-teal-700 tracking-wider leading-relaxed bg-teal-50/50 p-1.5 rounded border border-teal-100/30 font-mono">注音: {para.zhuyin}</p>
            </div>
          ))}
          <div className="mt-4"><button onClick={() => speakText(page.chinese, "zh-TW")} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold shadow-sm">🔊 聽課文全文朗讀</button></div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border-2 border-emerald-200 space-y-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🎤</span>
            <div><h4 className="font-bold text-emerald-800 text-sm">AI 語音音讀挑戰：大聲跟讀全文 2 次</h4><p className="text-xs text-slate-600">讀完後點選「結束並評分」。</p></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <button key={idx} onClick={() => { setCurrentReadStep(idx); setSpokenText(""); setMatchingScore(null); setSpeechError(""); setHasEvaluated(false); }}
                className={"py-2 px-3 rounded-xl text-xs font-bold transition-all " + (currentReadStep === idx ? "bg-emerald-500 text-white" : "bg-white text-slate-600 border") + " flex justify-center gap-1.5"}
              ><span>第 {idx + 1} 次朗讀</span>{readProgress[idx] ? <span className="text-emerald-500">✅</span> : <span>○</span>}</button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {!isListening ? (<button onClick={startListening} className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 font-bold text-sm text-white rounded-xl shadow-md">🎤 開始朗讀</button>) : (<button onClick={stopListeningAndEvaluate} className="flex-1 py-3 bg-red-500 hover:bg-red-600 font-bold text-sm text-white rounded-xl shadow-md animate-pulse">🛑 結束並評分</button>)}
            <button onClick={simulateCorrectReading} className="py-3 px-4 rounded-xl bg-slate-200 text-slate-700 font-semibold text-xs">👌 手動驗證</button>
          </div>
          {hasEvaluated && (spokenText || matchingScore !== null || speechError) && (
            <div className="bg-white p-4 rounded-xl border text-sm">
              {speechError ? (<p className="text-red-500">{speechError}</p>) : (<>
                {spokenText && (<div className="text-slate-700 font-medium">🎧 辨識結果： <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded block">{spokenText}</span></div>)}
                {matchingScore !== null && (<div className="flex items-center gap-2 pt-2"><span className="font-semibold">🎯 相似度：</span><span className={"text-lg font-bold " + (matchingScore >= 35 ? "text-emerald-600" : "text-red-500")}>{matchingScore}%</span></div>)}
              </>)}
            </div>
          )}
        </div>
        <div className="bg-slate-50 p-4 rounded-xl relative border"><span className="absolute top-2 right-2 text-xs bg-slate-200 px-2 py-1 rounded">日本語訳</span><p className="text-sm text-slate-600 pt-2 whitespace-pre-line">{page.japanese}</p></div>
      </div>
    );
  };

  const renderInteractiveGame = () => {
    // Day 1: Magic Brush
    if (selectedTask.id === 'game1') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 張僧繇的魔法畫筆測驗</h3>
          <p className="text-sm text-slate-600">和尚們為了解決屋梁上的鳥糞問題，請張僧繇幫忙。他畫了什麼？</p>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q: 為了趕走野鳥，張僧繇在佛寺畫了什麼？</p>
              <div className="flex flex-col gap-2">
                <button onClick={()=>{ handleCorrect(); setQuizAnswers(p=>({...p, q1:true})); toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 答對了！畫了老鷹之後，野鳥就不敢靠近了！"); }} className={"px-4 py-3 border rounded-xl font-bold text-left " + (quizAnswers.q1 ? "bg-emerald-500 text-white" : "bg-white hover:bg-emerald-50")}>1. 兩隻老鷹</button>
                <button onClick={()=>handleWrong()} className="px-4 py-3 bg-white border rounded-xl hover:bg-slate-100 font-bold text-left">2. 幾隻小貓</button>
                <button onClick={()=>handleWrong()} className="px-4 py-3 bg-white border rounded-xl hover:bg-slate-100 font-bold text-left">3. 一個稻草人</button>
              </div>
            </div>
          </div>
          {gameFeedback && <div className="p-3 text-center bg-emerald-100 text-emerald-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 2: Missing Eyes
    if (selectedTask.id === 'game2') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 安樂寺的奇妙發現</h3>
          <p className="text-sm text-slate-600">大家看到牆上的四條龍都覺得很「逼真」，但小孫子卻說不用怕，為什麼呢？</p>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <button onClick={()=>{ handleWrong(); }} className="p-4 bg-white border-2 rounded-xl font-bold hover:border-emerald-400">因為龍是被關在籠子裡的</button>
            <button onClick={()=>{ handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 沒錯！小孫子發現龍沒有眼珠子。"); }} className="p-4 bg-white border-2 rounded-xl font-bold hover:border-emerald-400">因為這些龍沒有畫上「眼珠子」</button>
            <button onClick={()=>{ handleWrong(); }} className="p-4 bg-white border-2 rounded-xl font-bold hover:border-emerald-400">因為龍在睡覺</button>
          </div>
          {gameFeedback && <div className="p-3 mt-4 text-center bg-emerald-100 text-emerald-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 3: Dotting the eyes
    if (selectedTask.id === 'game3') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 畫龍點睛事件重組</h3>
          <p className="text-sm text-slate-600">請依照故事發生的順序，點選正確的結果！</p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">當張僧繇幫兩條龍「點上眼珠子」後，發生了什麼事？</p>
              <div className="flex flex-col gap-2">
                <button onClick={()=>{ handleCorrect(); setQuizAnswers(p=>({...p, step1:true})); toggleTaskCompletion(selectedTask.id); }} className={"px-4 py-3 border rounded-lg font-bold " + (quizAnswers.step1 ? "bg-emerald-500 text-white" : "bg-white")}>天空雷電交加，兩條龍奮力飛出牆壁消失了！</button>
                <button onClick={()=>handleWrong()} className="px-4 py-3 bg-white border rounded-lg hover:bg-amber-100 font-bold">這兩條龍從牆上走下來，變成他的寵物。</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Day 4: Grammar
    if (selectedTask.id === 'game4') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 句型拼圖：「一... 就...」</h3>
          <div className="bg-emerald-50 p-4 rounded-xl text-center border"><p className="text-lg font-bold text-emerald-900">一畫上眼珠子，龍就會飛走。</p></div>
          <div className="p-4 bg-slate-50 rounded-xl flex flex-wrap gap-2 justify-center">
            {["一", "畫上", "眼珠子，", "龍", "就會", "飛走。"].map((phrase, idx) => (
              <button key={idx} onClick={()=>{ handleCorrect(); speakText(phrase); if(idx===5) toggleTaskCompletion(selectedTask.id); }} className="px-4 py-2 bg-white font-bold rounded-lg border hover:bg-emerald-100">{phrase}</button>
            ))}
          </div>
        </div>
      );
    }

    // Day 5_1: Idioms
    if (selectedTask.id === 'game5_1') {
      const actions = [
        { act: "維妙維肖", meaning: "畫得非常逼真，像真的一樣", match: 0 },
        { act: "雷電交加", meaning: "打雷又閃電，天氣劇烈變化", match: 1 }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-4">
          <h3 className="text-lg font-bold text-emerald-800">🎮 成語配對</h3>
          <p className="text-sm text-slate-600 mb-4">請將四字成語與正確的意思配對起來！</p>
          <div className="space-y-4">
            {actions.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="font-bold text-emerald-700 text-lg">{item.act}</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {actions.map((ans, aIdx) => (
                    <button key={aIdx} onClick={()=>{
                      if(aIdx === item.match) { handleCorrect(); setQuizAnswers(p=>({...p, [idx]:true})); if(Object.keys({...quizAnswers, [idx]:true}).length===2) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                    }} className={"px-3 py-1.5 rounded-lg text-sm font-bold border " + (quizAnswers[idx] && aIdx===item.match ? "bg-emerald-500 text-white" : "bg-white")}>{ans.meaning}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Day 5_2: Story fill
    if (selectedTask.id === 'game5_2') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-4">
          <h3 className="text-lg font-bold text-emerald-800">🎮 看圖選詞：天空的變化</h3>
          <p className="text-sm">原本(晴朗)的天空，在張僧繇畫上眼睛後，突然變得(雷電交加)。</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={()=>{ handleCorrect(); toggleTaskCompletion(selectedTask.id); }} className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-md">了解了！(確認)</button>
          </div>
        </div>
      );
    }

    // Day 6: Final Exam (7 questions)
    if (selectedTask.id === 'final6') {
      const examQuestions = [
        { q: "張僧繇是做什麼的？", options: ["大廚師", "大畫家", "大和尚"], ans: 1 },
        { q: "張僧繇畫出來的東西，大家常常用什麼四字詞語形容？", options: ["維妙維肖", "不知不覺", "目瞪口呆"], ans: 0 },
        { q: "為了解決屋梁上的鳥糞，他在佛寺畫了什麼？", options: ["兩隻貓", "兩隻老虎", "兩隻老鷹"], ans: 2 },
        { q: "張僧繇在安樂寺畫了幾條龍？", options: ["兩條", "四條", "六條"], ans: 1 },
        { q: "小孫子為什麼覺得牆上的龍不可怕？", options: ["因為龍在睡覺", "因為龍沒有眼珠子", "因為龍很小"], ans: 1 },
        { q: "「一畫上眼珠子，龍就會飛走。」這裡的『一...就...』表示？", options: ["動作接連發生", "一個人和一條龍", "只有一隻眼睛"], ans: 0 },
        { q: "最後，點了眼珠子的龍發生了什麼事？", options: ["變成畫像掉下來", "奮力飛出牆壁消失了", "跑到水裡游走"], ans: 1 }
      ];

      const curQ = examQuestions[quizStep] || null;

      if (!curQ) {
        return (
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 text-center border-2 border-emerald-300">
            <span className="text-5xl">🏆 🐉</span>
            <h3 className="text-2xl font-bold text-emerald-900 mt-4">恭喜你成為傳說大師！</h3>
            <p className="text-slate-800 font-medium mt-2">完美通過「畫龍點睛」全數考驗！</p>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="mt-6 px-6 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700">領取通關證明</button>
          </div>
        );
      }

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <div className="flex justify-between items-center border-b pb-2"><span className="text-sm font-bold text-emerald-800">{"🎓 畫龍點睛大會考 (" + (quizStep + 1) + " / 7)"}</span></div>
          <p className="text-base font-bold text-slate-800">{curQ.q}</p>
          <div className="space-y-3">
            {curQ.options.map((opt, i) => (
              <button key={i} onClick={() => {
                  if (i === curQ.ans) {
                    handleCorrect(); setGameFeedback("⭕ 答對了！"); setTimeout(() => { setQuizStep(p => p + 1); setGameFeedback(""); }, 800);
                  } else { handleWrong(); setGameFeedback("❌ 答錯囉，再仔細想想！"); }
                }} className="w-full text-left p-4 rounded-xl border hover:border-emerald-500 hover:bg-emerald-50 font-semibold text-slate-700">{opt}</button>
            ))}
          </div>
          {gameFeedback && <div className="p-3 text-center rounded-xl bg-emerald-100 text-emerald-900 font-bold">{gameFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const renderNotebookTask = () => {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-teal-300 text-center space-y-6 animate-fade-in">
        <span className="text-5xl">📓</span>
        <h3 className="text-2xl font-bold text-teal-900">{selectedTask.text}</h3>
        <p className="text-slate-600">這是一個實體任務！請拿出你的筆記本，按照指示手寫完成這項練習。<br/>寫完之後，請家長確認，然後按下方的完成按鈕！</p>
        {!completedTasks[selectedTask.id] ? (
          <button onClick={() => { toggleTaskCompletion(selectedTask.id); updateTutor("太棒了！紙本作業也順利完成了！"); }}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full shadow-lg text-lg"
          >✅ 我已經寫完筆記本了！ (完了ボタン)</button>
        ) : (<div className="p-4 bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200">🎉 筆記本任務已確認完成！請家長在上面簽名或蓋章喔！</div>)}
      </div>
    );
  };

  const renderTaskContent = () => {
    if (!selectedTask) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-4">
          <span className="text-6xl">🐉</span>
          <p className="text-lg font-bold">請從左側選擇今天的學習任務！</p>
          <p className="text-sm">※ 右下の「開始計時」ボタンを押して、1日30分の学習をスタートしましょう！</p>
        </div>
      );
    }

    if (selectedTask.type === 'read') return renderReadTask(TEXTBOOK_PAGES[selectedTask.target], selectedTask.id);
    if (selectedTask.type === 'game' || selectedTask.type === 'grammar') return renderInteractiveGame();
    if (selectedTask.type === 'notebook') return renderNotebookTask();

    if (selectedTask.type === "vocab" || selectedTask.type === "vocab_all") {
      const targetIndices = selectedTask.type === "vocab_all" ? [0,1,2,3,4,5,6,7,8,9,10,11] : selectedTask.target;
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-bold text-emerald-800">✨ 今日生字詞卡</h3>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className={"px-4 py-2 rounded-full text-xs font-bold " + (completedTasks[selectedTask.id] ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-800")}>
              {completedTasks[selectedTask.id] ? "✅ 詞彙全部記住囉" : "🎴 記住後請點選！"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetIndices.map((idx) => {
              const item = VOCABULARY[idx];
              return (
                <div key={idx} onClick={() => { setSelectedCard(idx); speakText(item.char, "zh-TW"); }}
                  className={"p-4 rounded-xl border-2 cursor-pointer hover:-translate-y-1 " + (selectedCard === idx ? "border-emerald-500 bg-emerald-50" : "border-slate-100 bg-white")}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-slate-800">{item.char}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">{"注音: " + item.zhuyin}</span>
                  </div>
                  <p className="text-sm text-teal-700 font-bold mt-2 border-t pt-2 border-dashed">{item.meaning}</p>
                  <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded"><p className="italic">{'"' + item.example + '"'}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-80 bg-white border-r p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-emerald-900">課文：畫龍點睛</h1>
          <p className="text-sm text-emerald-600 font-semibold mt-1">六日學習導航系統</p>
        </div>
        <div className="space-y-4">
          {DAILY_PLANS.map((dayPlan) => (
            <button key={dayPlan.day} onClick={() => { setCurrentDay(dayPlan.day); setSelectedTask(null); }}
              className={"w-full text-left p-4 rounded-xl font-bold transition " + (currentDay === dayPlan.day ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-50 text-slate-700 hover:bg-emerald-50")}
            >
              <div className="text-sm mb-1">{dayPlan.title}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* AI Tutor Message Area */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl p-4 text-white shadow-sm flex items-center gap-4">
            <div className="text-3xl bg-white/20 p-2 rounded-full shadow-inner">👨‍🏫</div>
            <div className="flex-1"><p className="text-xs font-bold text-emerald-100">AI 老師</p><p className="text-sm font-bold mt-1 leading-relaxed">{tutorMessage}</p></div>
          </div>

          {/* Day Header */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">{DAILY_PLANS[currentDay - 1].title}</h2>
            <p className="text-slate-600 mt-2">{DAILY_PLANS[currentDay - 1].description}</p>
          </div>

          {/* Task Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DAILY_PLANS[currentDay - 1].tasks.map((task) => (
              <button key={task.id} onClick={() => setSelectedTask(task)}
                className={"p-4 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition " + (completedTasks[task.id] ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-white hover:border-emerald-400")}
              >
                <span className="text-2xl">{task.type === 'read' ? '📖' : task.type === 'game' ? '🎮' : task.type === 'notebook' ? '📓' : '🎴'}</span>
                {task.text.split(' ')[0]} {completedTasks[task.id] && '✅'}
              </button>
            ))}
          </div>

          {/* Task Content */}
          <div className="pt-4 pb-20">{renderTaskContent()}</div>
        </div>
      </main>

      {/* Footer Info (Fixed Bottom) - 30 Minutes Timer */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <div className="bg-emerald-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-4">
          <span>總分：{score} / 100</span>
          <button onClick={() => setTimerActive(!timerActive)} className={"text-xs px-3 py-1 rounded-full transition " + (timerActive ? "bg-amber-500" : "bg-emerald-500")}>
            {timerActive ? "⏳ " + formatTime(studyTime) : "⏱️ 開始計時 (30分)"}
          </button>
        </div>
      </div>
    </div>
  );
}


```
