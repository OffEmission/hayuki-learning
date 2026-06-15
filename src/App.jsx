import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION FOR LESSON 10 ---
const TEXTBOOK_PAGES = [
  {
    title: "1. 遇見小王子與大象蛇 (王子さまとの出会いと象を飲み込んだ蛇)",
    japanese: "【ナレーション】見渡す限りの砂漠の中で、飛行士は宇宙から来た星の王子さまと出会いました。彼は帽子のように見える絵を描いて王子さまに見せました。\n飛行士：僕が何を描いたか当ててみて。\n王子：簡単だよ！とてもよく似てる。\n飛行士：「これは帽子だ」って当てようとしてる？みんなそう言うんだ。\n王子：帽子じゃないよ！君が描いたのは、象を飲み込んだヘビだよ！\n飛行士：（とても驚いて）どうしてわかったの？\n王子：（絵を指さして）3歳の子供でもわかるよ！それに……。\n飛行士：それに何？\n王子：このヘビ、少し前に大きなクジラを飲み込んだばかりだね！",
    paragraphs: [
      {
        chinese: "旁白：一望無際的沙漠中，飛行員遇見了從外太空來的小王子，他畫了一幅看起來像帽子的圖畫給小王子看。",
        zhuyin: "ㄆㄤˊ ㄅㄞˊ：ㄧˋ ㄨㄤˋ ㄨˊ ㄐㄧˋ ㄉㄜ˙ ㄕㄚ ㄇㄛˋ ㄗㄨㄥ，ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ ㄩˋ ㄐㄧㄢˋ ㄌㄜ˙ ㄘㄨㄥˊ ㄨㄞˋ ㄊㄞˋ ㄎㄨㄥ ㄌㄞˊ ㄉㄜ˙ ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ，ㄊㄚ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄈㄨˊ ㄎㄢˋ ㄑㄧˇ ㄌㄞˊ ㄒㄧㄤˋ ㄇㄠˋ ㄗ˙ ㄉㄜ˙ ㄊㄨˊ ㄏㄨㄚˋ ㄍㄟˇ ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ ㄎㄢˋ。"
      },
      {
        chinese: "飛行員：你猜我畫的是什麼？小王子：這很容易呀！你畫得很像。飛行員：你是不是想要猜「這是一頂帽子」？很多人都這麼猜。",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄋㄧˇ ㄘㄞ ㄨㄛˇ ㄏㄨㄚˋ ㄉㄜ˙ ㄕˋ ㄕㄣˊ ㄇㄜ˙？ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄏㄣˇ ㄖㄨㄥˊ ㄧˋ ㄧㄚ！ㄋㄧˇ ㄏㄨㄚˋ ㄉㄜ˙ ㄏㄣˇ ㄒㄧㄤˋ。ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄋㄧˇ ㄕˋ ㄅㄨˊ ㄕˋ ㄒㄧㄤˇ ㄧㄠˋ ㄘㄞ 「ㄓㄜˋ ㄕˋ ㄧˋ ㄉㄧㄥˇ ㄇㄠˋ ㄗ˙」？ㄏㄣˇ ㄉㄨㄛ ㄖㄣˊ ㄉㄡ ㄓㄜˋ ㄇㄜ˙ ㄘㄞ。"
      },
      {
        chinese: "小王子：它不是帽子！你畫的是一條吞了大象的蛇！飛行員：(大吃一驚) 你怎麼知道？小王子：(指著圖畫) 連三歲小孩都看得出來！而且……。飛行員：而且什麼？小王子：這條蛇不久前才吞過大鯨魚！",
        zhuyin: "ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄊㄚ ㄅㄨˊ ㄕˋ ㄇㄠˋ ㄗ˙！ㄋㄧˇ ㄏㄨㄚˋ ㄉㄜ˙ ㄕˋ ㄧˋ ㄊㄧㄠˊ ㄊㄨㄣ ㄌㄜ˙ ㄉㄚˋ ㄒㄧㄤˋ ㄉㄜ˙ ㄕㄜˊ！ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄉㄚˋ ㄔ ㄧˋ ㄐㄧㄥ) ㄋㄧˇ ㄗㄣˇ ㄇㄜ˙ ㄓ ㄉㄠˋ？ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：(ㄓˇ ㄓㄜ˙ ㄊㄨˊ ㄏㄨㄚˋ) ㄌㄧㄢˊ ㄙㄢ ㄙㄨㄟˋ ㄒㄧㄠˇ ㄏㄞˊ ㄉㄡ ㄎㄢˋ ㄉㄜ˙ ㄔㄨ ㄌㄞˊ！ㄦˊ ㄑㄧㄝˇ……。ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄦˊ ㄑㄧㄝˇ ㄕㄣˊ ㄇㄜ˙？ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄊㄧㄠˊ ㄕㄜˊ ㄅㄨˋ ㄐㄧㄡˇ ㄑㄧㄢˊ ㄘㄞˊ ㄊㄨㄣ ㄍㄨㄛˋ ㄉㄚˋ ㄐㄧㄥ ㄩˊ！"
      }
    ],
    chinese: "旁白：一望無際的沙漠中，飛行員遇見了從外太空來的小王子，他畫了一幅看起來像帽子的圖畫給小王子看。飛行員：你猜我畫的是什麼？小王子：這很容易呀！你畫得很像。飛行員：你是不是想要猜「這是一頂帽子」？很多人都這麼猜。小王子：它不是帽子！你畫的是一條吞了大象的蛇！飛行員：大吃一驚 你怎麼知道？小王子：指著圖畫 連三歲小孩都看得出來！而且。飛行員：而且什麼？小王子：這條蛇不久前才吞過大鯨魚！"
  },
  {
    title: "2. 請幫我畫一隻羊 (僕に羊を描いて)",
    japanese: "飛行士：（呆然として）なんてことだ！この事は僕も知らなかった……。\n王子：君は絵がとても上手だね！僕に羊を1匹描いてくれない？\n飛行士：任せて！（筆を振るって羊を描き、王子に見せる）\n王子：この羊は年をとりすぎてる。僕の羊には長生きしてほしいんだ。\n飛行士：わかった！ちょっと待って。（また羊を描く）\n王子：これはもう成長したオス羊だよ。僕は子羊が欲しいな。\n飛行士：もう1回チャンスをちょうだい。今度は絶対に満足させるから！（また描く）\n王子：この羊は病気だよ、元気がなさそう。活発で健康な子羊を描き直して！\n飛行士：（少し不機嫌に）君は注文が多いな！じゃあこれでどうだ、これを君に描いてあげる。（箱を描いた）\n王子：僕の欲しい子羊はどこ？",
    paragraphs: [
      {
        chinese: "飛行員：(目瞪口呆) 天哪！這件事連我不知道……。小王子：我覺得你很會畫畫！能不能請你畫一隻羊給我？",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄇㄨˋ ㄉㄥˋ ㄎㄡˇ ㄉㄞ) ㄊㄧㄢ ㄋㄚˇ！ㄓㄜˋ ㄐㄧㄢˋ ㄕˋ ㄌㄧㄢˊ ㄨㄛˇ ㄅㄨˋ ㄓ ㄉㄠˋ……。ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄨㄛˇ ㄐㄩㄝˊ ㄉㄜ˙ ㄋㄧˇ ㄏㄣˇ ㄏㄨㄟˋ ㄏㄨㄚˋ ㄏㄨㄚˋ！ㄋㄥˊ ㄅㄨˋ ㄋㄥˊ ㄑㄧㄥˇ ㄋㄧˇ ㄏㄨㄚˋ ㄧˋ ㄓ ㄧㄤˊ ㄍㄟˇ ㄨㄛˇ？"
      },
      {
        chinese: "飛行員：沒問題！(揮動畫筆，畫了一隻羊給小王子看) 小王子：這隻太老了，我希望我的羊可以活得久一點。",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄇㄟˊ ㄨㄣˋ ㄊㄧˊ！(ㄏㄨㄟ ㄉㄨㄥˋ ㄏㄨㄚˋ ㄅㄧˇ，ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄓ ㄧㄤˊ ㄍㄟˇ ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ ㄎㄢˋ) ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄓ ㄊㄞˋ ㄌㄠˇ ㄌㄜ˙，ㄨㄛˇ ㄒㄧ ㄨㄤˋ ㄨㄛˇ ㄉㄜ˙ ㄧㄤˊ ㄎㄜˇ ㄧˇ ㄏㄨㄛˊ ㄉㄜ˙ ㄐㄧㄡˇ ㄧˋ ㄉㄧㄢˇ。"
      },
      {
        chinese: "飛行員：好！等一下。(又畫了一隻羊) 小王子：這是已經長大的公羊，我想要一隻小羊。飛行員：再給我一次機會，這次保證讓你滿意！(再畫了一隻羊)",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄏㄠˇ！ㄉㄥˇ ㄧˊ ㄒㄧㄚˋ。(ㄧㄡˋ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄓ ㄧㄤˊ) ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄕˋ ㄧˇ ㄐㄧㄥ ㄓㄤˇ ㄉㄚˋ ㄉㄜ˙ ㄍㄨㄥ ㄧㄤˊ，ㄨㄛˇ ㄒㄧㄤˇ ㄧㄠˋ ㄧˋ ㄓ ㄒㄧㄠˇ ㄧㄤˊ。ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄗㄞˋ ㄍㄟˇ ㄨㄛˇ ㄧˊ ㄘˋ ㄐㄧ ㄏㄨㄟˋ，ㄓㄜˋ ㄘˋ ㄅㄠˇ ㄓㄥˋ ㄖㄤˋ ㄋㄧˇ ㄇㄢˇ ㄧˋ！(ㄗㄞˋ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˊ ㄓ ㄧㄤˊ)"
      },
      {
        chinese: "小王子：這隻羊生病了，看起來沒什麼精神，麻煩你幫我重新畫一隻活活潑潑、健健康康的小羊！飛行員：(有點不高興) 你的意見真多！這樣好了，我畫這個給你。(畫了一個箱子) 小王子：我要的小羊呢？",
        zhuyin: "ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄓ ㄧㄤˊ ㄕㄥ ㄅㄧㄥˋ ㄌㄜ˙，ㄎㄢˋ ㄎㄧˇ ㄌㄞˊ ㄇㄟˊ ㄕㄣˊ ㄇㄜ˙ ㄐㄧㄥ ㄕㄣˊ，ㄇㄚˊ ㄈㄢˊ ㄋㄧˇ ㄅㄤ ㄨㄛˇ ㄔㄨㄥˊ ㄒㄧㄣ ㄏㄨㄚˋ ㄧˋ ㄓ ㄏㄨㄛˊ ㄏㄨㄛˊ ㄆㄛ ㄆㄛ、ㄐㄧㄢˋ ㄐㄧㄢˋ ㄎㄤ ㄎㄤ ㄉㄜ˙ ㄒㄧㄠˇ ㄧㄤˊ！ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄧㄡˇ ㄉㄧㄢˇ ㄅㄨˋ ㄍㄠ ㄒㄧㄥˋ) ㄋㄧˇ ㄉㄜ˙ ㄧˋ ㄐㄧㄢˋ ㄓㄣ ㄉㄨㄛ！ㄓㄜˋ ㄧㄤˋ ㄏㄠˇ ㄌㄜ˙，ㄨㄛˇ ㄏㄨㄚˋ ㄓㄜˋ ㄍㄜ˙ ㄍㄟˇ ㄋㄧˇ。(ㄏㄨㄚˋ ㄌㄜ˙ ㄧˊ ㄍㄜ˙ ㄒㄧㄤ ㄗ˙) ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄨㄛˇ ㄧㄠˋ ㄉㄜ˙ ㄒㄧㄠˇ ㄧㄤˊ ㄋㄜ˙？"
      }
    ],
    chinese: "飛行員：目瞪口呆 天哪！這件事連我不知道。小王子：我覺得你很會畫畫！能不能請你畫一隻羊給我？飛行員：沒問題！揮動畫筆畫了一隻羊小王子：這隻太老了，我希望我的羊可以活得久一點。飛行員：好！等一下。小王子：這是已經長大的公羊，我想要一隻小羊。飛行員：再給我一次機會，這次保證讓你滿意！小王子：這隻羊生病了，看起來沒什麼精神，麻煩你幫我重新畫一隻活活潑潑健健康康的小羊！飛行員：有點不高興 你的意見真多！這樣好了，我畫這個給你。畫了一個箱子 小王子：我要的小羊呢？"
  },
  {
    title: "3. 用心來看畫 (心で絵を見る)",
    japanese: "飛行士：（絵を指さして）これはペット用の箱だよ。君の欲しい子羊はこの中にいる。\n王子：（箱の穴に目を近づけ、笑顔になり、何度も頷く）この子羊、僕にピッタリだ。まさにこれが欲しかったんだ！\n飛行士：（少し驚いて）そ、そう？君が気に入ったなら、その子羊をプレゼントするよ！\n王子：この子羊は草をたくさん食べるかな？大食い？僕の住んでる星は小さくて草が少ないから、お腹いっぱい食べられるか心配なんだ。\n飛行士：安心して！僕が描いたのはとてもとても小さな子羊だから、食欲は多くないよ。\n王子：（また穴から覗き込む）それなら安心だ。見て、眠っちゃったよ。いびきもかいてる！本当にかわいいな！\n飛行士：（絵の箱をじっと見て、頭を掻き、親指を立てる）僕は「手」で絵を描いたけど、君は「心」で絵を見ることができるんだね。本当に素晴らしい！【幕が下りる】",
    paragraphs: [
      {
        chinese: "飛行員：(指著圖畫) 這是一個寵物箱，你要的小羊就在裡面。小王子：(眼睛靠近箱子上的小洞，臉上出現笑容，不停的點頭) 這隻小羊太適合我了，牠正是我想要的！",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄓˇ ㄓㄜ˙ ㄊㄨˊ ㄏㄨㄚˋ) ㄓㄜˋ ㄕˋ ㄧˊ ㄍㄜ˙ ㄔㄨㄥˇ ㄨˋ ㄒㄧㄤ，ㄋㄧˇ ㄧㄠˋ ㄉㄜ˙ ㄒㄧㄠˇ ㄧㄤˊ ㄐㄧㄡˋ ㄗㄞˋ ㄌㄧˇ ㄇㄧㄢˋ。ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：(ㄧㄢˇ ㄐㄧㄥ ㄎㄠˋ ㄐㄧㄣˋ ㄒㄧㄤ ㄗ˙ ㄕㄤˋ ㄉㄜ˙ ㄒㄧㄠˇ ㄉㄨㄥˋ，ㄌㄧㄢˇ ㄕㄤˋ ㄔㄨ ㄒㄧㄢˋ ㄒㄧㄠˋ ㄖㄨㄥˊ，ㄅㄨˋ ㄊㄧㄥˊ ㄉㄜ˙ ㄉㄧㄢˇ ㄊㄡˊ) ㄓㄜˋ ㄓ ㄒㄧㄠˇ ㄧㄤˊ ㄊㄞˋ ㄕˋ ㄏㄜˊ ㄨㄛˇ ㄌㄜ˙，ㄊㄚ ㄓㄥˋ ㄕˋ ㄨㄛˇ ㄒㄧㄤˇ ㄧㄠˋ ㄉㄜ˙！"
      },
      {
        chinese: "飛行員：(有點吃驚) 是……是嗎？既然你喜歡，那麼這隻小羊就送給你吧！小王子：這隻小羊需要吃很多草嗎？牠是不是大胃王？我住的星球很小，草不多，不知道夠不夠讓牠吃飽？",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄧㄡˇ ㄉㄧㄢˇ ㄔ ㄐㄧㄥ) ㄕˋ……ㄕˋ ㄇㄚ˙？ㄐㄧˋ ㄖㄢˊ ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ，ㄋㄚˋ ㄇㄜ˙ ㄓㄜˋ ㄓ ㄒㄧㄠˇ ㄧㄤˊ ㄐㄧㄡˋ ㄙㄨㄥˋ ㄍㄟˇ ㄋㄧˇ ㄅㄚ˙！ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄓ ㄒㄧㄠˇ ㄧㄤˊ ㄒㄩ ㄧㄠˋ ㄔ ㄏㄣˇ ㄉㄨㄛ ㄘㄠˇ ㄇㄚ˙？ㄊㄚ ㄕˋ ㄅㄨˊ ㄕˋ ㄉㄚˋ ㄨㄟˋ ㄨㄤˊ？ㄨㄛˇ ㄓㄨˋ ㄉㄜ˙ ㄒㄧㄥ ㄑㄧㄡˊ ㄏㄣˇ ㄒㄧㄠˇ，ㄘㄠˇ ㄅㄨˋ ㄉㄨㄛ，ㄅㄨˋ ㄓ ㄉㄠˋ ㄍㄡˋ ㄅㄨˊ ㄍㄡˋ ㄖㄤˋ ㄊㄚ ㄔ ㄅㄠˇ？"
      },
      {
        chinese: "飛行員：放心吧！我畫給你的是一隻很小很小的小小羊，牠的食量不大。小王子：(又從箱子上的小洞往裡頭看) 這樣我就放心了。你看，牠睡著了，還會打呼呢！真的好可愛呀！",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄈㄤˋ ㄒㄧㄣ ㄅㄚ˙！ㄨㄛˇ ㄏㄨㄚˋ ㄍㄟˇ ㄋㄧˇ ㄉㄜ˙ ㄕˋ ㄧˋ ㄓ ㄏㄣˇ ㄒㄧㄠˇ ㄏㄣˇ ㄒㄧㄠˇ ㄉㄜ˙ ㄒㄧㄠˇ ㄒㄧㄠˇ ㄧㄤˊ，ㄊㄚ ㄉㄜ˙ ㄕˊ ㄌㄧㄤˋ ㄅㄨˋ ㄉㄚˋ。ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：(ㄧㄡˋ ㄘㄨㄥˊ ㄒㄧㄤ ㄗ˙ ㄕㄤˋ ㄉㄜ˙ ㄒㄧㄠˇ ㄉㄨㄥˋ ㄨㄤˇ ㄌㄧˇ ㄊㄡˊ ㄎㄢˋ) ㄓㄜˋ ㄧㄤˋ ㄨㄛˇ ㄐㄧㄡˋ ㄈㄤˋ ㄒㄧㄣ ㄌㄜ˙。ㄋㄧˇ ㄎㄢˋ，ㄊㄚ ㄕㄨㄟˋ ㄓㄠˊ ㄌㄜ˙，ㄏㄞˊ ㄏㄨㄟˋ ㄉㄚˇ ㄏㄨ ㄋㄜ˙！ㄓㄣ ㄉㄜ˙ ㄏㄠˇ ㄎㄜˇ ㄞˋ ㄧㄚ！"
      },
      {
        chinese: "飛行員：(對著圖畫中的箱子，瞧了又瞧，抓了抓頭，豎起大拇指) 我用「手」畫畫，你卻能用「心」來看畫，真是了不起！",
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄉㄨㄟˋ ㄓㄜ˙ ㄊㄨˊ ㄏㄨㄚˋ ㄓㄨㄥ ㄉㄜ˙ ㄒㄧㄤ ㄗ˙，ㄑㄧㄠˊ ㄌㄜ˙ ㄧㄡˋ ㄑㄧㄠˊ，ㄓㄨㄚ ㄌㄜ˙ ㄓㄨㄚ ㄊㄡˊ，ㄕㄨˋ ㄑㄧˇ ㄉㄚˋ ㄇㄨˇ ㄓˇ) ㄨㄛˇ ㄩㄥˋ 「ㄕㄡˇ」 ㄏㄨㄚˋ ㄏㄨㄚˋ，ㄋㄧˇ ㄑㄩㄝˋ ㄋㄥˊ ㄩㄥˋ 「ㄒㄧㄣ」 ㄌㄞˊ ㄎㄢˋ ㄏㄨㄚˋ，ㄓㄣ ㄕˋ ㄌㄧㄠˇ ㄅㄨˋ ㄑㄧˇ！"
      }
    ],
    chinese: "飛行員：指著圖畫 這是一個寵物箱，你要的小羊就在裡面。小王子：這隻小羊太適合我了，牠正是我想要的！飛行員：是是嗎？既然你喜歡，那麼這隻小羊就送給你吧！小王子：這隻小羊需要吃很多草嗎？牠是不是大胃王？我住的星球很小，草不多，不知道夠不夠讓牠吃飽？飛行員：放心吧！我畫給你的是一隻很小很小的小小羊，牠的食量不大。小王子：這樣我就放心了。你看，牠睡著了，還會打呼呢！真的好可愛呀！飛行員：瞧了又瞧抓了抓頭豎起大拇指 我用手畫畫，你卻能用心來看畫，真是了不起！"
  }
];

