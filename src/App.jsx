import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION WITH SEPARATE TEXT AND ZHUYIN FOR HORIZONTAL ALIGNMENT ---
const TEXTBOOK_PAGES = [
  {
    title: "1. 筷子謎語與各國筷子 (お箸のなぞなぞ & 世界のお箸)",
    japanese: "「体は細長く、ペアになっている。おかずは食べられるけれど、スープは飲めない。」これは生活の中で使う何でしょう？答えはお箸（筷子）です！\n【中國（中式）】中國的人，習慣圍著大圓桌一起用餐。為了夾到比較遠的菜，筷子通常會比較長。\n【日本（日式）】日本的餐點，習慣分裝成單人套餐，飯菜都在自己面前，就不需要長筷子。\n【韓國（韓式）】韓國傳統房屋的廚房只能煮飯，吃飯時需要把飯菜端到房間。運搬的過程中，圓圓的筷子很容易滾動掉落，扁平的筷子就不會有這個問題了。",
    paragraphs: [
      {
        chinese: "「身體細長，成對成雙，只會吃菜，不會喝湯。」猜猜這是哪一種生活用品？謎底就是你每天吃飯都會用到的筷子！各式筷子比一比。筷子因為使用的習慣不同，樣子也有點不同，讓我們一起來了解。",
        zhuyin: "「ㄕㄣ ㄊㄧˇ ㄒㄧˋ ㄔㄤˊ，ㄔㄥˊ ㄉㄨㄟˋ ㄔㄥˊ ㄕㄨㄤ，ㄓˇ ㄏㄨㄟˋ ㄔ ㄘㄞˋ，ㄅㄨˊ ㄏㄨㄟˋ ㄏㄜ ㄊㄤ。」ㄘㄞ ㄘㄞ ㄓㄜˋ ㄕˋ ㄋㄚˇ ㄧˋ ㄓㄨㄥˇ ㄕㄥ ㄏㄨㄛˊ ㄩㄥˋ ㄆㄧㄣˇ？ㄇㄧˊ ㄉㄧˇ ㄐㄧㄡˋ ㄕˋ ㄋㄧˇ ㄇㄟˇ ㄊㄧㄢ ㄔ ㄈㄢˋ ㄉㄡ ㄏㄨㄟˋ ㄩㄥˋ ㄉㄠˋ ㄉㄜ˙ ㄎㄨㄞˋ ㄗ˙！ㄍㄜˋ ㄕˋ ㄎㄨㄞˋ ㄗ˙ ㄅㄧˇ ㄧˋ ㄅㄧˇ。ㄎㄨㄞˋ ㄗ˙ ㄧㄣ ㄨㄟˋ ㄕˇ ㄩㄥˋ ㄉㄜ˙ ㄒㄧˊ ㄍㄨㄢˋ ㄅㄨˋ ㄊㄨㄥˊ，ㄧㄤˋ ㄗ˙ ㄧㄝˇ ㄧㄡˇ ㄉㄧㄢˇ ㄅㄨˋ ㄊㄨㄥˊ，ㄖㄤˋ ㄨㄛˇ ㄇㄣ˙ ㄧˋ ㄑㄧˇ ㄌㄞˊ ㄌㄧㄠˇ ㄐㄧㄝˇ。"
      },
      {
        chinese: "中式筷子比較長。中國人吃飯，習慣圍著大圓桌一起用餐，為了夾到比較遠的菜，筷子通常會比較長。",
        zhuyin: "ㄓㄨㄥ ㄕˋ ㄎㄨㄞˋ ㄗ˙ ㄅㄧˇ ㄐㄧㄠˋ ㄔㄤˊ。ㄓㄨㄥ ㄍㄨㄛˊ ㄖㄣˊ ㄔ ㄈㄢˋ，ㄒㄧˊ ㄍㄨㄢˋ ㄨㄟˊ ㄓㄜ˙ ㄉㄚˋ ㄩㄢˊ ㄓㄨㄛ ㄧˋ ㄑㄧˇ ㄩㄥˋ ㄘㄢ，ㄨㄟˋ ㄌㄜ˙ ㄐㄧㄚˊ ㄉㄠˋ ㄅㄧˇ ㄐㄧㄠˋ ㄩㄢˇ ㄉㄜ˙ ㄘㄞˋ，ㄎㄨㄞˋ ㄗ˙ ㄊㄨㄥ ㄔㄤˊ ㄏㄨㄟˋ ㄅㄧˇ ㄐㄧㄠˋ ㄔㄤˊ。"
      },
      {
        chinese: "日式筷子比較短。日本的餐點，習慣分裝成單人套餐，飯菜都在自己面前，就不需要長筷子。",
        zhuyin: "ㄖˋ ㄕˋ ㄎㄨㄞˋ ㄗ˙ ㄅㄧˇ ㄐㄧㄠˋ ㄉㄨㄢˇ。ㄖˋ ㄅㄣˇ ㄉㄜ˙ ㄘㄢ ㄉㄧㄢˇ，ㄒㄧˊ ㄍㄨㄢˋ ㄈㄣ ㄓㄨㄤ ㄔㄥˊ ㄉㄢ ㄖㄣˊ ㄊㄠˋ ㄘㄢ，ㄈㄢˋ ㄘㄞˋ ㄉㄡ ㄗㄞˋ ㄗˋ ㄐㄧˇ ㄇㄧㄢˋ ㄑㄧㄢˊ，ㄐㄧㄡˋ ㄅㄨˋ ㄒㄩ ㄧㄠˋ ㄔㄤˊ ㄎㄨㄞˋ ㄗ˙。"
      },
      {
        chinese: "韓式筷子比較扁。韓國傳統房屋的廚房只能煮飯，吃飯時需要把飯菜端到房間。端菜的過程中，圓圓的筷子很容易滾動掉落，扁平的筷子就不會有這個問題了。",
        zhuyin: "ㄏㄢˊ ㄕˋ ㄎㄨㄞˋ ㄗ˙ ㄅㄧˇ ㄐㄧㄠˋ ㄅㄧㄢˇ。ㄏㄢˊ ㄍㄨㄛˊ ㄔㄨㄢˊ ㄊㄨㄥˇ ㄈㄤˊ ㄨ ㄉㄜ˙ ㄔㄨˊ ㄈㄤˊ ㄓˇ ㄋㄥˊ ㄓㄨˇ ㄈㄢˋ，ㄔ ㄈㄢˋ ㄕˊ ㄒㄩ ㄧㄠˋ ㄅㄚˇ ㄈㄢˋ ㄘㄞˋ ㄉㄨㄢ ㄉㄠˋ ㄈㄤˊ ㄐㄧㄢ。ㄉㄨㄢ ㄘㄞˋ ㄉㄜ˙ ㄍㄨㄛˋ ㄔㄥˊ ㄓㄨㄥ，ㄩㄢˊ ㄩㄢˊ ㄉㄜ˙ ㄎㄨㄞˋ ㄗ˙ ㄏㄣˇ ㄖㄨㄥˊ ㄧˋ ㄍㄨㄣˇ ㄉㄨㄥˋ ㄉㄧㄠˋ ㄌㄨㄛˋ，ㄅㄧㄢˇ ㄆㄧㄥˊ ㄉㄜ˙ ㄎㄨㄞˋ ㄗ˙ ㄐㄧㄡˋ ㄅㄨˊ ㄏㄨㄟˋ ㄧㄡˇ ㄓㄜˋ ㄍㄜ˙ ㄨㄣˋ ㄊㄧˊ ㄌㄜ˙。"
      }
    ],
    chinese: "「身體細長，成對成雙，只會吃菜，不會喝湯。」猜猜這是哪一種生活用品？謎底就是你每天吃飯都會用到的筷子！各式筷子比一比。筷子因為使用的習慣不同，樣子也有點不同。\n中式筷子比較長。中國人吃飯，習慣圍著大圓桌一起用餐，為了夾到比較遠的菜，筷子通常會比較長。\n日式筷子比較短. 日本的餐點，習慣分裝成單人套餐，飯菜都在自己面前，就不需要長筷子。\n韓式筷子比較扁。韓國傳統房屋的廚房只能煮飯，吃飯時需要把飯菜端到房間. 端菜的過程中，圓圓的筷子很容易滾動掉落，扁平的筷子就不會有這個問題了。"
  },
  {
    title: "2. 免洗筷與環保筷 (割り箸 VS マイ箸/エコ箸)",
    japanese: "外帶餐點時，有人會使用免洗筷，也有人會自備環保筷。\n【免洗筷】不需清洗，容易取得。但是用過一次就丟，會製造大量垃圾。另外，在製作過程中加入的化學物品，也可能有害健康。\n【環保筷】自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。但是可能忘記帶出門，使用後也不一定有地方清洗。\n下次仔細看看手中的筷子，你會發現看起來平凡的東西，其實背後都大有學問呢！",
    paragraphs: [
      {
        chinese: "外帶餐點時，有人會使用免洗筷，也有人會自備環保筷。",
        zhuyin: "ㄨㄞˋ ㄉㄞˋ ㄘㄢ ㄉㄧㄢˇ ㄕˊ，ㄧㄡˇ ㄖㄣˊ ㄏㄨㄟˋ ㄕˇ ㄩㄥˋ ㄇㄧㄢˇ ㄒㄧ ㄎㄨㄞˋ，ㄧㄝˇ ㄧㄡˇ ㄖㄣˊ ㄏㄨㄟˋ ㄗˋ ㄅㄟˋ ㄏㄨㄢˊ ㄅㄠˇ ㄎㄨㄞˋ。"
      },
      {
        chinese: "免洗筷：不需清洗，容易取得。但是用過一次就丟，會製造大量垃圾。另外，在製作過程中加入的化學物品，也可能有害健康。",
        zhuyin: "ㄇㄧㄢˇ ㄒㄧ ㄎㄨㄞˋ：ㄅㄨˋ ㄒㄩ ㄑㄧㄥ ㄒㄧˇ，ㄖㄨㄥˊ ㄧˋ ㄑㄩˇ ㄉㄜˊ。ㄉㄢˋ ㄕˋ ㄩㄥˋ ㄍㄨㄛˋ ㄧˊ ㄘˋ ㄐㄧㄡˋ ㄉㄧㄡ，ㄏㄨㄟˋ ㄓˋ ㄗㄠˋ ㄉㄚˋ ㄌㄧㄤˋ ㄌㄜˋ ㄙㄜˋ。ㄌㄧㄥˋ ㄨㄞˋ，ㄗㄞˋ ㄓˋ ㄗㄨㄛˋ ㄍㄨㄛˋ ㄔㄥˊ ㄓㄨㄥ ㄐㄧㄚ ㄖㄨˋ ㄉㄜ˙ ㄏㄨㄚˋ ㄒㄩㄝˊ ㄨˋ ㄆㄧㄣˇ，ㄧㄝˇ ㄎㄜˇ ㄋㄥˊ ㄧㄡˇ ㄏㄞˋ ㄐㄧㄢˋ ㄎㄤ。"
      },
      {
        chinese: "環保筷：自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。但是可能忘記帶出門，使用後也不一定有地方清洗。",
        zhuyin: "ㄏㄨㄢˊ ㄅㄠˇ ㄎㄨㄞˋ：ㄗˋ ㄅㄟˋ ㄏㄨㄢˊ ㄅㄠˇ ㄎㄨㄞˋ，ㄅㄨˊ ㄉㄢˋ ㄋㄥˊ ㄔ ㄉㄜ˙ ㄢ ㄒㄧㄣ，ㄏㄞˊ ㄋㄥˊ ㄅㄠˇ ㄏㄨˋ ㄏㄨㄢˊ ㄐㄧㄥˋ，ㄓㄣ ㄕˋ ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ。ㄉㄢˋ ㄕˋ ㄎㄜˇ ㄋㄥˊ ㄨㄤˋ ㄐㄧˋ ㄉㄞˋ ㄔㄨ ㄇㄣˊ，ㄕˇ ㄩㄥˋ ㄏㄡˋ ㄧㄝˇ ㄅㄨˋ ㄧˊ ㄉㄧㄥˋ ㄧㄡˇ ㄉㄧˋ ㄈㄤ ㄑㄧㄥ ㄒㄧˇ。"
      },
      {
        chinese: "下次仔細看看手中的筷子，你會發現看起來平凡的東西，其實背後都大有學問呢！",
        zhuyin: "ㄒㄧㄚˋ ㄘˋ ㄗˇ ㄒㄧˋ ㄎㄢˋ ㄎㄢˋ ㄕㄡˇ ㄓㄨㄥ ㄉㄜ˙ ㄎㄨㄞˋ ㄗ˙，ㄋㄧˇ ㄏㄨㄟˋ ㄈㄚ ㄒㄧㄢˋ ㄎㄢˋ ㄑㄧˇ ㄌㄞˊ ㄆㄧㄥˊ ㄈㄢˊ ㄉㄜ˙ ㄉㄨㄥ ㄒㄧ˙，ㄑㄧˊ ㄕˊ ㄅㄟˋ ㄏㄡˋ ㄉㄡ ㄉㄚˋ ㄧㄡˇ ㄒㄩㄝˊ ㄨㄣˋ ㄋㄜ˙！"
      }
    ],
    chinese: "外帶餐點時，有人會使用免洗筷，也有人會自備環保筷。\n免洗筷：不需清洗，容易取得。但是用過一次就丟，會製造大量垃圾。另外，在製作過程中加入的化學物品，也可能有害健康。\n環保筷：自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。但是可能忘記帶出門，使用後也不一定有地方清洗。\n下次仔細看看手中的筷子，你會發現看起來平凡的東西，其實背後都大有學問呢！"
  },
  {
    title: "3. 一舉兩得與語文百寶箱 (一石二鳥の例文 & 応用文)",
    japanese: "Lesson 9（3ページ）に登場する、日常生活で使える「一舉兩得（一石二鳥）」の素晴らしい例文を大声で読んでみましょう！\n【マイ箸】マイ箸を用意することは、安心なだけでなく環境も守れて、まさに一石二鳥です。\n【バスケットボール】バスケをすることは、友達と仲良くなれるだけでなく、健康にも良いので、まさに一石二鳥です。\n【みんなで掃除】みんなで一緒に掃除をすることは、時間を節約できるだけでなく、チームワークも育てられて、まさに一石二鳥です。",
    paragraphs: [
      {
        chinese: "自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。",
        zhuyin: "ㄗˋ ㄅㄟˋ ㄏㄨㄢˊ ㄅㄠˇ ㄎㄨㄞˋ，ㄅㄨˊ ㄉㄢˋ ㄋㄥˊ ㄔ ㄉㄜ˙ ㄢ ㄒㄧㄣ，ㄏㄞˊ ㄋㄥˊ ㄅㄠˇ ㄏㄨˋ ㄏㄨㄢˊ ㄐㄧㄥˋ，ㄓㄣ ㄕˋ ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ。"
      },
      {
        chinese: "打籃球，一方面能跟朋友交流感情，另一方面可以促進身體健康，真是一舉兩得。",
        zhuyin: "ㄉㄚˇ ㄌㄢˊ ㄑㄧㄡˊ，ㄧˋ ㄈㄤ ㄇㄧㄢˋ ㄋㄥˊ ㄍㄣ ㄆㄥˊ ㄧㄡˇ ㄐㄧㄠ ㄌㄧㄡˊ ㄍㄢˇ ㄑㄧㄥˊ，ㄌㄧㄥˋ ㄧˋ ㄈㄤ ㄇㄧㄢˋ ㄎㄜˇ ㄧˇ ㄘㄨˋ ㄐㄧㄣˋ ㄕㄣ ㄊㄧˇ ㄐㄧㄢˋ ㄎㄤ，ㄓㄣ ㄕˋ ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ。"
      },
      {
        chinese: "全班一起打掃，除了節省時間，還可以培養團隊精神，真是一舉兩得。",
        zhuyin: "ㄑㄩㄢˊ ㄅㄢ ㄧˋ ㄑㄧˇ ㄉㄚˇ ㄙㄠˇ，ㄔㄨˊ ㄌㄜ˙ ㄐㄧㄝˊ ㄕㄥˇ ㄕˊ ㄐㄧㄢ，ㄏㄞˊ ㄎㄜˇ ㄧˇ ㄆㄟˊ ㄧㄤˇ ㄊㄨㄢˊ ㄉㄨㄟˋ ㄐㄧㄥ ㄕㄣˊ，ㄓㄣ ㄕˋ ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ。"
      }
    ],
    chinese: "自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。\n打籃球，一方面能跟朋友交流感情，另一方面可以促進身體健康，真是一舉兩得。\n全班一起打掃，除了節省時間，還可以培養團隊精神，真是一舉兩得。"
  }
];

