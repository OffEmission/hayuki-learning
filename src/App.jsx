import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION FOR LESSON 11 ---
const TEXTBOOK_PAGES = [
  {
    title: "1. 張僧繇與佛寺 (張僧繇と仏寺)",
    japanese: "昔々、張僧繇（ちょうそうよう）という偉大な画家がいました。花草、動物、人像など、彼は何でも本物そっくり（維妙維肖）に描くことができました。\nある仏寺では、屋根の梁に止まる野鳥のフンに和尚さんたちがとても困っていました。張僧繇が壁に二羽の鷲（老鷹）を描くと、野鳥は驚いて寄り付かなくなりました。",
    paragraphs: [
      {
        chinese: "很久以前，有個大畫家，名叫張僧繇。不管是花草、動物還是人像，他都畫得維妙維肖。",
        zhuyin: "ㄏㄣˇ ㄐㄧㄡˇ ㄧˇ ㄑㄧㄢˊ，ㄧㄡˇ ㄍㄜ˙ ㄉㄚˋ ㄏㄨㄚˋ ㄐㄧㄚ，ㄇㄧㄥˊ ㄐㄧㄠˋ ㄓㄤ ㄙㄥ ㄧㄠˊ。ㄅㄨˋ ㄍㄨㄢˇ ㄕˋ ㄏㄨㄚ ㄘㄠˇ、ㄉㄨㄥˋ ㄨˋ ㄏㄞˊ ㄕˋ ㄖㄣˊ ㄒㄧㄤˋ，ㄊㄚ ㄉㄡ ㄏㄨㄚˋ ㄉㄜ˙ ㄨㄟˊ ㄇㄧㄠˋ ㄨㄟˊ ㄒㄧㄠˋ。"
      },
      {
        chinese: "有間佛寺常常被屋梁上的野鳥留下鳥糞，和尚們都覺得很困擾。張僧繇在牆上畫了兩隻老鷹後，野鳥竟然嚇得不敢靠近。",
        zhuyin: "ㄧㄡˇ ㄐㄧㄢ ㄈㄛˊ ㄙˋ ㄔㄤˊ ㄔㄤˊ ㄅㄟˋ ㄨ ㄌㄧㄤˊ ㄕㄤˋ ㄉㄜ˙ ㄧㄝˇ ㄋㄧㄠˇ ㄌㄧㄡˊ ㄒㄧㄚˋ ㄋㄧㄠˇ ㄈㄣˋ，ㄏㄜˊ ㄕㄤˋ ㄇㄣ˙ ㄉㄡ ㄐㄩㄝˊ ㄉㄜ˙ ㄏㄣˇ ㄎㄨㄣˋ ㄖㄠˇ。ㄓㄤ ㄙㄥ ㄧㄠˊ ㄗㄞˋ ㄑㄧㄤˊ ㄕㄤˋ ㄏㄨㄚˋ ㄌㄜ˙ ㄌㄧㄤˇ ㄓ ㄌㄠˇ ㄧㄥ ㄏㄡˋ，ㄧㄝˇ ㄋㄧㄠˇ ㄐㄧㄥˋ ㄖㄢˊ ㄒㄧㄚˋ ㄉㄜ˙ ㄅㄨˋ ㄍㄢˇ ㄎㄠˋ ㄐㄧㄣˋ。"
      }
    ]
  },
  {
    title: "2. 安樂寺畫龍 (安楽寺で龍を描く)",
    japanese: "ある時、張僧繇は安楽寺に招かれて龍を描くことになり、多くの人が彼の手腕を見ようと集まりました。彼が壁に直接筆を振るうと、あっという間に四匹の龍が描き上がりました。あまりにも本物に迫る（逼真）出来栄えに、誰もが感嘆してやみませんでした。\n壁の前に立っていたお婆さんは、描かれた龍に驚き、孫の手を引いて逃げようとしました。しかし小さな孫は龍を指さして言いました。「おばあちゃん、この龍には目玉がないから偽物だよ、怖がらないで。」",
    paragraphs: [
      {
        chinese: "有一次，張僧繇受邀到安樂寺畫龍，吸引許多人來參觀，大家都想見識他的本事。只見他直接在牆上揮動畫筆，沒多久，四條龍就畫好了。因為畫得十分逼真，大家都讚嘆不已。",
        zhuyin: "ㄧㄡˇ ㄧˊ ㄘˋ，ㄓㄤ ㄙㄥ ㄧㄠˊ ㄕㄡˋ ㄧㄠ ㄉㄠˋ ㄢ ㄌㄜˋ ㄙˋ ㄏㄨㄚˋ ㄌㄨㄥˊ，ㄒㄧ ㄧㄣˇ ㄒㄩˇ ㄉㄨㄛ ㄖㄣˊ ㄌㄞˊ ㄘㄢ ㄍㄨㄢ，ㄉㄚˋ ㄐㄧㄚ ㄉㄡ ㄒㄧㄤˇ ㄐㄧㄢˋ ㄕˋ ㄊㄚ ㄉㄜ˙ ㄅㄣˇ ㄕˋ。ㄓˇ ㄐㄧㄢˋ ㄊㄚ ㄓˊ ㄐㄧㄝ ㄗㄞˋ ㄑㄧㄤˊ ㄕㄤˋ ㄏㄨㄟ ㄉㄨㄥˋ ㄏㄨㄚˋ ㄅㄧˇ，ㄇㄟˊ ㄉㄨㄛ ㄐㄧㄡˇ，ㄙˋ ㄊㄧㄠˊ ㄌㄨㄥˊ ㄐㄧㄡˋ ㄏㄨㄚˋ ㄏㄠˇ ㄌㄜ˙。ㄧㄣ ㄨㄟˋ ㄏㄨㄚˋ ㄉㄜ˙ ㄕˊ ㄈㄣ ㄅㄧ ㄓㄣ，ㄉㄚˋ ㄐㄧㄚ ㄉㄡ ㄗㄢˋ ㄊㄢˋ ㄅㄨˋ ㄧˇ。"
      },
      {
        chinese: "站在牆前的老奶奶，被他畫的龍嚇著了，拉著孫子的手就要跑。小孫子指著龍說：「奶奶，這些龍都沒有眼珠子，是假的，別怕。」",
        zhuyin: "ㄓㄢˋ ㄗㄞˋ ㄑㄧㄤˊ ㄑㄧㄢˊ ㄉㄜ˙ ㄌㄠˇ ㄋㄞˇ ㄋㄞ˙，ㄅㄟˋ ㄊㄚ ㄏㄨㄚˋ ㄉㄜ˙ ㄌㄨㄥˊ ㄒㄧㄚˋ ㄓㄠˊ ㄌㄜ˙，ㄌㄚ ㄓㄜ˙ ㄙㄨㄣ ㄗ˙ ㄉㄜ˙ ㄕㄡˇ ㄐㄧㄡˋ ㄧㄠˋ ㄆㄠˇ。ㄒㄧㄠˇ ㄙㄨㄣ ㄗ˙ ㄓˇ ㄓㄜ˙ ㄌㄨㄥˊ ㄕㄨㄛ：「ㄋㄞˇ ㄋㄞ˙，ㄓㄜˋ ㄒㄧㄝ ㄌㄨㄥˊ ㄉㄡ ㄇㄟˊ ㄧㄡˇ ㄧㄢˇ ㄓㄨ ㄗ˙，ㄕˋ ㄐㄧㄚˇ ㄉㄜ˙，ㄅㄧㄝˊ ㄆㄚˋ。」"
      }
    ]
  },
  {
    title: "3. 點睛與飛走 (点睛と飛び去る)",
    japanese: "子供の言葉を聞いて、大人たちは画家に尋ねました。「なぜ龍に目を描かないのですか？」張僧繇は言いました。「いったん（一旦）目玉を描き入れると、龍は飛んで行ってしまうのだ。」\n突然、晴れ渡っていた空に真っ暗な雲が立ち込め（烏雲密布）、雷と稲妻が交錯し（雷電交加）、目玉を描き入れられた二匹の龍が力強く壁から飛び出して空へ昇り、あっという間に跡形もなく（無影無蹤）消え去りました。見物人たちは呆然とし、壁には目玉のない二匹の龍だけが残されていました。",
    paragraphs: [
      {
        chinese: "聽到孩子這麼說，幾個大人追著畫家問：「為什麼不幫龍畫眼睛？」張僧繇說：「一旦畫上眼珠子，龍就會飛走。」",
        zhuyin: "ㄊㄧㄥ ㄉㄠˋ ㄏㄞˊ ㄗ˙ ㄓㄜˋ ㄇㄜ˙ ㄕㄨㄛ，ㄐㄧˇ ㄍㄜ˙ ㄉㄚˋ ㄖㄣˊ ㄓㄨㄟ ㄓㄜ˙ ㄏㄨㄚˋ ㄐㄧㄚ ㄨㄣˋ：「ㄨㄟˋ ㄕㄣˊ ㄇㄜ˙ ㄅㄨˋ ㄅㄤ ㄌㄨㄥˊ ㄏㄨㄚˋ ㄧㄢˇ ㄐㄧㄥ？」ㄓㄤ ㄙㄥ ㄧㄠˊ ㄕㄨㄛ：「ㄧˊ ㄉㄢˋ ㄏㄨㄚˋ ㄕㄤˋ ㄧㄢˇ ㄓㄨ ㄗ˙，ㄌㄨㄥˊ ㄐㄧㄡˋ ㄏㄨㄟˋ ㄈㄟ ㄗㄡˇ。」"
      },
      {
        chinese: "突然間，原本晴朗的天空竟然烏雲密布、雷電交加，那兩條點了眼珠子的龍，奮力飛出牆壁，直上天際，一下子就消失得無影無蹤。圍觀的人們目瞪口呆，牆面上只剩下兩條沒有畫眼珠子的龍。",
        zhuyin: "ㄊㄨˊ ㄖㄢˊ ㄐㄧㄢ，ㄩㄢˊ ㄅㄣˇ ㄑㄧㄥˊ ㄌㄤˇ ㄉㄜ˙ ㄊㄧㄢ ㄎㄨㄥ ㄐㄧㄥˋ ㄖㄢˊ ㄨ ㄩㄣˊ ㄇㄧˋ ㄅㄨˋ、ㄌㄟˊ ㄉㄧㄢˋ ㄐㄧㄠ ㄐㄧㄚ，ㄋㄚˋ ㄌㄧㄤˇ ㄊㄧㄠˊ ㄉㄧㄢˇ ㄌㄜ˙ ㄧㄢˇ ㄓㄨ ㄗ˙ ㄉㄜ˙ ㄌㄨㄥˊ，ㄈㄣˋ ㄌㄧˋ ㄈㄟ ㄔㄨ ㄑㄧㄤˊ ㄅㄧˋ，ㄓˊ ㄕㄤˋ ㄊㄧㄢ ㄐㄧˋ，ㄧˊ ㄒㄧㄚˋ ㄗ˙ ㄐㄧㄡˋ ㄒㄧㄠ ㄕ ㄉㄜ˙ ㄨˊ ㄧㄥˇ ㄨˊ ㄗㄨㄥ。ㄨㄟˊ ㄍㄨㄢ ㄉㄜ˙ ㄖㄣˊ ㄇㄣ˙ ㄇㄨˋ ㄉㄥˋ ㄎㄡˇ ㄉㄞ，ㄑㄧㄤˊ ㄇㄧㄢˋ ㄕㄤˋ ㄓˇ ㄕㄥˋ ㄒㄧㄚˋ ㄌㄧㄤˇ ㄊㄧㄠˊ ㄇㄟˊ ㄧㄡˇ ㄏㄨㄚˋ ㄧㄢˇ ㄓㄨ ㄗ˙ ㄉㄜ˙ ㄌㄨㄥˊ。"
      }
    ]
  }
];

