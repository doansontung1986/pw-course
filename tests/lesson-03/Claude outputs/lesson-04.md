# Bài 4: JavaScript – continue

> Lưu ý: Key takeaways được viết dựa trên **tiêu đề các bài học**, kiến thức chung và các bài tập calm-belt, upgradeCrew, printBountyLeaderboard đã làm. Chưa đối chiếu với nội dung video, cần tự kiểm tra lại với bài giảng.

## 4.1 Object
```js
const pirate = { name: "Luffy", bounty: 3000, strength: 600 };

pirate.name;          // đọc bằng dấu chấm
pirate["bounty"];     // đọc bằng ngoặc vuông (khi tên thuộc tính là biến)
pirate.crew = "Mũ Rơm";   // thêm thuộc tính
delete pirate.crew;       // xoá thuộc tính

const { name, bounty } = pirate;   // destructuring
```
- **Dùng literal `{}`**, không dùng `new Object()`.
- Cần tạo nhiều object cùng cấu trúc và hành vi thì dùng `class` + `new` (ví dụ Page Object Model trong Playwright).
- `const` chỉ khoá **biến**, không khoá **nội dung** object: vẫn sửa được `pirate.name`.

## 4.2 Array
```js
const crew = ["Luffy", "Zoro", "Nami"];
crew[0];          // "Luffy"
crew.length;      // 3
crew.push("Sanji");   // thêm vào cuối
crew.pop();           // bỏ phần tử cuối
```
- **Dùng literal `[]`**, tránh `new Array()`: `new Array(3)` tạo mảng **rỗng dài 3**, còn `[3]` là mảng có 1 phần tử.
- Tạo mảng theo độ dài: `Array.from({ length: 5 }, (_, i) => i + 1)` cho ra `[1, 2, 3, 4, 5]`.
- Copy mảng: `[...arr]` (copy nông). Mảng chứa object thì dùng `structuredClone(arr)` để copy sâu.
- JS **không có** `Arrays.copy` (đó là cú pháp Java).

## 4.3 Function
```js
// Function declaration
function add(a, b) {
  return a + b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Trả về nhiều giá trị: dùng object
function upgradeCrew(pirates) {
  // ...
  return { awakenedPirates, monsterTrioCandidates };
}
const { awakenedPirates, monsterTrioCandidates } = upgradeCrew(pirates);
```
- Đặt tên hàm theo camelCase, bắt đầu bằng động từ: `printBountyLeaderboard`, `upgradeCrew`.
- Hàm không có `return` sẽ trả về `undefined`.
- Biến khai báo trong hàm không dùng được bên ngoài hàm. Muốn dùng thì phải `return`.

## 4.4 Array utils functions
| Hàm | Trả về | Sửa mảng gốc? | Dùng khi |
|---|---|---|---|
| `forEach` | `undefined` | Không | Chỉ duyệt và làm gì đó |
| `map` | Mảng mới, **cùng độ dài** | Không | Biến đổi từng phần tử |
| `filter` | Mảng mới, các phần tử thoả điều kiện | Không | Lọc |
| `find` | Phần tử **đầu tiên** thoả điều kiện, hoặc `undefined` | Không | Tìm một phần tử |
| `some` / `every` | `true` / `false` | Không | Kiểm tra có ít nhất một / tất cả |
| `includes` | `true` / `false` | Không | Kiểm tra có chứa giá trị |
| `reduce` | Một giá trị | Không | Tính tổng, gom dữ liệu |
| `join` | String | Không | Nối phần tử thành chuỗi |
| `sort` | Chính mảng đó | **Có** | Sắp xếp |

```js
const awakened = pirates.map((p) => ({
  name: p.name.toUpperCase(),
  bounty: p.bounty * 2,
  strength: p.strength * 1.5,
}));

const strong = awakened.filter((p) => p.strength > 500);

const total = pirates.reduce((sum, p) => sum + p.bounty, 0);

const sorted = [...pirates].sort((a, b) => b.bounty - a.bounty); // giảm dần
```
- `sort` **sửa mảng gốc**, nên copy trước bằng `[...arr]`.
- `sort` mặc định so sánh theo **chuỗi**: `[10, 9, 1].sort()` cho ra `[1, 10, 9]`. Với số luôn truyền hàm so sánh `(a, b) => a - b`.
- `map` / `filter` có thể nối tiếp: `arr.map(...).filter(...)`.

## Hàm string hay dùng
- `str.toUpperCase()` / `str.toLowerCase()`: trả về chuỗi mới, không sửa chuỗi gốc.
- `num.toLocaleString("en-US")`: định dạng số `1000` thành `"1,000"`.
- `num.toFixed(2)`: làm tròn 2 chữ số thập phân, trả về **string**.
