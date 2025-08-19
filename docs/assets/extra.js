// MathJax 配置 - 支持 LaTeX 数学公式
window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
    processEnvironments: true,
    tags: "ams",
    macros: {
      // 常用数学宏定义
      R: "\\mathbb{R}",
      Q: "\\mathbb{Q}",
      N: "\\mathbb{N}",
      Z: "\\mathbb{Z}",
      C: "\\mathbb{C}",
      eps: "\\varepsilon",
      phi: "\\varphi",
      implies: "\\Rightarrow",
      iff: "\\Leftrightarrow",
    },
  },
  svg: {
    fontCache: "global",
  },
  startup: {
    pageReady() {
      return MathJax.startup.defaultPageReady().then(function () {
        console.log("📐 MathJax LaTeX 支持已加载");
      });
    },
  },
};

//mermaid解析
// mermaid.initialize({ startOnLoad: true });

// 自定义JavaScript功能

// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 添加返回顶部按钮
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "↑";
  backToTopButton.className = "back-to-top";
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 90px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #c41e3a;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(backToTopButton);

  // 显示/隐藏返回顶部按钮
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // 返回顶部功能
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 为外部链接添加图标
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.querySelector("svg")) {
      link.style.display = "inline-flex";
      link.style.alignItems = "center";
      link.innerHTML +=
        ' <svg style="width: 14px; height: 14px; margin-left: 4px;" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>';
    }
  });

  // 添加复制代码功能
  document.querySelectorAll("pre code").forEach((block) => {
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.textContent = "复制";
    button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            font-size: 12px;
            background-color: rgba(255,255,255,0.8);
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1;
        `;

    const pre = block.parentNode;
    pre.style.position = "relative";
    pre.appendChild(button);

    button.addEventListener("click", function () {
      navigator.clipboard.writeText(block.textContent).then(function () {
        button.textContent = "已复制";
        setTimeout(function () {
          button.textContent = "复制";
        }, 2000);
      });
    });
  });

  // 添加图片点击放大功能
  document.querySelectorAll(".md-content img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      const modal = document.createElement("div");
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
            `;

      const modalImg = document.createElement("img");
      modalImg.src = this.src;
      modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            `;

      modal.appendChild(modalImg);
      document.body.appendChild(modal);

      modal.addEventListener("click", function () {
        document.body.removeChild(modal);
      });
    });
  });

  // 添加页面加载进度条
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background-color: #c41e3a;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // 为表格添加响应式滚动
  document.querySelectorAll("table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
            overflow-x: auto;
            margin: 1rem 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  console.log("🎓 北理生活指南加载完成！欢迎来到北京理工大学！");
});

// 点击生成小碎花效果
document.addEventListener("DOMContentLoaded", () => {
  // 定义小碎花的SVG路径
  const flowerSVGs = [
    '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3" fill="#4CAF50"/><circle cx="5" cy="7" r="2" fill="#81C784"/><circle cx="15" cy="7" r="2" fill="#81C784"/><circle cx="5" cy="13" r="2" fill="#81C784"/><circle cx="15" cy="13" r="2" fill="#81C784"/><circle cx="10" cy="4" r="2" fill="#81C784"/><circle cx="10" cy="16" r="2" fill="#81C784"/></svg>',
    '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2.5" fill="#4CAF50"/><path d="M10,3 C14,3 16,7 16,10 C16,13 14,17 10,17 C6,17 4,13 4,10 C4,7 6,3 10,3 Z" fill="#A5D6A7"/><path d="M3,10 C3,14 7,16 10,16 C13,16 17,14 17,10 C17,6 13,4 10,4 C7,4 3,6 3,10 Z" fill="#A5D6A7"/></svg>',
    '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 C5.02943725,19 1,14.9705627 1,10 C1,5.02943725 5.02943725,1 10,1 Z" fill="#4CAF50"/><path d="M10,6 C12.7614237,6 15,8.23857625 15,11 C15,13.7614237 12.7614237,16 10,16 C7.23857625,16 5,13.7614237 5,11 C5,8.23857625 7.23857625,6 10,6 Z" fill="#81C784"/><circle cx="10" cy="10" r="3" fill="#A5D6A7"/></svg>',
  ];

  // 点击事件处理
  document.addEventListener("click", (e) => {
    // 获取相对于视口的坐标
    const x = e.clientX;
    const y = e.clientY;

    // 生成多个小碎花向四周炸开
    for (let i = 0; i < 8; i++) {
      // 随机选择一种花朵样式
      const randomFlower =
        flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];

      // 计算爆炸方向和距离
      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      const rotate = Math.random() * 360 + "deg";

      // 创建花朵元素
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.left = `${x - 10}px`;
      flower.style.top = `${y - 10}px`;
      flower.style.width = `${10 + Math.random() * 10}px`;
      flower.style.height = `${10 + Math.random() * 10}px`;
      flower.style.setProperty("--end-x", `${endX}px`);
      flower.style.setProperty("--end-y", `${endY}px`);
      flower.style.setProperty("--rotate", rotate);
      flower.innerHTML = randomFlower;

      // 添加到文档中
      document.body.appendChild(flower);

      // 触发重排后应用动画
      setTimeout(() => {
        flower.style.opacity = "1";
        flower.style.animation = `explode ${
          0.8 + Math.random() * 0.5
        }s ease-out forwards`;
      }, 10);

      // 动画结束后移除元素
      setTimeout(() => {
        flower.remove();
      }, 1500);
    }
  });
});