const VOCABULARY = [
  { char: "維妙維肖", zhuyin: "ㄨㄟˊ ㄇㄧㄠˋ ㄨㄟˊ ㄒㄧㄠˋ", meaning: "本物そっくりである", example: "他畫得維妙維肖。", exMeaning: "彼は本物そっくりに描いた。" },
  { char: "困擾", zhuyin: "ㄎㄨㄣˋ ㄖㄠˇ", meaning: "困る、悩まされる", example: "和尚們覺得很困擾。", exMeaning: "和尚さんたちはとても困っていた。" },
  { char: "邀請", zhuyin: "ㄧㄠ ㄑㄧㄥˇ", meaning: "招待する", example: "張僧繇受邀到佛寺。", exMeaning: "張僧繇は仏寺に招待された。" },
  { char: "逼真", zhuyin: "ㄅㄧ ㄓㄣ", meaning: "本物に迫る、リアルだ", example: "畫得十分逼真。", exMeaning: "とてもリアルに描かれている。" },
  { char: "讚嘆", zhuyin: "ㄗㄢˋ ㄊㄢˋ", meaning: "感嘆する、ほめたたえる", example: "大家都讚嘆不已。", exMeaning: "みんな感嘆してやみませんでした。" },
  { char: "烏雲密布", zhuyin: "ㄨ ㄩㄣˊ ㄇㄧˋ ㄅㄨˋ", meaning: "暗雲が立ち込める", example: "天空竟然烏雲密布。", exMeaning: "空に暗雲が立ち込めた。" },
  { char: "雷電交加", zhuyin: "ㄌㄟˊ ㄉㄧㄢˋ ㄐㄧㄠ ㄐㄧㄚ", meaning: "雷と稲妻が交錯する", example: "突然雷電交加。", exMeaning: "突然雷と稲妻が鳴り響いた。" },
  { char: "一旦", zhuyin: "ㄧˊ ㄉㄢˋ", meaning: "いったん〜すれば", example: "一旦畫上眼珠子，龍就會飛走。", exMeaning: "いったん目を描けば、龍は飛んでいく。" },
  { char: "消失", zhuyin: "ㄒㄧㄠ ㄕ", meaning: "消える", example: "一下子就消失了。", exMeaning: "あっという間に消えた。" },
  { char: "無影無蹤", zhuyin: "ㄨˊ ㄧㄥˇ ㄨˊ ㄗㄨㄥ", meaning: "跡形もなく消え去る", example: "消失得無影無蹤。", exMeaning: "跡形もなく消え去った。" },
  { char: "目瞪口呆", zhuyin: "ㄇㄨˋ ㄉㄥˋ ㄎㄡˇ ㄉㄞ", meaning: "呆然とする", example: "人們嚇得目瞪口呆。", exMeaning: "人々は驚いて呆然とした。" },
  { char: "晴朗", zhuyin: "ㄑㄧㄥˊ ㄌㄤˇ", meaning: "晴れ渡っている", example: "原本晴朗的天空。", exMeaning: "もともと晴れ渡っていた空。" }
];

