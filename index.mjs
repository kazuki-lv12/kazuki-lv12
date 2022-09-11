import * as fs from "fs"
import fetch from "node-fetch"

const main = () => {
  // ダイバージェンス値の生成
  let int = Math.random()

  // ダイバージェンス値の整形
  if (int < 0.5) int = int * 10
  int = Math.floor(int * 100000) / 100000;

  // 世界線の確定
  let world = "ζ"
  if (int < 0.9) world = "α"
  if (int > 0.9 && int < 2.5) world = "γ"
  if (int > 2.5) world = "β"

  // ダイバージェンス値によってメッセージの変更
  let content = `おはよう世界\nここは${world}世界線${int}か...\n`
  if (int > 0.95 && int < 1.05) content = "おはよう世界\nこの世界線はダイバージェンス値が定まっていないのか...\n"

  // 世界線のログ書き込み
  const date = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
  try {
    fs.appendFileSync("./history.txt", `-----------  ${date} -----------\n${content}`);
  } catch {
    content = `おはよう世界\nエラー出てるぞボケ ${process.env.DISCORD_USER}`
  }

  // botが返すbody
  const body = {
    username: `${process.env.USER_NAME}`,
    avatar_url: `${process.env.USER_ICON}`,
    content: content
  }

  // webhookにリクエストを投げる
  fetch(`${process.env.DISCORD_HOOK}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

main()