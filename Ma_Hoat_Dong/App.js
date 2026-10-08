const DEFAULT_GRAPHS = [];

class App {
  constructor() {
    this.button_lay_file = document.getElementById("button_lay_file");
    this.input_file = document.getElementById("input_file");
    this.so_luong_file = document.getElementById("so_luong_file");
    this.button_lay_file.addEventListener("click", () => this.input_file.click());
    this.danh_sach_file = document.getElementById("danh_sach_file");
    this.list_file = [];
    this.che_do = null; // 'them_dinh' | 'them_canh' | 'xoa_dinh'
    this.canh_dau = null; // dinh dau khi dang noi canh

    this.input_file.addEventListener("change", (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          const file_trong = document.querySelector(".file_trong");
          if (file_trong) file_trong.remove();
          this.list_file.push(e.target.result);
          this.so_luong_file.innerText = this.list_file.length;
          this.Them_Menu_File(file, e.target.result);
        };
      }
      this.input_file.value = "";
    });

    this.file_duoc_chon = null;
    this.graph = null;
    this.anim = null;
    this.ket_qua_hien_tai = null;

    document.getElementById("btn_xem_ket_qua").addEventListener("click", () => {
      const khung = document.getElementById("khung_ket_qua");
      if (!this.ket_qua_hien_tai) return;
      khung.style.display = khung.style.display === "none" ? "block" : "none";
    });

    // xoa localStorage cu (file mac dinh cu)
    localStorage.removeItem("app_files");
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith("app_content_")) localStorage.removeItem(key);
    }

    const slider = document.getElementById("slider_toc_do");
    const hien_toc_do = document.getElementById("hien_toc_do");
    slider.addEventListener("input", () => hien_toc_do.textContent = slider.value);

    // animation controls
    document.getElementById("btn_dung_tiep_tuc").addEventListener("click", () => {
      if (!this.anim) return;
      if (this.anim.paused) {
        this.anim.paused = false;
        document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9646;&#9646;";
        this.Bat_Dau_Animation();
      } else {
        this.anim.paused = true;
        clearTimeout(this.anim.timer);
        document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9654;";
      }
    });

    document.getElementById("btn_buoc_toi").addEventListener("click", () => {
      if (!this.anim) return;
      this.anim.paused = true;
      clearTimeout(this.anim.timer);
      document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9654;";
      if (this.anim.buoc < this.anim.chu_trinh.length) {
        this.anim.fn_buoc(this.anim.buoc);
        this.anim.buoc++;
      }
    });

    document.getElementById("btn_buoc_lui").addEventListener("click", () => {
      if (!this.anim || this.anim.buoc <= 0) return;
      this.anim.paused = true;
      clearTimeout(this.anim.timer);
      document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9654;";
      this.anim.buoc = Math.max(0, this.anim.buoc - 1);
      this.anim.fn_replay();
    });

    // FLOYD
    document.getElementById("button_floyd").addEventListener("click", () => {
      this.Tat_Che_Do();
      if (!this.graph || this.graph.so_dinh < 2) { alert("Can it nhat 2 dinh!"); return; }
      this.Hien_Modal_Hai_Dinh("Start", "End", (start, end) => {
        const floyd = new Floyd(this.graph);
        const ket_qua = floyd.Thuc_Thi(start, end);
        if (!ket_qua) { alert("Khong co duong di tu " + start + " den " + end + "!"); return; }
        this.Chay_Animation_Floyd(ket_qua);
      });
    });

    // THEM DINH
    document.getElementById("button_them_dinh").addEventListener("click", () => {
      if (this.che_do === "them_dinh") { this.Tat_Che_Do(); return; }
      this.Bat_Che_Do("them_dinh");
    });

    // THEM CANH
    document.getElementById("button_them_canh").addEventListener("click", () => {
      if (this.che_do === "them_canh") { this.Tat_Che_Do(); return; }
      if (!this.graph || this.graph.so_dinh < 2) { alert("Can it nhat 2 dinh!"); return; }
      this.Bat_Che_Do("them_canh");
    });

    // XOA DINH
    document.getElementById("button_xoa_dinh").addEventListener("click", () => {
      if (this.che_do === "xoa_dinh") { this.Tat_Che_Do(); return; }
      if (!this.graph || this.graph.so_dinh === 0) { alert("Khong co dinh nao!"); return; }
      this.Bat_Che_Do("xoa_dinh");
    });

    // XOA HET
    document.getElementById("button_xoa_het").addEventListener("click", () => {
      this.Tat_Che_Do();
      if (!this.graph) {
        this.graph = Graph.Tao_Rong();
      }
      this.graph.Xoa_Het();
    });

    // XUAT FILE TXT
    document.getElementById("button_xuat_file").addEventListener("click", () => {
      this.Tat_Che_Do();
      if (!this.graph || this.graph.so_dinh === 0) { alert("Khong co do thi de xuat!"); return; }
      var lines = [];
      lines.push(String(this.graph.so_dinh));
      for (var i = 0; i < this.graph.so_dinh; i++) {
        var row = [];
        for (var j = 0; j < this.graph.so_dinh; j++) {
          row.push(String(this.graph.ma_tran[i][j]));
        }
        lines.push(row.join(" "));
      }
      var text = lines.join("\n");
      var blob = new Blob([text], { type: "text/plain" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "graph_floyd.txt";
      a.click();
      URL.revokeObjectURL(a.href);
    });

    // SVG click handler
    document.getElementById("svg_do_thi").addEventListener("click", (e) => {
      if (!this.che_do) return;
      const svg = document.getElementById("svg_do_thi");

      if (this.che_do === "them_dinh") {
        if (!this.graph) this.graph = Graph.Tao_Rong();
        const pt = this.graph._svg_point(svg, e);
        this.graph.Them_Dinh(pt.x, pt.y);
        return;
      }

      if (this.che_do === "xoa_dinh") {
        const g = e.target.closest(".g-node-group");
        if (!g) return;
        const idx = parseInt(g.dataset.index);
        this.graph.Xoa_Dinh(idx);
        return;
      }

      if (this.che_do === "them_canh") {
        const g = e.target.closest(".g-node-group");
        if (!g) return;
        const idx = parseInt(g.dataset.index);

        if (this.canh_dau === null) {
          this.canh_dau = idx;
          const node = svg.querySelector('.g-node-group[data-index="' + idx + '"] .g-node');
          if (node) { node.style.fill = "#f59e0b"; node.style.stroke = "#fff"; }
          this.Hien_Trang_Thai("Click dinh thu 2 de noi canh (dinh dau: " + idx + ")");
        } else {
          const u = this.canh_dau;
          const v = idx;
          this.canh_dau = null;
          if (u === v) { this.Hien_Trang_Thai("Khong the noi dinh voi chinh no!"); return; }
          this.Hien_Modal_Trong_So(u, v, (w) => {
            this.graph.Them_Canh(u, v, w);
            this.Hien_Trang_Thai("Click 2 dinh de noi canh");
          });
        }
        return;
      }
    });
  }

  Bat_Che_Do(che_do) {
    this.Tat_Che_Do();
    this.che_do = che_do;
    this.canh_dau = null;
    const label = {
      them_dinh: "Click vao SVG de them dinh",
      them_canh: "Click 2 dinh de noi canh",
      xoa_dinh: "Click dinh de xoa",
    };
    this.Hien_Trang_Thai(label[che_do]);
    document.getElementById("button_" + che_do).classList.add("active_mode");
  }

  Tat_Che_Do() {
    if (this.che_do) {
      document.getElementById("button_" + this.che_do).classList.remove("active_mode");
    }
    this.che_do = null;
    this.canh_dau = null;
    const el = document.getElementById("che_do_hien_tai");
    el.style.display = "none";
    el.textContent = "";
  }

  Hien_Trang_Thai(text) {
    const el = document.getElementById("che_do_hien_tai");
    el.style.display = "block";
    el.textContent = text;
  }

  Hien_Modal_Trong_So(u, v, callback) {
    const overlay = document.createElement("div");
    overlay.id = "modal_overlay";
    overlay.innerHTML =
      '<div id="modal_nhap_dinh">' +
        '<p class="modal_title">Nhap trong so canh ' + u + ' → ' + v + '</p>' +
        '<div class="modal_field">' +
          '<label>Trong so (so duong)</label>' +
          '<input type="number" id="input_trong_so" min="1" value="1">' +
        '</div>' +
        '<p id="modal_loi" style="color:#ff4d5e;font-size:12px;min-height:16px;"></p>' +
        '<div class="modal_buttons">' +
          '<button id="btn_modal_cancel">Huy</button>' +
          '<button id="btn_modal_ok">OK</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.getElementById("input_trong_so").focus();
    document.getElementById("input_trong_so").select();
    document.getElementById("btn_modal_ok").onclick = () => {
      const w = parseInt(document.getElementById("input_trong_so").value);
      if (!w || w <= 0) {
        document.getElementById("modal_loi").textContent = "Trong so phai la so duong!";
        return;
      }
      overlay.remove();
      callback(w);
    };
    document.getElementById("input_trong_so").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("btn_modal_ok").click();
    });
    document.getElementById("btn_modal_cancel").onclick = () => {
      overlay.remove();
      this.canh_dau = null;
    };
  }

  Khoi_Phuc_Tu_LocalStorage() {
    const ds = JSON.parse(localStorage.getItem("app_files") || "[]");
    ds.forEach(name => {
      const content = localStorage.getItem("app_content_" + name);
      if (!content) return;
      const file_trong = document.querySelector(".file_trong");
      if (file_trong) file_trong.remove();
      this.list_file.push(content);
      this.so_luong_file.innerText = this.list_file.length;
      const fakeFile = new File([content], name, { type: "text/plain" });
      this.Them_Menu_File(fakeFile, content);
    });
  }

  Hien_Modal_Hai_Dinh(nhan_start, nhan_end, callback) {
    const max = this.graph.so_dinh - 1;
    const overlay = document.createElement("div");
    overlay.id = "modal_overlay";
    overlay.innerHTML =
      '<div id="modal_nhap_dinh">' +
        '<p class="modal_title">Chon dinh</p>' +
        '<div class="modal_row">' +
          '<div class="modal_field">' +
            '<label>Start</label>' +
            '<input type="number" id="input_start" min="0" max="' + max + '" value="0">' +
          '</div>' +
          '<div class="modal_arrow">→</div>' +
          '<div class="modal_field">' +
            '<label>End</label>' +
            '<input type="number" id="input_end" min="0" max="' + max + '" value="1">' +
          '</div>' +
        '</div>' +
        '<p class="modal_hint">Dinh hop le: 0 – ' + max + '</p>' +
        '<p id="modal_loi" style="color:#ff4d5e;font-size:12px;min-height:16px;"></p>' +
        '<div class="modal_buttons">' +
          '<button id="btn_modal_cancel">Huy</button>' +
          '<button id="btn_modal_ok">OK</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.getElementById("btn_modal_ok").onclick = () => {
      const start = parseInt(document.getElementById("input_start").value);
      const end   = parseInt(document.getElementById("input_end").value);
      if (start < 0 || start > max || end < 0 || end > max) {
        document.getElementById("modal_loi").textContent = "Dinh phai tu 0 den " + max;
        return;
      }
      overlay.remove();
      callback(start, end);
    };
    document.getElementById("btn_modal_cancel").onclick = () => overlay.remove();
  }

  Chay_Animation_Floyd(ket_qua) {
    var svg = document.getElementById("svg_do_thi");
    if (this.anim) clearTimeout(this.anim.timer);
    this.anim = null;

    var { duong_di, tong } = ket_qua;
    this.ket_qua_hien_tai = duong_di;
    document.getElementById("ten_thuat_toan").textContent = "Floyd (tong: " + tong + ")";
    document.getElementById("noi_dung_ket_qua").textContent = duong_di.join(" → ");
    document.getElementById("khung_ket_qua").style.display = "block";
    document.getElementById("btn_xem_ket_qua").style.display = "block";

    this.Reset_Mau(svg);

    // highlight duong di xanh la
    var lay_canh = function(u, v) {
      return svg.querySelector('.g-edge[data-u="' + u + '"][data-v="' + v + '"]') ||
        svg.querySelector('.g-edge[data-u="' + v + '"][data-v="' + u + '"]');
    };
    duong_di.forEach(function(v) {
      var node = svg.querySelector('.g-node-group[data-index="' + v + '"] .g-node');
      var lbl = svg.querySelector('.g-node-group[data-index="' + v + '"] .g-label');
      if (node) { node.style.fill = "#33FF00"; node.style.stroke = "#fff"; }
      if (lbl) lbl.style.fill = "#000";
    });
    for (var i = 1; i < duong_di.length; i++) {
      var c = lay_canh(duong_di[i - 1], duong_di[i]);
      if (c) { c.style.stroke = "#33FF00"; c.style.strokeWidth = "3"; c.style.filter = "drop-shadow(0 0 6px #33FF00)"; }
    }

    // chay con chuot di chuyen
    this.Chay_Di_Chuyen_Dot(svg, duong_di);
  }

  Chay_Di_Chuyen_Dot(svg, duong_di) {
    var oldG = svg.querySelector("#nhom_dot_di_chuyen");
    if (oldG) oldG.remove();
    var oldTrail = svg.querySelector("#dot_trail");
    if (oldTrail) oldTrail.remove();

    if (!this.graph || duong_di.length < 2) return;
    var pos = this.graph.vi_tri_dinh;
    var NS = "http://www.w3.org/2000/svg";

    // trail path
    var trailPath = document.createElementNS(NS, "path");
    trailPath.id = "dot_trail";
    trailPath.setAttribute("fill", "none");
    trailPath.setAttribute("stroke", "#f59e0b");
    trailPath.setAttribute("stroke-width", "4");
    trailPath.setAttribute("stroke-linecap", "round");
    trailPath.setAttribute("stroke-dasharray", "8 5");
    trailPath.setAttribute("opacity", "0.8");
    trailPath.setAttribute("d", "M" + pos[duong_di[0]].x + "," + pos[duong_di[0]].y);
    svg.appendChild(trailPath);

    // group for dot + glow + label
    var g = document.createElementNS(NS, "g");
    g.id = "nhom_dot_di_chuyen";
    svg.appendChild(g);

    // outer glow ring
    var glow = document.createElementNS(NS, "circle");
    glow.setAttribute("r", "28");
    glow.setAttribute("fill", "none");
    glow.setAttribute("stroke", "#f59e0b");
    glow.setAttribute("stroke-width", "2");
    glow.setAttribute("opacity", "0.4");
    glow.setAttribute("cx", pos[duong_di[0]].x);
    glow.setAttribute("cy", pos[duong_di[0]].y);
    g.appendChild(glow);

    // main dot - big and bright
    var dot = document.createElementNS(NS, "circle");
    dot.id = "dot_di_chuyen";
    dot.setAttribute("r", "18");
    dot.setAttribute("fill", "#f59e0b");
    dot.setAttribute("stroke", "#fff");
    dot.setAttribute("stroke-width", "3");
    dot.setAttribute("cx", pos[duong_di[0]].x);
    dot.setAttribute("cy", pos[duong_di[0]].y);
    dot.style.filter = "drop-shadow(0 0 12px #f59e0b) drop-shadow(0 0 24px #f59e0b)";
    g.appendChild(dot);

    // arrow icon inside dot
    var arrow = document.createElementNS(NS, "text");
    arrow.setAttribute("x", pos[duong_di[0]].x);
    arrow.setAttribute("y", pos[duong_di[0]].y + 5);
    arrow.setAttribute("text-anchor", "middle");
    arrow.setAttribute("font-size", "18");
    arrow.setAttribute("font-weight", "bold");
    arrow.setAttribute("fill", "#000");
    arrow.setAttribute("pointer-events", "none");
    arrow.textContent = "▶";
    g.appendChild(arrow);

    // label showing current step
    var label = document.createElementNS(NS, "text");
    label.id = "dot_label";
    label.setAttribute("x", pos[duong_di[0]].x);
    label.setAttribute("y", pos[duong_di[0]].y - 30);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "14");
    label.setAttribute("font-weight", "bold");
    label.setAttribute("fill", "#f59e0b");
    label.style.stroke = "#111";
    label.style.strokeWidth = "3px";
    label.style.paintOrder = "stroke fill";
    label.textContent = "START → " + duong_di[0];
    g.appendChild(label);

    var step = 0;
    var glowPulse = 0;
    var glowId = setInterval(function() {
      glowPulse++;
      var r = 28 + Math.sin(glowPulse * 0.15) * 6;
      glow.setAttribute("r", r);
      glow.setAttribute("opacity", 0.3 + Math.sin(glowPulse * 0.15) * 0.15);
    }, 40);

    function di_chuyen_buoc() {
      if (step >= duong_di.length - 1) {
        clearInterval(glowId);
        dot.setAttribute("fill", "#33FF00");
        dot.style.filter = "drop-shadow(0 0 12px #33FF00) drop-shadow(0 0 24px #33FF00)";
        glow.setAttribute("stroke", "#33FF00");
        arrow.textContent = "✔";
        label.textContent = "END → " + duong_di[duong_di.length - 1];
        label.setAttribute("fill", "#33FF00");
        var pulse = 0;
        var pulseId = setInterval(function() {
          pulse++;
          var r = 18 + Math.sin(pulse * 0.3) * 6;
          dot.setAttribute("r", r);
          if (pulse > 40) { clearInterval(pulseId); dot.setAttribute("r", "18"); }
        }, 50);
        return;
      }

      var fromIdx = duong_di[step];
      var toIdx = duong_di[step + 1];
      var fx = pos[fromIdx].x, fy = pos[fromIdx].y;
      var tx = pos[toIdx].x, ty = pos[toIdx].y;
      var duration = 1200;
      var startTime = null;
      var trailD = trailPath.getAttribute("d");
      label.textContent = duong_di[step] + " → " + duong_di[step + 1];

      function animate(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        var cx = fx + (tx - fx) * ease;
        var cy = fy + (ty - fy) * ease;
        dot.setAttribute("cx", cx);
        dot.setAttribute("cy", cy);
        glow.setAttribute("cx", cx);
        glow.setAttribute("cy", cy);
        arrow.setAttribute("x", cx);
        arrow.setAttribute("y", cy + 5);
        label.setAttribute("x", cx);
        label.setAttribute("y", cy - 30);
        trailPath.setAttribute("d", trailD + " L" + cx + "," + cy);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          step++;
          setTimeout(di_chuyen_buoc, 300);
        }
      }
      requestAnimationFrame(animate);
    }

    setTimeout(di_chuyen_buoc, 600);
  }

  Reset_Mau(svg) {
    svg.querySelectorAll(".g-node").forEach(n => { n.style.fill = ""; n.style.stroke = ""; });
    svg.querySelectorAll(".g-label").forEach(l => { l.style.fill = ""; });
    svg.querySelectorAll(".g-edge").forEach(e => { e.style.stroke = ""; e.style.filter = ""; e.style.strokeWidth = ""; });
    svg.querySelectorAll(".g-sublabel-group").forEach(sl => { sl.style.display = "none"; });
    var oldDot = svg.querySelector("#dot_di_chuyen"); if (oldDot) oldDot.remove();
    var oldTrail = svg.querySelector("#dot_trail"); if (oldTrail) oldTrail.remove();
  }

  Bat_Dau_Animation() {
    const chay = () => {
      if (this.anim.paused || this.anim.buoc >= this.anim.chu_trinh.length) {
        if (this.anim.buoc >= this.anim.chu_trinh.length)
          document.getElementById("btn_xem_ket_qua").style.display = "block";
        return;
      }
      this.anim.fn_buoc(this.anim.buoc);
      this.anim.buoc++;
      const delay = Math.round(4000 / parseInt(document.getElementById("slider_toc_do").value));
      this.anim.timer = setTimeout(chay, delay);
    };
    chay();
  }

  Tai_Do_Thi_Mac_Dinh() {
    DEFAULT_GRAPHS.forEach(({ name, content }) => {
      const file_trong = document.querySelector(".file_trong");
      if (file_trong) file_trong.remove();
      this.list_file.push(content);
      this.so_luong_file.innerText = this.list_file.length;
      const fakeFile = new File([content], name, { type: "text/plain" });
      this.Them_Menu_File(fakeFile, content, true);
    });
  }

  Them_Menu_File(file, content, la_mac_dinh) {
    if (la_mac_dinh === undefined) la_mac_dinh = false;
    const li = document.createElement("li");
    const button_radio = document.createElement("button");
    const span_file = document.createElement("span");
    const button_remove = document.createElement("button");

    li.classList.add("list_menu_file");
    if (la_mac_dinh) li.classList.add("mac_dinh");
    button_radio.classList.add("button_radio");
    span_file.classList.add("span_file");
    span_file.textContent = file.name;
    button_remove.classList.add("button_xoa");
    button_remove.textContent = "X";

    const chon_file = () => {
      document.querySelectorAll(".button_radio").forEach((btn) => btn.classList.remove("active"));
      button_radio.classList.add("active");
      this.file_duoc_chon = file;
      this.graph = new Graph(file);
      this.Tat_Che_Do();
    };

    button_radio.addEventListener("click", chon_file);
    li.addEventListener("click", (e) => {
      if (e.target.closest(".button_xoa")) return;
      chon_file();
    });

    button_remove.addEventListener("click", () => {
      li.remove();
      const index = this.list_file.indexOf(content);
      this.list_file.splice(index, 1);
      this.so_luong_file.innerText = this.list_file.length;
      if (this.list_file.length === 0) {
        const empty = document.createElement("li");
        empty.className = "file_trong";
        empty.textContent = "Chua co file nao";
        this.danh_sach_file.appendChild(empty);
      }
    });

    li.appendChild(button_radio);
    li.appendChild(span_file);
    li.appendChild(button_remove);
    this.danh_sach_file.appendChild(li);
  }
}

const app = new App();
