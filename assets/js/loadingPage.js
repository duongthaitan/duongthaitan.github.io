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

  // Simulate loading progress
  let progress = 0;
  const loadingTexts = [
    "INITIALIZING COSMOS...",
    "LOADING GALAXIES...",
    "CALIBRATING PLANETS...",
    "SYNCHRONIZING ORBITS...",
    "IGNITING STARS...",
    "FINALIZING UNIVERSE...",
  ];

  function updateProgress() {
    const increment = Math.random() * 15 + 5;
    progress = Math.min(progress + increment, 100);

    progressBar.style.width = progress + "%";
    loadingPercentage.textContent = Math.floor(progress) + "%";

    // Update loading text based on progress
    const textIndex = Math.floor((progress / 100) * loadingTexts.length);
    if (textIndex < loadingTexts.length) {
      document.querySelector(".loading-text").textContent =
        loadingTexts[textIndex];
    }

    if (progress < 100) {
      setTimeout(updateProgress, Math.random() * 200 + 100);
    } else {
      // Loading complete
      setTimeout(hideLoadingScreen, 100);
    }
  }

  function hideLoadingScreen() {
    loadingScreen.classList.add("fade-out");

    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.classList.add("show");
    }, 1000);
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
      }, 15000);
    }
  }, 1000);
});
