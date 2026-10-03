const chieuCao = 170;

if (chieuCao > 100 && chieuCao < 200) {
  const soLeChieuCao = chieuCao % 100;
  const canNangLyTuong = (soLeChieuCao * 9) / 10;
  const canNangToiDa = soLeChieuCao;
  const canNangToiThieu = (soLeChieuCao * 8) / 10;

  console.log(
    "Cân nặng lý tưởng: " +
      canNangLyTuong +
      " kg, cân nặng tối đa: " +
      canNangToiDa +
      " kg, cân nặng tối thiểu: " +
      canNangToiThieu +
      " kg",
  );
} else {
  console.log("Công thức chỉ áp dụng cho 100 < chiều cao < 200");
}
