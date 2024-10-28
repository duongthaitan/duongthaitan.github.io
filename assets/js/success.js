function goToHome() {
  const loadingBg = document.getElementById("loading-bg");
  loadingBg.style.display = "flex"; // Hiện nền loading
  setTimeout(function () {
    window.location.href = "index.html"; // Chuyển hướng về trang index.html sau 2 giây
  }, 2000); // 2000 ms = 2 giây
}
