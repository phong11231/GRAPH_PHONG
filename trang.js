(function () {
  const divider  = document.getElementById("thanh_dieu_chinh_kich_thuoc");
  const leftPanel = document.getElementById("khung_chuc_nang");
  const main     = document.querySelector("main");

  const MIN_W = 120;
  const MAX_RATIO = 0.70;

  const saved = localStorage.getItem("panel_left_width");
  if (saved) {
    leftPanel.style.flex = "none";
    leftPanel.style.width = saved + "px";
  }

  let dragging = false;

  divider.addEventListener("mousedown", (e) => {
    dragging = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const rect = main.getBoundingClientRect();
    const w = e.clientX - rect.left;
    const max = rect.width * MAX_RATIO;
    if (w < MIN_W || w > max) return;
    leftPanel.style.flex = "none";
    leftPanel.style.width = w + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    const w = parseInt(leftPanel.style.width);
    if (w) localStorage.setItem("panel_left_width", w);
  });
  // ===== MOBILE DRAWER =====
  const btnMo      = document.getElementById("btn_mo_drawer");
  const overlay    = document.getElementById("mobile_overlay");

  function mo_drawer() {
    leftPanel.classList.add("drawer_open");
    overlay.classList.add("show");
  }
  function dong_drawer() {
    leftPanel.classList.remove("drawer_open");
    overlay.classList.remove("show");
  }

  if (btnMo) {
    btnMo.addEventListener("click", mo_drawer);
    overlay.addEventListener("click", dong_drawer);
  }
})();
