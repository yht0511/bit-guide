## 这是一个测试页面
<html>
<head>
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors'self' https://quirky-saturday-a6d.notion.site/">
  <style>
    .flower {
      position: fixed;
      pointer-events: none;
      opacity: 0;
      z-index: 1000;
      transform-origin: center;
    }
    
    @keyframes explode {
      0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 0.9;
      }
      70% {
        opacity: 0.8;
      }
      100% {
        transform: translate(var(--end-x), var(--end-y)) scale(0.5) rotate(var(--rotate));
        opacity: 0;
      }
    }    
  </style>
  
</head>
<body>
  
  <div style="width: 100%; height: 50%">
    <iframe src="https://quirky-saturday-a6d.notion.site/ebd/22818069493b807ba76cf1aa90fa7f15" width="100%" height="600" frameborder="0" allowfullscreen />
  </div>
      <script>
      
      // 点击生成小碎花效果（修复版）
      document.addEventListener('DOMContentLoaded', () => {
        // 定义小碎花的SVG路径
        const flowerSVGs = [
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3" fill="#4CAF50"/><circle cx="5" cy="7" r="2" fill="#81C784"/><circle cx="15" cy="7" r="2" fill="#81C784"/><circle cx="5" cy="13" r="2" fill="#81C784"/><circle cx="15" cy="13" r="2" fill="#81C784"/><circle cx="10" cy="4" r="2" fill="#81C784"/><circle cx="10" cy="16" r="2" fill="#81C784"/></svg>',
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="2.5" fill="#4CAF50"/><path d="M10,3 C14,3 16,7 16,10 C16,13 14,17 10,17 C6,17 4,13 4,10 C4,7 6,3 10,3 Z" fill="#A5D6A7"/><path d="M3,10 C3,14 7,16 10,16 C13,16 17,14 17,10 C17,6 13,4 10,4 C7,4 3,6 3,10 Z" fill="#A5D6A7"/></svg>',
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 C5.02943725,19 1,14.9705627 1,10 C1,5.02943725 5.02943725,1 10,1 Z" fill="#4CAF50"/><path d="M10,6 C12.7614237,6 15,8.23857625 15,11 C15,13.7614237 12.7614237,16 10,16 C7.23857625,16 5,13.7614237 5,11 C5,8.23857625 7.23857625,6 10,6 Z" fill="#81C784"/><circle cx="10" cy="10" r="3" fill="#A5D6A7"/></svg>'
        ];
      
        // 点击事件处理
        document.addEventListener('click', (e) => {
          // 获取相对于视口的坐标
          const x = e.clientX;
          const y = e.clientY;
          
          // 生成多个小碎花向四周炸开
          for (let i = 0; i < 8; i++) {
            // 随机选择一种花朵样式
            const randomFlower = flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];
            
            // 计算爆炸方向和距离
            const angle = (i / 8) * Math.PI * 2;
            const distance = 40 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            const rotate = (Math.random() * 360) + 'deg';
            
            // 创建花朵元素
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.left = `${x - 10}px`;
            flower.style.top = `${y - 10}px`;
            flower.style.width = `${10 + Math.random() * 10}px`;
            flower.style.height = `${10 + Math.random() * 10}px`;
            flower.style.setProperty('--end-x', `${endX}px`);
            flower.style.setProperty('--end-y', `${endY}px`);
            flower.style.setProperty('--rotate', rotate);
            flower.innerHTML = randomFlower;
            
            // 添加到文档中
            document.body.appendChild(flower);
            
            // 触发重排后应用动画
            setTimeout(() => {
              flower.style.opacity = '1';
              flower.style.animation = `explode ${0.8 + Math.random() * 0.5}s ease-out forwards`;
            }, 10);
            
            // 动画结束后移除元素
            setTimeout(() => {
              flower.remove();
            }, 1500);
          }
        });
      });    
         
      </script>
</body>
</html>