const VOCABULARY = [
  { char: "沙漠", zhuyin: "ㄕㄚ ㄇㄛˋ", meaning: "砂漠", example: "一望無際的沙漠。", exMeaning: "見渡す限りの砂漠。" },
  { char: "幅", zhuyin: "ㄈㄨˊ", meaning: "絵を数える単位（枚/幅）", example: "他畫了一幅圖畫。", exMeaning: "彼は一枚の絵を描きました。" },
  { char: "蛇", zhuyin: "ㄕㄜˊ", meaning: "ヘビ", example: "那是一條吞了大象的蛇。", exMeaning: "あれは象を飲み込んだヘビです。" },
  { char: "鯨魚", zhuyin: "ㄐㄧㄥ ㄩˊ", meaning: "クジラ", example: "蛇吞過大鯨魚。", exMeaning: "ヘビは大きなクジラを飲み込みました。" },
  { char: "目瞪口呆", zhuyin: "ㄇㄨˋ ㄉㄥˋ ㄎㄡˇ ㄉㄞ", meaning: "呆然とする・驚きあきれる", example: "他驚訝得目瞪口呆。", exMeaning: "彼は驚いて呆然としました。" },
  { char: "寵物", zhuyin: "ㄔㄨㄥˇ ㄨˋ", meaning: "ペット", example: "這是一個寵物箱。", exMeaning: "これはペット用の箱です。" },
  { char: "胃口", zhuyin: "ㄨㄟˋ ㄎㄡˇ", meaning: "食欲", example: "小羊的胃口不大。", exMeaning: "子羊の食欲は大きくありません。" },
  { char: "拇指", zhuyin: "ㄇㄨˇ ㄓˇ", meaning: "親指", example: "飛行員豎起大拇指。", exMeaning: "飛行士は親指を立てました（いいね！のサイン）。" },
  { char: "既然", zhuyin: "ㄐㄧˋ ㄖㄢˊ", meaning: "〜である以上、〜だからには", example: "既然你喜歡，就送給你吧！", exMeaning: "君が気に入ったのなら、プレゼントするよ！" },
  { char: "了不起", zhuyin: "ㄌㄧㄠˇ ㄅㄨˋ ㄑㄧˇ", meaning: "素晴らしい・たいしたものだ", example: "你能用心看畫，真是了不起！", exMeaning: "心で絵が見えるなんて、本当に素晴らしい！" },
  { char: "驚訝", zhuyin: "ㄐㄧㄥ ㄧㄚˋ", meaning: "驚く", example: "他吃驚地看著我。", exMeaning: "彼は驚いて私を見ました。" },
  { char: "疑惑", zhuyin: "ㄧˊ ㄏㄨㄛˋ", meaning: "疑問に思う・戸惑う", example: "他抓了抓頭，感到很疑惑。", exMeaning: "彼は頭を掻いて、とても戸惑いました。" }
];