const DAILY_PLANS = [
  {
    day: 1,
    title: "第一天: 張僧繇與佛寺 🖌️",
    description: "學習傳說畫家張僧繇的故事，看看他怎麼幫和尚解決問題！",
    tasks: [
      { id: "read1", type: "read", text: "閱讀故事第一段 & 大聲全文朗讀", target: 0 },
      { id: "vocab1", type: "vocab", text: "學習生字：維妙維肖、困擾...", target: [0, 1, 2, 3] },
      { id: "game1", type: "game", text: "和尚們的煩惱測驗" }
    ]
  },
  {
    day: 2,
    title: "第二天: 安樂寺畫龍 🐉",
    description: "張僧繇畫了四條龍，大家看了有什麼反應呢？",
    tasks: [
      { id: "read2", type: "read", text: "閱讀故事第二段 & 大聲全文朗讀", target: 1 },
      { id: "vocab2", type: "vocab", text: "學習生字：逼真、讚嘆、目瞪口呆...", target: [4, 10, 11] },
      { id: "game2", type: "game", text: "安樂寺的奇妙發現" }
    ]
  },
  {
    day: 3,
    title: "第三天: 點睛與飛走 ⚡",
    description: "加上眼睛的龍，到底發生了什麼神奇的事？",
    tasks: [
      { id: "read3", type: "read", text: "閱讀故事結局 & 大聲全文朗讀", target: 2 },
      { id: "vocab3", type: "vocab", text: "學習生字：烏雲密布、無影無蹤...", target: [5, 6, 7, 8, 9] },
      { id: "game3", type: "game", text: "畫龍點睛結果測驗" }
    ]
  },
  {
    day: 4,
    title: "第四天: 漢字與語句邏輯 📝",
    description: "綜合複習本課的重要字詞，並在筆記本上進行寫字特訓！",
    tasks: [
      { id: "vocab4", type: "vocab_all", text: "單字卡總複習 (全 12 個)", target: null },
      { id: "game4", type: "game", text: "文法重組：「一旦... 就...」 (P.125)" },
      { id: "notebook4", type: "notebook", text: "【紙本任務】習作 P.122 國字注音書寫" }
    ]
  },
  {
    day: 5,
    title: "第五天: 語文百寶箱：四字語詞 💬",
    description: "四個字的語詞能讓句子更精簡！來學習課文裡的四字語詞吧！",
    tasks: [
      { id: "game5_1", type: "game", text: "四字語詞配對 (P.124)" },
      { id: "notebook5", type: "notebook", text: "【紙本任務】筆記本造句：一旦...就..." }
    ]
  },
  {
    day: 6,
    title: "第六天: 畫龍點睛大會考 🎓",
    description: "把這六天的精華全部複習一遍，向家長展示你的學習成果，領取證書！",
    tasks: [
      { id: "final6", type: "game", text: "第十一課 畫龍點睛大會考 (7 題)！" },
      { id: "notebook6", type: "notebook", text: "【最終任務】給家長看筆記本並領取通關證明！" }
    ]
  }
];

