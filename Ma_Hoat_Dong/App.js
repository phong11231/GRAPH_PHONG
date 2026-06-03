const DEFAULT_GRAPHS = [
  { name: "CEuler-Book.txt", content: "8\n0 1 1 0 0 0 0 0\n1 0 0 1 0 0 0 0\n1 0 0 1 0 0 0 0\n0 1 1 0 1 1 0 0\n0 0 0 1 0 0 1 0\n0 0 0 1 0 0 0 1\n0 0 0 0 1 0 0 1\n0 0 0 0 0 1 1 0" },
  { name: "CEuler-1.txt",    content: "9\n0 0 1 1 0 0 0 0 0\n0 0 1 0 0 0 1 0 0\n1 1 0 0 1 0 1 0 0\n1 0 0 0 1 1 0 1 0\n0 0 1 1 0 1 0 0 1\n0 0 0 1 1 0 1 1 0\n0 1 1 0 0 1 0 1 0\n0 0 0 1 0 1 1 0 1\n0 0 0 0 1 0 0 1 0" },
  { name: "CEuler-2.txt",    content: "9\n0 0 4 3 0 0 0 0 0\n0 0 2 0 0 0 0 0 4\n4 2 0 0 13 0 3 0 0\n3 0 0 0 3 5 0 0 7\n0 0 13 3 0 9 0 0 6\n0 0 0 5 9 0 23 3 0\n0 0 3 0 0 23 0 0 0\n0 0 0 0 0 3 0 0 8\n0 4 0 7 6 0 0 8 0" },
  { name: "DEuler.txt",      content: "9\n0 0 1 1 0 0 0 0 0\n0 0 1 0 0 0 1 0 0\n1 1 0 0 1 0 1 0 0\n1 0 0 0 1 1 0 1 0\n0 0 1 1 0 1 0 0 1\n0 0 0 1 1 0 1 1 0\n0 1 1 0 0 1 0 0 0\n0 0 0 1 0 1 0 0 1\n0 0 0 0 1 0 0 1 0" },
  { name: "Ko-Euler.txt",    content: "9\n0 0 1 1 0 0 0 0 0\n0 0 1 0 0 0 1 0 0\n1 1 0 0 1 0 1 0 0\n1 0 0 0 1 0 0 1 0\n0 0 1 1 0 1 0 0 1\n0 0 0 0 1 0 1 1 0\n0 1 1 0 0 1 0 0 0\n0 0 0 1 0 1 0 0 1\n0 0 0 0 1 0 0 1 0" },
  { name: "Huong.txt",       content: "6\n0 0 0 0 1 0\n1 0 0 0 0 0\n0 0 0 1 0 0\n0 0 0 0 1 0\n0 1 1 0 0 0\n0 0 0 0 0 0" },
  { name: "CE-Huong.txt",    content: "9\n0 0 1 0 0 0 0 0 0\n0 0 1 0 0 0 0 0 0\n0 0 0 0 1 0 1 0 0\n1 0 0 0 1 1 0 0 0\n0 0 0 1 0 0 0 0 1\n0 0 0 1 0 0 1 0 0\n0 1 0 0 0 0 0 1 0\n0 0 0 1 0 1 0 0 0\n0 0 0 0 0 0 0 1 0" },
  { name: "DE-Huong.txt",    content: "9\n0 0 1 0 0 0 0 0 0\n0 0 1 0 0 0 0 0 0\n0 0 0 0 0 0 1 0 0\n1 0 0 0 1 1 0 0 0\n0 0 0 1 0 0 0 0 1\n0 0 0 1 0 0 1 0 0\n0 1 0 0 0 0 0 1 0\n0 0 0 1 0 1 0 0 0\n0 0 0 0 0 0 0 1 0" },
  { name: "Dij-1.txt",       content: "4\n0 2 0 0\n2 0 0 6\n0 0 0 2\n0 6 2 0" },
  { name: "Dij-2.txt",       content: "4\n0 5 0 0\n50 0 15 5\n30 0 0 15\n15 0 5 0" },
  { name: "Dij-3.txt",       content: "8\n0 2 0 0 15 1 0 0\n2 0 0 2 13 0 1 0\n0 0 0 9 1 0 0 0\n0 2 9 0 0 0 0 0\n15 13 1 0 0 0 14 2\n1 0 0 0 0 0 0 9\n0 1 0 0 14 0 0 4\n0 0 0 0 2 9 4 0" },
  { name: "Dij-4.txt",       content: "9\n0 0 4 3 0 0 0 0 0\n0 0 1 0 0 0 2 0 0\n4 1 0 0 13 0 3 0 0\n3 0 0 0 3 5 0 7 0\n0 0 13 3 0 1 0 0 6\n0 0 0 5 1 0 23 3 0\n0 2 3 0 0 23 0 1 0\n0 0 0 7 0 3 1 0 8\n0 0 0 0 6 0 0 8 0" },
  { name: "Dij-5.txt",       content: "12\n0 0 0 0 0 0 0 0 0 0 1 0\n0 0 75 92 0 0 0 0 0 0 44 82\n0 75 0 4 41 0 0 0 6 0 2 38\n0 92 4 0 37 3 0 0 0 1 0 0\n0 0 41 37 0 2 18 0 42 0 0 0\n0 0 0 3 2 0 35 4 29 0 43 0\n0 0 0 0 18 35 0 0 3 0 0 0\n0 0 0 0 0 4 0 0 26 36 0 1\n0 0 6 0 42 29 3 26 0 34 54 0\n0 0 0 1 0 0 0 36 34 0 0 3\n1 44 2 0 0 43 0 0 54 0 0 71\n0 82 38 0 0 0 0 1 0 3 71 0" },
  { name: "Floyd-1.txt",     content: "4\n0 2 0 3\n2 0 0 6\n0 0 0 2\n3 6 2 0" },
  { name: "Floyd-2.txt",     content: "4\n0 5 0 0\n50 0 15 5\n30 0 0 15\n15 0 5 0" },
  { name: "Floyd-3.txt",     content: "6\n0 10 30 60 0 0\n0 0 15 30 0 80\n0 0 0 20 40 0\n0 0 0 0 25 0\n0 0 0 0 0 5\n5 0 0 0 0 0" },
  { name: "Kruskal-1.txt",   content: "4\n0 2 0 1\n2 0 3 1\n0 3 0 2\n1 1 2 0" },
  { name: "Kruskal-2.txt",   content: "5\n0 4 0 3 0\n4 0 7 3 0\n0 7 0 1 6\n3 3 1 0 5\n0 0 6 5 0" },
  { name: "Kruskal-3.txt",   content: "8\n0 2 0 0 15 1 0 0\n2 0 0 2 13 0 1 0\n0 0 0 9 1 0 0 0\n0 2 9 0 0 0 0 0\n15 13 1 0 0 0 14 22\n1 0 0 0 0 0 0 9\n0 1 0 0 14 0 0 4\n0 0 0 0 22 9 4 0" },
  { name: "Kruskal-4.txt",   content: "9\n0 0 4 3 0 0 0 0 0\n0 0 1 0 0 0 2 0 0\n4 1 0 0 13 0 3 0 0\n3 0 0 0 3 5 0 7 0\n0 0 13 3 0 1 0 0 6\n0 0 0 5 1 0 23 3 0\n0 2 3 0 0 23 0 1 0\n0 0 0 7 0 3 1 0 8\n0 0 0 0 6 0 0 8 0" },
  { name: "Kruskal-5.txt",   content: "12\n0 0 0 0 0 0 0 0 0 0 1 0\n0 0 75 92 0 0 0 0 0 0 44 82\n0 75 0 4 41 0 0 0 6 0 2 38\n0 92 4 0 37 3 0 0 0 1 0 0\n0 0 41 37 0 2 18 0 42 0 0 0\n0 0 0 3 2 0 35 4 29 0 43 0\n0 0 0 0 18 35 0 0 3 0 0 0\n0 0 0 0 0 4 0 0 26 36 0 1\n0 0 6 0 42 29 3 26 0 34 54 0\n0 0 0 1 0 0 0 36 34 0 0 3\n1 44 2 0 0 43 0 0 54 0 0 71\n0 82 38 0 0 0 0 1 0 3 71 0" },
  { name: "DFS-1.txt",       content: "5\n0 2 2 0 0\n2 0 0 -3 2\n2 0 0 0 0\n0 -3 0 0 4\n0 2 0 4 0" },
  { name: "DFS-2.txt",       content: "6\n0 0 0 1 1 1\n0 0 1 0 1 1\n0 1 0 0 0 0\n1 0 0 0 1 1\n1 1 0 1 0 0\n1 1 0 1 0 0" },
  { name: "DFS-3.txt",       content: "9\n0 0 1 1 0 0 0 0 0\n0 0 0 0 0 0 1 0 0\n1 0 0 0 0 0 0 0 0\n1 0 0 0 1 1 0 1 0\n0 0 0 1 0 0 0 0 1\n0 0 0 1 0 0 0 1 0\n0 1 0 0 0 0 0 0 0\n0 0 0 1 0 1 0 0 0\n0 0 0 0 1 0 0 0 0" },
  { name: "DFS-4.txt",       content: "6\n0 1 1 0 1 1\n1 0 1 0 1 0\n1 1 0 1 0 0\n0 0 1 0 1 0\n1 1 0 1 0 1\n1 0 0 0 1 0" },
  { name: "DFS-5.txt",       content: "9\n0 0 1 1 0 0 0 0 0\n0 0 1 0 0 0 1 0 0\n1 1 0 0 1 0 1 0 0\n1 0 0 0 1 1 0 1 0\n0 0 1 1 0 1 0 0 1\n0 0 0 1 1 0 1 1 0\n0 1 1 0 0 1 0 1 0\n0 0 0 1 0 1 1 0 1\n0 0 0 0 1 0 0 1 0" },
];

