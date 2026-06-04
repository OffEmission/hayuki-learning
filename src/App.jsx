import React, { useState, useEffect, useRef } from 'react';

// --- DATA DEFINITION FOR LESSON 10 ---
const TEXTBOOK_PAGES = [
  {
    title: "1. 遇見小王子與大象蛇 (王子さまとの出会いと象を飲み込んだ蛇)",
    japanese: "【ナレーション】見渡す限りの砂漠の中で、飛行士は宇宙から来た星の王子さまと出会いました。彼は帽子のように見える絵を描いて王子さまに見せました。\n飛行士：僕が何を描いたか当ててみて。\n王子：簡単だよ！とてもよく似てる。\n飛行士：「これは帽子だ」って当てようとしてる？みんなそう言うんだ。\n王子：帽子じゃないよ！君が描いたのは、象を飲み込んだヘビだよ！\n飛行士：（とても驚いて）どうしてわかったの？\n王子：（絵を指さして）3歳の子供でもわかるよ！それに……。\n飛行士：それに何？\n王子：このヘビ、少し前に大きなクジラを飲み込んだばかりだね！",
    paragraphs: [
      {
        chinese: "旁白：一望無際的沙漠中，飛行員遇見了從外太空來的小王子，他畫了一幅看起來像帽子的圖畫給小王子看。",
        zhuyin: "ㄆㄤˊ ㄅㄞˊ：ㄧˋ ㄨㄤˋ ㄨˊ ㄐㄧˋ ㄉㄜ˙ ㄕㄚ ㄇㄛˋ ㄓㄨㄥ，ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ ㄩˋ ㄐㄧㄢˋ ㄌㄜ˙ ㄘㄨㄥˊ ㄨㄞˋ ㄊㄞˋ ㄎㄨㄥ ㄌㄞˊ ㄉㄜ˙ ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ，ㄊㄚ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄈㄨˊ ㄎㄢˋ ㄑㄧˇ ㄌㄞˊ ㄒㄧㄤˋ ㄇㄠˋ ㄗ˙ ㄉㄜ˙ ㄊㄨˊ ㄏㄨㄚˋ ㄍㄟˇ ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ ㄎㄢˋ。"
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
        zhuyin: "ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄏㄠˇ！ㄉㄥˇ ㄧˊ ㄒㄧㄚˋ。(ㄧㄡˋ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄓ ㄧㄤˊ) ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄕˋ ㄧˇ ㄐㄧㄥ ㄓㄤˇ ㄉㄚˋ ㄉㄜ˙ ㄍㄨㄥ ㄧㄤˊ，ㄨㄛˇ ㄒㄧㄤˇ ㄧㄠˋ ㄧˋ ㄓ ㄒㄧㄠˇ ㄧㄤˊ。ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：ㄗㄞˋ ㄍㄟˇ ㄨㄛˇ ㄧˊ ㄘˋ ㄐㄧ ㄏㄨㄟˋ，ㄓㄜˋ ㄘˋ ㄅㄠˇ ㄓㄥˋ ㄖㄤˋ ㄋㄧˇ ㄇㄢˇ ㄧˋ！(ㄗㄞˋ ㄏㄨㄚˋ ㄌㄜ˙ ㄧˋ ㄓ ㄧㄤˊ)"
      },
      {
        chinese: "小王子：這隻羊生病了，看起來沒什麼精神，麻煩你幫我重新畫一隻活活潑潑、健健康康的小羊！飛行員：(有點不高興) 你的意見真多！這樣好了，我畫這個給你。(畫了一個箱子) 小王子：我要的小羊呢？",
        zhuyin: "ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄓㄜˋ ㄓ ㄧㄤˊ ㄕㄥ ㄅㄧㄥˋ ㄌㄜ˙，ㄎㄢˋ ㄑㄧˇ ㄌㄞˊ ㄇㄟˊ ㄕㄣˊ ㄇㄜ˙ ㄐㄧㄥ ㄕㄣˊ，ㄇㄚˊ ㄈㄢˊ ㄋㄧˇ ㄅㄤ ㄨㄛˇ ㄔㄨㄥˊ ㄒㄧㄣ ㄏㄨㄚˋ ㄧˋ ㄓ ㄏㄨㄛˊ ㄏㄨㄛˊ ㄆㄛ ㄆㄛ、ㄐㄧㄢˋ ㄐㄧㄢˋ ㄎㄤ ㄎㄤ ㄉㄜ˙ ㄒㄧㄠˇ ㄧㄤˊ！ㄈㄟ ㄒㄧㄥˊ ㄩㄢˊ：(ㄧㄡˇ ㄉㄧㄢˇ ㄅㄨˋ ㄍㄠ ㄒㄧㄥˋ) ㄋㄧˇ ㄉㄜ˙ ㄧˋ ㄐㄧㄢˋ ㄓㄣ ㄉㄨㄛ！ㄓㄜˋ ㄧㄤˋ ㄏㄠˇ ㄌㄜ˙，ㄨㄛˇ ㄏㄨㄚˋ ㄓㄜˋ ㄍㄜ˙ ㄍㄟˇ ㄋㄧˇ。(ㄏㄨㄚˋ ㄌㄜ˙ ㄧˊ ㄍㄜ˙ ㄒㄧㄤ ㄗ˙) ㄒㄧㄠˇ ㄨㄤˊ ㄗˇ：ㄨㄛˇ ㄧㄠˋ ㄉㄜ˙ ㄒㄧㄠˇ ㄧㄤˊ ㄋㄜ˙？"
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
      { id: "game3", type: "game", text: "劇本動作解密大挑戰 (P.69)" }
    ]
  },
  {
    day: 4,
    title: "第四天: 漢字特訓與語句邏輯 📝",
    description: "綜合複習本課的重要字詞，並在筆記本上進行寫字特訓！",
    tasks: [
      { id: "vocab4", type: "vocab_all", text: "單字卡總複習 (全 12 個)", target: null },
      { id: "game4", type: "game", text: "文法重組：「既然... 就...」 (P.73)" },
      { id: "notebook4", type: "notebook", text: "【紙本任務】習作 P.68 國字注音書寫" }
    ]
  },
  {
    day: 5,
    title: "第五天: 標點符號：刪節號的祕密 💬",
    description: "學習「……」（刪節號）的用法，並練習寫出帶有因果關係的句子。",
    tasks: [
      { id: "game5_1", type: "game", text: "標點符號測驗：刪節號用法 (P.71)" },
      { id: "game5_2", type: "game", text: "看圖選詞：小蛇吃東西 (P.74)" },
      { id: "notebook5", type: "notebook", text: "【紙本任務】筆記本造句：既然...就..." }
    ]
  },
  {
    day: 6,
    title: "第六天: 第十課總複習大會考 🎓",
    description: "把這六天的精華全部複習一遍，向家長展示你的學習成果，領取證書！",
    tasks: [
      { id: "final6", type: "game", text: "第十課 飛行員大會考 (加量版 7 題)！" },
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
      <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-100 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold text-indigo-800">{page.title}</h3>
          <button onClick={() => { toggleTaskCompletion(taskId); if (!allReadCompleted) setReadProgress([true, true]); }}
            className={"px-4 py-2 rounded-full text-xs font-bold transition-all " + (completedTasks[taskId] ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200")}
          >
            {completedTasks[taskId] ? "✅ 任務完成" : "📖 全文音讀完畢請點此！"}
          </button>
        </div>
        <div className="space-y-6">
          {page.paragraphs.map((para, pIdx) => (
            <div key={pIdx} className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/50 space-y-1">
              <p className="text-lg font-bold text-slate-800 tracking-wide leading-relaxed">{para.chinese}</p>
              <p className="text-xs font-semibold text-sky-800 tracking-wider leading-relaxed bg-sky-50/50 p-1.5 rounded border border-sky-100/30 font-mono">注音: {para.zhuyin}</p>
            </div>
          ))}
          <div className="mt-4"><button onClick={() => speakText(page.chinese, "zh-TW")} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm">🔊 聽課文全文朗讀</button></div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-indigo-200 space-y-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🎤</span>
            <div><h4 className="font-bold text-indigo-800 text-sm">AI 語音音讀挑戰：大聲跟讀全文 2 次</h4><p className="text-xs text-slate-600">讀完後點選「結束並評分」。</p></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((idx) => (
              <button key={idx} onClick={() => { setCurrentReadStep(idx); setSpokenText(""); setMatchingScore(null); setSpeechError(""); setHasEvaluated(false); }}
                className={"py-2 px-3 rounded-xl text-xs font-bold transition-all " + (currentReadStep === idx ? "bg-indigo-500 text-white" : "bg-white text-slate-600 border") + " flex justify-center gap-1.5"}
              ><span>第 {idx + 1} 次朗讀</span>{readProgress[idx] ? <span className="text-emerald-500">✅</span> : <span>○</span>}</button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {!isListening ? (<button onClick={startListening} className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 font-bold text-sm text-white rounded-xl shadow-md">🎤 開始朗讀</button>) : (<button onClick={stopListeningAndEvaluate} className="flex-1 py-3 bg-red-500 hover:bg-red-600 font-bold text-sm text-white rounded-xl shadow-md animate-pulse">🛑 結束並評分</button>)}
            <button onClick={simulateCorrectReading} className="py-3 px-4 rounded-xl bg-slate-200 text-slate-700 font-semibold text-xs">👌 手動驗證</button>
          </div>
          {hasEvaluated && (spokenText || matchingScore !== null || speechError) && (
            <div className="bg-white p-4 rounded-xl border text-sm">
              {speechError ? (<p className="text-red-500">{speechError}</p>) : (<>
                {spokenText && (<div className="text-slate-700 font-medium">🎧 辨識結果： <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded block">{spokenText}</span></div>)}
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
    // Day 1: Prince's Drawing
    if (selectedTask.id === 'game1') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-200 space-y-6">
          <h3 className="text-lg font-bold text-indigo-800">🎮 小王子的奇妙圖畫測驗</h3>
          <p className="text-sm text-slate-600">小王子畫的第一張圖，大人們覺得是什麼？而小王子實際上畫的是什麼呢？</p>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q1: 飛行員猜小王子的圖畫是哪一種物品？</p>
              <div className="flex gap-2">
                <button onClick={()=>handleWrong()} className="px-4 py-2 bg-white border rounded hover:bg-slate-100 font-bold">一座山</button>
                <button onClick={()=>{handleCorrect(); setQuizAnswers(p=>({...p, q1:true}));}} className={"px-4 py-2 border rounded font-bold " + (quizAnswers.q1 ? "bg-emerald-500 text-white" : "bg-white")}>一頂帽子</button>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border">
              <p className="font-bold text-slate-800 mb-2">Q2: 圖畫真正的答案是？</p>
              <div className="flex gap-2">
                <button onClick={()=>{
                  handleCorrect(); setQuizAnswers(p=>({...p, q2:true}));
                  if(quizAnswers.q1) { toggleTaskCompletion(selectedTask.id); setGameFeedback("🎉 恭喜！你跟小王子一樣有豐富的想像力！");}
                }} className={"px-4 py-2 border rounded font-bold " + (quizAnswers.q2 ? "bg-emerald-500 text-white" : "bg-white")}>一條吞了大象的蛇</button>
                <button onClick={()=>handleWrong()} className="px-4 py-2 bg-white border rounded hover:bg-slate-100 font-bold">一條吃飽的魚</button>
              </div>
            </div>
          </div>
          {gameFeedback && <div className="p-3 text-center bg-indigo-100 text-indigo-900 font-bold rounded-xl">{gameFeedback}</div>}
        </div>
      );
    }

    // Day 2: Picky Prince
    if (selectedTask.id === 'game2') {
      const options = [
        { desc: "太老了 (年をとりすぎ)", correct: true }, { desc: "是公羊 (オス羊だ)", correct: true }, 
        { desc: "太胖了 (太りすぎ)", correct: false }, { desc: "生病了 (病気だ)", correct: true }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-200 space-y-6">
          <h3 className="text-lg font-bold text-indigo-800">🎮 挑剔的小王子</h3>
          <p className="text-sm text-slate-600">飛行員畫了好幾隻羊，小王子都不滿意。請選出課文中出現過的**三個缺點**！</p>
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt, i) => (
              <button key={i} onClick={()=>{
                if(opt.correct) { handleCorrect(); setQuizAnswers(p=>({...p, [i]:true})); if(Object.keys({...quizAnswers, [i]:true}).length===3) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
              }} className={"p-4 border-2 rounded-xl font-bold " + (quizAnswers[i] ? "bg-emerald-100 border-emerald-500" : "bg-slate-50 hover:border-indigo-400")}>{opt.desc}</button>
            ))}
          </div>
        </div>
      );
    }

    // Day 3: Action decode (P.69)
    if (selectedTask.id === 'game3') {
      const actions = [
        { act: "目瞪口呆", meaning: "驚訝得說不出話 (驚いて声が出ない)", match: 0 },
        { act: "豎起大拇指", meaning: "滿意、稱讚 (満足・褒める)", match: 1 },
        { act: "抓了抓頭", meaning: "疑惑、不解 (戸惑う・わからない)", match: 2 },
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-200 space-y-6">
          <h3 className="text-lg font-bold text-indigo-800">🎮 劇本動作解密 (P.69)</h3>
          <p className="text-sm text-slate-600">請將劇本中的「動作」與它代表的「內心想法」配對！</p>
          <div className="space-y-4">
            {actions.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="font-bold text-indigo-700 text-lg">{item.act}</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {actions.map((ans, aIdx) => (
                    <button key={aIdx} onClick={()=>{
                      if(aIdx === item.match) { handleCorrect(); setQuizAnswers(p=>({...p, [idx]:true})); if(Object.keys({...quizAnswers, [idx]:true}).length===3) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                    }} className={"px-3 py-1.5 rounded-lg text-sm font-bold border " + (quizAnswers[idx] && aIdx===item.match ? "bg-emerald-500 text-white" : "bg-white")}>{ans.meaning}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Day 4: Grammar
    if (selectedTask.id === 'game4') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-200 space-y-6">
          <h3 className="text-lg font-bold text-indigo-800">🎮 文法重組：「既然... 就...」</h3>
          <div className="bg-indigo-50 p-4 rounded-xl text-center border"><p className="text-lg font-bold text-indigo-900">既然你喜歡，那麼這隻小羊就送給你吧！</p></div>
          <div className="p-4 bg-slate-50 rounded-xl flex flex-wrap gap-2 justify-center">
            {["既然", "你喜歡，", "那麼這隻小羊", "就送給你吧！"].map((phrase, idx) => (
              <button key={idx} onClick={()=>{ handleCorrect(); speakText(phrase); if(idx===3) toggleTaskCompletion(selectedTask.id); }} className="px-4 py-2 bg-white font-bold rounded-lg border hover:bg-amber-100">{phrase}</button>
            ))}
          </div>
        </div>
      );
    }

    // Day 5_1: Punctuation (P.71)
    if (selectedTask.id === 'game5_1') {
      const qList = [
        { q: "是……是嗎？ (這句話的刪節號代表什麼？)", options: ["說話斷斷續續 (言葉が途切れる)", "列舉省略"], ans: 0 },
        { q: "不管是橫、豎、點……每個字都很用心。(代表什麼？)", options: ["話沒說完 (言葉が未完結)", "列舉省略"], ans: 1 }
      ];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-200 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 標點符號測驗：刪節號 (……)</h3>
          {qList.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border space-y-2">
              <p className="font-bold">{item.q}</p>
              <div className="flex gap-2">
                {item.options.map((opt, oIdx) => (
                  <button key={oIdx} onClick={()=>{
                    if(oIdx===item.ans) { handleCorrect(); setQuizAnswers(p=>({...p, [idx]:true})); if(Object.keys({...quizAnswers, [idx]:true}).length===2) toggleTaskCompletion(selectedTask.id); } else { handleWrong(); }
                  }} className={"px-4 py-2 border rounded font-bold " + (quizAnswers[idx] && oIdx===item.ans ? "bg-emerald-500 text-white" : "bg-white")}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Day 5_2: Story fill
    if (selectedTask.id === 'game5_2') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-indigo-200 space-y-4">
          <h3 className="text-lg font-bold text-indigo-800">🎮 看圖選詞：小蛇吃東西 (P.74)</h3>
          <p className="text-sm">早上，小蛇先吃了(蘋果)，肚子變得(圓滾滾)。中午吃了(餅乾)，肚子變得(方方正正)。</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={()=>{ handleCorrect(); toggleTaskCompletion(selectedTask.id); }} className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-md">了解了！(確認)</button>
          </div>
        </div>
      );
    }

    // Day 6: Final Exam (Extended to 7 questions)
    if (selectedTask.id === 'final6') {
      const examQuestions = [
        { q: "小王子最初把飛行員畫的圖看成了什麼？", options: ["一頂帽子", "一條吞了大象的蛇", "一條吞了鯨魚的蛇"], ans: 1 },
        { q: "飛行員畫的第幾次，小王子才滿意？", options: ["第一隻羊", "第三隻羊", "一個裝著羊的箱子"], ans: 2 },
        { q: "小王子擔心小羊吃太多草，這隻羊的「胃口」注音是？", options: ["ㄨㄟˋ ㄎㄡˇ", "ㄨㄟ ㄎㄡˇ", "ㄨㄟˋ ㄍㄡˇ"], ans: 0 },
        { q: "劇本中，飛行員「抓了抓頭」代表他心裡覺得？", options: ["很滿意", "很疑惑", "很生氣"], ans: 1 },
        { q: "「既然你喜歡，那麼這隻小羊就送給你吧！」『既然』的意思是？", options: ["雖然", "因為", "〜である以上、〜だからには"], ans: 2 },
        { q: "「是……是嗎？」句中的刪節號（……）表示什麼心情？", options: ["心情起伏不定，說話斷斷續續", "列舉太多東西", "話還沒說完被打斷"], ans: 0 },
        { q: "飛行員覺得小王子能用什麼來看畫，非常了不起？", options: ["用放大鏡看畫", "用「心」來看畫", "用眼睛來看畫"], ans: 1 }
      ];

      const curQ = examQuestions[quizStep] || null;

      if (!curQ) {
        return (
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 text-center border-2 border-indigo-300">
            <span className="text-5xl">🏆 👑</span>
            <h3 className="text-2xl font-bold text-indigo-900 mt-4">恭喜你成為星際飛行員！</h3>
            <p className="text-slate-800 font-medium mt-2">完美通過第十課「飛行員和小王子」全數考驗！</p>
            <button onClick={() => toggleTaskCompletion(selectedTask.id)} className="mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700">領取通關證明</button>
          </div>
        );
      }

      return (
        <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">
          <div className="flex justify-between items-center border-b pb-2"><span className="text-sm font-bold text-indigo-800">{"🎓 第十課終極大會考 (" + (quizStep + 1) + " / 7)"}</span></div>
          <p className="text-base font-bold text-slate-800">{curQ.q}</p>
          <div className="space-y-3">
            {curQ.options.map((opt, i) => (
              <button key={i} onClick={() => {
                  if (i === curQ.ans) {
                    handleCorrect(); setGameFeedback("⭕ 答對了！"); setTimeout(() => { setQuizStep(p => p + 1); setGameFeedback(""); }, 800);
                  } else { handleWrong(); setGameFeedback("❌ 答錯囉，再仔細想想！"); }
                }} className="w-full text-left p-4 rounded-xl border hover:border-indigo-500 hover:bg-indigo-50 font-semibold text-slate-700">{opt}</button>
            ))}
          </div>
          {gameFeedback && <div className="p-3 text-center rounded-xl bg-indigo-100 text-indigo-900 font-bold">{gameFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const renderNotebookTask = () => {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-sky-300 text-center space-y-6 animate-fade-in">
        <span className="text-5xl">📓</span>
        <h3 className="text-2xl font-bold text-sky-900">{selectedTask.text}</h3>
        <p className="text-slate-600">這是一個實體任務！請拿出你的筆記本，按照指示手寫完成這項練習。<br/>寫完之後，請家長確認，然後按下方的完成按鈕！</p>
        {!completedTasks[selectedTask.id] ? (
          <button onClick={() => { toggleTaskCompletion(selectedTask.id); updateTutor("太棒了！紙本作業也順利完成了！"); }}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full shadow-lg text-lg"
          >✅ 我已經寫完筆記本了！ (完了ボタン)</button>
        ) : (<div className="p-4 bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200">🎉 筆記本任務已確認完成！請家長在上面簽名或蓋章喔！</div>)}
      </div>
    );
  };

  const renderTaskContent = () => {
    if (!selectedTask) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-4">
          <span className="text-6xl">🚀</span>
          <p className="text-lg font-bold">請從左側選擇今天的學習任務！</p>
        </div>
      );
    }

    switch (selectedTask.type) {
      case 'read': return renderReadTask(TEXTBOOK_PAGES[selectedTask.target], selectedTask.id);
      case 'game': return renderInteractiveGame();
      case 'notebook': return renderNotebookTask();
      default: return <div>請完成任務！</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-80 bg-white border-r p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-900">第 10 課：飛行員與小王子</h1>
          <p className="text-sm text-indigo-600 font-semibold mt-1">六日學習導航系統</p>
        </div>
        <div className="space-y-4">
          {DAILY_PLANS.map((dayPlan) => (
            <button key={dayPlan.day} onClick={() => { setCurrentDay(dayPlan.day); setSelectedTask(null); }}
              className={"w-full text-left p-4 rounded-xl font-bold transition " + (currentDay === dayPlan.day ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-50 text-slate-700 hover:bg-indigo-50")}
            >
              <div className="text-sm mb-1">{dayPlan.title}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Day Header */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">{DAILY_PLANS[currentDay - 1].title}</h2>
            <p className="text-slate-600 mt-2">{DAILY_PLANS[currentDay - 1].description}</p>
          </div>

          {/* Task Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DAILY_PLANS[currentDay - 1].tasks.map((task) => (
              <button key={task.id} onClick={() => setSelectedTask(task)}
                className={"p-4 rounded-xl border-2 text-sm font-bold flex flex-col items-center gap-2 transition " + (completedTasks[task.id] ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-white hover:border-indigo-400")}
              >
                <span>{task.type === 'read' ? '📖' : task.type === 'game' ? '🎮' : '📓'}</span>
                {task.text.split(' ')[0]} {completedTasks[task.id] && '✅'}
              </button>
            ))}
          </div>

          {/* Task Content */}
          <div className="pt-4">{renderTaskContent()}</div>
        </div>
      </main>

      {/* Footer Info (Fixed Bottom) */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <div className="bg-indigo-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-4">
          <span>總分：{score} / 100</span>
          <button onClick={() => setTimerActive(!timerActive)} className="text-xs bg-indigo-500 px-3 py-1 rounded-full">
            {timerActive ? "⏳ " + formatTime(studyTime) : "⏱️ 開始計時"}
          </button>
        </div>
      </div>
    </div>
  );
}
