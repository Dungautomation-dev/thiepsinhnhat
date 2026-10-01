# 🎂 Interactive 3D Birthday E-Card - Cake & Make-A-Wish Candles 🕯️✨

<p align="center">
  <a href="README.md"><b>🇻🇳 Tiếng Việt</b></a> &nbsp;|&nbsp; 
  <a href="README_EN.md"><b>🇺🇸 English</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-success?style=for-the-badge" alt="Responsive">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>A magical 3D interactive birthday greeting website — Multi-tier birthday cake, glowing candles to blow out, festive confetti cannons, and automated birthday countdown! 🎈🍰</strong>
</p>

---

## 🌟 Overview

**Interactive 3D Birthday E-Card** is a modern, responsive web application engineered purely using HTML5 Canvas, CSS3 3D transforms, and Vanilla JavaScript. Built with a clean, universal aesthetic, it allows anyone to easily create and send a personalized digital birthday greeting to friends, loved ones, parents, or colleagues anywhere in the world.

---

## ✨ Key Features

### 1. 🎂 Interactive 3D Birthday Cake & Blow-Out Candles
- Delicious 2-tier frosted cake decorated with whipped cream peaks, strawberry frosting, caramel drippings, and colorful sprinkles.
- **5 flickering candles** burning atop the cake:
  - Click or tap individual candles to extinguish or relight them.
  - Press the prominent **"🎂 Make a Wish & Blow Candles"** button:
    - Candle flames flicker and blow out with realistic breath sound effects (*Web Audio Procedural SFX*).
    - Delicate smoke puffs (`candle-smoke`) float upwards into the air.
    - A massive **Confetti Cannon explosion** bursts across the screen accompanied by cheerful party popper sounds and chimes.
    - The 3D Birthday Card smoothly unfolds with a typewriter letter-by-letter text animation.
    - Automatically plays sweet background birthday music.
  - The **"🕯️ Relight Candles"** button allows the recipient to experience the magic of blowing candles over and over.

### 2. 📅 Birthday Date Picker & Automatic Countdown
- Allows selecting the recipient's birth date via a native date selector (`<input type="date">`).
- Dynamic real-time calculation:
  - If **today**: Celebratory greeting *"🎉 Today is your birthday! Have a fantastic day!"*.
  - If **upcoming**: Real-time day counter *"⏳ Only X days left until your birthday!"*.
  - Displays the formatted date gracefully across page headers and badges.

### 3. 🌐 Automatic Browser Language Detection (i18n)
- Automatically detects the user's browser language (`navigator.language`).
  - Vietnamese locales (`vi`, `vi-VN`) -> Displays in Vietnamese.
  - Other global locales (`en`, `ja`, `zh`, `fr`, etc.) -> Automatically switches to English.
- Language switcher button in the top toolbar to switch between `🇻🇳 VI` and `🇺🇸 EN` at any time.
- URL parameter support (`?lang=en` or `?lang=vi`).

### 4. 💌 3D Greeting Card & Typewriter Animation
- Opens seamlessly after blowing out the candles or by clicking *"Open Greeting Letter"*.
- Displays the celebration thumbnail, recipient's name, birthday countdown badge, typewriter message, and sender signature.

### 5. 🎊 60 FPS HTML5 Canvas Confetti & Floating Balloons
- Multi-colored pastel party balloons floating serenely upwards from the bottom of the viewport.
- 150+ vibrant 3D rotating confetti pieces, golden foil stars, and ribbons exploding on demand.
- Magical sparkling dust trail following pointer movement.

### 6. 🎶 Vinyl Record Player & Procedural Web Audio SFX
- Sleek spinning vinyl record player dock at the bottom:
  1. *Happy Birthday (Piano Version)*
  2. *Happy Birthday (Acoustic Guitar Version)*
- Zero-latency procedural sound synthesis: breath whoosh, match ignition, popper chime.

### 7. 🎨 Card Customizer & Smart Shareable URL
- Click **"Create Card"** to:
  - Set recipient name.
  - Pick birth date.
  - Set sender name.
  - Choose quick wish presets: 🎂 Sweet, 💖 Romantic, 👭 Best Friends, 💐 Respect, 🚀 Success.
  - Select starting song.
- Click **"Copy Gift Link"**: Encodes everything into query parameters (`?to=...&from=...&date=...&msg=...&song=...`). Anyone who opens the link sees the personalized card tailored just for them!

---

## 📂 Project Structure

```text
thiepsinhnhat/
├── assets/
│   ├── audio/
│   │   ├── happy-birthday-piano.mp3      # Warm acoustic piano song
│   │   └── happy-birthday-acoustic.mp3   # Upbeat acoustic guitar song
│   ├── css/
│   │   └── style.css                     # 3D cake, candles, smoke, glassmorphism, responsive UI
│   ├── images/
│   │   └── birthday-cake.jpg             # High quality celebratory artwork
│   └── js/
│       ├── app.js                        # Core state, countdown, i18n, customizer, URL link
│       ├── audio.js                      # Vinyl dock player & Web Audio SFX synthesizer
│       ├── cake.js                       # Cake interactions, candle blowing, smoke puffs
│       └── confetti.js                   # 60fps canvas confetti cannon & balloon engine
├── .gitignore
├── index.html                            # Semantic HTML5 markup
├── LICENSE                               # MIT License
├── README.md                             # Vietnamese documentation
└── README_EN.md                          # English documentation
```

---

## 🚀 Getting Started & Deployment

### 1. Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Dungauto/thiepsinhnhat.git
   ```
2. Open `index.html` in any modern web browser.

---

### 2. Free Deployment with GitHub Pages
1. Push the code to your GitHub repository.
2. In your repo, go to **Settings** > **Pages**.
3. Under **Branch**, select **`main`** and **`/ (root)`**, then click **Save**.
4. Your website will be live at:
   ```
   https://<username>.github.io/thiepsinhnhat/
   ```

---

## 💌 URL Share Parameters

| Parameter | Description | Example |
| :--- | :--- | :--- |
| `to` | Recipient name | `?to=Sweetheart` |
| `from` | Sender name | `&from=Alex` |
| `date` | Birthday date (`YYYY-MM-DD`) | `&date=2003-10-25` |
| `msg` | Custom message | `&msg=Wishing%20you%20a%20happy%20birthday!` |
| `song` | Initial song index (`0` or `1`) | `&song=0` |
| `lang` | Language code (`en` or `vi`) | `&lang=en` |

👉 **Full Example Link**:
```text
https://dungauto.github.io/thiepsinhnhat/?to=Emma&from=David&date=2002-12-15&msg=Happy%20Birthday!%20May%20all%20your%20dreams%20come%20true!&song=0&lang=en
```

---

## 👨‍💻 Author & License

- **Author**: [Dung Automation](https://github.com/Dungauto)
- **Email**: dungautomation@gmail.com
- **License**: Released under the [MIT License](LICENSE).

<p align="center">
  🎂 <em>Wishing you a joyful, warm, and unforgettable birthday filled with love and laughter!</em> ✨
</p>
