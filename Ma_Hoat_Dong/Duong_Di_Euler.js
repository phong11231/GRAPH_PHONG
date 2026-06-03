class Duong_Di_Euler {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran.map((row) => [...row]);
    this.co_huong = graph.Kiem_Tra_Co_Huong();
  }

  Dem_Bac_Ngoai(i) {
    let sum = 0;
    for (let j = 0; j < this.so_dinh; j++)
      if (this.ma_tran[i][j] !== 0) sum++;
    return sum;
  }

  Dem_Bac_Trong(i) {
    let sum = 0;
    for (let j = 0; j < this.so_dinh; j++)
      if (this.ma_tran[j][i] !== 0) sum++;
    return sum;
  }

  Lay_List_Dinh_Bac_Le() {
    const list = [];
    if (!this.co_huong) {
      for (let i = 0; i < this.so_dinh; i++) {
        if (this.Dem_Bac_Ngoai(i) % 2 !== 0) list.push(i);
      }
      return list;
    }
    for (let i = 0; i < this.so_dinh; i++) {
      const diff = this.Dem_Bac_Ngoai(i) - this.Dem_Bac_Trong(i);
      if (diff === 1 || diff === -1) list.push(i);
    }
    return list;
  }

  Kiem_Tra() {
    // có chu trình euler → không phải đường đi
    if (!this.co_huong) {
      let all_even = true;
      for (let i = 0; i < this.so_dinh; i++)
        if (this.Dem_Bac_Ngoai(i) % 2 !== 0) { all_even = false; break; }
      if (all_even) return null; // có chu trình, không phải đường đi
    } else {
      let is_circuit = true;
      for (let i = 0; i < this.so_dinh; i++)
        if (this.Dem_Bac_Ngoai(i) !== this.Dem_Bac_Trong(i)) { is_circuit = false; break; }
      if (is_circuit) return null;
    }

    const list_bac_le = this.Lay_List_Dinh_Bac_Le();
    if (list_bac_le.length !== 2) return null;
    return list_bac_le;
  }

  Kiem_Tra_Dinh_Bat_Dau(dinh) {
    if (!this.co_huong) {
      return this.Dem_Bac_Ngoai(dinh) % 2 !== 0;
    }
    return this.Dem_Bac_Ngoai(dinh) - this.Dem_Bac_Trong(dinh) === 1;
  }

  Tim_Duong_Di(dinh_bat_dau) {
    const list_bac_le = this.Kiem_Tra();
    if (!list_bac_le) return null;

    const start = dinh_bat_dau;

    const ma_tran_tam = this.ma_tran.map((row) => [...row]);
    const ngan_xep = [start];
    const duong_di = [];

    while (ngan_xep.length > 0) {
      const u = ngan_xep[ngan_xep.length - 1];
      let co_canh = false;
      for (let v = 0; v < this.so_dinh; v++) {
        if (ma_tran_tam[u][v] > 0) {
          ma_tran_tam[u][v]--;
          if (!this.co_huong) ma_tran_tam[v][u]--;
          ngan_xep.push(v);
          co_canh = true;
          break;
        }
      }
      if (!co_canh) duong_di.push(ngan_xep.pop());
    }

    duong_di.reverse();
    return duong_di;
  }
}