const VOCABULARY = [
  { char: "筷子", zhuyin: "ㄎㄨㄞˋ ㄗ˙", meaning: "お箸", example: "我每天吃飯都會用到筷子。", exMeaning: "私は毎日ご飯を食べるときにお箸を使います。" },
  { char: "習慣", zhuyin: "ㄒㄧˊ ㄍㄨㄢˋ", meaning: "習慣・いつものやり方", example: "每個國家的飲食習慣不同。", exMeaning: "国によって食事の習慣が違います。" },
  { char: "套餐", zhuyin: "ㄊㄠˋ ㄘㄢ", meaning: "セットメニュー・定食", example: "日式晚餐通常是單人套餐。", exMeaning: "和食の夕食は普通、一人前のセットメニューです。" },
  { char: "廚房", zhuyin: "ㄔㄨˊ ㄈㄤˊ", meaning: "台所・キッチン", example: "媽媽在廚房煮飯。", exMeaning: "お母さんが台所でご飯を作っています。" },
  { char: "滾動", zhuyin: "ㄍㄨㄣˇ ㄉㄨㄥˋ", meaning: "轉がる", example: "圓圓的筷子很容易滾動。", exMeaning: "丸いお箸はとても転がりやすいです。" },
  { char: "免洗筷", zhuyin: "ㄇㄧㄢˇ ㄒㄧ ㄎㄨㄞˋ", meaning: "割り箸・使い捨て箸", example: "使用免洗筷會製造大量垃圾。", exMeaning: "割り箸を使うと大量のゴミが出ます。" },
  { char: "環保筷", zhuyin: "ㄏㄨㄢˊ ㄅㄠˇ ㄎㄨㄞˋ", meaning: "マイ箸・エコ箸", example: "自備環保筷可以保護環境。", exMeaning: "マイ箸を持ち歩くことで環境を守ることができます。" },
  { char: "一舉兩得", zhuyin: "ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ", meaning: "一石二鳥", example: "這件事既省時又省錢，真是一舉兩得！", exMeaning: "これは時間もお金も節約できて、まさに一石二鳥だ！" },
  { char: "垃圾", zhuyin: "ㄌㄜˋ ㄙㄜˋ", meaning: "ゴミ (台灣發音: lèsè)", example: "請不要亂丟垃圾。", exMeaning: "ゴミをポイ捨てしないでください。" },
  { char: "健康", zhuyin: "ㄐㄧㄢˋ ㄎㄤ", meaning: "健康", example: "多吃蔬菜有害健康嗎？不，對健康很好！", exMeaning: "野菜をたくさん食べるのは健康に悪い？いいえ、体に良いです！" }
];

