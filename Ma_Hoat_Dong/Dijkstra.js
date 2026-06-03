class Dijkstra {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Dieu_Kien() {
    for (let i = 0; i < this.so_dinh; i++)
      for (let j = 0; j < this.so_dinh; j++)
        if (this.ma_tran[i][j] < 0) return false;
    return true;
  }

  Lay_Dinh_Min(da_tham, tong_duong_di) {
    let min = Infinity, answer = -1;
    for (let i = 0; i < this.so_dinh; i++) {
      if (!da_tham[i] && tong_duong_di[i] < min) {
        min = tong_duong_di[i];
        answer = i;
      }
    }
    return answer;
  }

  Tim_Duong_Di(start, end) {
    if (!this.Dieu_Kien()) return null;

    const da_tham   = new Array(this.so_dinh).fill(false);
    const luu_vet   = new Array(this.so_dinh).fill(-1);
    const tong_dd   = new Array(this.so_dinh).fill(Infinity);
    tong_dd[start]  = 0;

    const events = [];
    // trạng thái khởi tạo
    events.push({ type: 'init', dist: [...tong_dd], from: [...luu_vet] });

    while (!da_tham[end]) {
      const u = this.Lay_Dinh_Min(da_tham, tong_dd);
      if (u === -1) return null;

      // ghi nhận chọn đỉnh u
      events.push({ type: 'select', u, dist: [...tong_dd], from: [...luu_vet] });

      da_tham[u] = true;

      for (let i = 0; i < this.so_dinh; i++) {
        if (this.ma_tran[u][i] !== 0 && tong_dd[i] > tong_dd[u] + this.ma_tran[u][i]) {
          tong_dd[i] = tong_dd[u] + this.ma_tran[u][i];
          luu_vet[i] = u;
          // ghi nhận cập nhật đỉnh i
          events.push({ type: 'update', u, v: i, dist: [...tong_dd], from: [...luu_vet] });
        }
      }

      events.push({ type: 'done', u, dist: [...tong_dd], from: [...luu_vet] });
    }

    const duong_di = [];
    let v = end;
    while (v !== -1) { duong_di.push(v); v = luu_vet[v]; }
    duong_di.reverse();

    return { duong_di, tong: tong_dd[end], events, start, end };
  }
}
