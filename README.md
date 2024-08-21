2024-08-14

# 背景

- AWS Amplifyについて[QuickStartの内容](https://docs.amplify.aws/react/start/quickstart/)をもっと掘り下げて理解したい
  - QuickStartでは公式が用意したGitHubのテンプレートリポジトリをコピーした
  - テンプレートの中身を理解したい
- ちょうど良いQiita記事があったので参考にして手を動かしてみる
  - [手を動かして0から理解するAmplify Gen2](https://qiita.com/moritalous/items/76a05676a564960ac974)

# 内容

## 環境

- node: v22.5.1
- npm: 10.8.2
- aws: aws-cli/2.17.12 Python/3.11.9 Darwin/22.6.0 exe/x86_64
- AWSクライアントのインストールおよびAWS認証情報(defaultプロファイル作成)は準備済み
  - 準備手順は[チュートリアル(Configure AWS for local development)](https://docs.amplify.aws/react/start/account-setup/)の通り

## Reactプロジェクトを作成

- Viteを使ってReact+TypeScriptのプロジェクトを作成する
  - コマンド実行してテンプレートが生成されるだけなので、特に問題なし
  - https://github.com/rydeenworks/amplify-myapp/commit/c98db95fcf6805d65fc7c529cacbfd236d27b2ea

## プロジェクトにAmplifyを追加

- npmでAmplifyライブラリを追加する
  - package.jsonとpackage-lock.jsonが更新される
  - --save-devオプションは調べて理解した
    - [【npm初心者】なんんとなく使っていた npm install の --save-dev ついて調べてみた](https://zenn.dev/hrkmtsmt/articles/5f4a0e5c79b77a)
  - https://github.com/rydeenworks/amplify-myapp/commit/14b51883a7dfeefe2022c7dbd14e8401f8d16e06
- amplify/backend.tsを作成する


# 参考

- [AWS Amplify でのフルスタックデプロイ機能が拡張: あらゆる規模のチームに対応](https://aws.amazon.com/jp/blogs/news/team-workflows-amplify/)
  - "AWS CDK との統合"の説明が簡潔でわかりやすい
