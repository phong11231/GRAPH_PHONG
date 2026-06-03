class Kruskal {
  constructor(graph) {
    this.so_dinh = graph.so_dinh;
    this.ma_tran = graph.ma_tran;
  }

  Khoi_Tao_Danh_Sach_Canh() {
    const list = [];
    for (let i = 0; i < this.so_dinh; i++)
      for (let j = i + 1; j < this.so_dinh; j++)
        if (this.ma_tran[i][j] !== 0)
          list.push({ start: i, end: j, value: this.ma_tran[i][j] });
    list.sort((a, b) => a.value - b.value);
    return list;
  }

  Gan_Nhan(list_nhan) {
    for (let i = 0; i < this.so_dinh; i++) list_nhan[i] = i;
  }

  Doi_Nhan(start, end, list_nhan) {
    const nhan_cu = list_nhan[end];
    const nhan_moi = list_nhan[start];
    for (let i = 0; i < this.so_dinh; i++)
      if (list_nhan[i] === nhan_cu) list_nhan[i] = nhan_moi;
  }

  Thuc_Thi() {
    const list_canh = this.Khoi_Tao_Danh_Sach_Canh();
    const list_nhan = new Array(this.so_dinh);
    this.Gan_Nhan(list_nhan);
    const list_cay = [];
    const snapshots = [[...list_nhan]]; // trạng thái nhãn ban đầu

    for (let i = 0; i < list_canh.length; i++) {
      if (list_cay.length === this.so_dinh - 1) break;
      const { start, end, value } = list_canh[i];
      if (list_nhan[start] !== list_nhan[end]) {
        list_cay.push({ start, end, value });
        this.Doi_Nhan(start, end, list_nhan);
        snapshots.push([...list_nhan]);
      }
    }

    return { list_cay, snapshots };
  }
}
