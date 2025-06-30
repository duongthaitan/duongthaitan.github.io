document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainContent = document.getElementById("mainContent");
  const progressBar = document.getElementById("progressBar");
  const loadingPercentage = document.getElementById("loadingPercentage");
  const starsBackground = document.querySelector(".stars-background");

  // Create floating stars
  function createStars() {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.width = Math.random() * 3 + 1 + "px";
      star.style.height = star.style.width;
      star.style.animationDelay = Math.random() * 3 + "s";
      starsBackground.appendChild(star);
    }
  }

  // Create cosmic dust particles
  function createCosmicDust() {
    for (let i = 0; i < 20; i++) {
      const dust = document.createElement("div");
      dust.className = "cosmic-dust";
      dust.style.left = Math.random() * 100 + "%";
      dust.style.animationDelay = Math.random() * 15 + "s";
      dust.style.animationDuration = Math.random() * 10 + 10 + "s";
      loadingScreen.appendChild(dust);
    }
  }
let progress = 0;
const loadingTexts = [
  "INITIALIZING COSMOS...",
  "LOADING GALAXIES...",
  "CALIBRATING PLANETS...",
  "SYNCHRONIZING ORBITS...",
  "IGNITING STARS...",
  "FINALIZING UNIVERSE...",
];

// Cache phần tử DOM để tránh truy cập lặp lại
const loadingTextElement = document.querySelector(".loading-text");

function updateProgress() {
  progress += 1;

  // Cập nhật thanh tiến trình và phần trăm
  progressBar.style.width = `${progress}%`;
  loadingPercentage.textContent = `${progress}%`;

  // Chỉ cập nhật text khi chuyển giai đoạn
  const totalStages = loadingTexts.length;
  const stageSize = Math.ceil(100 / totalStages);
  const textIndex = Math.floor(progress / stageSize);

  if (textIndex < totalStages) {
    loadingTextElement.textContent = loadingTexts[textIndex];
  }

  // Tiếp tục loading hoặc ẩn khi xong
  if (progress < 100) {
    setTimeout(updateProgress, 10); // mượt hơn
  } else {
    setTimeout(hideLoadingScreen, 200);
  }
}



  function hideLoadingScreen() {
    loadingScreen.classList.add("fade-out");

    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.classList.add("show");
    }, 3000);
  }

  // Initialize
  createStars();
  createCosmicDust();

  // Start loading simulation
  setTimeout(updateProgress, 500);

  // Add some dynamic cosmic dust during loading
  setInterval(() => {
    if (!loadingScreen.classList.contains("fade-out")) {
      const dust = document.createElement("div");
      dust.className = "cosmic-dust";
      dust.style.left = Math.random() * 100 + "%";
      dust.style.animationDuration = Math.random() * 8 + 8 + "s";
      loadingScreen.appendChild(dust);

      setTimeout(() => {
        if (dust.parentNode) {
          dust.remove();
        }
      }, 1000);
    }
  }, 1000);
});
