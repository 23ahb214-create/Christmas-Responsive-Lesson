const tree = document.getElementById('tree');
const partyBtn = document.getElementById('partyBtn');
const snowBtn = document.getElementById('snowBtn');
const audio = document.getElementById('xmasSound');

let isParty = false;
partyBtn.addEventListener('click', async () => {
isParty = !isParty;
if (isParty) {
tree.classList.add('party');
partyBtn.textContent = '演出停止';
playAudio(); // 音を鳴らす共通関数
} else {
tree.classList.remove('party');
partyBtn.textContent = '✨ クリック演出';
stopAudio(); // 音を止める共通関数
}
});

// --- 雪ボタンの処理（ここを修正） ---
snowBtn.addEventListener('click', () => {
const isSnowing = document.body.classList.toggle('snowing');

if (isSnowing) {
snowBtn.textContent = '❄ 雪を止める';
playAudio(); // 雪が降り始めたら音を鳴らす
} else {
snowBtn.textContent = '❄ 雪を降らす';
// パーティー演出もOFFなら音を止める
if (!tree.classList.contains('party')) {
    stopAudio();
}
}
});

// --- 音を鳴らす・止めるための関数 ---
async function playAudio() {
try {
// すでに流れていたら最初からにする、またはそのまま流す
if (audio.paused) {
    audio.currentTime = 0;
    await audio.play();
}
} catch (e) {
console.warn('再生がブロックされました。ユーザー操作が必要です。', e);
}
}

function stopAudio() {
audio.pause();
audio.currentTime = 0;
}