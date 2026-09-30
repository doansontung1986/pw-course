# Lesson 2: Git & JavaScript Basic

Tổng hợp kiến thức buổi 2: nền tảng Git (ba vùng làm việc, `git status`, `git log`, `git config`, Git convention) và JavaScript cơ bản (biến, hằng, kiểu dữ liệu, các nhóm toán tử).

## Mục lục

- [Tính năng (Nội dung đã học)](#tính-năng-nội-dung-đã-học)
- [Cài đặt](#cài-đặt)
- [Phần 1 – Git](#phần-1--git)
  - [2.1 Tổng quan về Git](#21-tổng-quan-về-git)
  - [2.2 Ba vùng trong Git](#22-ba-vùng-trong-git)
  - [2.3 Kiểm tra trạng thái với git status](#23-kiểm-tra-trạng-thái-với-git-status)
  - [2.4 Xem danh sách commits với git log](#24-xem-danh-sách-commits-với-git-log)
  - [2.5 Cấu hình với git config](#25-cấu-hình-với-git-config)
  - [2.6 Git convention](#26-git-convention)
- [Phần 2 – JavaScript](#phần-2--javascript)
  - [2.7 Giới thiệu về JavaScript](#27-giới-thiệu-về-javascript)
  - [2.8 Chương trình đầu tiên – Hello World](#28-chương-trình-đầu-tiên--hello-world)
  - [2.9 Comment trong JavaScript](#29-comment-trong-javascript)
  - [2.10 Biến và Hằng](#210-biến-và-hằng)
  - [2.11 Kiểu dữ liệu](#211-kiểu-dữ-liệu)
  - [2.12 Toán tử so sánh](#212-toán-tử-so-sánh)
  - [2.13 Toán tử toán học](#213-toán-tử-toán-học)
  - [2.14 Toán tử logic](#214-toán-tử-logic)
  - [2.15 Toán tử một ngôi](#215-toán-tử-một-ngôi)
- [Sử dụng (Cheat sheet)](#sử-dụng-cheat-sheet)

## Tính năng (Nội dung đã học)

- **Git:** khái niệm version control, ba vùng (Working Directory – Staging Area – Repository), `git status`, `git log`, `git config`, quy ước commit/branch.
- **JavaScript:** môi trường chạy, Hello World, comment, `var` / `let` / `const`, 8 kiểu dữ liệu, toán tử so sánh / toán học / logic / một ngôi.
- **Quiz:** Quiz 2.1 (Ba vùng trong Git), Quiz 2.2 (git config, git log, git status, git convention).

## Cài đặt

```bash
# Kiểm tra Git đã cài chưa
git --version

# Kiểm tra Node.js (để chạy JavaScript ngoài trình duyệt)
node --version

# Tạo thư mục thực hành và khởi tạo repository
mkdir lesson-2 && cd lesson-2
git init
```

---

## Phần 1 – Git

### 2.1 Tổng quan về Git

- **Git** là hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS).
- Mỗi máy có **bản sao đầy đủ** của repository (toàn bộ lịch sử) → làm việc được cả khi offline.
- Git lưu **snapshot** (ảnh chụp) của dự án tại mỗi commit, không chỉ lưu phần khác biệt.
- Lợi ích: theo dõi lịch sử thay đổi, quay lại phiên bản cũ, làm việc nhóm song song qua branch.

| Khái niệm         | Ý nghĩa                                                          |
| ----------------- | ---------------------------------------------------------------- |
| Git               | Công cụ quản lý phiên bản, chạy trên máy local                   |
| GitHub / GitLab   | Dịch vụ lưu trữ repository từ xa (remote) dựa trên Git           |
| Repository (repo) | Kho chứa mã nguồn + lịch sử thay đổi (thư mục `.git`)            |
| Commit            | Một "điểm lưu" snapshot, có mã hash, tác giả, thời gian, message |

### 2.2 Ba vùng trong Git

```
 Working Directory  ──git add──▶  Staging Area  ──git commit──▶  Repository (.git)
   (đang sửa)                     (chuẩn bị commit)               (lịch sử đã lưu)
        ◀──git restore──             ◀──git restore --staged──
```

| Vùng                     | Mô tả                                          | Lệnh liên quan                                  |
| ------------------------ | ---------------------------------------------- | ----------------------------------------------- |
| **Working Directory**    | Nơi bạn chỉnh sửa file thực tế                 | `git restore <file>` (huỷ thay đổi)             |
| **Staging Area (Index)** | Danh sách thay đổi sẽ đưa vào commit tiếp theo | `git add <file>`, `git restore --staged <file>` |
| **Repository**           | Lịch sử commit lưu trong `.git`                | `git commit -m "..."`                           |

Trạng thái của file:

- **Untracked** – file mới, Git chưa theo dõi.
- **Modified** – đã sửa nhưng chưa `add`.
- **Staged** – đã `add`, chờ commit.
- **Committed / Unmodified** – đã lưu vào repository, không có thay đổi mới.

### 2.3 Kiểm tra trạng thái với git status

```bash
git status        # hiển thị đầy đủ
git status -s     # dạng rút gọn (short)
```

Ý nghĩa ký hiệu ở dạng `-s` (cột trái = staging, cột phải = working directory):

| Ký hiệu | Ý nghĩa                   |
| ------- | ------------------------- |
| `??`    | Untracked                 |
| `A `    | Mới được thêm vào staging |
| ` M`    | Đã sửa, chưa staged       |
| `M `    | Đã sửa và đã staged       |
| `D`     | Đã xoá                    |

> Thói quen tốt: chạy `git status` **trước** khi `git add` và `git commit`.

### 2.4 Xem danh sách commits với git log

```bash
git log                     # đầy đủ: hash, author, date, message
git log --oneline           # mỗi commit một dòng
git log -n 5                # 5 commit gần nhất
git log --oneline --graph --all   # xem dạng cây, mọi branch
git log --author="Tung"     # lọc theo tác giả
git log --stat              # kèm danh sách file thay đổi
git log -p                  # kèm nội dung diff
```

Nhấn `q` để thoát màn hình log.

### 2.5 Cấu hình với git config

Ba cấp cấu hình (cấp hẹp hơn ghi đè cấp rộng hơn):

| Cấp    | Cờ                   | Phạm vi           | File             |
| ------ | -------------------- | ----------------- | ---------------- |
| System | `--system`           | Mọi user trên máy | `/etc/gitconfig` |
| Global | `--global`           | User hiện tại     | `~/.gitconfig`   |
| Local  | `--local` (mặc định) | Một repository    | `.git/config`    |

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"

git config --list               # xem tất cả cấu hình
git config --list --show-origin # xem cấu hình lấy từ file nào
git config user.name            # xem một giá trị
```

### 2.6 Git convention

**Commit message** theo Conventional Commits:

```
<type>(<scope>): <subject>

[body - tuỳ chọn]

[footer - tuỳ chọn]
```

| Type       | Dùng khi                                          |
| ---------- | ------------------------------------------------- |
| `feat`     | Thêm tính năng mới                                |
| `fix`      | Sửa lỗi                                           |
| `docs`     | Thay đổi tài liệu                                 |
| `style`    | Format code, không đổi logic                      |
| `refactor` | Tái cấu trúc code, không thêm tính năng / sửa lỗi |
| `test`     | Thêm / sửa test                                   |
| `perf`     | Cải thiện hiệu năng                               |
| `chore`    | Việc lặt vặt (build, cấu hình, dependency)        |
| `ci`       | Thay đổi pipeline CI                              |

Ví dụ:

```bash
git commit -m "feat(login): add remember me checkbox"
git commit -m "fix(cart): correct total price rounding"
git commit -m "docs: update README installation steps"
```

Quy tắc chung:

- Subject ngắn gọn (≈ ≤ 50 ký tự), dùng thể mệnh lệnh ("add", không phải "added"), không có dấu chấm cuối.
- Mỗi commit chỉ nên chứa **một** thay đổi logic.
- Đặt tên branch rõ ràng: `feature/login-page`, `fix/cart-total`, `docs/readme`.

---

## Phần 2 – JavaScript

### 2.7 Giới thiệu về JavaScript

- Ngôn ngữ lập trình phổ biến của Web; chạy trong **trình duyệt** và trên **server** qua **Node.js**.
- Tiêu chuẩn hoá bởi **ECMAScript** (ES6/ES2015 trở đi bổ sung `let`, `const`, arrow function...).
- Đặc điểm: kiểu động (dynamic typing), thông dịch/JIT, hỗ trợ lập trình hướng đối tượng và hàm.
- Trong testing: dùng cho automation (Playwright, Cypress, WebdriverIO...).

### 2.8 Chương trình đầu tiên – Hello World

```javascript
// hello.js
console.log("Hello World");
```

```bash
node hello.js   # Output: Hello World
```

Các cách chạy khác: mở DevTools (F12) → tab **Console** trên trình duyệt, hoặc nhúng vào HTML bằng thẻ `<script>`.

### 2.9 Comment trong JavaScript

```javascript
// Comment một dòng

/*
  Comment
  nhiều dòng
*/

/**
 * JSDoc - mô tả hàm
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}
```

Comment để giải thích **tại sao**, không lặp lại code làm **gì**.

### 2.10 Biến và Hằng

|                       | `var`                   | `let`                                | `const`         |
| --------------------- | ----------------------- | ------------------------------------ | --------------- |
| Phạm vi (scope)       | Function                | Block `{}`                           | Block `{}`      |
| Gán lại giá trị       | ✅                      | ✅                                   | ❌              |
| Khai báo lại cùng tên | ✅                      | ❌                                   | ❌              |
| Bắt buộc khởi tạo     | ❌                      | ❌                                   | ✅              |
| Hoisting              | Có, giá trị `undefined` | Có, nhưng ở TDZ (lỗi nếu dùng trước) | Có, nhưng ở TDZ |

```javascript
let age = 20;
age = 21; // OK

const PI = 3.14;
// PI = 3.1415;        // TypeError: Assignment to constant variable.

const user = { name: "An" };
user.name = "Bình"; // OK – const khoá tham chiếu, không khoá nội dung object
```

Quy tắc đặt tên:

- Bắt đầu bằng chữ cái, `_` hoặc `$`; không bắt đầu bằng số; không trùng từ khoá.
- Phân biệt hoa thường (`name` ≠ `Name`).
- Biến dùng `camelCase`; hằng số cố định dùng `UPPER_SNAKE_CASE`.
- Ưu tiên `const`, dùng `let` khi cần gán lại, tránh `var`.

### 2.11 Kiểu dữ liệu

**7 kiểu nguyên thuỷ (primitive)** + **1 kiểu tham chiếu (object)**:

| Kiểu      | Ví dụ                                   | `typeof`                           |
| --------- | --------------------------------------- | ---------------------------------- |
| String    | `"Hello"`, `'Hi'`, `` `Tên: ${name}` `` | `"string"`                         |
| Number    | `10`, `3.14`, `NaN`, `Infinity`         | `"number"`                         |
| BigInt    | `123n`                                  | `"bigint"`                         |
| Boolean   | `true`, `false`                         | `"boolean"`                        |
| Undefined | `let x;`                                | `"undefined"`                      |
| Null      | `null`                                  | `"object"` ⚠️ (lỗi lịch sử của JS) |
| Symbol    | `Symbol("id")`                          | `"symbol"`                         |
| Object    | `{}`, `[]`, `function(){}`              | `"object"` / `"function"`          |

```javascript
typeof "abc"; // "string"
typeof 42; // "number"
typeof null; // "object"
Array.isArray([]); // true – cách đúng để kiểm tra mảng
```

### 2.12 Toán tử so sánh

| Toán tử           | Ý nghĩa                           | Ví dụ       | Kết quả |
| ----------------- | --------------------------------- | ----------- | ------- |
| `==`              | Bằng (có ép kiểu)                 | `5 == "5"`  | `true`  |
| `===`             | Bằng nghiêm ngặt (giá trị + kiểu) | `5 === "5"` | `false` |
| `!=`              | Khác (có ép kiểu)                 | `5 != "5"`  | `false` |
| `!==`             | Khác nghiêm ngặt                  | `5 !== "5"` | `true`  |
| `>` `<` `>=` `<=` | Lớn/nhỏ hơn                       | `10 >= 10`  | `true`  |

Trường hợp đặc biệt:

```javascript
null == undefined; // true
null === undefined; // false
NaN === NaN; // false → dùng Number.isNaN(x)
"b" > "a"; // true (so sánh theo thứ tự ký tự)
```

> Luôn ưu tiên `===` và `!==`.

### 2.13 Toán tử toán học

| Toán tử | Ý nghĩa          | Ví dụ               | Kết quả      |
| ------- | ---------------- | ------------------- | ------------ |
| `+`     | Cộng / nối chuỗi | `2 + 3` / `"2" + 3` | `5` / `"23"` |
| `-`     | Trừ              | `5 - 2`             | `3`          |
| `*`     | Nhân             | `4 * 2`             | `8`          |
| `/`     | Chia             | `7 / 2`             | `3.5`        |
| `%`     | Chia lấy dư      | `7 % 2`             | `1`          |
| `**`    | Luỹ thừa         | `2 ** 3`            | `8`          |

Toán tử gán kết hợp: `+=`, `-=`, `*=`, `/=`, `%=`, `**=` (ví dụ `x += 5` ⇔ `x = x + 5`).

```javascript
"5" - 2; // 3   (ép chuỗi sang số)
"5" + 2; // "52" (nối chuỗi)
10 / 0; // Infinity
"abc" * 2; // NaN
0.1 + 0.2; // 0.30000000000000004 (sai số dấu phẩy động)
```

### 2.14 Toán tử logic

| Toán tử | Tên                | Trả về                                                      |
| ------- | ------------------ | ----------------------------------------------------------- |
| `&&`    | AND                | Giá trị falsy đầu tiên, hoặc giá trị cuối nếu tất cả truthy |
| `\|\|`  | OR                 | Giá trị truthy đầu tiên, hoặc giá trị cuối nếu tất cả falsy |
| `!`     | NOT                | Đảo ngược thành boolean                                     |
| `??`    | Nullish coalescing | Vế phải nếu vế trái là `null`/`undefined`                   |

**Falsy values:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Mọi giá trị khác là **truthy** (kể cả `"0"`, `[]`, `{}`).

```javascript
true && "OK"; // "OK"
0 || "default"; // "default"
0 ?? "default"; // 0   (?? chỉ bắt null/undefined)
!!"hello"; // true (ép sang boolean)
```

Short-circuit: `&&` dừng khi gặp falsy, `||` dừng khi gặp truthy → vế sau có thể không được thực thi.

### 2.15 Toán tử một ngôi

Toán tử một ngôi (unary) chỉ tác động lên **một** toán hạng.

| Toán tử          | Ý nghĩa                     | Ví dụ        | Kết quả    |
| ---------------- | --------------------------- | ------------ | ---------- |
| `+x`             | Chuyển sang số              | `+"3"`       | `3`        |
| `-x`             | Đổi dấu (và chuyển sang số) | `-"3"`       | `-3`       |
| `!x`             | Phủ định logic              | `!true`      | `false`    |
| `++x` / `x++`    | Tăng 1 (prefix / postfix)   | xem bên dưới |            |
| `--x` / `x--`    | Giảm 1 (prefix / postfix)   |              |            |
| `typeof x`       | Trả về kiểu dữ liệu         | `typeof 1`   | `"number"` |
| `delete obj.key` | Xoá thuộc tính object       |              | `true`     |

```javascript
let a = 5;
let b = a++; // b = 5, a = 6  (postfix: trả giá trị cũ rồi mới tăng)

let c = 5;
let d = ++c; // d = 6, c = 6  (prefix: tăng trước rồi trả giá trị)
```

---

## Sử dụng (Cheat sheet)

**Quy trình Git cơ bản:**

```bash
git status                          # 1. Xem trạng thái
git add index.js                    # 2. Đưa file vào staging (git add . để add tất cả)
git status                          # 3. Kiểm tra lại
git commit -m "feat: add hello world"  # 4. Commit theo convention
git log --oneline                   # 5. Xem lịch sử
```

**JavaScript tổng hợp:**

```javascript
// Biến & hằng
const APP_NAME = "Lesson 2";
let count = 0;

// Toán học + một ngôi
count += 10;
count++;

// So sánh + logic
const isValid = count === 11 && typeof APP_NAME === "string";
const title = null ?? "Untitled";

console.log(APP_NAME, count, isValid, title);
// Lesson 2 11 true Untitled
```
