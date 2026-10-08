class Graph {
  constructor(file) {
    this.ma_tran = [];
    this.so_dinh = 0;
    this.vi_tri_dinh = [];
    this.ten_file = "";

    if (file) {
      this.ten_file = file.name;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.noi_dung = e.target.result;
        this.Doc_Ma_Tran();
        this.Ve_Do_Thi();
      };
    }

    document.getElementById("button_save_vi_tri").onclick = () => {
      if (!this.ten_file) return;
      localStorage.setItem("vi_tri_" + this.ten_file, JSON.stringify(this.vi_tri_dinh));
      const btn = document.getElementById("button_save_vi_tri");
      btn.textContent = "Da luu!";
      setTimeout(() => btn.textContent = "Luu vi tri", 1500);
    };
  }

  static Tao_Rong() {
    const g = new Graph(null);
    g.ten_file = "_custom_";
    return g;
  }

  Them_Dinh(x, y) {
    const idx = this.so_dinh;
    this.so_dinh++;
    for (let i = 0; i < idx; i++) {
      this.ma_tran[i].push(0);
    }
    this.ma_tran.push(new Array(this.so_dinh).fill(0));
    this.vi_tri_dinh.push({ x, y });
    this.Ve_Do_Thi();
    return idx;
  }

  Xoa_Dinh(idx) {
    if (idx < 0 || idx >= this.so_dinh) return;
    this.so_dinh--;
    this.ma_tran.splice(idx, 1);
    for (let i = 0; i < this.so_dinh; i++) {
      this.ma_tran[i].splice(idx, 1);
    }
    this.vi_tri_dinh.splice(idx, 1);
    this.Ve_Do_Thi();
  }

  Them_Canh(u, v, w) {
    if (u < 0 || u >= this.so_dinh || v < 0 || v >= this.so_dinh) return;
    this.ma_tran[u][v] = w;
    this.ma_tran[v][u] = w;
    this.Ve_Do_Thi();
  }

  Xoa_Het() {
    this.so_dinh = 0;
    this.ma_tran = [];
    this.vi_tri_dinh = [];
    const svg = document.getElementById("svg_do_thi");
    svg.innerHTML = "";
  }

  Doc_Ma_Tran() {
    const noi_dung_check = this.noi_dung.split("\n");
    const check_doc_ma_tran = noi_dung_check[0].trim().split(/\s+/);
    if (check_doc_ma_tran.length === 1) {
      this.Doc_Ma_Tran_Co_Dinh();
    } else {
      this.Doc_Ma_Tran_Khong_Dinh();
    }
  }

  Doc_Ma_Tran_Co_Dinh() {
    const noi_dung_check = this.noi_dung.split("\n");
    this.so_dinh = parseInt(noi_dung_check[0]);
    for (let i = 1; i <= this.so_dinh; i++) {
      const noi_dung_hang = noi_dung_check[i].split(/\s+/);
      this.ma_tran[i - 1] = [];
      for (let j = 0; j < noi_dung_hang.length; j++) {
        this.ma_tran[i - 1][j] = parseInt(noi_dung_hang[j]);
      }
    }
  }

  Doc_Ma_Tran_Khong_Dinh() {
    const noi_dung_check = this.noi_dung.split("\n");
    this.so_dinh = noi_dung_check[0].trim().split(/\s+/).length;
    for (let i = 0; i < this.so_dinh; i++) {
      this.ma_tran[i] = [];
      const noi_dung_hang = noi_dung_check[i].trim().split(/\s+/);
      for (let j = 0; j < this.so_dinh; j++) {
        this.ma_tran[i][j] = parseInt(noi_dung_hang[j]);
      }
    }
  }

  Kiem_Tra_Co_Huong() {
    for (let i = 0; i < this.so_dinh; i++)
      for (let j = 0; j < this.so_dinh; j++)
        if (this.ma_tran[i][j] !== this.ma_tran[j][i]) return true;
    return false;
  }

  Ve_Do_Thi() {
    const NS = "http://www.w3.org/2000/svg";
    const R_DINH = 20;
    const svg = document.getElementById("svg_do_thi");
    svg.innerHTML = "";

    if (this.so_dinh === 0) return;

    const W = svg.clientWidth || 800;
    const H = svg.clientHeight || 500;
    const co_huong = this.Kiem_Tra_Co_Huong();
    const co_trong_so = this.ma_tran.some(row => row.some(w => w > 1));

    if (this.vi_tri_dinh.length === 0 || this.vi_tri_dinh.length !== this.so_dinh) {
      const vi_tri_luu = this.ten_file ? JSON.parse(localStorage.getItem("vi_tri_" + this.ten_file)) : null;
      if (vi_tri_luu && vi_tri_luu.length === this.so_dinh) {
        this.vi_tri_dinh = vi_tri_luu;
      } else {
        this.vi_tri_dinh = [];
        const r = Math.min(W, H) * 0.38;
        for (let i = 0; i < this.so_dinh; i++) {
          const goc = (2 * Math.PI * i) / this.so_dinh - Math.PI / 2;
          this.vi_tri_dinh.push({
            x: W / 2 + r * Math.cos(goc),
            y: H / 2 + r * Math.sin(goc),
          });
        }
      }
    }

    if (co_huong) {
      const defs = document.createElementNS(NS, "defs");
      const marker = document.createElementNS(NS, "marker");
      marker.setAttribute("id", "mui_ten");
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "10");
      marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "6");
      marker.setAttribute("markerHeight", "6");
      marker.setAttribute("orient", "auto-start-reverse");
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      path.setAttribute("fill", "#2dd4bf");
      marker.appendChild(path);
      defs.appendChild(marker);
      svg.appendChild(defs);
    }

    for (let u = 0; u < this.so_dinh; u++) {
      for (let v = co_huong ? 0 : u + 1; v < this.so_dinh; v++) {
        if (this.ma_tran[u][v] === 0) continue;
        if (!co_huong && u === v) continue;

        const cong = co_huong && this.ma_tran[v][u] !== 0;
        const el = cong
          ? document.createElementNS(NS, "path")
          : document.createElementNS(NS, "line");
        el.setAttribute("class", "g-edge");
        el.dataset.u = u;
        el.dataset.v = v;
        el.dataset.cong = cong ? "1" : "0";

        if (cong) {
          el.setAttribute("d", this._duong_cong(u, v, R_DINH));
        } else {
          const ep = this._diem_dau_cuoi(u, v, co_huong, R_DINH);
          el.setAttribute("x1", ep.x1);
          el.setAttribute("y1", ep.y1);
          el.setAttribute("x2", ep.x2);
          el.setAttribute("y2", ep.y2);
        }
        if (co_huong) el.setAttribute("marker-end", "url(#mui_ten)");
        svg.appendChild(el);

        const w = this.ma_tran[u][v];
        if (co_trong_so && w > 0) {
          const lp = cong
            ? this._vi_tri_nhan_cong(u, v, R_DINH)
            : {
                x: (this.vi_tri_dinh[u].x + this.vi_tri_dinh[v].x) / 2,
                y: (this.vi_tri_dinh[u].y + this.vi_tri_dinh[v].y) / 2 - 6,
              };
          const t = document.createElementNS(NS, "text");
          t.setAttribute("x", lp.x);
          t.setAttribute("y", lp.y);
          t.setAttribute("class", "g-weight");
          t.dataset.wu = u;
          t.dataset.wv = v;
          t.dataset.cong = cong ? "1" : "0";
          t.textContent = w;
          svg.appendChild(t);
        }
      }
    }

    for (let i = 0; i < this.so_dinh; i++) {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "g-node-group");
      g.dataset.index = i;

      const circle = document.createElementNS(NS, "circle");
      circle.setAttribute("cx", this.vi_tri_dinh[i].x);
      circle.setAttribute("cy", this.vi_tri_dinh[i].y);
      circle.setAttribute("r", R_DINH);
      circle.setAttribute("class", "g-node");

      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", this.vi_tri_dinh[i].x);
      label.setAttribute("y", this.vi_tri_dinh[i].y + 5);
      label.setAttribute("class", "g-label");
      label.textContent = i;

      const sublabel_g = document.createElementNS(NS, "g");
      sublabel_g.setAttribute("class", "g-sublabel-group");
      sublabel_g.style.display = "none";

      const sublabel_bg = document.createElementNS(NS, "circle");
      sublabel_bg.setAttribute("cx", this.vi_tri_dinh[i].x);
      sublabel_bg.setAttribute("cy", this.vi_tri_dinh[i].y + R_DINH + 10);
      sublabel_bg.setAttribute("r", Math.round(R_DINH / 3));
      sublabel_bg.setAttribute("class", "g-sublabel-bg");

      const sublabel_text = document.createElementNS(NS, "text");
      sublabel_text.setAttribute("x", this.vi_tri_dinh[i].x);
      sublabel_text.setAttribute("y", this.vi_tri_dinh[i].y + R_DINH + 10);
      sublabel_text.setAttribute("class", "g-sublabel-text");

      sublabel_g.appendChild(sublabel_bg);
      sublabel_g.appendChild(sublabel_text);

      g.appendChild(circle);
      g.appendChild(label);
      g.appendChild(sublabel_g);
      svg.appendChild(g);
    }

    this._Ket_Noi_Keo_Tha(svg, co_huong, R_DINH);
  }

  _diem_dau_cuoi(u, v, co_huong, R) {
    const dx = this.vi_tri_dinh[v].x - this.vi_tri_dinh[u].x;
    const dy = this.vi_tri_dinh[v].y - this.vi_tri_dinh[u].y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
      x1: this.vi_tri_dinh[u].x + (R * dx) / dist,
      y1: this.vi_tri_dinh[u].y + (R * dy) / dist,
      x2: this.vi_tri_dinh[v].x - ((co_huong ? R + 8 : R) * dx) / dist,
      y2: this.vi_tri_dinh[v].y - ((co_huong ? R + 8 : R) * dy) / dist,
    };
  }

  _duong_cong(u, v, R) {
    const ep = this._diem_dau_cuoi(u, v, true, R);
    const dx = ep.x2 - ep.x1,
      dy = ep.y2 - ep.y1;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const C = 35;
    const cx = (ep.x1 + ep.x2) / 2 + C * (dy / dist);
    const cy = (ep.y1 + ep.y2) / 2 + C * (-dx / dist);
    return `M ${ep.x1} ${ep.y1} Q ${cx} ${cy} ${ep.x2} ${ep.y2}`;
  }

  _vi_tri_nhan_cong(u, v, R) {
    const ep = this._diem_dau_cuoi(u, v, true, R);
    const dx = ep.x2 - ep.x1,
      dy = ep.y2 - ep.y1;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const C = 35;
    return {
      x: (ep.x1 + ep.x2) / 2 + C * (dy / dist),
      y: (ep.y1 + ep.y2) / 2 + C * (-dx / dist) - 4,
    };
  }

  _Ket_Noi_Keo_Tha(svg, co_huong, R) {
    let dang_keo = null,
      ox = 0,
      oy = 0;

    svg.addEventListener("mousedown", (e) => {
      const g = e.target.closest(".g-node-group");
      if (!g) return;
      dang_keo = parseInt(g.dataset.index);
      const pt = this._svg_point(svg, e);
      ox = pt.x - this.vi_tri_dinh[dang_keo].x;
      oy = pt.y - this.vi_tri_dinh[dang_keo].y;
      e.preventDefault();
    });

    svg.addEventListener("mousemove", (e) => {
      if (dang_keo === null) return;
      const pt = this._svg_point(svg, e);
      this.vi_tri_dinh[dang_keo].x = pt.x - ox;
      this.vi_tri_dinh[dang_keo].y = pt.y - oy;

      const g = svg.querySelector(`.g-node-group[data-index="${dang_keo}"]`);
      g.querySelector("circle").setAttribute("cx", this.vi_tri_dinh[dang_keo].x);
      g.querySelector("circle").setAttribute("cy", this.vi_tri_dinh[dang_keo].y);
      g.querySelector("text").setAttribute("x", this.vi_tri_dinh[dang_keo].x);
      g.querySelector("text").setAttribute("y", this.vi_tri_dinh[dang_keo].y + 5);

      const sl_bg = g.querySelector(".g-sublabel-bg");
      const sl_tx = g.querySelector(".g-sublabel-text");
      if (sl_bg) { sl_bg.setAttribute("cx", this.vi_tri_dinh[dang_keo].x); sl_bg.setAttribute("cy", this.vi_tri_dinh[dang_keo].y + R + 10); }
      if (sl_tx) { sl_tx.setAttribute("x", this.vi_tri_dinh[dang_keo].x); sl_tx.setAttribute("y", this.vi_tri_dinh[dang_keo].y + R + 10); }

      svg.querySelectorAll(".g-edge").forEach((el) => {
        const u = parseInt(el.dataset.u),
          v = parseInt(el.dataset.v);
        if (u !== dang_keo && v !== dang_keo) return;
        if (el.dataset.cong === "1") {
          el.setAttribute("d", this._duong_cong(u, v, R));
        } else {
          const ep = this._diem_dau_cuoi(u, v, co_huong, R);
          el.setAttribute("x1", ep.x1);
          el.setAttribute("y1", ep.y1);
          el.setAttribute("x2", ep.x2);
          el.setAttribute("y2", ep.y2);
        }
      });

      svg.querySelectorAll("text.g-weight").forEach((t) => {
        const u = parseInt(t.dataset.wu),
          v = parseInt(t.dataset.wv);
        if (u !== dang_keo && v !== dang_keo) return;
        const lp =
          t.dataset.cong === "1"
            ? this._vi_tri_nhan_cong(u, v, R)
            : {
                x: (this.vi_tri_dinh[u].x + this.vi_tri_dinh[v].x) / 2,
                y: (this.vi_tri_dinh[u].y + this.vi_tri_dinh[v].y) / 2 - 6,
              };
        t.setAttribute("x", lp.x);
        t.setAttribute("y", lp.y);
      });
    });

    const stop = () => { dang_keo = null; };
    svg.addEventListener("mouseup", stop);
    svg.addEventListener("mouseleave", stop);

    svg.addEventListener("touchstart", (e) => {
      const g = e.target.closest(".g-node-group");
      if (!g) return;
      dang_keo = parseInt(g.dataset.index);
      const pt = this._svg_point_touch(svg, e.touches[0]);
      ox = pt.x - this.vi_tri_dinh[dang_keo].x;
      oy = pt.y - this.vi_tri_dinh[dang_keo].y;
      e.preventDefault();
    }, { passive: false });

    svg.addEventListener("touchmove", (e) => {
      if (dang_keo === null) return;
      const pt = this._svg_point_touch(svg, e.touches[0]);
      this.vi_tri_dinh[dang_keo].x = pt.x - ox;
      this.vi_tri_dinh[dang_keo].y = pt.y - oy;
      const g = svg.querySelector(`.g-node-group[data-index="${dang_keo}"]`);
      g.querySelector("circle").setAttribute("cx", this.vi_tri_dinh[dang_keo].x);
      g.querySelector("circle").setAttribute("cy", this.vi_tri_dinh[dang_keo].y);
      g.querySelector("text").setAttribute("x", this.vi_tri_dinh[dang_keo].x);
      g.querySelector("text").setAttribute("y", this.vi_tri_dinh[dang_keo].y + 5);
      const sl_bg = g.querySelector(".g-sublabel-bg");
      const sl_tx = g.querySelector(".g-sublabel-text");
      if (sl_bg) { sl_bg.setAttribute("cx", this.vi_tri_dinh[dang_keo].x); sl_bg.setAttribute("cy", this.vi_tri_dinh[dang_keo].y + R + 10); }
      if (sl_tx) { sl_tx.setAttribute("x", this.vi_tri_dinh[dang_keo].x); sl_tx.setAttribute("y", this.vi_tri_dinh[dang_keo].y + R + 10); }
      svg.querySelectorAll(".g-edge").forEach((el) => {
        const u = parseInt(el.dataset.u), v = parseInt(el.dataset.v);
        if (u !== dang_keo && v !== dang_keo) return;
        if (el.dataset.cong === "1") { el.setAttribute("d", this._duong_cong(u, v, R)); }
        else { const ep = this._diem_dau_cuoi(u, v, co_huong, R); el.setAttribute("x1", ep.x1); el.setAttribute("y1", ep.y1); el.setAttribute("x2", ep.x2); el.setAttribute("y2", ep.y2); }
      });
      svg.querySelectorAll("text.g-weight").forEach((t) => {
        const u = parseInt(t.dataset.wu), v = parseInt(t.dataset.wv);
        if (u !== dang_keo && v !== dang_keo) return;
        const lp = t.dataset.cong === "1" ? this._vi_tri_nhan_cong(u, v, R) : { x: (this.vi_tri_dinh[u].x + this.vi_tri_dinh[v].x) / 2, y: (this.vi_tri_dinh[u].y + this.vi_tri_dinh[v].y) / 2 - 6 };
        t.setAttribute("x", lp.x); t.setAttribute("y", lp.y);
      });
      e.preventDefault();
    }, { passive: false });

    svg.addEventListener("touchend", () => { dang_keo = null; });
  }

  _svg_point(svg, e) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  _svg_point_touch(svg, touch) {
    const pt = svg.createSVGPoint();
    pt.x = touch.clientX;
    pt.y = touch.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
}
