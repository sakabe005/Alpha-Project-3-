# 課題3テトリス

制作課題として、三番目に指定されていたテトリスを作りました。

仕様, 機能
今回作成したソフトウェアは基本的でスタンダートなテトリスを作成しました。

基本的な機能
ソフトウェアが起動するとspaceキーでゲームを始められます。
・ゲームがスタートすると、７つの基本的なブロックが落下してきます。これは7回の落下を一つの単位とし、一度ずつ７つのブロックを出現させます。
・ブロックが10×20のフィールドを落ちていきます。プレイヤーは以下の操作を行うことができます。
  ・キーボード上の左右のキーを押し、フィールドの範囲内でブロックを左右に動かす。
  ・キーボード上のZキー及びXキーで、ブロックを左右に回転させる。
  ・下キーを押した場合は、ブロックは速やかに落ちる。
  ・Aキーを押した場合、hold機能が動く。すきなブロックを保持しておける機能であり、最初にhold機能を使った場合は、フィールド上のブロックが消えて保持され、次のブロッ 
  クが落ちてくる。別のタイミングでもう一度押した場合、現在落下中のブロックとホールドされているブロックが入れ替わり、ホールドされていたブロックが使用可能になる。
  もともと落ちていたブロックはまたホールドされ、同じように任意のタイミングで使用可能です。
・落ちているブロックが床に達するか、すでに積みあがったブロックの上に乗るとブロックは固定され、停止されます。その後すぐに新しいブロックが落ちてきます。
・固定されたブロックが横の行を完全に埋めた場合、その行は削除され、その分全体の積みあがったブロックが下がります。一度に最高で４行消えますが、消えた行の数に応じて点数が加算されます。
  ・１行：100点
  ・２行：250点
  ・３行：500点
  ・４行：1000点
・ブロックが最上段にまでたまり、新しいブロックが生成できなくなった場合はゲームオーバーです。
  Spaceキーを押すと、再びリセットされてゲームを開始できます。

  以下に実際のゲーム画面を示します。
  ![スクリーンショット 2024-05-12 152204](https://github.com/sakabe005/Alpha-Project-subject-3-tetris-/assets/129036586/8682b9c6-0105-42d4-af7d-b1c1c596f2df)




使用言語
html + javascript

githubのdownload zip等でローカルに保存してから、解凍してください。

htmlが読み込め、そこからjavascriptが動かせる環境であれば、実行可能ですが、今回は２通りの実行環境構築方法と実行方法を説明いたします。

想定環境: windows PC

#1. python3を使ってローカルサーバを立てる。
python公式サイトhttps://www.python.org/downloads/
からpython3をダウンロード、
ダウンロードしたexeファイルをクリックして実行。インストーラが立ち上がったら、Add Python 3.10 to PATH]にチェックを入れてインストール開始。

インストールが終わったら、保存したローカルのファイルにあるstart.batをクリックすれば起動可能です。

#2. visual studio codeを使う。
visual studio code 公式サイトhttps://code.visualstudio.com/download
からインストーラをダウンロードした後、exeファイルを実行し、インストーラを立ち上げます。
次にvisual studio codeを立ち上げ、下画像にあるExtentionをクリックし、
![スクリーンショット 2024-05-12 150258](https://github.com/sakabe005/Alpha-Project-subject-3-tetris-/assets/129036586/6bfa58e8-acd9-4594-be9a-349a66ed7186)

さらにそこにあるLive Serverをインストールしてください。
![スクリーンショット 2024-05-12 150545](https://github.com/sakabe005/Alpha-Project-subject-3-tetris-/assets/129036586/35093750-60c4-4e98-b7eb-ec818fb0d234)

Fileメニュー→Open Folderをクリックし、
ファイルエクスプローラーが立ち上がったら、課題のソフトのあるフォルダの、index.htmlがあるフォルダを指定してフォルダの選択をクリックすれば読み込めます。

最後に、下画像にあるGo Liveをクリックすれば起動可能です。
![スクリーンショット 2024-05-12 151542](https://github.com/sakabe005/Alpha-Project-subject-3-tetris-/assets/129036586/7be4b7fa-4808-42f0-9e95-5520d0e0292e)







