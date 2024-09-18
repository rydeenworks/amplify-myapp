[手を動かして0から理解するAmplify Gen2](https://qiita.com/moritalous/items/76a05676a564960ac974)の記録

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
  - https://github.com/rydeenworks/amplify-myapp/commit/04bdd03c8a9e0cd3d2224346f4343ef345d760c6
  - スターターテンプレートを使わない場合、自分で.gitignoreにAmplify関連の除外ファイルを設定する必要がある
    - 今回は全部ログを残したかったので除外ファイル設定しなかったが、セキュリティ面で心配なのでsandbox環境のバックグランドリソースは削除しておく
  - QuickStartとQiitaの手順の違いを分析すると、システムの挙動について理解できそう
    - QuickStartの場合、テンプレートアプリをAmplifyにデプロイした後で、[4. ローカル環境の設定](https://docs.amplify.aws/react/start/quickstart/#4-set-up-local-environment)でamplify_outputs.jsonをAmplifyコンソールからダウンロードして、ローカルに設置してサンドボックス起動する手順となっている
    - Qiita記事の場合、Amplifyにデプロイする前にサンドボックスを起動する

## 認証機能（Cognito）を追加

### バックエンド側

- サンドボックス起動中にbackend.tsファイルにauthを追加して保存する
  - ファイル保存を検知してバックエンドリソースを自動で構築したことがコンソールログでわかる
    - logicalID: auth179371D7, type: AWS::CloudFormation::Stack, reason: resource 'auth179371D7' was created by this deployment
  - AWS CloudFormationサービスのページを確認すると、スタックが構築されていることが確認できた
  - https://github.com/rydeenworks/amplify-myapp/commit/2f3a087442b196d7deacc8c3cc348eb046a44b55
  - 公式ドキュメント
    - [Set up Amplify Auth](https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth/)

### フロントエンド側

- npm add @aws-amplify/ui-react で[Amplify UI Library](https://ui.docs.amplify.aws/)を追加する
- ソースコードも修正する
  - フロントエンド側では、ここで初めてAmplifyを使った機能を組み込んでいる
- https://github.com/rydeenworks/amplify-myapp/commit/7b6b66512ddd5dde4f4eacd56e877f91e4a3baba
- 公式ドキュメント
  - [Using the Authenticator](https://docs.amplify.aws/react/build-a-backend/auth/connect-your-frontend/using-the-authenticator/)
  - [Authenticator](https://ui.docs.amplify.aws/react/connected-components/authenticator)

## 関数（Lambda）を追加

### バックエンド側

- AWS コンソール画面で追加した関数が確認できた
- https://github.com/rydeenworks/amplify-myapp/commit/6e63ee1e6095e05d16bcded1e3db2f735bdfb456
- 公式ドキュメント
  - [Functions](https://docs.amplify.aws/react/build-a-backend/functions/)
  - [TypeScript の Lambda 関数ハンドラーの定義](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/typescript-handler.html)
  
#### Lambdaを呼び出すための権限を付与

- Cognitoで認証したユーザーにLambdaの実行権限を付与する
- 権限の作法に関するドキュメントの場所は要確認
- https://github.com/rydeenworks/amplify-myapp/commit/6fc91adb6f63a5b2982b55cae37eee49399ff9c9
 
#### フロントエンドへの連携

- amplify_outputs.jsonにLambda関数名（物理名）を出力する
- https://github.com/rydeenworks/amplify-myapp/commit/4d737e3a3301ac6fc37c1a3a4661307ec08b5adc

### フロントエンド側

- Lambdaを呼び出す
- https://github.com/rydeenworks/amplify-myapp/commit/c6a79c044e5da34afa8c1923a3f6495170fbc94e

## 関数（Lambda）を追加（発展編）

### バックエンド側

- awslambda.streaifyResponseのところがTypeScriptの型チェックで赤線エラー出る
  - LambdaのNode.jsランタイム環境に組み込まれているものなので問題ないらしい(要確認)
  - 参考) https://docs.aws.amazon.com/lambda/latest/dg/config-rs-write-functions.html
  - 参考) https://developer.mamezou-tech.com/blogs/2023/04/23/lambda-response-streaming-intro/
- https://github.com/rydeenworks/amplify-myapp/commit/33a30a163de4b9731476ee7f3e0f6543af109704

### フロントエンド側

- https://github.com/rydeenworks/amplify-myapp/commit/58823e0cb80aa6c8e224c6bf55e9539effe04c13
- Bedrockのレスポンスが表示されない課題あり
  - バックエンドで作成したLambda関数はAWSコンソール画面で確認できた
  - 関数のInvocationsグラフから呼び出せていることは確認できた
  - Error count and success rateグラフから呼び出しがErrorとなっていることがわかった
  - CloudWatchログを見るとエラー原因がわかった
    - "errorType": "AccessDeniedException",
    - "errorMessage": "You don't have access to the model with the specified model ID."
  - Handler.tsの以下の実装に関連した問題と推測する、こんなモデルは用意した記憶がない
    - const modelId = "anthropic.claude-3-haiku-20240307-v1:0"
  - [SDKのデベロッパーガイド](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_bedrock_code_examples.html)を見るとモデルを列挙するサンプルコードがあるので試してみる

# 参考

- [AWS Amplify でのフルスタックデプロイ機能が拡張: あらゆる規模のチームに対応](https://aws.amazon.com/jp/blogs/news/team-workflows-amplify/)
  - "AWS CDK との統合"の説明が簡潔でわかりやすい
- [公式ドキュメント](https://docs.amplify.aws/react/start/manual-installation/)にプロジェクトにAmplifyを手動インストールする手順がある