class App {
  constructor() {
    this.button_lay_file = document.getElementById("button_lay_file");
    this.input_file = document.getElementById("input_file");
    this.so_luong_file = document.getElementById("so_luong_file");
    this.button_lay_file.addEventListener("click", () => {
      this.input_file.click();
    });
    this.danh_sach_file = document.getElementById("danh_sach_file");
    this.list_file = [];

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
          // lưu vào localStorage
          localStorage.setItem("app_content_" + file.name, e.target.result);
          const ds = JSON.parse(localStorage.getItem("app_files") || "[]");
          if (!ds.includes(file.name)) { ds.push(file.name); localStorage.setItem("app_files", JSON.stringify(ds)); }
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

    this.Tai_Do_Thi_Mac_Dinh();
    this.Khoi_Phuc_Tu_LocalStorage();

    // slider tốc độ
    const slider = document.getElementById("slider_toc_do");
    const hien_toc_do = document.getElementById("hien_toc_do");
    slider.addEventListener("input", () => hien_toc_do.textContent = slider.value);

    // nút điều khiển animation
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

    // nút chu trình Euler
    document.getElementById("button_chu_trinh_euler").addEventListener("click", () => {
      if (!this.graph) return;
      this.Hien_Modal(
        `Nhập đỉnh bắt đầu (0 - ${this.graph.so_dinh - 1}):`,
        (dinh) => {
          const euler = new Chu_Trinh_Euler(this.graph);
          const ket_qua = euler.Tim_Chu_Trinh(dinh);
          if (!ket_qua) { alert("Không tồn tại chu trình Euler!"); return; }
          this.Chay_Animation(ket_qua, "Chu trình Euler");
        }
      );
    });

    // nút Kruskal
    // nút Floyd
    document.getElementById("button_floyd").addEventListener("click", () => {
      if (!this.graph) return;
      this.Hien_Modal_Hai_Dinh("Start", "End", (start, end) => {
        const floyd = new Floyd(this.graph);
        const ket_qua = floyd.Thuc_Thi(start, end);
        if (!ket_qua) { alert(`Không có đường đi từ ${start} → ${end}!`); return; }
        this.Chay_Animation_Floyd(ket_qua);
      });
    });

    // nút Dijkstra
    document.getElementById("button_dijkstra").addEventListener("click", () => {
      if (!this.graph) return;
      this.Hien_Modal_Hai_Dinh("Start", "End", (start, end) => {
        const dij = new Dijkstra(this.graph);
        const ket_qua = dij.Tim_Duong_Di(start, end);
        if (!ket_qua) { alert(`Không có đường đi từ ${start} → ${end}!`); return; }
        this.Chay_Animation_Dijkstra(ket_qua);
      });
    });

    document.getElementById("button_kruskal").addEventListener("click", () => {
      if (!this.graph) return;
      if (this.graph.Kiem_Tra_Co_Huong()) { alert("Kruskal chỉ áp dụng cho đồ thị vô hướng!"); return; }
      const kruskal = new Kruskal(this.graph);
      const { list_cay, snapshots } = kruskal.Thuc_Thi();
      if (list_cay.length < this.graph.so_dinh - 1) { alert("Đồ thị không liên thông!"); return; }
      this.Chay_Animation_Cay(list_cay, "Kruskal", snapshots);
    });

    // nút Prim
    document.getElementById("button_prim").addEventListener("click", () => {
      if (!this.graph) return;
      if (this.graph.Kiem_Tra_Co_Huong()) { alert("Prim chỉ áp dụng cho đồ thị vô hướng!"); return; }
      const prim = new Prim(this.graph);
      const list_cay = prim.Thuc_Thi();
      if (list_cay.length < this.graph.so_dinh - 1) { alert("Đồ thị không liên thông!"); return; }
      this.Chay_Animation_Cay(list_cay, "Prim");
    });

    // nút DFS
    document.getElementById("button_dfs").addEventListener("click", () => {
      if (!this.graph) return;
      this.Hien_Modal_Hai_Dinh("Start", "End", (start, end) => {
        const dfs = new DFS(this.graph);
        const ket_qua = dfs.Tim_Duong_Di(start, end);
        if (!ket_qua) { alert(`Không có đường đi từ ${start} → ${end}!`); return; }
        this.Chay_Animation(ket_qua, "DFS");
      });
    });

    // nút BFS
    document.getElementById("button_bfs").addEventListener("click", () => {
      if (!this.graph) return;
      this.Hien_Modal_Hai_Dinh("Nhập đỉnh bắt đầu:", "Nhập đỉnh kết thúc:", (start, end) => {
        const bfs = new BFS(this.graph);
        const ket_qua = bfs.Tim_Duong_Di(start, end);
        if (!ket_qua) { alert(`Không có đường đi từ ${start} → ${end}!`); return; }
        this.Chay_Animation(ket_qua.duong_di, "BFS");
      });
    });

    // nút đường đi Euler
    document.getElementById("button_duong_di_euler").addEventListener("click", () => {
      if (!this.graph) return;
      const duong_di = new Duong_Di_Euler(this.graph);
      if (!duong_di.Kiem_Tra()) { alert("Không tồn tại đường đi Euler!"); return; }
      const mo_ta = duong_di.co_huong
        ? `Nhập đỉnh bắt đầu (bậc ngoài = bậc trong + 1):`
        : `Nhập đỉnh bắt đầu (phải là đỉnh bậc lẻ):`;
      this.Hien_Modal_Validate(mo_ta, (dinh) => {
        if (!duong_di.Kiem_Tra_Dinh_Bat_Dau(dinh)) return "Đỉnh không hợp lệ, nhập lại!";
        return null;
      }, (dinh) => {
        const ket_qua = duong_di.Tim_Duong_Di(dinh);
        if (!ket_qua) { alert("Không tồn tại đường đi Euler!"); return; }
        this.Chay_Animation(ket_qua, "Đường đi Euler");
      });
    });
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
    overlay.innerHTML = `
      <div id="modal_nhap_dinh">
        <p class="modal_title">Chọn đỉnh</p>
        <div class="modal_row">
          <div class="modal_field">
            <label>Start</label>
            <input type="number" id="input_start" min="0" max="${max}" value="0">
          </div>
          <div class="modal_arrow">→</div>
          <div class="modal_field">
            <label>End</label>
            <input type="number" id="input_end" min="0" max="${max}" value="1">
          </div>
        </div>
        <p class="modal_hint">Đỉnh hợp lệ: 0 – ${max}</p>
        <p id="modal_loi" style="color:#ff4d5e;font-size:12px;min-height:16px;"></p>
        <div class="modal_buttons">
          <button id="btn_modal_cancel">Hủy</button>
          <button id="btn_modal_ok">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("btn_modal_ok").onclick = () => {
      const start = parseInt(document.getElementById("input_start").value);
      const end   = parseInt(document.getElementById("input_end").value);
      if (start < 0 || start > max || end < 0 || end > max) {
        document.getElementById("modal_loi").textContent = `Đỉnh phải từ 0 đến ${max}`;
        return;
      }
      overlay.remove();
      callback(start, end);
    };
    document.getElementById("btn_modal_cancel").onclick = () => overlay.remove();
  }

  Hien_Modal_Validate(noi_dung, validate, callback) {
    const overlay = document.createElement("div");
    overlay.id = "modal_overlay";
    overlay.innerHTML = `
      <div id="modal_nhap_dinh">
        <p>${noi_dung}</p>
        <input type="number" id="input_dinh_bat_dau" min="0" max="${this.graph.so_dinh - 1}" value="0">
        <p id="modal_loi" style="color:#ff4d5e;font-size:12px;min-height:16px;"></p>
        <div class="modal_buttons">
          <button id="btn_modal_cancel">Hủy</button>
          <button id="btn_modal_ok">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("btn_modal_ok").onclick = () => {
      const dinh = parseInt(document.getElementById("input_dinh_bat_dau").value);
      const loi = validate(dinh);
      if (loi) { document.getElementById("modal_loi").textContent = loi; return; }
      overlay.remove();
      callback(dinh);
    };
    document.getElementById("btn_modal_cancel").onclick = () => overlay.remove();
  }

