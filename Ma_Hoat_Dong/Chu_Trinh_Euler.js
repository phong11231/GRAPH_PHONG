class Chu_Trinh_Euler {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran.map((row) => [...row]);
  }

  Kiem_Tra_Lien_Thong() {
    const da_tham = new Array(this.so_dinh).fill(false);
    let diem_bat_dau = -1;
    for (let i = 0; i < this.so_dinh; i++) {
      for (let j = 0; j < this.so_dinh; j++) {
        if (this.ma_tran[i][j] > 0) { diem_bat_dau = i; break; }
      }
      if (diem_bat_dau !== -1) break;
    }
    if (diem_bat_dau === -1) return true;

    const hang_doi = [diem_bat_dau];
    da_tham[diem_bat_dau] = true;
    while (hang_doi.length > 0) {
      const u = hang_doi.shift();
      for (let v = 0; v < this.so_dinh; v++) {
        if (this.ma_tran[u][v] > 0 && !da_tham[v]) {
          da_tham[v] = true;
          hang_doi.push(v);
        }
      }
    }

    for (let i = 0; i < this.so_dinh; i++) {
      const co_canh = this.ma_tran[i].some((w) => w > 0);
      if (co_canh && !da_tham[i]) return false;
    }
    return true;
  }

  Kiem_Tra() {
    if (!this.Kiem_Tra_Lien_Thong()) return false;
    for (let i = 0; i < this.so_dinh; i++) {
      let bac = 0;
      for (let j = 0; j < this.so_dinh; j++) {
        if (this.ma_tran[i][j] > 0) bac++;
      }
      if (bac % 2 !== 0) return false;
    }
    return true;
  }

  Tim_Chu_Trinh(dinh_bat_dau = 0) {
    if (!this.Kiem_Tra()) return null;

    const ma_tran_tam = this.ma_tran.map((row) => [...row]);
    const ngan_xep = [dinh_bat_dau];
    const chu_trinh = [];

    while (ngan_xep.length > 0) {
      const u = ngan_xep[ngan_xep.length - 1];
      let co_canh = false;
      for (let v = 0; v < this.so_dinh; v++) {
        if (ma_tran_tam[u][v] > 0) {
          ma_tran_tam[u][v]--;
          ma_tran_tam[v][u]--;
          ngan_xep.push(v);
          co_canh = true;
          break;
        }
      }
      if (!co_canh) chu_trinh.push(ngan_xep.pop());
    }

    return chu_trinh;
  }
}
