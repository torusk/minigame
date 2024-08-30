export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;
export const ENEMY_SIZE = 30;
export const PLATE_SIZE = 30;
export const BULLET_SIZE = 10;
export const POWERUP_SIZE = 30;

interface CandyType {
  emoji: string;
  calories: number;
}

export const CANDY_TYPES: CandyType[] = [
  { emoji: "🍬", calories: 20 },
  { emoji: "🍭", calories: 25 },
  { emoji: "🍫", calories: 30 },
  { emoji: "🍪", calories: 50 },
  { emoji: "🧁", calories: 150 },
  { emoji: "🍩", calories: 200 },
  { emoji: "🍰", calories: 20 },
  { emoji: "🍨", calories: 25 },
  { emoji: "🍡", calories: 30 },
  { emoji: "🍷", calories: 50 },
  { emoji: "🍘", calories: 150 },
  { emoji: "🍜", calories: 450 },
  { emoji: "🍛", calories: 650 },
  { emoji: "🍙", calories: 400 },
  { emoji: "🍖", calories: 800 },
  { emoji: "🍣", calories: 80 },
  { emoji: "🦀", calories: 150 },
];

interface ExerciseEquivalent {
  calories: number;
  exercise: string;
}

export const EXERCISE_EQUIVALENTS: ExerciseEquivalent[] = [
  { calories: 1000, exercise: "2時間で東京から横浜までジョギング" },
  { calories: 2000, exercise: "4時間で東京から千葉までマラソン" },
  { calories: 3000, exercise: "6時間で東京から高尾山往復ハイキング" },
  { calories: 4000, exercise: "8時間で東京から熱海までウルトラマラソン" },
  { calories: 5000, exercise: "10時間で東京から箱根まで山岳サイクリング" },
  { calories: 6000, exercise: "12時間で富士山頂上往復登山" },
  { calories: 7000, exercise: "14時間で東京湾一周サイクリング" },
  {
    calories: 8000,
    exercise: "16時間で東京から軽井沢までトレイルランニング",
  },
  { calories: 9000, exercise: "18時間で東京から静岡までウォーキング" },
  {
    calories: 10000,
    exercise: "20時間で東京から名古屋までサイクリング",
  },
  { calories: 11000, exercise: "22時間で富士五湖一周ランニング" },
  { calories: 12000, exercise: "24時間で東京から長野まで山岳マラソン" },
  { calories: 13000, exercise: "26時間で東海道五十三次ウォーキング" },
  {
    calories: 14000,
    exercise: "28時間で東京から金沢までサイクリング",
  },
  {
    calories: 15000,
    exercise: "30時間で東京から大阪まで新幹線並走ランニング",
  },
  { calories: 16000, exercise: "32時間で四国一周ウォーキング" },
  { calories: 17000, exercise: "34時間で本州横断ウルトラマラソン" },
  {
    calories: 18000,
    exercise: "36時間で東京から広島までサイクリング",
  },
  {
    calories: 19000,
    exercise: "38時間で東京から福岡まで新幹線並走ランニング",
  },
  {
    calories: 20000,
    exercise: "40時間で大阪から札幌まで日本縦断ウォーキング",
  },
  { calories: 21000, exercise: "42時間で北海道一周サイクリング" },
  { calories: 22000, exercise: "44時間で沖縄本島一周マラソン" },
  {
    calories: 23000,
    exercise: "46時間で青森から鹿児島までの本州縦断ランニング",
  },
  { calories: 24000, exercise: "48時間で日本アルプス全山脈縦走ハイキング" },
  {
    calories: 25000,
    exercise: "50時間で東京から那覇まで日本縦断ウルトラマラソン",
  },
  { calories: 26000, exercise: "52時間で北海道から九州までの自転車日本縦断" },
  { calories: 27000, exercise: "54時間で日本百名山10座登頂" },
  { calories: 28000, exercise: "56時間で日本海沿岸サイクリング" },
  { calories: 29000, exercise: "58時間で太平洋沿岸ウルトラマラソン" },
  { calories: 30000, exercise: "60時間で四国八十八箇所巡礼ウォーキング" },
  { calories: 31000, exercise: "62時間で東北地方完全踏破ランニング" },
  { calories: 32000, exercise: "64時間で中部地方山岳地帯完全縦断トレッキング" },
  { calories: 33000, exercise: "66時間で九州七県完全巡回サイクリング" },
  { calories: 34000, exercise: "68時間で近畿地方全府県庁所在地巡回マラソン" },
  { calories: 35000, exercise: "70時間で青森から大阪まで本州横断ランニング" },
  {
    calories: 36000,
    exercise: "72時間で北海道から鹿児島まで日本列島縦断ウォーキング",
  },
  {
    calories: 37000,
    exercise: "74時間で日本のすべての県庁所在地を巡るサイクリング",
  },
  { calories: 38000, exercise: "76時間で日本百名山完全制覇登山" },
  {
    calories: 39000,
    exercise: "78時間で本州の海岸線を完全に走破するビーチランニング",
  },
  {
    calories: 40000,
    exercise: "80時間で日本全国の主要河川源流巡りトレッキング",
  },
  {
    calories: 41000,
    exercise: "82時間で日本の離島100島を巡るスイミングとジョギング",
  },
  { calories: 42000, exercise: "84時間で日本全国の世界遺産を巡る文化マラソン" },
  {
    calories: 43000,
    exercise: "86時間で日本列島を横断するクロスカントリースキー",
  },
  {
    calories: 44000,
    exercise: "88時間で日本全国のゴルフ場100コースでのウォーキング",
  },
  {
    calories: 45000,
    exercise: "90時間で日本の国立公園全34カ所を巡るエコマラソン",
  },
  {
    calories: 46000,
    exercise: "92時間で日本の滝百選を巡る Adventure ランニング",
  },
  { calories: 47000, exercise: "94時間で日本の秘湯100カ所を巡る温泉マラソン" },
  { calories: 48000, exercise: "96時間で日本の城100選を巡る歴史サイクリング" },
  {
    calories: 49000,
    exercise: "98時間で日本の全47都道府県庁を巡るウルトラマラソン",
  },
  {
    calories: 50000,
    exercise:
      "100時間で日本全国のパワースポット100カ所を巡る精神統一ウォーキング",
  },
  {
    calories: 51000,
    exercise: "102時間で日本の主要な山脈すべてを縦走する超過酷トレッキング",
  },
  {
    calories: 52000,
    exercise: "104時間で日本の海底火山を全て巡る深海ダイビングと島ランニング",
  },
  {
    calories: 53000,
    exercise: "106時間で日本の全ての天然記念物を訪れる自然保護マラソン",
  },
  {
    calories: 54000,
    exercise: "108時間で日本の全ての灯台を巡る海岸線サイクリング",
  },
  {
    calories: 55000,
    exercise: "110時間で日本の全ての都市を人口順に訪れる都市間ウルトラマラソン",
  },
  {
    calories: 56000,
    exercise: "112時間で日本全国のマンホールを収集して回る文化探訪ジョギング",
  },
  {
    calories: 57000,
    exercise: "114時間で日本の全ての新幹線駅を徒歩で結ぶ線路沿いウォーキング",
  },
  {
    calories: 58000,
    exercise: "116時間で日本全国のご当地グルメを食べ歩く食文化マラソン",
  },
  {
    calories: 59000,
    exercise: "118時間で日本の全ての有人島を巡る島伝いスイムラン",
  },
  {
    calories: 60000,
    exercise: "120時間で日本列島完全縦断・グランドスラムトライアスロン",
  },
];
