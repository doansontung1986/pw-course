# Lesson 2: Git & JavaScript basic

> Lưu ý: Key takeaways được viết dựa trên **tiêu đề các bài học** và kiến thức chung. Chưa đối chiếu với nội dung video, cần tự kiểm tra lại với bài giảng.

## Phần Git

### 2.1 Tổng quan về Git
- Git là hệ thống **quản lý phiên bản phân tán**: mỗi máy giữ toàn bộ lịch sử.
- Git (công cụ) khác GitHub (dịch vụ lưu repo trên mạng).
- Khởi tạo repo: `git init`.

### 2.2 Ba vùng trong Git
| Vùng | Ý nghĩa | Lệnh chuyển sang vùng tiếp theo |
|---|---|---|
| **Working directory** | Nơi bạn sửa file | `git add` |
| **Staging area** | Nơi chuẩn bị những thay đổi sẽ commit | `git commit` |
| **Repository** (local) | Nơi lưu lịch sử commit | `git push` (lên remote) |

- Quy ước riêng trong lớp: "vùng local" là file trong thư mục **trước** khi `git init`. Sau khi init, file thuộc working directory.

### 2.3 `git status`
- Xem trạng thái file: **untracked**, **modified**, **staged**.
- Nên chạy `git status` trước mỗi lần `add` và `commit`.

### 2.4 `git log`
```bash
git log                 # xem lịch sử đầy đủ
git log --oneline       # mỗi commit một dòng
git log --oneline -5    # 5 commit gần nhất
```

### 2.5 `git config`
- 3 cấp: `--system` (cả máy), `--global` (user), `--local` (một repo). Cấp nhỏ hơn ghi đè cấp lớn hơn.
- `git config --list` để xem toàn bộ cấu hình.

### 2.6 Git convention (Conventional Commits)
```
<type>: <mô tả ngắn>
```
| Type | Dùng khi |
|---|---|
| `feat` | Thêm tính năng / bài làm mới |
| `fix` | Sửa lỗi |
| `chore` | Việc lặt vặt, không ảnh hưởng code chính |
| `docs` | Sửa tài liệu |
| `refactor` | Sửa cấu trúc code, không đổi hành vi |

- Ví dụ trong khoá học: `feat: add solution for calm belt challenge`.
- Viết chữ thường, có dấu cách sau dấu `:`, mô tả ngắn gọn.

## Phần JavaScript

### 2.7 – 2.8 Giới thiệu & Hello World
```js
console.log("Hello World");
```
```bash
node hello.js
```

### 2.9 Comment
```js
// comment một dòng
/* comment
   nhiều dòng */
```

### 2.10 Biến và hằng
| Từ khoá | Gán lại | Phạm vi | Khuyến nghị |
|---|---|---|---|
| `const` | Không | Block | **Dùng mặc định** |
| `let` | Có | Block | Khi cần gán lại |
| `var` | Có | Function | **Không dùng** |

- Luôn khai báo biến bằng `const`/`let`. Gán `x = 5` mà không khai báo sẽ tạo biến toàn cục ngầm, lỗi trong strict mode.

### 2.11 Kiểu dữ liệu
- Nguyên thuỷ: `string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol`.
- Tham chiếu: `object` (gồm cả array, function).
- Kiểm tra kiểu: `typeof x`.

### 2.12 Toán tử so sánh
- Dùng `===` và `!==` (so sánh cả giá trị và kiểu).
- Tránh `==` vì tự ép kiểu: `"5" == 5` là `true`, còn `"5" === 5` là `false`.

### 2.13 Toán tử toán học
- `+ - * / % **`
- `%` lấy phần dư: `80 % 3 = 2`. Hay dùng để kiểm tra chẵn/lẻ, chia hết.
- `+` với string sẽ nối chuỗi: `"1" + 2 = "12"`.

### 2.14 Toán tử logic
- `&&` (và), `||` (hoặc), `!` (phủ định).
- Ví dụ: `chieuCao > 100 && chieuCao < 200`.

### 2.15 Toán tử một ngôi
- `++`, `--`, `!`, `typeof`, `-x`, `+x`.
- `i++` trả về giá trị **cũ** rồi mới tăng, `++i` tăng **trước** rồi trả về giá trị mới.
