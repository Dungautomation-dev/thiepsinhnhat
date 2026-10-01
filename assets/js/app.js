/**
 * app.js - Main Application State, Date Logic & Customizer Controller
 * Birthday E-Card by Dung Automation
 */

const PRESET_WISHES = {
  sweet: "Chúc bạn tuổi mới luôn ngập tràn tiếng cười rạng rỡ, mãi giữ trọn nét hồn nhiên, an yên và được yêu thương đong đầy mỗi ngày! 🎂💖",
  romantic: "Cảm ơn vì đã xuất hiện và mang theo muôn vàn sắc màu tươi đẹp vào cuộc đời anh. Chúc em tuổi mới luôn hạnh phúc, xinh đẹp và bình an trong vòng tay anh! 🌹✨",
  friend: "Chúc mừng sinh nhật bạn hiền! Chúc bạn tuổi mới tiền vào như nước, công việc hanh thông, sớm thoát ế và mãi là người đồng hành tuyệt vời nhé! 👭🍻",
  respect: "Kính chúc tuổi mới dồi dào sức khỏe, vạn sự như ý, luôn an vui, hạnh phúc và gặt hái thêm nhiều thành công viên mãn trên con đường phía trước! 💐🌿",
  success: "Chúc bạn tuổi mới bứt phá ngoạn mục, gặt hái những thắng lợi rực rỡ và luôn kiêu hãnh tỏa sáng như ngôi sao sáng nhất trên bầu trời! 🚀🌟"
};

// Global Card Configuration
let cardConfig = {
  recipient: "Nàng Thơ",
  sender: "Người thương bạn",
  birthDate: "",
  wish: PRESET_WISHES.sweet,
  songIndex: 0
};

let typewriterTimer = null;

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  loadSavedOrUrlConfig();
  initConfetti();
  initAudio();
  initCake();
  populateSongSelect();
  applyConfigToUI();

  // Autoplay hint upon first click anywhere if browser blocked audio
  document.body.addEventListener("click", () => {
    getAudioContext();
  }, { once: true });
});

/* --------------------------------------------------------------------------
   Configuration & URL Parameters
   -------------------------------------------------------------------------- */
function loadSavedOrUrlConfig() {
  const urlParams = new URLSearchParams(window.location.search);

  // Check LocalStorage first
  try {
    const saved = localStorage.getItem("thiepsinhnhat_config");
    if (saved) {
      cardConfig = Object.assign(cardConfig, JSON.parse(saved));
    }
  } catch (e) {}

  // URL parameters take highest priority
  if (urlParams.has("to")) {
    cardConfig.recipient = urlParams.get("to").trim();
  }
  if (urlParams.has("from")) {
    cardConfig.sender = urlParams.get("from").trim();
  }
  if (urlParams.has("date")) {
    cardConfig.birthDate = urlParams.get("date").trim();
  }
  if (urlParams.has("msg")) {
    cardConfig.wish = urlParams.get("msg").trim();
  }
  if (urlParams.has("song")) {
    cardConfig.songIndex = parseInt(urlParams.get("song")) || 0;
  }

  // If no date was set, default to today's date formatted as YYYY-MM-DD
  if (!cardConfig.birthDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    cardConfig.birthDate = `${yyyy}-${mm}-${dd}`;
  }
}

/**
 * Calculate birthday countdown and formatted display text
 */