function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [studyTime, setStudyTime] = useState(1800); 
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [tutorMessage, setTutorMessage] = useState("你好！準備好聽「畫龍點睛」的傳說故事了嗎？請從第 1 天開始吧！");
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
        if (event.error === "not-allowed") {
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
            className={"px-4 py-2 rounded-full text-xs font-bold transition-all " + (completedTasks[taskId] ? "bg-teal-500 text-white shadow" : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200")}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>
        <div className="space-y-6">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/50 space-y-1">
              <p className="text-lg font-bold text-slate-800 tracking-wide leading-relaxed">{para.chinese}</p>
              <p className="text-xs font-semibold text-teal-800 tracking-wider leading-relaxed bg-teal-50/50 p-1.5 rounded border border-teal-100/30 font-mono">注音: {para.zhuyin}</p>
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
              ><span>第 {idx + 1} 次朗讀</span>{readProgress[idx] ? <span className="text-teal-500">✅</span> : <span>○</span>}</button>
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
                {matchingScore !== null && (<div className="flex items-center gap-2 pt-2"><span className="font-semibold">🎯 相似度：</span><span className={"text-lg font-bold " + (matchingScore >= 35 ? "text-teal-600" : "text-red-500")}>{matchingScore}%</span></div>)}
              </>)}
            </div>
          )}
        </div>
        <div className="bg-slate-50 p-4 rounded-xl relative border"><span className="absolute top-2 right-2 text-xs bg-slate-200 px-2 py-1 rounded">日本語訳</span><p className="text-sm text-slate-600 pt-2 whitespace-pre-line">{page.japanese}</p></div>
      </div>
    );
  };

  const renderInteractiveGame = () => {
    // Day 1
    if (selectedTask.id === 'game1') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 和尚們的煩惱測驗</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q1: 屋梁上的野鳥留下鳥糞，讓和尚們覺得？</p>
              <div className="flex gap-2">
                <button onClick={()=>handleWrong()} className="px-4 py-2 bg-white border rounded hover:bg-slate-100 font-bold">很開心</button>
                <button onClick={()=>{handleCorrect(); setQuizAnswers(p=>({...p, q1:true}));}} className={"px-4 py-2 border rounded font-bold " + (quizAnswers.q1 ? "bg-teal-500 text-white" : "bg-white")}>很困擾</button>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q2: 張僧繇在牆上畫了什麼來解決這個問題？</p>
              <div className="flex flex-col gap-2">
                <button onClick={()=>{
                  handleCorrect(); setQuizAnswers(p=>({...p, q2:true}));
                  if(quizAnswers.q1) { toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 恭喜！畫了老鷹之後野鳥就不敢靠近了！");}
                }} className={"px-4 py-2 text-left border rounded font-bold " + (quizAnswers.q2 ? "bg-teal-500 text-white" : "bg-white")}>兩隻老鷹</button>
                <button onClick={()=>handleWrong()} className="px-4 py-2 text-left bg-white border rounded hover:bg-slate-100 font-bold">四條飛龍</button>
              </div>
            </div>
          </div>
          {gameFeedback && <div className="p-3 text-center bg-emerald-100 text-emerald-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 2
    if (selectedTask.id === 'game2') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 安樂寺的奇妙發現</h3>
          <p className="text-sm text-slate-600">老奶奶和小孫子看到牆上的龍，有不同的反應！</p>
          <div className="space-y-4">
             <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q: 為什麼小孫子說「別怕」？</p>
              <div className="flex flex-col gap-2">
                <button onClick={()=>{
                  handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 答對了！因為龍沒有眼珠子，所以小孫子知道那是假的。");
                }} className="px-4 py-3 text-left border rounded-xl font-bold bg-white hover:border-emerald-400">因為這些龍都沒有畫上「眼珠子」</button>
                <button onClick={()=>handleWrong()} className="px-4 py-3 text-left bg-white border rounded-xl font-bold hover:bg-slate-100">因為龍在睡覺</button>
              </div>
            </div>
          </div>
          {gameFeedback && <div className="p-3 text-center bg-emerald-100 text-emerald-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 3
    if (selectedTask.id === 'game3') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 畫龍點睛結果測驗</h3>
          <p className="text-sm text-slate-600">張僧繇說：「一旦畫上眼珠子，龍就會飛走。」結果真的發生了什麼事？</p>
          <div className="flex flex-col gap-3">
             <button onClick={()=>handleWrong()} className="w-full p-4 border rounded-xl hover:bg-slate-50 font-bold text-left">這兩條龍從牆上走下來，跟大家打招呼。</button>
             <button onClick={() => { handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("答對了！點睛後的龍直上天際消失了！"); }} className="w-full p-4 border rounded-xl hover:bg-emerald-50 font-bold text-left">天空雷電交加，兩條龍奮力飛出牆壁消失了！</button>
          </div>
          {gameFeedback && <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-center font-bold text-sm">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 4: Grammar
    if (selectedTask.id === 'game4') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🎮 文法重組：「一旦... 就...」</h3>
          <div className="bg-emerald-50 p-4 rounded-xl text-center border"><p className="text-lg font-bold text-emerald-900">一旦畫上眼珠子，龍就會飛走。</p></div>
          <div className="p-4 bg-slate-50 rounded-xl flex flex-wrap gap-2 justify-center">
            {["一旦", "畫上眼珠子，", "龍就會", "飛走。"].map((phrase, idx) => (
              <button key={idx} onClick={()=>{ handleCorrect(); speakText(phrase); if(idx===3) toggleTaskCompletion(selectedTask.id); }} className="px-4 py-2 bg-white font-bold rounded-lg border hover:bg-teal-100">{phrase}</button>
            ))}
          </div>
        </div>
      );
    }

    // Day 5_1: Idioms (P.124)
    if (selectedTask.id === 'game5_1') {
      const qList = [
        { q: "天空布滿了黑色的雲，形容天氣變壞了。", options: ["雷電交加", "烏雲密布"], ans: 1 },
        { q: "看不到影子，也沒有一點痕跡。", options: ["無影無蹤", "維妙維肖"], ans: 0 }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200 space-y-4">
          <h3 className="text-lg font-bold text-emerald-800">🎮 四字語詞配對 (P.124)</h3>
          <p className="text-sm text-slate-600 mb-4">四字語詞能讓句子的意思更精簡，請選出正確的語詞！</p>
          {qList.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border space-y-2">
              <p className="font-bold">{item.q}</p>
              <div className="flex gap-2">
                {item.options.map((opt, oIdx) => (
                  <button key={oIdx} onClick={()=>{
                    if(oIdx===item.ans) { handleCorrect(); setQuizAnswers(p=>({...p, [idx]:true})); if(Object.keys({...quizAnswers, [idx]:true}).length===2) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                  }} className={"px-4 py-2 border rounded font-bold " + (quizAnswers[idx] && oIdx===item.ans ? "bg-teal-500 text-white" : "bg-white hover:bg-teal-50")}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Day 6: Final Exam (7 questions)
    if (selectedTask.id === 'final6') {
      const examQuestions = [
        { q: "張僧繇畫出來的東西，大家常常用哪個成語形容？", options: ["不知不覺", "維妙維肖", "無影無蹤"], ans: 1 },
        { q: "為了解決屋梁上的鳥糞，他在佛寺畫了什麼？", options: ["兩隻貓", "兩隻老虎", "兩隻老鷹"], ans: 2 },
        { q: "張僧繇在安樂寺畫了幾條龍？", options: ["兩條", "四條", "六條"], ans: 1 },
        { q: "老奶奶為什麼拉著孫子的手要跑？", options: ["因為要下雨了", "因為龍畫得太逼真，嚇著了她", "因為和尚在趕人"], ans: 1 },
        { q: "張僧繇為什麼一開始不給龍畫眼睛？", options: ["因為一旦畫上，龍就會飛走", "因為他忘記了", "因為時間不夠"], ans: 0 },
        { q: "當張僧繇點上眼珠子後，原本晴朗的天空變得如何？", options: ["烏雲密布、雷電交加", "依然晴朗無雲", "開始下起雪來"], ans: 0 },
        { q: "「一旦你開始運動，就會發現身體變強壯。」『一旦』的意思和哪個詞最接近？", options: ["雖然", "如果 (もし〜なら)", "可是"], ans: 1 }
      ];

      const curQ = examQuestions[quizStep] || null;

      if (!curQ) {
        return (
          <div className="bg-gradient-to-r from-teal-100 to-emerald-100 rounded-2xl p-8 text-center border-2 border-emerald-300">
            <span className="text-5xl">🏆 🐉</span>
            <h3 className="text-2xl font-bold text-emerald-900 mt-4">恭喜你成為傳說大師！</h3>
            <p className="text-slate-800 font-medium mt-2">完美通過第十一課「畫龍點睛」全數考驗！</p>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="mt-6 px-6 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700">領取通關證明</button>
          </div>
        );
      }

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <div className="flex justify-between items-center border-b pb-2"><span className="text-sm font-bold text-emerald-800">{"🎓 第十一課終極大會考 (" + (quizStep + 1) + " / 7)"}</span></div>
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

    // Default for Notebook or unhandled
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-teal-300 text-center space-y-6 animate-fade-in">
        <span className="text-5xl">📓</span>
        <h3 className="text-2xl font-bold text-teal-900">{selectedTask.text}</h3>
        <p className="text-slate-600">這是一個實體任務！請拿出你的筆記本或習作，按照指示手寫完成練習。<br/>寫完之後，請家長確認，然後按下方的完成按鈕！</p>
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
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-emerald-100">
          <span className="text-6xl mb-4">🐉</span>
          <h3 className="text-xl font-bold text-slate-800 mb-2">請選擇今天的學習任務！</h3>
          <p className="text-slate-600 max-w-md text-sm mb-6">點選左側清單開始學習。別忘了啟動 30 分鐘計時器喔！</p>
          <button 
            onClick={() => { setTimerActive(true); updateTutor("那我們開始 30 分鐘的學習吧！加油！"); }}
            className={`px-6 py-3 rounded-full font-bold text-white shadow-md transition-transform ${timerActive ? 'bg-teal-500' : 'bg-emerald-500'}`}
          >
            {timerActive ? "⏱️ 計時器運行中..." : "⏱️ 開始 30 分鐘學習！"}
          </button>
        </div>
      );
    }

    if (selectedTask.type === "read") return renderReadTask(TEXTBOOK_PAGES[selectedTask.target], selectedTask.id);
    
    if (selectedTask.type === "vocab" || selectedTask.type === "vocab_all") {
      const targetIndices = selectedTask.type === "vocab_all" ? [0,1,2,3,4,5,6,7,8,9,10,11] : selectedTask.target;
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-bold text-emerald-800">✨ 今日生字詞卡</h3>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">
              {completedTasks[selectedTask.id] ? "✅ 詞彙全部記住囉" : "🎴 記住後請點選！"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetIndices.map((idx) => {
              const item = VOCABULARY[idx];
              return (
                <div key={idx} onClick={() => { setSelectedCard(idx); speakText(item.char, "zh-TW"); }} className={`p-4 rounded-xl border-2 cursor-pointer ${selectedCard === idx ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white'}`}>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{item.char}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">{item.zhuyin}</span>
                  </div>
                  <p className="text-sm font-semibold mt-3 text-teal-700">日文釋義: {item.meaning}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return renderInteractiveGame();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖌️</span>
            <div>
              <h1 className="text-lg font-extrabold text-emerald-700">畫龍點睛 ‧ 六日中文營</h1>
              <p className="text-xs text-slate-500">國小精華家庭教師互動程式 (第十一課)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="font-mono font-bold text-emerald-700">{formatTime(studyTime)}</span>
              <button onClick={() => setTimerActive(!timerActive)} className="text-xs font-bold px-2 py-1 rounded bg-emerald-500 text-white">
                {timerActive ? "暫停" : "開始"}
              </button>
            </div>
            <div className="bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full font-bold text-sm">⭐ 得分: {score}</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-white shadow-sm flex items-center gap-4">
          <div className="text-3xl bg-white/20 p-2 rounded-full">👨‍🏫</div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase text-emerald-100">AI 老師的溫馨提示</p>
            <p className="text-sm font-bold mt-1">{tutorMessage}</p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-3 text-sm">📅 六天學習進度</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setCurrentDay(d); setSelectedTask(null); setGameFeedback("");
                    setReadProgress([false, false]); setCurrentReadStep(0);
                    updateTutor(`開始第 ${d} 天的學習吧！`);
                  }}
                  className={`py-3 rounded-xl font-bold flex flex-col items-center transition-all ${currentDay === d ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  <span className="text-xs">Day {d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">{DAILY_PLANS[currentDay - 1].title}</h3>
              <p className="text-xs text-slate-600 mt-1">{DAILY_PLANS[currentDay - 1].description}</p>
            </div>
            <div className="border-t pt-4 space-y-2">
              {DAILY_PLANS[currentDay - 1].tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${selectedTask?.id === task.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-300'}`}
                  onClick={() => { setSelectedTask(task); setGameFeedback(""); }}
                >
                  <input type="checkbox" checked={completedTasks[task.id] || false} readOnly className="rounded text-emerald-500" />
                  <span className={`text-xs font-semibold ${completedTasks[task.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {renderTaskContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
