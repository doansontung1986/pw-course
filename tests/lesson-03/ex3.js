/*
Bài 1: Tạo file ex3.js, thêm vào code đáp án cho đề bài sau:

Lặp từ 1 tới 100
Trong mỗi vòng lặp, in ra:
Nếu giá trị của vòng lặp chia hết cho 2, in “Số <i> là số chẵn”
Nếu giá trị của vòng lặp không chia hết cho 2, in “Số <i> là số lẻ”
*/

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    console.log("Số " + i + " là số chẵn");
  } else {
    console.log("Số " + i + " là số lẻ");
  }
}
