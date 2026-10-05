# Lesson 3: Git & JavaScript nâng cao

> Lưu ý: Key takeaways được viết dựa trên **tiêu đề các bài học**, kiến thức chung và các bài tập ex1–ex7 đã làm. Chưa đối chiếu với nội dung video, cần tự kiểm tra lại với bài giảng. Danh sách bài học không có 3.3 và 3.4.

## Phần Git

### 3.1 Git: unstage
Đưa file từ **staging area** về **working directory**. Nội dung file vẫn giữ nguyên.
```bash
git restore --staged <file>   # cách mới (Git 2.23+)
git reset HEAD <file>         # cách cũ, vẫn dùng được
```

### Bài tập 3.1: Thực hành Git
- Thói quen nên có: `git status` → `git add` → `git status` → `git commit` → `git log --oneline`.

### 3.2 Git: un-commit
Huỷ commit gần nhất bằng `git reset`. Khác nhau ở chỗ thay đổi được đưa về đâu:

| Lệnh | Commit bị huỷ | Thay đổi nằm ở | Mức nguy hiểm |
|---|---|---|---|
| `git reset --soft HEAD~1` | Có | Staging area | Thấp |
| `git reset HEAD~1` (mặc định `--mixed`) | Có | Working directory | Thấp |
| `git reset --hard HEAD~1` | Có | **Mất hẳn** | **Cao** |

- Chỉ sửa **message** của commit gần nhất: `git commit --amend -m "message mới"`.
- **Không** reset hoặc amend commit đã push lên nhánh dùng chung.

## Phần JavaScript

### 3.5 Câu điều kiện
```js
if (number > 0) {
  console.log("Số dương");
} else if (number < 0) {
  console.log("Số âm");
} else {
  console.log("Số 0");
}
```
- Nên xử lý cả trường hợp biên (số 0, giá trị ngoài phạm vi), kể cả khi đề không nói rõ.
- Kiểm tra phạm vi bằng toán tử logic: `if (chieuCao > 100 && chieuCao < 200)`.

### 3.6 Vòng lặp
```js
for (let i = 1; i <= 100; i++) { }      // tăng dần
for (let i = 25; i >= 12; i--) { }      // giảm dần
for (let i = 1; i <= 100; i += 4) { }   // bước nhảy 4
```
- Viết điều kiện khớp với đề: "từ 1 tới 100" thì dùng `i <= 100`, dễ đọc hơn `i < 101`.
- Kết hợp `%` để lọc: `if (i % 3 === 0)` là chia hết cho 3.
- Vòng lặp lồng nhau để duyệt cặp (a, b). Cho `b` bắt đầu từ `a` để không đếm trùng (a, b) và (b, a).
- `console.log` luôn xuống dòng. Muốn in trên một dòng thì gom vào chuỗi hoặc mảng rồi in một lần (`arr.join(" ")`).

### 3.7 JavaScript conventions
| Đối tượng | Quy ước | Ví dụ |
|---|---|---|
| Biến, hàm | camelCase | `chieuCao`, `printBountyLeaderboard` |
| Class | PascalCase | `LoginPage` |
| Hằng số cố định toàn cục | UPPER_SNAKE_CASE | `MAX_RETRY` |
| Tên file | kebab-case | `calm-belt.js` |

- Dùng `const` mặc định, `let` khi cần gán lại, không dùng `var`.
- Dùng `===` thay cho `==`.
- JS phân biệt chữ hoa, chữ thường: `printBountyLeaderBoard` và `printBountyLeaderboard` là 2 tên khác nhau.
