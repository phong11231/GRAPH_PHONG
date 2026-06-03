class Floyd {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Khoi_Tao(list_floyd, luu_vet) {
    for (let i = 0; i < this.so_dinh; i++) {
      for (let j = 0; j < this.so_dinh; j++) {
        if (this.ma_tran[i][j] !== 0) {
          list_floyd[i][j] = this.ma_tran[i][j];
          luu_vet[i][j] = j;
        } else {
          list_floyd[i][j] = Infinity;
          luu_vet[i][j] = -1;
          if (i === j) list_floyd[i][j] = 0;
        }
      }
    }
  }

  Lay_Cap_Dinh_Duyet(list_floyd, k) {
    const hang = [], cot = [];
    for (let i = 0; i < this.so_dinh; i++) {
      if (list_floyd[k][i] !== Infinity && list_floyd[k][i] !== 0) hang.push(i);
      if (list_floyd[i][k] !== Infinity && list_floyd[i][k] !== 0) cot.push(i);
    }
    const list_cap = [];
    for (let i = 0; i < cot.length; i++)
      for (let j = 0; j < hang.length; j++)
        if (cot[i] !== hang[j]) { list_cap.push(cot[i]); list_cap.push(hang[j]); }
    return { hang, cot, list_cap };
  }

  Thuc_Thi(start, end) {
    const list_floyd = Array.from({ length: this.so_dinh }, () => new Array(this.so_dinh));
    const luu_vet    = Array.from({ length: this.so_dinh }, () => new Array(this.so_dinh));
    this.Khoi_Tao(list_floyd, luu_vet);

    const events = [{ type: 'init' }];

    for (let k = 0; k < this.so_dinh; k++) {
      const { hang, cot, list_cap } = this.Lay_Cap_Dinh_Duyet(list_floyd, k);
      events.push({ type: 'select_k', k, hang, cot });

      for (let idx = 0; idx < list_cap.length; idx += 2) {
        const a = list_cap[idx], b = list_cap[idx + 1];
        const qua_k   = list_floyd[a][k] + list_floyd[k][b];
        const improved = qua_k < list_floyd[a][b];
        events.push({ type: 'check', i: a, k, j: b, improved, qua_k });
        if (improved) {
          list_floyd[a][b] = qua_k;
          luu_vet[a][b]    = luu_vet[a][k];
        }
      }

      events.push({ type: 'done_k', k });
    }

    if (luu_vet[start][end] === -1) return null;

    const duong_di = [];
    let s = start;
    while (luu_vet[s][end] !== end) {
      duong_di.push(s);
      s = luu_vet[s][end];
      if (s === -1) return null;
    }
    duong_di.push(s);
    duong_di.push(end);

    events.push({ type: 'final' });
    return { duong_di, tong: list_floyd[start][end], events, start, end };
  }
}