const DAILY_PLANS = [
  {
    day: 1,
    title: "第一天: 筷子謎語與各國文化 🍜 (Day 1)",
    description: "首先讓我們來動動腦解開有趣的筷子謎語，並掌握中日韓三國筷子的特色與使用文化吧！",
    tasks: [
      { id: "read1", type: "read", text: "閱讀課文第一部分 & 大聲全文朗讀2次 (お箸となぞなぞ全文を2回音読しよう)", target: 0 },
      { id: "vocab1", type: "vocab", text: "學習生字：筷子、習慣、套餐、廚房、滾動", target: [0, 1, 2, 3, 4] },
      { id: "quiz1", type: "game", text: "日中韓筷子配對連連看 (お箸マッチングゲーム)" }
    ]
  },
  {
    day: 2,
    title: "第二天: 免洗筷與環保筷 🌲✨ (Day 2)",
    description: "方便的免洗筷與自備的環保筷，讓我們來整理並比較它們的優點與缺點！",
    tasks: [
      { id: "read2", type: "read", text: "閱讀課文第二部分 & 大聲全文朗讀2次 (エコ箸のお話全文を2回音読しよう)", target: 1 },
      { id: "vocab2", type: "vocab", text: "學習生字：免洗筷、環保筷、垃圾、健康", target: [5, 6, 8, 9] },
      { id: "quiz2", type: "game", text: "環保大抉擇是非問答 (エコ判断マルバツゲーム)" }
    ]
  },
  {
    day: 3,
    title: "第三天: 一舉兩得與畢業大考 🏆 (Day 3)",
    description: "學習重要四字成語「一舉兩得」的用法，並通過總複習畢業大考，成為筷子大師！",
    tasks: [
      { id: "read3", type: "read", text: "閱讀百寶箱佳句 & 大聲全文朗讀2次 (一舉兩得の応用文を2回音読しよう)", target: 2 },
      { id: "vocab3", type: "vocab", text: "學習重要成語：一舉兩得", target: [7] },
      { id: "grammar3", type: "grammar", text: "重組句型「不但...還...」 (文型並比替えチャレンジ)", target: null },
      { id: "final_exam", type: "game", text: "挑戰 5 題「筷子大師畢業考」 (お箸マスター卒業テスト)" }
    ]
  }
];

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [studyTime, setStudyTime] = useState(1800); // 30 mins (in seconds)
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [tutorMessage, setTutorMessage] = useState("你好！歡迎來到三日中文學習營！每天只要 30 分鐘，一起開心學習注音與筷子的奧秘，成為筷子小達人吧！");
  const [speechPitch, setSpeechPitch] = useState(1.1); 
  const [speechRate, setSpeechRate] = useState(0.85); 

  // Audio Reading AI States
  const [currentReadStep, setCurrentReadStep] = useState(0); // index of full-text reading attempt (0 to 1)
  const [readProgress, setReadProgress] = useState([false, false]); // tracks if attempt 1 and 2 are completed
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [matchingScore, setMatchingScore] = useState(null);
  const [speechError, setSpeechError] = useState("");
  const [hasEvaluated, setHasEvaluated] = useState(false); // Only show evaluation after manually hitting "Stop"

  const recognitionRef = useRef(null);
  const accumulatedSpeechRef = useRef(""); // Buffer to hold speech throughout the continuous utterance

  // Quizzes and game states
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [gameFeedback, setGameFeedback] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  // --- ENV INTEGRATION ---
  // Netlify環境変数またはローカル環境変数から、Gemini APIキーを取得するセキュリティ設定
  const geminiApiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || "";

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true; // continuous recording for entire long text block
      rec.lang = 'zh-TW'; // Taiwan Mandarin
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError("");
        setSpokenText("");
        setHasEvaluated(false);
        accumulatedSpeechRef.current = ""; // Reset the buffer
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
        console.error("Speech recognition error", event.error);
        if (event.error === "no-speech") {
          // Keep recording without throwing harsh errors
        } else if (event.error === "not-allowed") {
          setSpeechError("請允許麥克風權限以使用 AI 聽力評分。 (マイクの許可をお願いします。)");
          setIsListening(false);
        } else {
          setSpeechError("語音系統暫時有小狀況。 (語音系統エラーが発生しました。)");
          setIsListening(false);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentReadStep, selectedTask]);

  // Evaluate matching score & integrate future Gemini AI Feedback checks if needed
  const evaluateSpeech = async (spoken) => {
    if (!selectedTask) return;
    const pageIdx = selectedTask.target;
    const targetText = TEXTBOOK_PAGES[pageIdx].chinese; 

    // Clean punctuation and convert to standard evaluation string
    const cleanString = (str) => str.replace(/[，。、！？「」：\n\s]/g, "").trim();
    const cleanTarget = cleanString(targetText);
    const cleanSpoken = cleanString(spoken);

    let matches = 0;
    const targetChars = cleanTarget.split("");
    targetChars.forEach(char => {
      if (cleanSpoken.includes(char)) {
        matches++;
      }
    });

    const scorePct = Math.round((matches / Math.max(cleanTarget.length, 1)) * 100);
    const finalScore = scorePct > 100 ? 100 : scorePct;
    
    setSpokenText(spoken);
    setMatchingScore(finalScore);
    setHasEvaluated(true);

    // If Gemini API Key is available, we can log or trigger a call to Gemini to generate custom praise
    if (geminiApiKey && finalScore >= 35) {
      console.log("Gemini API is ready on Netlify for generating customized speech evaluation.");
      // Optional: Perform a fetch call here for customized encouragement using geminiApiKey
    }

    if (finalScore >= 35) { // Lenient overlap ratio to encourage kids
      handleCorrect();
      setReadProgress(prev => {
        const next = [...prev];
        next[currentReadStep] = true;
        return next;
      });
      updateTutor(
        `太棒了！你的全文朗讀挑戰成功！相似度：${finalScore}%`,
        `素晴らしい！きれいに全文を音読できています！`
      );
    } else {
      handleWrong();
      updateTutor(
        `AI 評分匹配度：${finalScore}%。可以再大聲、連續且清晰地多讀一次全文喔！`,
        `もう少し大声でハッキリと読んでみましょう！`
      );
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setSpokenText("");
        setMatchingScore(null);
        setHasEvaluated(false);
        recognitionRef.current.start();
      } catch (e) {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
        }, 200);
      }
    } else {
      setSpeechError("您的瀏覽器不支援 Speech API，請使用 Google Chrome 開啟，或使用「手動驗證」來完成音讀任務。");
    }
  };

  const stopListeningAndEvaluate = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setTimeout(() => {
        const finalSpoken = accumulatedSpeechRef.current || "";
        evaluateSpeech(finalSpoken);
      }, 500);
    }
  };

  const simulateCorrectReading = () => {
    if (!selectedTask) return;
    const pageIdx = selectedTask.target;
    const targetText = TEXTBOOK_PAGES[pageIdx].chinese;
    setSpokenText(targetText);
    setMatchingScore(100);
    setHasEvaluated(true);
    handleCorrect();
    setReadProgress(prev => {
      const next = [...prev];
      next[currentReadStep] = true;
      return next;
    });
    updateTutor(
      `太棒了！模擬全文朗讀成功！你順利完成了第 ${currentReadStep + 1} 次全文音讀挑戰！`,
      `すばらしい！よくできました！`
    );
  };

  const playBeep = (freq, duration, type = "sine") => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type;
      oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log("Audio contexts blocked");
    }
  };

  const handleCorrect = () => {
    playBeep(600, 0.2, "triangle");
    setTimeout(() => playBeep(800, 0.3, "triangle"), 150);
  };

  const handleWrong = () => {
    playBeep(250, 0.4, "sawtooth");
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && studyTime > 0) {
      interval = setInterval(() => {
        setStudyTime((prev) => prev - 1);
      }, 1000);
    } else if (studyTime === 0) {
      setTimerActive(false);
      setTutorMessage("太棒了！今天 30 分鐘的學習時間結束囉！你做得非常好，明天也要繼續加油喔！");
      playBeep(880, 0.8, "sine");
    }
    return () => clearInterval(interval);
  }, [timerActive, studyTime]);

  const speakText = (text, lang = "zh-TW") => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.pitch = speechPitch;
      utterance.rate = speechRate;
      
      const voices = window.speechSynthesis.getVoices();
      if (lang.startsWith("zh")) {
        const twVoice = voices.find(v => v.lang.includes("ZH-TW") || v.lang.includes("zh-TW"));
        if (twVoice) utterance.voice = twVoice;
      } else if (lang.startsWith("ja")) {
        const jaVoice = voices.find(v => v.lang.includes("JA") || v.lang.includes("ja-JP"));
        if (jaVoice) utterance.voice = jaVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      setTutorMessage("您的瀏覽器不支援語音功能。");
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => {
      const newState = { ...prev, [taskId]: !prev[taskId] };
      const completedCount = Object.keys(newState).filter(k => newState[k]).length;
      setScore(completedCount * 15); 
      return newState;
    });
    playBeep(523.25, 0.15); 
  };

  const updateTutor = (zhMsg, jaMsg = "") => {
    setTutorMessage(zhMsg + (jaMsg ? ` (${jaMsg})` : ""));
    speakText(zhMsg, "zh-TW");
  };

  const renderReadTask = (page, taskId) => {
    const allReadCompleted = readProgress.every(v => v === true);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold text-amber-800">{page.title}</h3>
          <button 
            onClick={() => {
              toggleTaskCompletion(taskId);
              if (!allReadCompleted) {
                setReadProgress([true, true]);
              }
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${completedTasks[taskId] ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>

        {/* 橫書注音符號對照 */}
        <div className="space-y-6">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 space-y-1">
              <p className="text-lg font-bold text-slate-800 tracking-wide leading-relaxed">
                {para.chinese}
              </p>
              <p className="text-xs font-semibold text-sky-800 tracking-wider leading-relaxed bg-sky-50/50 p-1.5 rounded border border-sky-100/30 font-mono">
                注音: {para.zhuyin}
              </p>
            </div>
          ))}
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => speakText(page.chinese, "zh-TW")}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm"
            >
              🔊 聽課文全文朗讀 (華語)
            </button>
          </div>
        </div>

        {/* 2 Times AI Full-Text Reading Assistant Panel */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-2xl border-2 border-orange-200 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎤</span>
            <div>
              <h4 className="font-bold text-orange-800 text-sm">AI 語音音讀挑戰：大聲跟讀課文全文 2 次</h4>
              <p className="text-xs text-slate-600">
                請按下「開始朗讀」後大聲朗讀全文，讀完點選「結束並評分」，AI 會在你讀完後一併給出完整評價與分數！
              </p>
            </div>
          </div>

          {/* Attempt Progress Indicator Tabs */}
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentReadStep(idx);
                  setSpokenText("");
                  setMatchingScore(null);
                  setSpeechError("");
                  setHasEvaluated(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${currentReadStep === idx ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'} flex items-center justify-center gap-1.5`}
              >
                <span>第 {idx + 1} 次全文朗讀</span>
                {readProgress[idx] ? <span className="text-emerald-500">✅</span> : <span className="text-slate-300">○</span>}
              </button>
            ))}
          </div>

          {/* Current Reading target display */}
          <div className="bg-white p-4 rounded-xl border border-orange-100 space-y-3">
            <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded uppercase">對照朗讀內容 (朗讀テキスト)</span>
            <div className="space-y-2">
              {page.paragraphs.map((para, idx) => (
                <div key={idx} className="border-l-2 border-orange-200 pl-2">
                  <p className="text-sm font-bold text-slate-800">
                    {para.chinese}
                  </p>
                  <p className="text-[10px] text-sky-800 font-semibold tracking-wider font-mono">
                    {para.zhuyin}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Input Trigger Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {!isListening ? (
              <button
                onClick={startListening}
                className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <span>🎤 開始朗讀 (朗讀スタート)</span>
              </button>
            ) : (
              <button
                onClick={stopListeningAndEvaluate}
                className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 animate-pulse"
              >
                <span>🛑 結束並評分 (終了して評価)</span>
              </button>
            )}
            
            <button
              onClick={simulateCorrectReading}
              className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
            >
              👌 手動驗證過關 (測試用)
            </button>
          </div>

          {/* Speech Status indicator during recording */}
          {isListening && (
            <div className="bg-amber-50 p-4 rounded-xl border border-dashed border-amber-300 text-center">
              <p className="text-amber-800 font-bold text-sm animate-pulse">
                🎙️ AI 正在專心聆聽中，請大聲朗讀全文，讀完後請按「結束並評分」按鈕！
              </p>
            </div>
          )}

          {/* Speech Feedback Results Box (Only displayed after user clicks Stop) */}
          {hasEvaluated && (spokenText || matchingScore !== null || speechError) && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
              {speechError ? (
                <p className="text-red-500 font-semibold text-xs">{speechError}</p>
              ) : (
                <>
                  {spokenText && (
                    <div className="text-slate-700 font-medium">
                      🎧 AI 最終辨識結果： <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded block mt-1 overflow-auto max-h-20 whitespace-pre-line">「 {spokenText} 」</span>
                    </div>
                  )}
                  {matchingScore !== null && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-semibold text-slate-600">🎯 AI 全文相似度分數：</span>
                      <span className={`text-lg font-bold ${matchingScore >= 35 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {matchingScore}%
                      </span>
                      <span className="text-xs text-slate-400">(達到 35% 以上即可順利通關)</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Task Completion Celebration Banner */}
          {allReadCompleted && (
            <div className="bg-emerald-500 text-white p-3 rounded-xl text-center font-bold text-xs shadow-md animate-bounce">
              🎉 恭喜！你完成了全部 2 次課文全文朗讀挑戰！太有毅力了！ 👍
            </div>
          )}
        </div>

        {/* Translation Section */}
        <div className="bg-slate-50 p-4 rounded-xl relative border border-slate-100">
          <span className="absolute top-2 right-2 text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded">日文對照翻譯 (日本語訳)</span>
          <p className="text-sm text-slate-600 leading-relaxed pt-2 whitespace-pre-line">
            {page.japanese}
          </p>
        </div>
      </div>
    );
  };

  const renderTaskContent = () => {
    if (!selectedTask) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-orange-100">
          <img 
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200" 
            alt="Mascot Chopsticks" 
            className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-orange-200"
            onError={(e) => { e.target.src = "https://placehold.co/150?text=Chopsticks"; }}
          />
          <h3 className="text-xl font-bold text-slate-800 mb-2">請選擇今天的學習任務！ (ミッションを選ぼう)</h3>
          <p className="text-slate-600 max-w-md text-sm">
            請點選左側清單中的任務開始學習。別忘了啟動 30 分鐘計時器喔！
          </p>
          <button 
            onClick={() => { setTimerActive(true); updateTutor("那我們開始 30 分鐘的學習吧！加油！", "さあ、30分の勉強をスタートしましょう！"); }}
            className={`mt-6 px-6 py-3 rounded-full font-bold text-white shadow-md transition-transform active:scale-95 ${timerActive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {timerActive ? "⏱️ 計時器運行中..." : "⏱️ 開始 30 分鐘學習！"}
          </button>
        </div>
      );
    }

    if (selectedTask.type === "read") {
      const page = TEXTBOOK_PAGES[selectedTask.target];
      return renderReadTask(page, selectedTask.id);
    }

    // Task 2: Vocabulary Card
    if (selectedTask.type === "vocab" || selectedTask.type === "vocab_all") {
      const targetIndices = selectedTask.type === "vocab_all" ? [0,1,2,3,4,5,6,7,8,9] : selectedTask.target;
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-bold text-orange-800">✨ 今日生字詞卡 (単語カード)</h3>
            <button 
              onClick={() => toggleTaskCompletion(selectedTask.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${completedTasks[selectedTask.id] ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}`}
            >
              {completedTasks[selectedTask.id] ? "✅ 詞彙全部記住囉" : "🎴 記住後請點選！"}
            </button>
          </div>

          <p className="text-sm text-slate-500">點選生字卡片，就可以聽取正確的台灣華語發音喔！</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetIndices.map((idx) => {
              const item = VOCABULARY[idx];
              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    setSelectedCard(idx);
                    speakText(item.char, "zh-TW");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer transform hover:-translate-y-1 hover:shadow-md ${selectedCard === idx ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-slate-800">{item.char}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">注音: {item.zhuyin}</span>
                  </div>
                  <p className="text-base text-slate-700 font-semibold mt-3 border-t pt-2 border-dashed">
                    日文釋義: <span className="text-emerald-700">{item.meaning}</span>
                  </p>
                  <div className="mt-2 text-xs text-slate-500 space-y-1 bg-slate-50 p-2 rounded">
                    <p className="font-semibold text-slate-600">📝 課文例句:</p>
                    <p className="italic">"{item.example}"</p>
                    <p>({item.exMeaning})</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Task 3: Interactive Game & Quiz
    if (selectedTask.type === "game" || selectedTask.type === "grammar") {
      return renderInteractiveGame();
    }

    return null;
  };

  const renderInteractiveGame = () => {
    // Game Day 1: Chopstick Matching (China, Japan, Korea)
    if (currentDay === 1) {
      const items = [
        { country: "中式筷子 (中國)", desc: "習慣圍著大圓桌吃飯，為了夾比較遠的菜，所以設計最...", match: "長" },
        { country: "日式筷子 (日本)", desc: "習慣分裝成單人套餐，飯菜都在自己面前，所以筷子最...", match: "短" },
        { country: "韓式筷子 (韓國)", desc: "端菜的過程中為了防止筷子在托盤滾動掉落，所以設計成...", match: "扁" }
      ];

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🎮 第一天挑戰：筷子特徵連連看</h3>
          <p className="text-sm text-slate-500">請根據不同國家的飲食文化特點，連線點選正確的筷子外型設計特徵（長、短、扁）！</p>
          
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="font-bold text-orange-700 text-base">{it.country}</span>
                  <p className="text-xs text-slate-600 mt-1">{it.desc}</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  {["長", "短", "扁"].map((char) => (
                    <button
                      key={char}
                      onClick={() => {
                        if (char === it.match) {
                          handleCorrect();
                          setQuizAnswers(prev => ({ ...prev, [idx]: true }));
                          setGameFeedback("答對囉！理解得非常清楚！");
                          if (Object.keys({ ...quizAnswers, [idx]: true }).length === 3) {
                            toggleTaskCompletion(selectedTask.id);
                            setGameFeedback("⭐ 恭喜你！成功解開中日韓筷子的祕密，順利過關！");
                          }
                        } else {
                          handleWrong();
                          setGameFeedback("哎呀，好像搞錯了，再仔細讀一讀課文看看！");
                        }
                      }}
                      className={`px-4 py-2 rounded-lg font-bold transition-all border ${quizAnswers[idx] && it.match === char ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white hover:bg-orange-50 border-slate-200 text-slate-700'}`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {gameFeedback && (
            <div className="p-3 rounded-lg bg-orange-100 text-orange-900 font-semibold text-xs text-center">
              {gameFeedback}
            </div>
          )}
        </div>
      );
    }

    // Game Day 2: Pros & Cons Eco chopsticks
    if (currentDay === 2) {
      const qList = [
        { text: "「免洗筷」雖然不需要清洗很方便，但是用過一次就丟，會製造大量垃圾而且可能有化學物質殘留。", ans: true },
        { text: "自備「環保筷」既可以吃得安心、又能保護環境不製造垃圾，真是一舉難得的好習慣。", ans: true },
        { text: "攜帶「環保筷」非常簡單好用，所以平常絕對沒有任何不方便的地方。", ans: false, hint: "「可能忘記帶出門」以及「用餐後不一定有地方洗筷子」也是它的小缺點喔！" }
      ];

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🎮 第二天挑戰：環保抉擇是非題</h3>
          <p className="text-sm text-slate-500">請判斷下列敘述是否符合課文內容。正確請選「⭕ 是」，錯誤選「❌ 否」。</p>
          
          <div className="space-y-4">
            {qList.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <p className="text-sm font-semibold text-slate-800">{idx+1}. {item.text}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if (item.ans === true) {
                        handleCorrect();
                        setQuizAnswers(prev => ({ ...prev, [idx]: 'ok' }));
                        if (Object.keys({ ...quizAnswers, [idx]: 'ok' }).length === 3) toggleTaskCompletion(selectedTask.id);
                      } else {
                        handleWrong();
                        updateTutor("答錯囉，要多愛護地球環境，再仔細想想！");
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-bold border ${quizAnswers[idx] === 'ok' && item.ans ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white hover:bg-emerald-50 border-slate-300'}`}
                  >
                    ⭕ 是 (正解)
                  </button>
                  <button 
                    onClick={() => {
                      if (item.ans === false) {
                        handleCorrect();
                        setQuizAnswers(prev => ({ ...prev, [idx]: 'ok' }));
                        if (Object.keys({ ...quizAnswers, [idx]: 'ok' }).length === 3) toggleTaskCompletion(selectedTask.id);
                      } else {
                        handleWrong();
                        updateTutor("哎呀，答錯囉！請看一下下方提示。");
                      }
                    }}
                    className={`px-4 py-2 rounded-lg font-bold border ${quizAnswers[idx] === 'ok' && !item.ans ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white hover:bg-red-50 border-slate-300'}`}
                  >
                    ❌ 否 (間違い)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Game Day 3: Grammar & Graduation Exam
    if (currentDay === 3) {
      if (selectedTask.type === "grammar") {
        return (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
            <h3 className="text-lg font-bold text-orange-800">🎮 第三天句型重組 「不但...還...」</h3>
            <p className="text-sm text-slate-600">
              請依順序點選片語卡片，拼出課本的重要造句：<br />
              <strong>「マイ箸を用意することは、安心して食べられるだけでなく、環境も守れて、まさに一石二鳥です！」</strong>
            </p>

            <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-200">
              <p className="text-lg font-bold text-orange-900">
                自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {["自備環保筷，", "不但能吃得安心，", "還能保護環境，", "真是一舉兩得。"].map((phrase, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      handleCorrect();
                      setTutorMessage(`注音聽力練習： ${phrase}`);
                      speakText(phrase, "zh-TW");
                      if (index === 3) {
                        toggleTaskCompletion(selectedTask.id);
                        updateTutor("太優秀了！你已經學會了「不但...還...」的精髓與一舉兩得！");
                      }
                    }}
                    className="px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 text-xs shadow-sm"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Final exam
      const examQuestions = [
        { q: "「筷子」的注音符號是什麼？", options: ["ㄎㄨㄞˋ ㄗ˙", "ㄎㄨㄞ ㄗˇ", "ㄎㄨㄞˋ ㄘ˙"], ans: 0 },
        { q: "成語「一舉兩得」代表什麼意思？", options: ["做一件事同時獲得兩種好處 (一石二鳥)", "拿兩雙筷子吃飯", "很快吃完兩碗湯"], ans: 0 },
        { q: "日本筷子（日式筷子）之所以設計比較短，是因為？", options: ["日本習慣吃單人套餐，飯菜都在自己面前", "日本餐桌是超大圓桌", "方便站著吃便當"], ans: 0 },
        { q: "「垃圾」在台灣教科書讀音的注音是？", options: ["ㄌㄜˋ ㄙㄜˋ", "ㄌㄚ ㄐㄧ", "ㄌㄜˋ ㄐㄧ"], ans: 0 },
        { q: "既能吃得安心，又能愛護地球環境的筷子是？", options: ["免洗筷", "環保筷", "竹筷子"], ans: 1 }
      ];

      const curQ = examQuestions[quizStep] || null;

      if (!curQ) {
        return (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 text-center border-2 border-yellow-300">
            <span className="text-4xl">🏆 🎉 🌟</span>
            <h3 className="text-2xl font-bold text-orange-900 mt-4">恭喜你順利畢業！ (おめでとう！)</h3>
            <p className="text-slate-800 font-medium mt-2">
              你已經在短暫的 3 天內，成功學完了國語第九課「就愛兩兩在一起」！
            </p>
            <p className="text-sm text-slate-600 mt-2">
              不只記住了核心中文詞彙、注音符號、也了解了中日韓的生活文化差異。你太棒了！
            </p>
            <button 
              onClick={() => {
                setQuizStep(0);
                setScore(100);
                toggleTaskCompletion(selectedTask.id);
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600"
            >
              領取筷子小達人證書 📜
            </button>
          </div>
        );
      }

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm font-bold text-orange-800">🎓 筷子大師畢業考 ({quizStep + 1} / 5)</span>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">就快通關囉！</span>
          </div>

          <p className="text-base font-bold text-slate-800">{curQ.q}</p>

          <div className="space-y-3 pt-2">
            {curQ.options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => {
                  if (i === curQ.ans) {
                    handleCorrect();
                    setGameFeedback("⭕ 答對了！你真棒！");
                    setTimeout(() => {
                      setQuizStep(prev => prev + 1);
                      setGameFeedback("");
                    }, 1200);
                  } else {
                    handleWrong();
                    setGameFeedback("❌ 答錯囉，再仔細想想課文內容！");
                  }
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all font-semibold text-sm text-slate-700"
              >
                {opt}
              </button>
            ))}
          </div>

          {gameFeedback && (
            <div className="p-3 text-center rounded-xl bg-orange-100 text-orange-900 font-bold text-xs">
              {gameFeedback}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥢</span>
            <div>
              <h1 className="text-lg font-extrabold text-orange-600">神奇筷子 ‧ 三日速成中文學習營</h1>
              <p className="text-xs text-slate-500">國小四年級精華家庭教師互動程式 (3日コース)</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
              <span className="text-sm">⏱️</span>
              <span className="font-mono font-bold text-orange-700">{formatTime(studyTime)}</span>
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full text-white shadow-sm transition-transform active:scale-95 ${timerActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {timerActive ? "暫停" : "開始"}
              </button>
            </div>

            {/* Score tracker */}
            <div className="bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full border border-yellow-200 font-bold text-sm flex items-center gap-1.5">
              <span>⭐</span>
              <span>得分: {score} 分</span>
            </div>
          </div>
        </div>
      </header>

      {/* TUTOR MASCOT DIALOGUE PANEL */}
      <div className="max-w-7xl mx-auto w-full px-4 py-4">
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-4 text-white shadow-sm flex items-center gap-4 border-2 border-orange-300">
          <div className="text-3xl bg-white/20 p-2 rounded-full shadow-inner">👨‍🏫</div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-100">AI 筷子老師的溫馨提示 (お箸先生の解説)</p>
            <p className="text-sm font-bold mt-1 leading-relaxed">
              {tutorMessage}
            </p>
          </div>
          <button 
            onClick={() => speakText(tutorMessage, "zh-TW")}
            className="px-3 py-1 bg-white/30 hover:bg-white/40 active:scale-95 text-xs font-bold rounded-lg transition-all"
          >
            🔊 語音朗讀
          </button>
        </div>
      </div>

      {/* MAIN TWO COLUMN LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* LEFT COLUMN: 3 Days Navigator */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 3-Day selector */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-1.5">
              <span>📅</span> 三天學習進度選擇 (カレンダー)
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setCurrentDay(d);
                    setSelectedTask(null);
                    setGameFeedback("");
                    setReadProgress([false, false]); 
                    setCurrentReadStep(0);
                    setSpokenText("");
                    setMatchingScore(null);
                    setHasEvaluated(false);
                    playBeep(330, 0.1);
                    updateTutor(`我們開始第 ${d} 天的學習吧！加油！`, `${d}日目の勉強を始めましょう！`);
                  }}
                  className={`py-3 rounded-xl font-bold flex flex-col items-center justify-center transition-all ${currentDay === d ? 'bg-orange-500 text-white shadow-md transform -translate-y-0.5' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                >
                  <span className="text-xs">第</span>
                  <span className="text-lg">{d}</span>
                  <span className="text-xs">天</span>
                </button>
              ))}
            </div>
          </div>

          {/* Day details & tasks checklist */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div>
              <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded-md">今日主題 (今日のテーマ)</span>
              <h3 className="font-bold text-slate-800 text-base mt-2">{DAILY_PLANS[currentDay - 1].title}</h3>
              <p className="text-xs text-slate-600 mt-1">{DAILY_PLANS[currentDay - 1].description}</p>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-bold text-slate-700 text-xs">✍️ 每日任務清單 (每日 30 分鐘):</h4>
              <div className="space-y-2">
                {DAILY_PLANS[currentDay - 1].tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${selectedTask?.id === task.id ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 hover:border-slate-300'}`}
                    onClick={() => {
                      setSelectedTask(task);
                      setGameFeedback("");
                      setReadProgress([false, false]); 
                      setCurrentReadStep(0);
                      setSpokenText("");
                      setMatchingScore(null);
                      setHasEvaluated(false);
                      playBeep(392, 0.1);
                      updateTutor(`開始任務： ${task.text}`);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={completedTasks[task.id] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleTaskCompletion(task.id);
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                      />
                      <span className={`text-xs font-semibold ${completedTasks[task.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {task.text}
                      </span>
                    </div>
                    <span className="text-xs">👉</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Pronunciation Assistant */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 space-y-3">
            <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-1.5">
              <span>📢</span> 調整讀音速度 (スピード調整)
            </h4>
            <p className="text-xs text-emerald-700">可以隨時在這裡調整注音與課文的說話速度喔！</p>
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-800">
                <span>說話速度: 🐌 {speechRate.toFixed(2)}倍速</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1.5" 
                step="0.1" 
                value={speechRate} 
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Workspace Content Area */}
        <div className="lg:col-span-8">
          {renderTaskContent()}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-800 text-slate-400 py-6 mt-auto border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs">教材改寫自未來少年 ‧ 國語科第九課「就愛兩兩在一起」</p>
          <p className="text-xs">© 3-Day Interactive Zhuyin Chinese Learning Camp for Japanese Kids.</p>
        </div>
      </footer>
    </div>
  );
}