  Hien_Modal(noi_dung, callback) {
    const overlay = document.createElement("div");
    overlay.id = "modal_overlay";
    overlay.innerHTML = `
      <div id="modal_nhap_dinh">
        <p>${noi_dung}</p>
        <input type="number" id="input_dinh_bat_dau" min="0" max="${this.graph.so_dinh - 1}" value="0">
        <div class="modal_buttons">
          <button id="btn_modal_cancel">Hủy</button>
          <button id="btn_modal_ok">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("btn_modal_ok").onclick = () => {
      const dinh = parseInt(document.getElementById("input_dinh_bat_dau").value);
      overlay.remove();
      callback(dinh);
    };
    document.getElementById("btn_modal_cancel").onclick = () => overlay.remove();
  }

  // helpers thẻ Dijkstra
  Chay_Animation_Floyd(ket_qua) {
    const svg = document.getElementById("svg_do_thi");
    if (this.anim) clearTimeout(this.anim.timer);

    // tạo gradient nửa đỏ nửa xanh cho đỉnh vừa hàng vừa cột
    const NS_SVG = "http://www.w3.org/2000/svg";
    let defs = svg.querySelector("defs");
    if (!defs) { defs = document.createElementNS(NS_SVG, "defs"); svg.prepend(defs); }
    if (!svg.querySelector("#grad_hang_cot")) {
      const grad = document.createElementNS(NS_SVG, "linearGradient");
      grad.setAttribute("id", "grad_hang_cot");
      grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0");
      grad.setAttribute("x2", "1"); grad.setAttribute("y2", "0");
      const s1 = document.createElementNS(NS_SVG, "stop");
      s1.setAttribute("offset", "50%"); s1.setAttribute("stop-color", "#ef4444");
      const s2 = document.createElementNS(NS_SVG, "stop");
      s2.setAttribute("offset", "50%"); s2.setAttribute("stop-color", "#3b82f6");
      grad.appendChild(s1); grad.appendChild(s2);
      defs.appendChild(grad);
    }

    const { events, duong_di, tong, start, end } = ket_qua;
    this.ket_qua_hien_tai = duong_di;
    document.getElementById("ten_thuat_toan").textContent = `Floyd (tổng: ${tong})`;
    document.getElementById("noi_dung_ket_qua").textContent = duong_di.join(" → ");
    document.getElementById("khung_ket_qua").style.display = "none";
    document.getElementById("btn_xem_ket_qua").style.display = "none";

    this.Reset_Mau(svg);

    const lay_canh = (u, v) =>
      svg.querySelector(`.g-edge[data-u="${u}"][data-v="${v}"]`) ||
      svg.querySelector(`.g-edge[data-u="${v}"][data-v="${u}"]`);

    const to_canh = (canh, mau, glow) => {
      if (!canh) return;
      canh.style.stroke = mau;
      canh.style.strokeWidth = "2.5";
      canh.style.filter = glow ? `drop-shadow(0 0 6px ${mau})` : "none";
    };

    const to_dinh = (v, mau, mau_lbl) => {
      const node = svg.querySelector(`.g-node-group[data-index="${v}"] .g-node`);
      const lbl  = svg.querySelector(`.g-node-group[data-index="${v}"] .g-label`);
      if (node) { node.style.fill = mau; node.style.stroke = "#fff"; }
      if (lbl) lbl.style.fill = mau_lbl;
    };

    // reset cạnh kề k về mặc định (trừ xanh)
    const reset_canh_k = (k) => {
      svg.querySelectorAll(`.g-edge[data-u="${k}"], .g-edge[data-v="${k}"]`).forEach(c => {
        if (c.style.stroke !== "#33FF00") { c.style.stroke = ""; c.style.filter = ""; c.style.strokeWidth = ""; }
      });
    };

    let prev_canh_ij = null, prev_canh_ji = null;
    let prev_i_check = -1, prev_j_check = -1;
    let prev_text_el = null;
    const remove_text_el = () => { if (prev_text_el) { prev_text_el.remove(); prev_text_el = null; } };
    let pending_blinks = [];
    const clear_blinks = () => { pending_blinks.forEach(clearTimeout); pending_blinks.length = 0; };
    const reset_prev_ij = () => {
      [prev_canh_ij, prev_canh_ji].forEach(c => {
        if (c && c.style.stroke !== "#33FF00") { c.style.stroke = ""; c.style.filter = ""; c.style.strokeWidth = ""; }
      });
      prev_canh_ij = null; prev_canh_ji = null;
    };

    const ap_dung_event = (idx, animate = true) => {
      const ev = events[idx];
      if (ev.type === 'init') {
        return;

      } else if (ev.type === 'select_k') {
        to_dinh(ev.k, "#33FF00", "#000");
        svg.querySelectorAll(`.g-edge[data-u="${ev.k}"], .g-edge[data-v="${ev.k}"]`).forEach(c => {
          if (c.style.stroke !== "#33FF00") to_canh(c, "#eab308", true);
        });

      } else if (ev.type === 'check') {
        clear_blinks();
        reset_canh_k(ev.k);
        reset_prev_ij();
        remove_text_el();
        [prev_i_check, prev_j_check].forEach(v => {
          if (v === -1) return;
          const n = svg.querySelector(`.g-node-group[data-index="${v}"] .g-node`);
          const l = svg.querySelector(`.g-node-group[data-index="${v}"] .g-label`);
          if (n && n.style.fill !== "#33FF00") {
            n.style.fill = "";
            n.style.stroke = n.dataset.done ? "#fff" : "";
            n.style.strokeWidth = n.dataset.done ? "3.5" : "";
          }
          if (l) l.style.fill = "";
        });

        const c_ij = svg.querySelector(`.g-edge[data-u="${ev.i}"][data-v="${ev.j}"]`);
        const c_ji = svg.querySelector(`.g-edge[data-u="${ev.j}"][data-v="${ev.i}"]`);
        const c_ik = lay_canh(ev.i, ev.k);
        const c_kj = lay_canh(ev.k, ev.j);
        [c_ij, c_ji].forEach(c => { if (c) to_canh(c, "#ef4444", true); });
        [c_ik, c_kj].forEach(c => { if (c) to_canh(c, "#eab308", true); });
        prev_canh_ij = c_ij; prev_canh_ji = c_ji;
        to_dinh(ev.i, "#ef4444", "#fff");
        to_dinh(ev.j, "#3b82f6", "#fff");
        prev_i_check = ev.i; prev_j_check = ev.j;

        const ni = svg.querySelector(`.g-node-group[data-index="${ev.i}"] .g-node`);
        const nj = svg.querySelector(`.g-node-group[data-index="${ev.j}"] .g-node`);
        if (ni && nj) {
          const mx = (parseFloat(ni.getAttribute('cx')) + parseFloat(nj.getAttribute('cx'))) / 2;
          const my = (parseFloat(ni.getAttribute('cy')) + parseFloat(nj.getAttribute('cy'))) / 2 - 22;
          const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
          txt.setAttribute("x", mx); txt.setAttribute("y", my);
          txt.setAttribute("text-anchor", "middle");
          txt.setAttribute("font-size", "13"); txt.setAttribute("font-weight", "bold");
          txt.style.fill = ev.improved ? "#eab308" : "#ef4444";
          txt.style.stroke = "#111"; txt.style.strokeWidth = "3px"; txt.style.paintOrder = "stroke fill";
          txt.textContent = ev.improved ? `→ ${ev.qua_k}` : "Không đổi";
          svg.appendChild(txt);
          prev_text_el = txt;
        }

        if (animate) {
          if (ev.improved) {
            [c_ik, c_kj].forEach(c => {
              if (!c) return;
              pending_blinks.push(setTimeout(() => to_canh(c, "#fb923c", true), 120));
              pending_blinks.push(setTimeout(() => to_canh(c, "#eab308", true), 360));
              pending_blinks.push(setTimeout(() => to_canh(c, "#fb923c", true), 600));
              pending_blinks.push(setTimeout(() => to_canh(c, "#eab308", true), 840));
            });
          } else {
            if (c_ij) {
              pending_blinks.push(setTimeout(() => to_canh(c_ij, "#fb923c", true), 120));
              pending_blinks.push(setTimeout(() => to_canh(c_ij, "#ef4444", true), 360));
              pending_blinks.push(setTimeout(() => to_canh(c_ij, "#fb923c", true), 600));
              pending_blinks.push(setTimeout(() => to_canh(c_ij, "#ef4444", true), 840));
            }
          }
        }

      } else if (ev.type === 'done_k') {
        clear_blinks();
        prev_i_check = -1; prev_j_check = -1;
        remove_text_el();
        svg.querySelectorAll(".g-node").forEach(n => {
          n.style.fill = "";
          n.style.stroke = n.dataset.done ? "#fff" : "";
          n.style.strokeWidth = n.dataset.done ? "3.5" : "";
        });
        svg.querySelectorAll(".g-label").forEach(l => { l.style.fill = ""; });
        svg.querySelectorAll(".g-edge").forEach(c => { c.style.stroke = ""; c.style.filter = ""; c.style.strokeWidth = ""; });
        const nd = svg.querySelector(`.g-node-group[data-index="${ev.k}"] .g-node`);
        if (nd) { nd.dataset.done = "1"; nd.style.stroke = "#fff"; nd.style.strokeWidth = "3.5"; }

      } else if (ev.type === 'final') {
        svg.querySelectorAll(".g-node[data-done]").forEach(n => { delete n.dataset.done; n.style.strokeWidth = ""; });
        svg.querySelectorAll(".g-node").forEach(n => { n.style.fill = ""; n.style.stroke = ""; });
        svg.querySelectorAll(".g-label").forEach(l => { l.style.fill = ""; });
        svg.querySelectorAll(".g-edge").forEach(c => { c.style.stroke = ""; c.style.filter = ""; c.style.strokeWidth = ""; });
        duong_di.forEach(v => to_dinh(v, "#33FF00", "#000"));
        for (let i = 1; i < duong_di.length; i++)
          to_canh(lay_canh(duong_di[i - 1], duong_di[i]), "#33FF00", true);
      }
    };

    const khoi_phuc_floyd = () => {
      svg.querySelectorAll(".g-node[data-done]").forEach(n => { delete n.dataset.done; n.style.strokeWidth = ""; });
      this.Reset_Mau(svg);
      for (let i = 0; i < this.anim.buoc; i++) ap_dung_event(i, false);
    };

    this.anim = {
      chu_trinh: events, svg, buoc: 0, paused: false, timer: null,
      fn_buoc: ap_dung_event,
      fn_replay: khoi_phuc_floyd
    };
    document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9646;&#9646;";
    this.Bat_Dau_Animation();
  }

  The_Doi_Mau(svg, v, state) {
    const g = svg.querySelector(`.g-node-group[data-index="${v}"]`);
    if (!g) return;
    const bg = g.querySelector(".g-card-bg");
    const dt = g.querySelector(".g-card-dist");
    const fr = g.querySelector(".g-card-from");
    ["state-update","state-select","state-done"].forEach(c => {
      bg?.classList.remove(c); dt?.classList.remove(c); fr?.classList.remove(c);
    });
    if (state) {
      bg?.classList.add(state); dt?.classList.add(state); fr?.classList.add(state);
    }
  }

  Hien_The(svg, v, dist, from, flash = false) {
    const g = svg.querySelector(`.g-node-group[data-index="${v}"]`);
    if (!g) return;
    const card = g.querySelector(".g-card");
    if (card) card.style.display = "block";
    const dt = g.querySelector(".g-card-dist");
    const fr = g.querySelector(".g-card-from");
    if (dt) dt.textContent = dist === Infinity ? "∞" : dist;
    if (fr) fr.textContent = from === -1 ? "←-" : `←${from}`;
    if (flash && dist !== Infinity) {
      if (dt) { dt.classList.remove("flash-anim"); void dt.offsetWidth; dt.classList.add("flash-anim"); }
      if (fr) { fr.classList.remove("flash-anim"); void fr.offsetWidth; fr.classList.add("flash-anim"); }
      this.The_Doi_Mau(svg, v, "state-update");
    }
  }

  Chay_Animation_Dijkstra(ket_qua) {
    const svg = document.getElementById("svg_do_thi");
    if (this.anim) clearTimeout(this.anim.timer);

    const { events, duong_di, tong, start, end } = ket_qua;
    this.ket_qua_hien_tai = duong_di;
    document.getElementById("ten_thuat_toan").textContent = `Dijkstra (tổng: ${tong})`;
    document.getElementById("noi_dung_ket_qua").textContent = duong_di.join(" → ");
    document.getElementById("khung_ket_qua").style.display = "none";
    document.getElementById("btn_xem_ket_qua").style.display = "none";

    this.Reset_Mau(svg);
    svg.querySelectorAll(".g-card").forEach(c => {
      c.style.display = "none";
      c.querySelector(".g-card-bg")?.classList.remove("flash");
      c.querySelector(".g-card-dist")?.classList.remove("updated");
      c.querySelector(".g-card-from")?.classList.remove("updated");
    });

    const lay_canh = (u, v) =>
      svg.querySelector(`.g-edge[data-u="${u}"][data-v="${v}"]`) ||
      svg.querySelector(`.g-edge[data-u="${v}"][data-v="${u}"]`);

    const to_canh = (canh, mau, glow, giu = false) => {
      if (!canh) return;
      canh.style.stroke = mau;
      canh.style.strokeWidth = giu ? "2.5" : "3";
      canh.style.filter = glow ? `drop-shadow(0 0 6px ${mau})` : "none";
    };

    const pending_flash = [];
    const flash_canh = (canh, mau_flash, mau_giu, animate) => {
      if (!canh) return;
      if (animate) {
        to_canh(canh, "#ffffff", true);
        pending_flash.push(setTimeout(() => to_canh(canh, mau_flash, true),  120));
        pending_flash.push(setTimeout(() => to_canh(canh, "#ffffff",  true),  280));
        pending_flash.push(setTimeout(() => to_canh(canh, mau_flash, true),  440));
      } else {
        to_canh(canh, mau_giu, true, true);
      }
    };

    const xoa_flash_pending = () => {
      pending_flash.forEach(t => clearTimeout(t));
      pending_flash.length = 0;
    };

    const ap_dung_event = (idx, animate = true) => {
      const ev = events[idx];
      if (ev.type === 'init') {
        for (let i = 0; i < ev.dist.length; i++) this.Hien_The(svg, i, ev.dist[i], ev.from[i]);
      } else if (ev.type === 'select') {
        const node = svg.querySelector(`.g-node-group[data-index="${ev.u}"] .g-node`);
        if (node) { node.style.fill = "#f59e0b"; node.style.stroke = "#fff"; }
        const lbl = svg.querySelector(`.g-node-group[data-index="${ev.u}"] .g-label`);
        if (lbl) lbl.style.fill = "#000";
        this.The_Doi_Mau(svg, ev.u, "state-select");
      } else if (ev.type === 'update') {
        this.Hien_The(svg, ev.v, ev.dist[ev.v], ev.from[ev.v], animate);
        // flash cạnh u→v và giữ màu cam
        flash_canh(lay_canh(ev.u, ev.v), "#fb923c", "#fb923c", animate);
      } else if (ev.type === 'done') {
        // hủy flash pending và xóa màu cạnh đang xét
        xoa_flash_pending();
        svg.querySelectorAll(`.g-edge[data-u="${ev.u}"], .g-edge[data-v="${ev.u}"]`).forEach(c => {
          c.style.stroke = ""; c.style.filter = ""; c.style.strokeWidth = "";
        });
        // tô xanh đỉnh đã vào da_tham
        const node = svg.querySelector(`.g-node-group[data-index="${ev.u}"] .g-node`);
        if (node) { node.style.fill = "#33FF00"; node.style.stroke = "#fff"; }
        const lbl = svg.querySelector(`.g-node-group[data-index="${ev.u}"] .g-label`);
        if (lbl) lbl.style.fill = "#000";
        this.The_Doi_Mau(svg, ev.u, "state-done");
        // nếu là đỉnh end → vẽ đường đi từ start→end
        if (ev.u === end) {
          for (let i = 1; i < duong_di.length; i++)
            to_canh(lay_canh(duong_di[i - 1], duong_di[i]), "#33FF00", true, true);
        }
      }
    };

    const khoi_phuc_dij = () => {
      this.Reset_Mau(svg);
      svg.querySelectorAll(".g-card").forEach(c => { c.style.display = "none"; });
      for (let i = 0; i < this.anim.buoc; i++) ap_dung_event(i, false);
    };

    this.anim = {
      chu_trinh: events, svg, buoc: 0, paused: false, timer: null,
      fn_buoc: ap_dung_event,
      fn_replay: khoi_phuc_dij
    };
    document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9646;&#9646;";
    this.Bat_Dau_Animation();
  }

  Cap_Nhat_Sublabel(svg, nhan) {
    for (let i = 0; i < nhan.length; i++) {
      const sl_g = svg.querySelector(`.g-node-group[data-index="${i}"] .g-sublabel-group`);
      if (sl_g) {
        sl_g.style.display = "block";
        sl_g.querySelector(".g-sublabel-text").textContent = nhan[i];
      }
    }
  }

  Chay_Animation_Cay(list_cay, ten_thuat_toan = "", snapshots = null) {
    const svg = document.getElementById("svg_do_thi");
    if (this.anim) clearTimeout(this.anim.timer);

    const ket_qua_text = list_cay.map(c => `${c.start} → ${c.end}  (${c.value})`).join("\n");
    const tong = list_cay.reduce((s, c) => s + c.value, 0);

    this.ket_qua_hien_tai = list_cay;
    document.getElementById("ten_thuat_toan").textContent = ten_thuat_toan;
    document.getElementById("noi_dung_ket_qua").textContent = ket_qua_text + `\nTổng: ${tong}`;
    document.getElementById("khung_ket_qua").style.display = "none";
    document.getElementById("btn_xem_ket_qua").style.display = "none";

    this.Reset_Mau(svg);
    svg.querySelectorAll(".g-sublabel-group").forEach(sl => { sl.style.display = "none"; });

    // hiện nhãn ban đầu nếu có snapshot
    if (snapshots) this.Cap_Nhat_Sublabel(svg, snapshots[0]);

    // highlight đỉnh đầu tiên (prim bắt đầu từ 0)
    const node0 = svg.querySelector(`.g-node-group[data-index="0"] .g-node`);
    if (node0) { node0.style.fill = "#33FF00"; node0.style.stroke = "#fff"; }
    const label0 = svg.querySelector(`.g-node-group[data-index="0"] .g-label`);
    if (label0) label0.style.fill = "#000";

    const ap_dung_buoc_cay = (buoc) => {
      const { start, end } = list_cay[buoc];
      const canh = svg.querySelector(`.g-edge[data-u="${start}"][data-v="${end}"]`)
                || svg.querySelector(`.g-edge[data-u="${end}"][data-v="${start}"]`);
      if (canh) { canh.style.stroke = "#fb923c"; canh.style.filter = "drop-shadow(0 0 6px #fb923c)"; canh.style.strokeWidth = "3"; }
      // tô cả 2 đỉnh — kruskal không đảm bảo end mới, start có thể là đỉnh mới
      [start, end].forEach(v => {
        const node = svg.querySelector(`.g-node-group[data-index="${v}"] .g-node`);
        if (node) { node.style.fill = "#33FF00"; node.style.stroke = "#fff"; }
        const label = svg.querySelector(`.g-node-group[data-index="${v}"] .g-label`);
        if (label) label.style.fill = "#000";
      });
      if (snapshots && snapshots[buoc + 1]) this.Cap_Nhat_Sublabel(svg, snapshots[buoc + 1]);
    };

    const khoi_phuc_cay = () => {
      this.Reset_Mau(svg);
      if (snapshots) this.Cap_Nhat_Sublabel(svg, snapshots[0]);
      const n0 = svg.querySelector(`.g-node-group[data-index="0"] .g-node`);
      if (n0) { n0.style.fill = "#33FF00"; n0.style.stroke = "#fff"; }
      const l0 = svg.querySelector(`.g-node-group[data-index="0"] .g-label`);
      if (l0) l0.style.fill = "#000";
      for (let i = 0; i < this.anim.buoc; i++) ap_dung_buoc_cay(i);
    };

    this.anim = {
      timer: null, paused: false, buoc: 0,
      chu_trinh: list_cay,
      fn_buoc: ap_dung_buoc_cay,
      fn_replay: khoi_phuc_cay
    };

    document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9646;&#9646;";
    this.Bat_Dau_Animation();
  }

  Reset_Mau(svg) {
    svg.querySelectorAll(".g-node").forEach(n => { n.style.fill = ""; n.style.stroke = ""; });
    svg.querySelectorAll(".g-label").forEach(l => { l.style.fill = ""; });
    svg.querySelectorAll(".g-edge").forEach(e => { e.style.stroke = ""; e.style.filter = ""; e.style.strokeWidth = ""; });
    svg.querySelectorAll(".g-sublabel-group").forEach(sl => { sl.style.display = "none"; });
    svg.querySelectorAll(".g-card").forEach(c => { c.style.display = "none"; });
  }

  To_Dinh_Xong(dinh) {
    const node = this.anim.svg.querySelector(`.g-node-group[data-index="${dinh}"] .g-node`);
    if (node) { node.style.fill = "#33FF00"; node.style.stroke = "#fff"; }
    const label = this.anim.svg.querySelector(`.g-node-group[data-index="${dinh}"] .g-label`);
    if (label) label.style.fill = "#000000";
  }

  Chay_Buoc(buoc) {
    const { chu_trinh, svg, degree_used, degree_total } = this.anim;
    if (buoc > 0) {
      const prev = chu_trinh[buoc - 1];
      const u    = chu_trinh[buoc];
      // tô cạnh
      const canh = svg.querySelector(`.g-edge[data-u="${prev}"][data-v="${u}"]`)
                || svg.querySelector(`.g-edge[data-u="${u}"][data-v="${prev}"]`);
      if (canh) {
        canh.style.stroke = "#fb923c";
        canh.style.filter = "drop-shadow(0 0 6px #fb923c)";
        canh.style.strokeWidth = "3";
      }
      // cập nhật số cạnh đã dùng của đỉnh prev
      degree_used[prev]++;
      if (degree_used[prev] >= degree_total[prev]) this.To_Dinh_Xong(prev);
    }
    // bước cuối → tô đỉnh đích luôn
    if (buoc === chu_trinh.length - 1) this.To_Dinh_Xong(chu_trinh[buoc]);
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

  Chay_Animation(chu_trinh, ten_thuat_toan = "") {
    const svg = document.getElementById("svg_do_thi");
    if (this.anim) clearTimeout(this.anim.timer);

    this.ket_qua_hien_tai = chu_trinh;
    document.getElementById("ten_thuat_toan").textContent = ten_thuat_toan;
    document.getElementById("noi_dung_ket_qua").textContent = chu_trinh.join(" → ");
    document.getElementById("khung_ket_qua").style.display = "none";
    document.getElementById("btn_xem_ket_qua").style.display = "none";

    // tính tổng số cạnh mỗi đỉnh sẽ dùng trong hành trình
    const so_dinh = this.graph.so_dinh;
    const degree_total = new Array(so_dinh).fill(0);
    for (let i = 1; i < chu_trinh.length; i++) degree_total[chu_trinh[i - 1]]++;

    const fn_buoc_path = (buoc) => {
      this.Chay_Buoc(buoc);
    };

    const fn_replay_path = () => {
      this.Reset_Mau(svg);
      this.anim.degree_used = new Array(so_dinh).fill(0);
      for (let i = 0; i < this.anim.buoc; i++) this.Chay_Buoc(i);
    };

    this.anim = {
      chu_trinh, svg,
      buoc: 0, paused: false, timer: null,
      degree_total,
      degree_used: new Array(so_dinh).fill(0),
      fn_buoc: fn_buoc_path,
      fn_replay: fn_replay_path
    };
    document.getElementById("btn_dung_tiep_tuc").innerHTML = "&#9646;&#9646;";
    this.Reset_Mau(svg);
    this.Bat_Dau_Animation();
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

  Them_Menu_File(file, content, la_mac_dinh = false) {
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
      document
        .querySelectorAll(".button_radio")
        .forEach((btn) => btn.classList.remove("active"));
      button_radio.classList.add("active");
      this.file_duoc_chon = file;
      this.graph = new Graph(file);
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
      if (!la_mac_dinh) {
        localStorage.removeItem("app_content_" + file.name);
        const ds = JSON.parse(localStorage.getItem("app_files") || "[]");
        const i2 = ds.indexOf(file.name);
        if (i2 !== -1) { ds.splice(i2, 1); localStorage.setItem("app_files", JSON.stringify(ds)); }
      }
      if (this.list_file.length === 0) {
        const empty = document.createElement("li");
        empty.className = "file_trong";
        empty.textContent = "Chưa có file nào";
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
