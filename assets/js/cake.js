/**
 * cake.js - Interactive Birthday Cake & Candle Simulation
 * Controls candle blowing, smoke puffs, relighting, and card revelation
 */

let candlesLit = true;
let totalCandles = 5;

function initCake() {
  const candles = document.querySelectorAll(".cake-candle");
  candles.forEach((candle, idx) => {
    candle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSingleCandle(candle);
    });
  });
}

/**
 * Toggle single candle flame
 */
function toggleSingleCandle(candleEl) {
  const isLit = candleEl.classList.contains("lit");
  if (isLit) {
    extinguishCandle(candleEl);
    playBlowCandleSFX();
    checkAllCandlesBlown();
  } else {
    igniteCandle(candleEl);
    playLightCandleSFX();
    updateCakeBtnState(true);
  }
}

function extinguishCandle(candleEl) {
  candleEl.classList.remove("lit");
  candleEl.classList.add("blown");

  // Create rising smoke puff
  const smoke = document.createElement("div");
  smoke.className = "candle-smoke";
  candleEl.appendChild(smoke);
  setTimeout(() => {
    if (smoke.parentNode) smoke.parentNode.removeChild(smoke);
  }, 1200);
}

function igniteCandle(candleEl) {
  candleEl.classList.remove("blown");
  candleEl.classList.add("lit");
}

/**
 * Blow out all candles at once (Make a wish action)
 */
function blowOutAllCandles() {
  const candles = document.querySelectorAll(".cake-candle");
  let anyWereLit = false;

  candles.forEach((candle, index) => {
    if (candle.classList.contains("lit")) {
      anyWereLit = true;
      setTimeout(() => {
        extinguishCandle(candle);
      }, index * 80);
    }
  });

  playBlowCandleSFX();
  candlesLit = false;
  updateCakeBtnState(false);

  // Trigger celebration explosion
  setTimeout(() => {
    const cakeEl = document.getElementById("birthday-cake");
    const rect = cakeEl ? cakeEl.getBoundingClientRect() : null;
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height * 0.3 : window.innerHeight * 0.45;

    fireConfettiBurst(originX, originY, 180);
    playPartyPopperSFX();

    // Start playing background song
    playSong(cardConfig.songIndex, true);

    // Unfold and reveal birthday card
    setTimeout(() => {
      openBirthdayCard();
    }, 700);
  }, 350);
}

/**
 * Relight all candles
 */
function relightAllCandles() {
  const candles = document.querySelectorAll(".cake-candle");
  candles.forEach((candle, index) => {
    setTimeout(() => {
      igniteCandle(candle);
    }, index * 60);
  });

  playLightCandleSFX();
  candlesLit = true;
  updateCakeBtnState(true);
  showToast(typeof t === "function" ? t("toastRelit") : "🕯️ Nến đã được thắp sáng trở lại!");
}

function checkAllCandlesBlown() {
  const litCandles = document.querySelectorAll(".cake-candle.lit");
  if (litCandles.length === 0) {
    candlesLit = false;
    updateCakeBtnState(false);
    setTimeout(() => {
      const cakeEl = document.getElementById("birthday-cake");
      const rect = cakeEl ? cakeEl.getBoundingClientRect() : null;
      const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const originY = rect ? rect.top : window.innerHeight * 0.45;

      fireConfettiBurst(originX, originY, 150);
      playPartyPopperSFX();
      playSong(cardConfig.songIndex, true);
      setTimeout(openBirthdayCard, 600);
    }, 250);
  }
}

function updateCakeBtnState(isLit) {
  const btn = document.getElementById("btn-cake-action");
  if (!btn) return;
  const blowText = typeof t === "function" ? t("btnBlow") : "Thổi Nến & Ước Nguyện";
  const relightText = typeof t === "function" ? t("btnRelight") : "Thắp Nến Lại";

  if (isLit) {
    btn.innerHTML = `<i class="fa-solid fa-wind"></i> <span>${blowText}</span>`;
    btn.className = "btn-celebrate btn-blow";
    btn.onclick = blowOutAllCandles;
  } else {
    btn.innerHTML = `<i class="fa-solid fa-fire-flame-curved"></i> <span>${relightText}</span>`;
    btn.className = "btn-celebrate btn-relight";
    btn.onclick = relightAllCandles;
  }
}