const DAILY_PLANS = [
  {
    day: 1,
    title: "第一天: 遇見小王子與大象蛇 🐍",
    description: "學習劇本的基本結構，並了解飛行員和小王子的奇妙相遇！",
    tasks: [
      { id: "read1", type: "read", text: "閱讀劇本第一幕 & 大聲全文朗讀", target: 0 },
      { id: "vocab1", type: "vocab", text: "學習生字：沙漠、幅、蛇、鯨魚...", target: [0, 1, 2, 3] },
      { id: "game1", type: "game", text: "小王子的奇妙圖畫測驗" }
    ]
  },
  {
    day: 2,
    title: "第二天: 請幫我畫一隻羊 🐑",
    description: "小王子對畫出來的羊不滿意？來看看飛行員最後畫了什麼！",
    tasks: [
      { id: "read2", type: "read", text: "閱讀劇本第二段 & 大聲全文朗讀", target: 1 },
      { id: "vocab2", type: "vocab", text: "學習生字：目瞪口呆、驚訝...", target: [4, 10, 11] },
      { id: "game2", type: "game", text: "挑剔的小王子：選出羊的缺點" }
    ]
  },
  {
    day: 3,
    title: "第三天: 用心來看畫 💖",
    description: "盒子裡看不見的羊，為什麼小王子這麼喜歡呢？",
    tasks: [
      { id: "read3", type: "read", text: "閱讀劇本結局 & 大聲全文朗讀", target: 2 },
      { id: "vocab3", type: "vocab", text: "學習生字：寵物、胃口、拇指...", target: [5, 6, 7, 8, 9] },
      { id: "game3", type: "game", text: "劇本動作解密大挑戰" }
    ]
  },
  {
    day: 4,
    title: "第四天: 漢字特訓與語句邏輯 📝",
    description: "綜合複習本課的重要字詞，並在筆記本上進行寫字特訓！",
    tasks: [
      { id: "vocab4", type: "vocab_all", text: "單字卡總複習 (全 12 個)", target: null },
      { id: "game4", type: "game", text: "文法重組：「既然... 就...」" },
      { id: "notebook4", type: "notebook", text: "【紙本任務】習作 P.68 國字注音書寫" }
    ]
  },
  {
    day: 5,
    title: "第五天: 標點符號：刪節號的祕密 💬",
    description: "學習「……」（刪節號）的用法，並練習寫出帶有因果關係的句子。",
    tasks: [
      { id: "game5_1", type: "game", text: "標點符號測驗：刪節號用法" },
      { id: "notebook5", type: "notebook", text: "【紙本任務】筆記本造句：既然...就..." }
    ]
  },
  {
    day: 6,
    title: "第六天: 第十課總複習大會考 🎓",
    description: "把這六天的精華全部複習一遍，向家長展示你的學習成果，領取證書！",
    tasks: [
      { id: "final6", type: "game", text: "第十課 飛行員大會考 (加量版)！" },
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
  const [tutorMessage, setTutorMessage] = useState("你好！歡迎來到小王子的星球！請從左邊選擇第 1 天開始學習吧！");
  const [speechPitch, setSpeechPitch] = useState(1.1); 
  const [speechRate, setSpeechRate] = useState(0.85); 
  const [selectedCard, setSelectedCard] = useState(null);

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
      console.log("Audio context blocked");
    }
  };

  const handleCorrect = () => {
    playBeep(600, 0.2, "triangle");
    setTimeout(() => playBeep(800, 0.3, "triangle"), 150);
  };

  const handleWrong = () => {
    playBeep(250, 0.4, "sawtooth");
  };

  const speakText = (text, lang = "zh-TW") => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.pitch = speechPitch;
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const updateTutor = (msg) => {
    setTutorMessage(msg);
    speakText(msg, "zh-TW");
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
      updateTutor("太棒了！你的全文朗讀挑戰成功！相似度：" + finalScore + "%");
    } else {
      handleWrong();
      updateTutor("AI 評分：" + finalScore + "%。可以再大聲、清晰地多讀一次喔！");
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
    updateTutor("太棒了！你順利完成了第 " + (currentReadStep + 1) + " 次全文音讀挑戰！");
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && studyTime > 0) {
      interval = setInterval(() => {
        setStudyTime((prev) => prev - 1);
      }, 1000);
    } else if (studyTime === 0) {
      setTimerActive(false);
      setTutorMessage("太棒了！今天 30 分鐘的學習時間結束囉！");
      playBeep(880, 0.8, "sine");
    }
    return () => clearInterval(interval);
  }, [timerActive, studyTime]);


  const renderReadTask = (page, taskId) => {
    const allReadCompleted = readProgress.every(v => v === true);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold text-indigo-800">{page.title}</h3>
          <button 
            onClick={() => {
              toggleTaskCompletion(taskId);
              if (!allReadCompleted) setReadProgress([true, true]);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${completedTasks[taskId] ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>

        <div className="space-y-4">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 space-y-2">
              <p className="text-lg font-bold text-slate-800 leading-relaxed">{para.chinese}</p>
              <p className="text-xs font-semibold text-sky-800 font-mono bg-white p-1.5 rounded">{para.zhuyin}</p>
            </div>
          ))}
          <button 
            onClick={() => speakText(page.chinese, "zh-TW")}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm"
          >
            🔊 聽課文全文朗讀
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-indigo-200 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎤</span>
            <div>
              <h4 className="font-bold text-indigo-800 text-sm">AI 語音音讀挑戰：大聲跟讀課文 2 次</h4>
              <p className="text-xs text-slate-600">按下開始後大聲朗讀，結束時 AI 會給予評分。</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentReadStep(idx); setSpokenText(""); setMatchingScore(null); setSpeechError(""); setHasEvaluated(false); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${currentReadStep === idx ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'} flex items-center justify-center gap-1.5`}
              >
                <span>第 {idx + 1} 次朗讀</span>
                {readProgress[idx] ? <span className="text-emerald-500">✅</span> : <span className="text-slate-300">○</span>}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {!isListening ? (
              <button onClick={startListening} className="flex-1 py-3 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md">
                🎤 開始朗讀
              </button>
            ) : (
              <button onClick={stopListeningAndEvaluate} className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md animate-pulse">
                🛑 結束並評分
              </button>
            )}
            <button onClick={simulateCorrectReading} className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors">
              👌 手動驗證過關
            </button>
          </div>

          {hasEvaluated && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
              {speechError ? <p className="text-red-500 font-semibold text-xs">{speechError}</p> : (
                <>
                  {spokenText && <div className="text-slate-700 font-medium">辨識結果： <span className="text-indigo-600 font-bold block mt-1">{spokenText}</span></div>}
                  {matchingScore !== null && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-semibold">相似度：</span>
                      <span className={`text-lg font-bold ${matchingScore >= 35 ? 'text-emerald-600' : 'text-red-500'}`}>{matchingScore}%</span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span className="text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded block mb-2 w-max">日文對照翻譯</span>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{page.japanese}</p>
        </div>
      </div>
    );
  };

  const renderInteractiveGame = () => {
    // Day 1
    if (currentDay === 1 && selectedTask.id === "game1") {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 第一天挑戰：小王子的奇妙圖畫</h3>
          <p className="text-sm text-slate-600">飛行員畫的這幅圖，大人都說它是什麼？小王子又說它是什麼？</p>
          <div className="flex flex-col gap-3 mt-4">
            <button onClick={() => { handleWrong(); setGameFeedback("這是大人的答案喔！"); }} className="p-3 border rounded-xl hover:bg-slate-50 font-bold">🎩 大家都說這是一頂帽子</button>
            <button onClick={() => { handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("答對了！小王子看出這是一條吞了象的蛇！"); }} className="p-3 border rounded-xl hover:bg-indigo-50 border-indigo-200 font-bold text-indigo-700">🐘 小王子說這是一條吞了大象的蛇</button>
          </div>
          {gameFeedback && <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-lg text-center font-bold text-sm">{gameFeedback}</div>}
        </div>
      );
    }
    // Day 2
    if (currentDay === 2 && selectedTask.id === "game2") {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 第二天挑戰：挑剔的小王子</h3>
          <p className="text-sm text-slate-600">小王子對飛行員畫的前三隻羊都不滿意，理由是什麼呢？點選正確的缺點！</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['太老了', '是長大的公羊', '生病了'].map(reason => (
              <button 
                key={reason} 
                onClick={() => {
                  setQuizAnswers(prev => ({...prev, [reason]: true}));
                  handleCorrect();
                  if (Object.keys(quizAnswers).length === 2) toggleTaskCompletion(selectedTask.id);
                }}
                className={`p-4 rounded-xl border font-bold ${quizAnswers[reason] ? 'bg-emerald-500 text-white' : 'hover:bg-slate-50'}`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      );
    }
    // Day 3
    if (currentDay === 3 && selectedTask.id === "game3") {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 第三天挑戰：動作解密</h3>
          <p className="text-sm text-slate-600">「豎起大拇指」在劇本中代表什麼意思？</p>
          <button onClick={() => { handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("答對了！代表稱讚小王子很了不起！"); }} className="w-full p-3 border rounded-xl hover:bg-indigo-50 font-bold">👍 稱讚對方很棒、了不起</button>
          <button onClick={() => { handleWrong(); setGameFeedback("不對喔，再想想看。"); }} className="w-full p-3 border rounded-xl hover:bg-slate-50 font-bold">😠 表示生氣</button>
          {gameFeedback && <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-lg text-center font-bold text-sm">{gameFeedback}</div>}
        </div>
      );
    }
    // Day 4 文法重組
    if (currentDay === 4 && selectedTask.id === "game4") {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 第四天挑戰：文法重組</h3>
          <p className="text-sm">點選卡片重組句子：「既然你喜歡，那麼這隻小羊就送給你吧！」</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["既然你喜歡，", "那麼", "這隻小羊", "就送給你吧！"].map((word, i) => (
              <button 
                key={i} onClick={() => {
                  handleCorrect();
                  if (i === 3) { toggleTaskCompletion(selectedTask.id); updateTutor("太棒了！重組成功！"); }
                }}
                className="px-4 py-2 border border-indigo-200 rounded-lg font-bold hover:bg-indigo-50"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      );
    }
    // Day 6 Final
    if (currentDay === 6 && selectedTask.id === "final6") {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 text-center space-y-4">
          <h3 className="text-xl font-bold text-indigo-800">🎓 總複習大會考</h3>
          <p>準備好接受挑戰了嗎？</p>
          <button 
            onClick={() => { handleCorrect(); toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 恭喜你完成所有挑戰，順利通關星の王子さま第十課！"); }}
            className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-md hover:bg-yellow-600"
          >
            完成考試領取證書
          </button>
          {gameFeedback && <p className="text-emerald-600 font-bold text-lg mt-4">{gameFeedback}</p>}
        </div>
      );
    }

    // Default for Notebook or unhandled
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col items-center">
        <span className="text-4xl mb-4">📝</span>
        <h3 className="font-bold text-lg mb-2">{selectedTask.text}</h3>
        <p className="text-slate-600 mb-4">請在紙本習作或筆記本上完成這項任務，完成後點選下方按鈕。</p>
        <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-full">
          {completedTasks[selectedTask.id] ? "✅ 已標記完成" : "標記為完成"}
        </button>
      </div>
    );
  };

  const renderTaskContent = () => {
    if (!selectedTask) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-indigo-100">
          <span className="text-6xl mb-4">🪐</span>
          <h3 className="text-xl font-bold text-slate-800 mb-2">請選擇今天的學習任務！</h3>
          <p className="text-slate-600 max-w-md text-sm mb-6">點選左側清單開始學習。別忘了啟動 30 分鐘計時器喔！</p>
          <button 
            onClick={() => { setTimerActive(true); updateTutor("那我們開始 30 分鐘的學習吧！加油！"); }}
            className={`px-6 py-3 rounded-full font-bold text-white shadow-md transition-transform ${timerActive ? 'bg-emerald-500' : 'bg-indigo-500'}`}
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
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-lg font-bold text-indigo-800">✨ 今日生字詞卡</h3>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="px-4 py-2 bg-indigo-100 text-indigo-800 font-bold rounded-full text-xs">
              {completedTasks[selectedTask.id] ? "✅ 詞彙全部記住囉" : "🎴 記住後請點選！"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {targetIndices.map((idx) => {
              const item = VOCABULARY[idx];
              return (
                <div key={idx} onClick={() => { setSelectedCard(idx); speakText(item.char, "zh-TW"); }} className={`p-4 rounded-xl border-2 cursor-pointer ${selectedCard === idx ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{item.char}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">{item.zhuyin}</span>
                  </div>
                  <p className="text-sm font-semibold mt-3 text-emerald-700">日文釋義: {item.meaning}</p>
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
            <span className="text-2xl">🌹</span>
            <div>
              <h1 className="text-lg font-extrabold text-indigo-700">星の王子さま 第十課</h1>
              <p className="text-xs text-slate-500">國小精華家庭教師互動程式 (6日コース)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200">
              <span className="font-mono font-bold text-indigo-700">{formatTime(studyTime)}</span>
              <button onClick={() => setTimerActive(!timerActive)} className="text-xs font-bold px-2 py-1 rounded bg-indigo-500 text-white">
                {timerActive ? "暫停" : "開始"}
              </button>
            </div>
            <div className="bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full font-bold text-sm">⭐ 得分: {score}</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-4">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-4 text-white shadow-sm flex items-center gap-4">
          <div className="text-3xl bg-white/20 p-2 rounded-full">👨‍🏫</div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase text-indigo-100">AI 老師的溫馨提示</p>
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
                  className={`py-3 rounded-xl font-bold flex flex-col items-center transition-all ${currentDay === d ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
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
                  className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer ${selectedTask?.id === task.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 hover:border-slate-300'}`}
                  onClick={() => { setSelectedTask(task); setGameFeedback(""); }}
                >
                  <input type="checkbox" checked={completedTasks[task.id] || false} readOnly className="rounded text-indigo-500" />
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
