import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION ---
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
  },
  {
    title: "4. 世界各國的飲食計畫 (世界の食文化プロジェクト)",
    japanese: "グレッグ・シーガルは写真を使って各国の子供たちの一週間の食事を記録しました。\n私たちは世界各国の食事が全く違うと思い込んでいましたが、このプロジェクトを通じて、遠く離れた地域（イタリアとアメリカなど）の子供たちが、ハンバーガーやピザなど「似ている（相似）」食事をしていることが分かりました。\nまた、一部の地域では、貧しい人々の方が、富裕層よりもバランスの取れた（均衡）食事をしていることも発見されました。",
    paragraphs: [
      {
        chinese: "格雷格·西格爾以相片記錄各國兒童一週的飲食。我們可能以為世界各國的飲食必定不同。",
        zhuyin: "ㄍㄜˊ ㄌㄟˊ ㄍㄜˊ ‧ ㄒㄧ ㄍㄜˊ ㄦˇ ㄧˇ ㄒㄧㄤˋ ㄆㄧㄢˋ ㄐㄧˋ ㄌㄨˋ ㄍㄜˋ ㄍㄨㄛˊ ㄦˊ ㄊㄨㄥˊ ㄧˋ ㄓㄡ ㄉㄜ˙ ㄧㄣˇ ㄕˊ。ㄨㄛˇ ㄇㄣ˙ ㄎㄜˇ ㄋㄥˊ ㄧˇ ㄨㄟˊ ㄕˋ ㄐㄧㄝˋ ㄍㄜˋ ㄍㄨㄛˊ ㄉㄜ˙ ㄧㄣˇ ㄕˊ ㄅㄧˋ ㄉㄧㄥˋ ㄅㄨˋ ㄊㄨㄥˊ。"
      },
      {
        chinese: "然而，這個計畫發現了不同地區飲食習慣的相似之處。義大利和美國的小孩，雖然距離遙遠，卻都吃了薯條、漢堡和披薩呵！",
        zhuyin: "ㄖㄢˊ ㄦˊ，ㄓㄜˋ ㄍㄜ˙ ㄐㄧˋ ㄏㄨㄚˋ ㄈㄚ ㄒㄧㄢˋ ㄌㄜ˙ ㄅㄨˋ ㄊㄨㄥˊ ㄉㄧˋ ㄑㄩ ㄧㄣˇ ㄕˊ ㄒㄧˊ ㄍㄨㄢˋ ㄉㄜ˙ ㄒㄧㄤ ㄙˋ ㄓ ㄔㄨˋ。ㄧˋ ㄉㄚˋ ㄌㄧˋ ㄏㄢˋ ㄇㄟˇ ㄍㄨㄛˊ ㄉㄜ˙ ㄒㄧㄠˇ ㄏㄞˊ，ㄙㄨㄟ ㄖㄢˊ ㄐㄩˋ ㄌㄧˊ ㄧㄠˊ ㄩㄢˇ，ㄑㄩㄝˋ ㄉㄡ ㄔ ㄌㄜ˙ ㄕㄨˇ ㄊㄧㄠˊ、ㄏㄢˋ ㄅㄠˇ ㄏㄢˋ ㄆㄧ ㄙㄚˋ ㄏㄜ！"
      },
      {
        chinese: "在某些地區，飲食最均衡的是窮人而非富人。這個計畫讓父母注意孩子的飲食問題。",
        zhuyin: "ㄗㄞˋ ㄇㄡˇ ㄒㄧㄝ ㄉㄧˋ ㄑㄩ，ㄧㄣˇ ㄕˊ ㄗㄨㄟˋ ㄐㄩㄣ ㄏㄥˊ ㄉㄜ˙ ㄕˋ ㄑㄩㄥˊ ㄖㄣˊ ㄦˊ ㄈㄟ ㄈㄨˋ ㄖㄣˊ。ㄓㄜˋ ㄍㄜ˙ ㄐㄧˋ ㄏㄨㄚˋ ㄖㄤˋ ㄈㄨˋ ㄇㄨˇ ㄓㄨˋ ㄧˋ ㄏㄞˊ ㄗ˙ ㄉㄜ˙ ㄧㄣˇ ㄕˊ ㄨㄣˋ ㄊㄧˊ。"
      }
    ],
    chinese: "格雷格·西格爾以相片記錄各國兒童一週的飲食。我們可能以為世界各國的飲食必定不同。然而，這個計畫發現了不同地區飲食習慣的相似之處。義大利和美國的小孩，雖然距離遙遠，卻都吃了薯條、漢堡和披薩呵！在某些地區，飲食最均衡的是窮人而非富人。這個計畫讓父母注意孩子的飲食問題。"
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
  { char: "一舉兩得", zhuyin: "ㄧˋ ㄐㄩˇ ㄌㄧㄤˇ ㄉㄜˊ", meaning: "一石二鳥", example: "這件事既省時又省錢，真是一舉兩得！", exMeaning: "這是時間也省了，錢也省了，真是一石二鳥！" },
  { char: "垃圾", zhuyin: "ㄌㄜˋ ㄙㄜˋ", meaning: "ゴミ (台灣發音: lèsè)", example: "請不要亂丟垃圾。", exMeaning: "ゴミをポイ捨てしないでください。" },
  { char: "健康", zhuyin: "ㄐㄧㄢˋ ㄎㄤ", meaning: "健康", example: "多吃蔬菜對健康很好！", exMeaning: "野菜をたくさん食べるのは体に良いです！" },
  // 新增 Day 4-6 單字
  { char: "相似", zhuyin: "ㄒㄧㄤ ㄙˋ", meaning: "似ている", example: "他們的飲食習慣很相似。", exMeaning: "彼らの食習慣はとても似ています。" },
  { char: "減少", zhuyin: "ㄐㄧㄢˇ ㄕㄠˇ", meaning: "減らす", example: "使用環保筷可以減少垃圾。", exMeaning: "マイ箸を使えばゴミを減らすことができます。" },
  { char: "均衡", zhuyin: "ㄐㄩㄣ ㄏㄥˊ", meaning: "バランスが取れている", example: "我們要多吃青菜，保持飲食均衡。", exMeaning: "私たちは野菜をたくさん食べて、食事のバランスを保つべきです。" }
];

