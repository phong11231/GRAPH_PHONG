class DFS {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Tim_Duong_Di(start, end) {
    const da_tham = new Array(this.so_dinh).fill(false);
    const luu_vet = new Array(this.so_dinh).fill(-1);

    if (!this.DFS(da_tham, luu_vet, start, end)) return null;

    const duong_di = [];
    let v = end;
    while (v !== -1) {
      duong_di.push(v);
      v = luu_vet[v];
    }
    duong_di.reverse();
    return duong_di;
  }

  DFS(da_tham, luu_vet, start, end) {
    if (start === end) return true;
    da_tham[start] = true;
    for (let i = 0; i < this.so_dinh; i++) {
      if (this.ma_tran[start][i] !== 0 && !da_tham[i]) {
        luu_vet[i] = start;
        if (this.DFS(da_tham, luu_vet, i, end)) return true;
      }
    }
    return false;
  }
}
