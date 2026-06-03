class BFS {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Tim_Duong_Di(start, end) {
    const luu_vet = new Array(this.so_dinh).fill(-1);
    const da_tham = new Array(this.so_dinh).fill(false);
    const hang_doi = [start];
    let lay_ra = 0, dua_vao = 1;

    while (lay_ra < dua_vao) {
      const check = hang_doi[lay_ra++];
      da_tham[check] = true;
      if (check === end) break;
      for (let i = 0; i < this.so_dinh; i++) {
        if (!da_tham[i] && luu_vet[i] === -1 && this.ma_tran[check][i] !== 0) {
          hang_doi.push(i);
          dua_vao++;
          luu_vet[i] = check;
        }
      }
    }

    if (!da_tham[end]) return null;

    const duong_di = [];
    let v = end;
    while (v !== -1) {
      duong_di.push(v);
      v = luu_vet[v];
    }
    duong_di.reverse();
    return { duong_di, thu_tu_duyet: hang_doi };
  }
}
