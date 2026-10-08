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

  // ===== CURSOR TRAIL EFFECT =====
  const cursorMain = document.createElement("div");
  cursorMain.id = "cursor-main";
  cursorMain.className = "cursor-dot";
  document.body.appendChild(cursorMain);

  const cursorRing = document.createElement("div");
  cursorRing.id = "cursor-ring";
  cursorRing.className = "cursor-dot";
  document.body.appendChild(cursorRing);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let lastTrail = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorMain.style.transform = "translate(" + (mx - 4) + "px," + (my - 4) + "px)";

    // spawn trail particles
    const now = Date.now();
    if (now - lastTrail > 30) {
      lastTrail = now;
      const p = document.createElement("div");
      p.className = "trail-particle";
      const size = 3 + Math.random() * 4;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = (mx - size / 2 + (Math.random() - 0.5) * 6) + "px";
      p.style.top = (my - size / 2 + (Math.random() - 0.5) * 6) + "px";
      p.style.background = Math.random() > 0.3 ? "#2dd4bf" : "#f59e0b";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }

    // hover node detection
    const el = document.elementFromPoint(mx, my);
    if (el && el.closest && el.closest(".g-node-group")) {
      cursorRing.classList.add("hover-node");
    } else {
      cursorRing.classList.remove("hover-node");
    }
  });

  // smooth ring follow
  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    const rw = cursorRing.offsetWidth;
    cursorRing.style.transform = "translate(" + (rx - rw / 2) + "px," + (ry - rw / 2) + "px)";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursorMain.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursorMain.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });
})();
