class Prim {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Dinh_Co_Duong_Di_Ngan_Nhat(da_tham) {
    let start = 0, end = 0, min = Infinity;
    for (let i = 0; i < this.so_dinh; i++) {
      for (let j = 0; j < this.so_dinh; j++) {
        if (this.ma_tran[i][j] !== 0 && this.ma_tran[i][j] < min && da_tham[i] && !da_tham[j]) {
          min = this.ma_tran[i][j];
          start = i;
          end = j;
        }
      }
    }
    if (min === Infinity) return null;
    return { start, end, value: min };
  }

  Thuc_Thi() {
    const da_tham = new Array(this.so_dinh).fill(false);
    const list_cay = [];
    da_tham[0] = true;

    while (list_cay.length < this.so_dinh - 1) {
      const cap = this.Dinh_Co_Duong_Di_Ngan_Nhat(da_tham);
      if (!cap) break;
      list_cay.push(cap);
      da_tham[cap.end] = true;
    }

    return list_cay;
  }
}