const DAILY_PLANS = [
  {
    day: 1,
    title: "第一天: 筷子謎語與各國文化 🍜",
    description: "首先讓我們來動動腦解開有趣的筷子謎語，並掌握中日韓三國筷子的特色與使用文化吧！",
    tasks: [
      { id: "read1", type: "read", text: "閱讀課文第一部分 & 大聲全文朗讀", target: 0 },
      { id: "vocab1", type: "vocab", text: "學習生字：筷子、習慣、套餐...", target: [0, 1, 2, 3, 4] },
      { id: "quiz1", type: "game", text: "日中韓筷子配對連連看" }
    ]
  },
  {
    day: 2,
    title: "第二天: 免洗筷與環保筷 🌲",
    description: "方便的免洗筷與自備的環保筷，讓我們來整理並比較它們的優點與缺點！",
    tasks: [
      { id: "read2", type: "read", text: "閱讀課文第二部分 & 大聲全文朗讀", target: 1 },
      { id: "vocab2", type: "vocab", text: "學習生字：免洗筷、環保筷、垃圾...", target: [5, 6, 8, 9] },
      { id: "quiz2", type: "game", text: "環保大抉擇是非問答" }
    ]
  },
  {
    day: 3,
    title: "第三天: 一舉兩得與成語 🏆",
    description: "學習重要四字成語「一舉兩得」的用法，並挑戰重組句子！",
    tasks: [
      { id: "read3", type: "read", text: "閱讀百寶箱佳句 & 大聲全文朗讀", target: 2 },
      { id: "vocab3", type: "vocab", text: "學習重要成語：一舉兩得", target: [7] },
      { id: "grammar3", type: "grammar", text: "重組句型「不但...還...」", target: null }
    ]
  },
  {
    day: 4,
    title: "第四天: 筷子優點與因果造句 💡",
    description: "綜合複習筷子的優點（P.60-61），並在筆記本上練習「因為...所以...」的因果造句！",
    tasks: [
      { id: "vocab4", type: "vocab", text: "單字複習：減少、相似", target: [11, 10] },
      { id: "game4", type: "game", text: "金頭腦：筷子的優點有哪些？" },
      { id: "notebook4", type: "notebook", text: "【紙本任務】筆記本造句：因為...所以..." }
    ]
  },
  {
    day: 5,
    title: "第五天: 世界飲食大調查 🍔",
    description: "閱讀西格爾的攝影計畫（P.62-65），探尋世界各地孩童飲食的相似之處。",
    tasks: [
      { id: "read5", type: "read", text: "閱讀測驗：各國飲食計畫 & 朗讀", target: 3 },
      { id: "game5", type: "game", text: "閱讀小偵探：填空與是非題" },
      { id: "notebook5", type: "notebook", text: "【紙本任務】筆記本造句：一舉兩得" }
    ]
  },
  {
    day: 6,
    title: "第六天: 第九課總複習大會考 🎓",
    description: "把這六天的精華全部複習一遍，向家長展示你的學習成果，領取證書！",
    tasks: [
      { id: "vocab6", type: "vocab_all", text: "字彙總複習（全 13 個單字）", target: null },
      { id: "final6", type: "game", text: "第九課筷子大師畢業考！" },
      { id: "notebook6", type: "notebook", text: "【最終任務】給家長看筆記本並領取通關證明！" }
    ]
  }
];

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [studyTime, setStudyTime] = useState(1800); 
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [tutorMessage, setTutorMessage] = useState("你好！歡迎來到中文學習營！請從左邊選擇第 1 天開始學習吧！");
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

  const geminiApiKey = "";

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
          setSpeechError("請允許麥克風權限以使用 AI 聽力評分。 (マイクの許可をお願いします。)");
          setIsListening(false);
        } else {
          setSpeechError("語音系統暫時有小狀況。 (語音系統エラーが発生しました。)");
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
      updateTutor(`太棒了！你的全文朗讀挑戰成功！相似度：${finalScore}%`, `素晴らしい！きれいに全文を音読できています！`);
    } else {
      handleWrong();
      updateTutor(`AI 評分匹配度：${finalScore}%。可以再大聲、連續且清晰地多讀一次全文喔！`, `もう少し大聲でハッキリと読んでみましょう！`);
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
        setTimeout(() => recognitionRef.current.start(), 200);
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
    updateTutor(`太棒了！模擬全文朗讀成功！你順利完成了第 ${currentReadStep + 1} 次全文音讀挑戰！`, `すばらしい！よくできました！`);
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
    } catch (e) { }
  };

  const handleCorrect = () => {
    playBeep(600, 0.2, "triangle");
    setTimeout(() => playBeep(800, 0.3, "triangle"), 150);
  };
  const handleWrong = () => { playBeep(250, 0.4, "sawtooth"); };

  useEffect(() => {
    let interval = null;
    if (timerActive && studyTime > 0) {
      interval = setInterval(() => setStudyTime((prev) => prev - 1), 1000);
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

  // --- RENDERING TASKS ---
  const renderReadTask = (page, taskId) => {
    const allReadCompleted = readProgress.every(v => v === true);
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold text-amber-800">{page.title}</h3>
          <button 
            onClick={() => {
              toggleTaskCompletion(taskId);
              if (!allReadCompleted) setReadProgress([true, true]);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${completedTasks[taskId] ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>

        <div className="space-y-6">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 space-y-1">
              <p className="text-lg font-bold text-slate-800 tracking-wide leading-relaxed">{para.chinese}</p>
              <p className="text-xs font-semibold text-sky-800 tracking-wider leading-relaxed bg-sky-50/50 p-1.5 rounded border border-sky-100/30 font-mono">注音: {para.zhuyin}</p>
            </div>
          ))}
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => speakText(page.chinese, "zh-TW")}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm"
            >🔊 聽課文全文朗讀 (華語)</button>
          </div>
        </div>

        {/* AI Reading Assistant */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-2xl border-2 border-orange-200 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎤</span>
            <div>
              <h4 className="font-bold text-orange-800 text-sm">AI 語音音讀挑戰：大聲跟讀課文全文 2 次</h4>
              <p className="text-xs text-slate-600">請按下「開始朗讀」後大聲朗讀全文，讀完點選「結束並評分」。</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentReadStep(idx); setSpokenText(""); setMatchingScore(null); setSpeechError(""); setHasEvaluated(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${currentReadStep === idx ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border'} flex items-center justify-center gap-1.5`}
              >
                <span>第 {idx + 1} 次全文朗讀</span>
                {readProgress[idx] ? <span className="text-emerald-500">✅</span> : <span className="text-slate-300">○</span>}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {!isListening ? (
              <button onClick={startListening} className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white flex justify-center gap-2">🎤 開始朗讀</button>
            ) : (
              <button onClick={stopListeningAndEvaluate} className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 font-bold text-sm text-white flex justify-center gap-2 animate-pulse">🛑 結束並評分</button>
            )}
            <button onClick={simulateCorrectReading} className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs">👌 手動驗證</button>
          </div>

          {isListening && (<div className="bg-amber-50 p-4 rounded-xl border border-dashed border-amber-300 text-center text-amber-800 font-bold text-sm animate-pulse">🎙️ AI 正在聆聽中...</div>)}
          
          {hasEvaluated && (spokenText || matchingScore !== null || speechError) && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm">
              {speechError ? (<p className="text-red-500 font-semibold text-xs">{speechError}</p>) : (
                <>
                  {spokenText && (<div className="text-slate-700 font-medium">🎧 辨識結果： <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded block mt-1">{spokenText}</span></div>)}
                  {matchingScore !== null && (
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-semibold text-slate-600">🎯 相似度：</span>
                      <span className={`text-lg font-bold ${matchingScore >= 35 ? 'text-emerald-600' : 'text-red-500'}`}>{matchingScore}%</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl relative border border-slate-100">
          <span className="absolute top-2 right-2 text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded">日本語訳</span>
          <p className="text-sm text-slate-600 leading-relaxed pt-2 whitespace-pre-line">{page.japanese}</p>
        </div>
      </div>
    );
  };

  const renderInteractiveGame = () => {
    // Day 1: Chopstick matching
    if (selectedTask.id === 'quiz1') {
      const items = [
        { country: "中式筷子 (中國)", desc: "習慣圍著大圓桌吃飯，為了夾比較遠的菜...", match: "長" },
        { country: "日式筷子 (日本)", desc: "習慣分裝成單人套餐，飯菜都在自己面前...", match: "短" },
        { country: "韓式筷子 (韓國)", desc: "端菜的過程中為了防止筷子滾動掉落...", match: "扁" }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🎮 筷子特徵連連看</h3>
          <p className="text-sm text-slate-500">點選正確的筷子外型設計特徵（長、短、扁）！</p>
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-4">
                <div><span className="font-bold text-orange-700">{it.country}</span><p className="text-xs text-slate-600 mt-1">{it.desc}</p></div>
                <div className="flex gap-2">
                  {["長", "短", "扁"].map((char) => (
                    <button key={char} onClick={() => {
                        if (char === it.match) {
                          handleCorrect(); setQuizAnswers(prev => ({ ...prev, [idx]: true }));
                          if (Object.keys({ ...quizAnswers, [idx]: true }).length === 3) toggleTaskCompletion(selectedTask.id);
                        } else { handleWrong(); }
                      }}
                      className={`px-4 py-2 rounded-lg font-bold border ${quizAnswers[idx] && it.match === char ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-orange-50'}`}
                    >{char}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Day 2: Eco chopsticks Quiz
    if (selectedTask.id === 'quiz2') {
      const qList = [
        { text: "免洗筷雖然方便，但會製造大量垃圾且可能有化學物質殘留。", ans: true },
        { text: "自備環保筷既能吃得安心、又能保護環境，是一舉兩得。", ans: true },
        { text: "環保筷非常方便，絕對沒有忘記帶或無法清洗的缺點。", ans: false }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🎮 環保抉擇是非題</h3>
          <div className="space-y-4">
            {qList.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border space-y-3">
                <p className="text-sm font-semibold text-slate-800">{idx+1}. {item.text}</p>
                <div className="flex gap-4">
                  <button onClick={() => {
                      if (item.ans === true) { handleCorrect(); setQuizAnswers(prev => ({...prev, [idx]: 'ok'})); if(Object.keys({...quizAnswers, [idx]: 'ok'}).length === 3) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                    }} className={`px-4 py-2 rounded font-bold border ${quizAnswers[idx]==='ok' && item.ans ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-emerald-50'}`}>⭕ 是</button>
                  <button onClick={() => {
                      if (item.ans === false) { handleCorrect(); setQuizAnswers(prev => ({...prev, [idx]: 'ok'})); if(Object.keys({...quizAnswers, [idx]: 'ok'}).length === 3) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                    }} className={`px-4 py-2 rounded font-bold border ${quizAnswers[idx]==='ok' && !item.ans ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-red-50'}`}>❌ 否</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Day 3: Grammar Reorder
    if (selectedTask.id === 'grammar3') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🎮 句型重組「不但...還...」</h3>
          <div className="bg-orange-50 p-4 rounded-xl text-center border">
            <p className="text-lg font-bold text-orange-900">自備環保筷，不但能吃得安心，還能保護環境，真是一舉兩得。</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl flex flex-wrap gap-2 justify-center">
            {["自備環保筷，", "不但能吃得安心，", "還能保護環境，", "真是一舉兩得。"].map((phrase, idx) => (
              <button key={idx} onClick={() => {
                  handleCorrect(); speakText(phrase);
                  if (idx === 3) toggleTaskCompletion(selectedTask.id);
                }} className="px-4 py-2 bg-white hover:bg-amber-100 font-bold rounded-lg border">{phrase}</button>
            ))}
          </div>
        </div>
      );
    }

    // Day 4: Golden Brain (Page 60-61)
    if (selectedTask.id === 'game4') {
      const options = [
        { text: "讓套餐更美味 (定食が美味しくなる)", correct: false },
        { text: "不易一滾到地上 (転がりにくい)", correct: true },
        { text: "可以減少垃圾 (ゴミを減らせる)", correct: true },
        { text: "避免餅乾變軟 (お菓子が湿気ない)", correct: false }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-orange-200 space-y-6">
          <h3 className="text-lg font-bold text-orange-800">🧠 金頭腦測驗：課文中的筷子有哪些優點？</h3>
          <p className="text-sm text-slate-500">請回想課文內容，點選**所有**正確的優點！（課本第 60 頁）</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt, idx) => (
              <button key={idx} onClick={() => {
                  if (opt.correct) {
                    handleCorrect(); setQuizAnswers(prev => ({...prev, [idx]: true}));
                    if(Object.keys({...quizAnswers, [idx]: true}).length === 2) {
                      toggleTaskCompletion(selectedTask.id);
                      setGameFeedback("🎉 答對了！扁筷子不易滾動，環保筷可以減少垃圾！");
                    }
                  } else {
                    handleWrong(); setGameFeedback("❌ 這個不是課文中提到的筷子優點喔，再想想！");
                  }
                }}
                className={`p-4 rounded-xl border-2 font-bold transition-all ${quizAnswers[idx] ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-50 border-slate-200 hover:border-orange-400 text-slate-700'}`}
              >{opt.text}</button>
            ))}
          </div>
          {gameFeedback && <div className="p-3 text-center bg-orange-100 text-orange-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 5: Reading Detective (Page 64-65)
    if (selectedTask.id === 'game5') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-emerald-200 space-y-6">
          <h3 className="text-lg font-bold text-emerald-800">🕵️ 閱讀小偵探：世界飲食大調查</h3>
          
          <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
            <p className="font-bold text-slate-800">1. 填空題 (課本P.64)：</p>
            <p className="text-sm">這個計畫發現了不同地區飲食習慣的哪種之處？</p>
            <div className="flex gap-2">
              {["相對 (相対的)", "相反 (反対)", "相似 (似ている)"].map((opt, i) => (
                <button key={i} onClick={() => {
                  if(i === 2) { handleCorrect(); setQuizAnswers(prev => ({...prev, q1: true})); } else { handleWrong(); }
                }} className={`px-4 py-2 rounded-lg font-bold border ${quizAnswers.q1 && i===2 ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-emerald-50'}`}>{opt}</button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
            <p className="font-bold text-slate-800">2. 是非題 (課本P.65)：</p>
            <p className="text-sm">關於計畫發現，富人的飲食「一定」比窮人吃得均衡嗎？</p>
            <div className="flex gap-2">
              <button onClick={() => handleWrong()} className="px-4 py-2 bg-white border rounded-lg font-bold hover:bg-red-50">⭕ 是的</button>
              <button onClick={() => { 
                handleCorrect(); setQuizAnswers(prev => ({...prev, q2: true})); 
                if(quizAnswers.q1) toggleTaskCompletion(selectedTask.id); 
              }} className={`px-4 py-2 border rounded-lg font-bold ${quizAnswers.q2 ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-emerald-50'}`}>❌ 不是（有些窮人吃得更均衡）</button>
            </div>
          </div>
        </div>
      );
    }

    // Day 6: Final Exam
    if (selectedTask.id === 'final6') {
      const examQuestions = [
        { q: "「筷子」的注音符號是什麼？", options: ["ㄎㄨㄞˋ ㄗ˙", "ㄎㄨㄞ ㄗˇ", "ㄎㄨㄞˋ ㄘ˙"], ans: 0 },
        { q: "成語「一舉兩得」代表什麼意思？", options: ["做一件事獲得兩種好處 (一石二鳥)", "拿兩雙筷子吃飯", "很快吃完兩碗湯"], ans: 0 },
        { q: "韓國筷子（韓式筷子）之所以設計比較扁，是因為？", options: ["日本習慣吃單人套餐", "端菜過程中為了防止筷子滾動掉落", "方便站著吃便當"], ans: 1 },
        { q: "世界各國的兒童飲食（例如美國跟義大利），其實有什麼發現？", options: ["完全不一樣", "很「相似」，都會吃漢堡披薩", "大家都只吃青菜"], ans: 1 },
        { q: "既能吃得安心，又能減少「垃圾」保護環境的筷子是？", options: ["免洗筷", "環保筷", "塑膠筷"], ans: 1 }
      ];

      const curQ = examQuestions[quizStep] || null;

      if (!curQ) {
        return (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 text-center border-2 border-yellow-300">
            <span className="text-5xl">🏆 🎉</span>
            <h3 className="text-2xl font-bold text-orange-900 mt-4">恭喜你成為筷子小達人！</h3>
            <p className="text-slate-800 font-medium mt-2">你已經完美學完了國語第九課「就愛兩兩在一起」！</p>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="mt-6 px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-lg hover:bg-orange-700">領取通關證明</button>
          </div>
        );
      }

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm font-bold text-orange-800">🎓 第九課終極畢業考 ({quizStep + 1} / 5)</span>
          </div>
          <p className="text-base font-bold text-slate-800">{curQ.q}</p>
          <div className="space-y-3">
            {curQ.options.map((opt, i) => (
              <button key={i} onClick={() => {
                  if (i === curQ.ans) {
                    handleCorrect(); setGameFeedback("⭕ 答對了！");
                    setTimeout(() => { setQuizStep(prev => prev + 1); setGameFeedback(""); }, 1000);
                  } else { handleWrong(); setGameFeedback("❌ 答錯囉，再仔細想想！"); }
                }} className="w-full text-left p-4 rounded-xl border hover:border-orange-500 hover:bg-orange-50 font-semibold text-slate-700">{opt}</button>
            ))}
          </div>
          {gameFeedback && <div className="p-3 text-center rounded-xl bg-orange-100 text-orange-900 font-bold">{gameFeedback}</div>}
        </div>
      );
    }

    return null;
  };

  // Notebook interactive component
  const renderNotebookTask = () => {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-blue-200 text-center space-y-6 animate-fade-in">
        <span className="text-5xl">📓</span>
        <h3 className="text-2xl font-bold text-blue-900">{selectedTask.text}</h3>
        <p className="text-slate-600">
          這是一個實體任務！請拿出你的筆記本，按照課本的要求，手寫完成這項練習。
          <br/>寫完之後，請家長確認，然後按下方的完成按鈕！
        </p>
        
        {!completedTasks[selectedTask.id] ? (
          <button 
            onClick={() => {
              toggleTaskCompletion(selectedTask.id);
              updateTutor("太棒了！紙本作業也順利完成了，你真的很努力！", "ノートの宿題も完了しましたね！よく頑張りました！");
            }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-transform active:scale-95 text-lg"
          >
            ✅ 我已經寫完筆記本了！ (完了ボタン)
          </button>
        ) : (
          <div className="p-4 bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200">
            🎉 筆記本任務已確認完成！請家長在上面簽名或蓋章喔！
          </div>
        )}
      </div>
    );
  };

  const renderTaskContent = () => {
    if (!selectedTask) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-orange-100">
          <span className="text-7xl mb-4">🥢</span>
          <h3 className="text-xl font-bold text-slate-800 mb-2">請選擇第 {currentDay} 天的學習任務！</h3>
          <p className="text-slate-600 text-sm">點選左側清單中的任務開始學習。別忘了啟動計時器喔！</p>
          <button 
            onClick={() => { setTimerActive(true); updateTutor("那我們開始學習吧！加油！", "さあ、勉強をスタートしましょう！"); }}
            className={`mt-6 px-6 py-3 rounded-full font-bold text-white shadow-md transition-transform active:scale-95 ${timerActive ? 'bg-emerald-500' : 'bg-orange-500'}`}
          >
            {timerActive ? "⏱️ 計時器運行中..." : "⏱️ 開始今日學習！"}
          </button>
        </div>
      );
    }

    if (selectedTask.type === "read") {
      const page = TEXTBOOK_PAGES[selectedTask.target];
      return renderReadTask(page, selectedTask.id);
    }

    if (selectedTask.type === "vocab" || selectedTask.type === "vocab_all") {
      const targetIndices = selectedTask.type === "vocab_all" ? [0,1,2,3,4,5,6,7,8,9,10,11,12] : selectedTask.target;
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-bold text-orange-800">✨ 今日生字詞卡 (単語カード)</h3>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className={`px-4 py-2 rounded-full text-xs font-bold ${completedTasks[selectedTask.id] ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>
              {completedTasks[selectedTask.id] ? "✅ 詞彙全部記住囉" : "🎴 記住後請點選！"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetIndices.map((idx) => {
              const item = VOCABULARY[idx];
              return (
                <div key={idx} onClick={() => { setSelectedCard(idx); speakText(item.char, "zh-TW"); }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:-translate-y-1 ${selectedCard === idx ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-slate-800">{item.char}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">注音: {item.zhuyin}</span>
                  </div>
                  <p className="text-sm text-emerald-700 font-bold mt-2 border-t pt-2 border-dashed">{item.meaning}</p>
                  <div className="mt-2 text-xs text-slate-500 space-y-1 bg-slate-50 p-2 rounded">
                    <p className="italic">"{item.example}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (selectedTask.type === "game" || selectedTask.type === "grammar") {
      return renderInteractiveGame();
    }

    if (selectedTask.type === "notebook") {
      return renderNotebookTask();
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-200">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥢</span>
            <div>
              <h1 className="text-lg font-extrabold text-orange-600">神奇筷子 ‧ 六日中文學習營</h1>
              <p className="text-xs text-slate-500">國小四年級互動程式 (第九課完整版)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
              <span className="text-sm">⏱️</span>
              <span className="font-mono font-bold text-orange-700">{formatTime(studyTime)}</span>
              <button onClick={() => setTimerActive(!timerActive)} className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${timerActive ? 'bg-amber-500' : 'bg-emerald-500'}`}>{timerActive ? "暫停" : "開始"}</button>
            </div>
            <div className="bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full border border-yellow-200 font-bold text-sm">⭐ 得分: {score}</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-4">
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-4 text-white shadow-sm flex items-center gap-4 border-2 border-orange-300">
          <div className="text-3xl bg-white/20 p-2 rounded-full shadow-inner">👨‍🏫</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-orange-100">AI 老師的溫馨提示</p>
            <p className="text-sm font-bold mt-1 leading-relaxed">{tutorMessage}</p>
          </div>
          <button onClick={() => speakText(tutorMessage, "zh-TW")} className="px-3 py-1 bg-white/30 text-xs font-bold rounded-lg hover:bg-white/40">🔊 聽提示</button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-3 text-sm">📅 六天學習進度選擇</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setCurrentDay(d); setSelectedTask(null); setGameFeedback(""); setReadProgress([false, false]); setCurrentReadStep(0); setSpokenText(""); setMatchingScore(null); setHasEvaluated(false);
                    playBeep(330, 0.1);
                    updateTutor(d <= 3 ? `我們開始第 ${d} 天的學習吧！` : `進入第 ${d} 天的進階挑戰囉！準備好筆記本了嗎？`);
                  }}
                  className={`py-2 rounded-xl font-bold flex flex-col items-center transition-all ${currentDay === d ? 'bg-orange-500 text-white transform -translate-y-0.5' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  <span className="text-xs">Day {d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div>
              <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded-md">今日主題</span>
              <h3 className="font-bold text-slate-800 text-base mt-2">{DAILY_PLANS[currentDay - 1].title}</h3>
              <p className="text-xs text-slate-600 mt-1">{DAILY_PLANS[currentDay - 1].description}</p>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-bold text-slate-700 text-xs">✍️ 每日任務清單:</h4>
              <div className="space-y-2">
                {DAILY_PLANS[currentDay - 1].tasks.map((task) => (
                  <div key={task.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer ${selectedTask?.id === task.id ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-300'}`}
                    onClick={() => {
                      setSelectedTask(task); setGameFeedback(""); setReadProgress([false, false]); setCurrentReadStep(0); setSpokenText(""); setMatchingScore(null); setHasEvaluated(false);
                      playBeep(392, 0.1); updateTutor(`開始任務： ${task.text}`);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{completedTasks[task.id] ? '✅' : '⬜'}</span>
                      <span className={`text-xs font-semibold ${completedTasks[task.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  </div>
                ))}
              </div>
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
