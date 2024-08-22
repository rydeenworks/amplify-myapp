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
  - バックエンド構築のための関数を用意しただけ
  - https://github.com/rydeenworks/amplify-myapp/commit/81f741d63b586e3574bc2988ae05f778f96d5867

## サンドボックスの起動

- npx ampx sandbox コマンドで起動する
  - 公式ドキュメントを読み込むとサンドボックス機能のイメージができる
    - QuickStartの[8. クラウドサンドボックスを展開する](https://docs.amplify.aws/react/start/quickstart/#8-deploy-cloud-sandbox)
    - Conceptsの[Faster local development](https://docs.amplify.aws/react/how-amplify-works/concepts/#faster-local-development)
    - コマンドの役割は[5. Bootstrap your AWS account](https://docs.amplify.aws/react/start/account-setup/#5-bootstrap-your-aws-account)に詳しく書いてある
      - "クラウド サンドボックス環境でリソースのデプロイを開始する前に、Amplify はアカウントと AWS リージョンの 1 回限りのブートストラップ設定を完了する必要があります。"
      - "ブートストラップとは、AWS CDK アプリを AWS 環境にデプロイする前に、AWS CDK のリソースをプロビジョニングするプロセスです。"
      - プロビジョニングという用語に馴染みがないが、[以下の解説(リンク先から抜粋)](https://pfs.nifcloud.com/navi/words/provisioning.htm)で良さそう
        - "「プロビジョン（Provision）」とは、「準備」「提供」「対策」といった意味を持つ英単語です。"
        - "「プロビジョニング（Provisioning）」はその現在分詞で、「必要なものを準備すること」を指します。"
        - "そこから転じてIT分野では、システムやサービスの需要に応じて、サーバーやネットワークなどのITインフラ設備を調達・設定することを「プロビジョニング」と呼んでいます。"
    - コマンドの仕様は公式ドキュメントの[CLI commands](https://docs.amplify.aws/react/reference/cli-commands/)に記載あり
    - 最初はコマンドに失敗して以下のメッセージが出た、一ヶ月ほど前にQuickStartでログインしたきりだったので期限が切れたと思われる
      - InvalidCredentialError: Failed to load default AWS credentials
      - Resolution: To configure a new Amplify profile, use npx ampx configure profile.
      - Cause: Token is expired. To refresh this SSO session run 'aws sso login' with the corresponding profile.
    - aws sso login --profile default を実行したら解決した
      - コマンドを実行するとログインWebページが開かれる
      - [2. Create password for user](https://docs.amplify.aws/react/start/account-setup/#2-create-password-for-user)で設定したユーザ名・パスワードでOKだった
    - [Use cloud sandbox in dev environment](https://docs.amplify.aws/react/deploy-and-host/sandbox-environments/setup/)が詳しい説明
    - [Sandbox features](https://docs.amplify.aws/react/deploy-and-host/sandbox-environments/features/)に高度な使い方の説明がある
  - QuickStartの場合、テンプレートアプリをAmplifyにデプロイした後で、[4. ローカル環境の設定](https://docs.amplify.aws/react/start/quickstart/#4-set-up-local-environment)でamplify_outputs.jsonをAmplifyコンソールからダウンロードして、ローカルに設置してサンドボックス起動する手順となっている
  - Qiita記事の場合、Amplifyにデプロイする前にサンドボックスを起動する

# 参考

- [AWS Amplify でのフルスタックデプロイ機能が拡張: あらゆる規模のチームに対応](https://aws.amazon.com/jp/blogs/news/team-workflows-amplify/)
  - "AWS CDK との統合"の説明が簡潔でわかりやすい
- [公式ドキュメント](https://docs.amplify.aws/react/start/manual-installation/)にプロジェクトにAmplifyを手動インストールする手順がある