function getBirthdayStatus(dateStr) {
  if (!dateStr) {
    return {
      formatted: "Ngày Đặc Biệt",
      badgeText: "🎉 Ngày Sinh Nhật Ý Nghĩa",
      daysLeft: 0,
      isToday: true
    };
  }

  const parts = dateStr.split("-");
  let birthMonth, birthDay;

  if (parts.length === 3) {
    birthMonth = parseInt(parts[1], 10);
    birthDay = parseInt(parts[2], 10);
  } else if (parts.length === 2) {
    birthMonth = parseInt(parts[0], 10);
    birthDay = parseInt(parts[1], 10);
  } else {
    return {
      formatted: dateStr,
      badgeText: `🎂 Sinh Nhật: ${dateStr}`,
      daysLeft: 0,
      isToday: false
    };
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let nextBday = new Date(currentYear, birthMonth - 1, birthDay);
  if (nextBday < todayZero) {
    nextBday = new Date(currentYear + 1, birthMonth - 1, birthDay);
  }

  const diffTime = nextBday.getTime() - todayZero.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isToday = diffDays === 0;

  const formatted = `Ngày ${birthDay} Tháng ${birthMonth}`;
  let badgeText = "";

  if (isToday) {
    badgeText = `🎉 Hôm nay chính là sinh nhật bạn (${birthDay}/${birthMonth})! 🎂`;
  } else if (diffDays <= 30) {
    badgeText = `⏳ Chỉ còn ${diffDays} ngày nữa là đến sinh nhật (${birthDay}/${birthMonth})! ✨`;
  } else {
    badgeText = `🎂 Chúc Mừng Sinh Nhật: ${birthDay}/${birthMonth}`;
  }

  return { formatted, badgeText, daysLeft: diffDays, isToday };
}

/* --------------------------------------------------------------------------
   UI Binding
   -------------------------------------------------------------------------- */
function applyConfigToUI() {
  const bdayInfo = getBirthdayStatus(cardConfig.birthDate);

  // Hero elements
  const heroBadge = document.getElementById("hero-badge");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const recipientBanner = document.getElementById("recipient-display");

  if (heroBadge) heroBadge.textContent = bdayInfo.badgeText;
  if (heroTitle) heroTitle.innerHTML = `Chúc Mừng Sinh Nhật <span class="highlight-name">${cardConfig.recipient}</span>! 🎂`;
  if (heroSubtitle) {
    heroSubtitle.textContent = bdayInfo.isToday 
      ? `Hôm nay là khoảnh khắc tuyệt vời nhất dành riêng cho bạn. Hãy nhắm mắt ước một điều ước và thổi nến nhé!`
      : `Gửi ngàn lời chúc ngọt ngào nhất nhân ngày sinh nhật ${bdayInfo.formatted}. Chúc bạn tuổi mới luôn rực rỡ!`;
  }
  if (recipientBanner) {
    recipientBanner.textContent = `Dành tặng: ${cardConfig.recipient} • Từ: ${cardConfig.sender}`;
  }

  // Populate Customizer Form
  const inputTo = document.getElementById("input-recipient");
  const inputFrom = document.getElementById("input-sender");
  const inputDate = document.getElementById("input-birthdate");
  const inputMsg = document.getElementById("input-message");
  const selectSong = document.getElementById("select-song");

  if (inputTo) inputTo.value = cardConfig.recipient;
  if (inputFrom) inputFrom.value = cardConfig.sender;
  if (inputDate) inputDate.value = cardConfig.birthDate;
  if (inputMsg) inputMsg.value = cardConfig.wish;
  if (selectSong) selectSong.value = cardConfig.songIndex;

  // Audio track title
  loadSong(cardConfig.songIndex);
}

/* --------------------------------------------------------------------------
   Birthday Card Popup Modal
   -------------------------------------------------------------------------- */
function openBirthdayCard() {
  const modal = document.getElementById("card-modal");
  if (!modal) return;

  const bdayInfo = getBirthdayStatus(cardConfig.birthDate);
  document.getElementById("modal-to-name").textContent = cardConfig.recipient;
  document.getElementById("modal-from-name").textContent = cardConfig.sender;
  document.getElementById("modal-bday-tag").textContent = bdayInfo.badgeText;

  modal.classList.add("open");

  // Typewriter effect on message
  startTypewriter(cardConfig.wish);
}

function closeBirthdayCard() {
  playTapSFX();
  const modal = document.getElementById("card-modal");
  if (modal) modal.classList.remove("open");
  if (typewriterTimer) clearTimeout(typewriterTimer);
}

function startTypewriter(text) {
  if (typewriterTimer) clearTimeout(typewriterTimer);
  const container = document.getElementById("modal-wish-text");
  if (!container) return;
  container.textContent = "";

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      i++;
      typewriterTimer = setTimeout(typeChar, 30 + Math.random() * 20);
    }
  }
  typeChar();
}

/* --------------------------------------------------------------------------
   Customizer Modal & Share Link
   -------------------------------------------------------------------------- */
function openCustomizer() {
  playTapSFX();
  const modal = document.getElementById("customizer-modal");
  if (modal) modal.classList.add("open");
}

function closeCustomizer() {
  playTapSFX();
  const modal = document.getElementById("customizer-modal");
  if (modal) modal.classList.remove("open");
}

function populateSongSelect() {
  const select = document.getElementById("select-song");
  if (!select) return;

  select.innerHTML = "";
  BIRTHDAY_PLAYLIST.forEach(song => {
    const opt = document.createElement("option");
    opt.value = song.id;
    opt.textContent = `🎵 ${song.title} - ${song.artist}`;
    select.appendChild(opt);
  });
}

function applyPresetWish(type) {
  playTapSFX();
  const textarea = document.getElementById("input-message");
  if (textarea && PRESET_WISHES[type]) {
    textarea.value = PRESET_WISHES[type];
    showToast("Đã áp dụng mẫu lời chúc! ✨");
  }
}

function saveCustomCard() {
  playTapSFX();
  const inputTo = document.getElementById("input-recipient");
  const inputFrom = document.getElementById("input-sender");
  const inputDate = document.getElementById("input-birthdate");
  const inputMsg = document.getElementById("input-message");
  const selectSong = document.getElementById("select-song");

  cardConfig.recipient = inputTo.value.trim() || "Bạn Thân";
  cardConfig.sender = inputFrom.value.trim() || "Người gửi";
  cardConfig.birthDate = inputDate.value || "";
  cardConfig.wish = inputMsg.value.trim() || PRESET_WISHES.sweet;
  cardConfig.songIndex = parseInt(selectSong.value) || 0;

  try {
    localStorage.setItem("thiepsinhnhat_config", JSON.stringify(cardConfig));
  } catch (e) {}

  applyConfigToUI();
  closeCustomizer();
  showToast("Đã lưu thông tin thiệp sinh nhật thành công! 🎂");

  // Relight candles and ready for blowing
  relightAllCandles();
}

function copyShareableUrl() {
  playTapSFX();
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("to", document.getElementById("input-recipient").value.trim() || cardConfig.recipient);
  url.searchParams.set("from", document.getElementById("input-sender").value.trim() || cardConfig.sender);
  if (document.getElementById("input-birthdate").value) {
    url.searchParams.set("date", document.getElementById("input-birthdate").value);
  }
  url.searchParams.set("msg", document.getElementById("input-message").value.trim() || cardConfig.wish);
  url.searchParams.set("song", document.getElementById("select-song").value || 0);

  navigator.clipboard.writeText(url.toString()).then(() => {
    showToast("Đã sao chép link tặng thiệp sinh nhật! Gửi ngay cho người ấy nhé 💌");
  }).catch(() => {
    showToast("Link: " + url.toString());
  });
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3400);
}
