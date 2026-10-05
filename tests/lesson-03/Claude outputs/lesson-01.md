# Lesson 1: Giới thiệu về Playwright, cài đặt công cụ học tập

> Lưu ý: Key takeaways được viết dựa trên **tiêu đề các bài học** và kiến thức chung về Playwright/Git. Chưa đối chiếu với nội dung video, cần tự kiểm tra lại với bài giảng.

## Key takeaways

### 1.1 Playwright là gì?
- Playwright là framework **automation test cho web** do Microsoft phát triển, mã nguồn mở.
- Hỗ trợ nhiều trình duyệt: **Chromium, Firefox, WebKit** (Safari).
- Hỗ trợ nhiều ngôn ngữ: JavaScript/TypeScript, Python, Java, .NET. Khoá học dùng **JavaScript**.
- Điểm mạnh: **auto-wait** (tự chờ element sẵn sàng), chạy song song, có sẵn test runner, report, trace.

### 1.2 Công cụ: NVM, Git, VS Code và cấu hình Git global
| Công cụ | Vai trò |
|---|---|
| **NVM** | Quản lý nhiều phiên bản Node.js trên cùng một máy |
| **Node.js / npm** | Môi trường chạy JavaScript và trình quản lý package |
| **Git** | Quản lý phiên bản source code |
| **VS Code** | Trình soạn thảo code |

Lệnh thường dùng:
```bash
nvm install --lts        # cài Node bản LTS
nvm use --lts            # dùng bản LTS
node -v && npm -v        # kiểm tra phiên bản

git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global --list   # xem cấu hình
```
- `--global` áp dụng cho **mọi repo** trên máy, chỉ cần cấu hình 1 lần.

### 1.3 Sử dụng VS Code cơ bản
- Mở thư mục project: `File → Open Folder` hoặc `code .` trong terminal.
- Terminal tích hợp: `` Ctrl + ` ``.
- Command Palette: `Cmd/Ctrl + Shift + P`.
- Nên cài extension **Playwright Test for VSCode** để chạy và debug test ngay trong editor.

### 1.3.1 [Windows] Cấu hình terminal mặc định
- Chỉ dành cho Windows: đổi terminal mặc định (ví dụ sang **Git Bash**) để lệnh giống macOS/Linux.
- Người dùng macOS có thể bỏ qua.

### 1.4 Chạy test đầu tiên với Playwright
```bash
npm init playwright@latest   # khởi tạo project
npx playwright test          # chạy toàn bộ test
npx playwright test --ui     # chạy với giao diện UI mode
npx playwright show-report   # mở HTML report
```
- Test nằm trong thư mục `tests/`, file có đuôi `.spec.js` / `.spec.ts`.
- Cấu hình chung nằm ở `playwright.config.js`.

### 1.5 Hiểu "vết" code Playwright
- Mình không chắc "vết" trong bài ý chỉ **trace** (Trace Viewer) hay việc **đọc hiểu cấu trúc** một file test. Cần xem lại video.
- Cấu trúc cơ bản của một test:
```js
import { test, expect } from "@playwright/test";

test("tên test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```
- `test`: khai báo test case. `page`: tab trình duyệt. `expect`: kiểm tra kết quả.
- Mọi thao tác với trình duyệt đều bất đồng bộ nên phải có `await`.

### 1.6 – 1.7 Tạo SSH key và đưa code lên GitHub
```bash
ssh-keygen -t ed25519 -C "you@example.com"   # tạo SSH key
cat ~/.ssh/id_ed25519.pub                    # copy public key, dán vào GitHub → Settings → SSH keys
ssh -T git@github.com                         # kiểm tra kết nối

git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```
- Chỉ chia sẻ **public key** (`.pub`), không bao giờ chia sẻ private key.
- `-u` lưu lại upstream, các lần sau chỉ cần `git push`.
