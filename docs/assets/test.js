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


//添加一个AI助手
    // AI助手配置
		const config = {
		  position: 'bottom-right', // 位置：bottom-right, bottom-left, top-right, top-left
		  primaryColor: '#165DFF',
		  bubbleSize: '50', // 图标大小(px)
		  width: '380px',
		  height: '480px'
		};
		
		// 创建AI助手
		function createAIWidget() {
		  // 创建主容器
		  const container = document.createElement('div');
		  container.id = 'ai-widget-container';
		  container.style.position = 'fixed';
		  container.style.zIndex = '9999';
		  
		  // 设置位置
		  switch(config.position) {
		    case 'bottom-right':
		      container.style.bottom = '24px';
		      container.style.right = '24px';
		      break;
		    case 'bottom-left':
		      container.style.bottom = '24px';
		      container.style.left = '24px';
		      break;
		    case 'top-right':
		      container.style.top = '24px';
		      container.style.right = '24px';
		      break;
		    case 'top-left':
		      container.style.top = '24px';
		      container.style.left = '24px';
		      break;
		  }
		  
		  // 创建图标按钮
		  const toggleButton = document.createElement('button');
		  toggleButton.id = 'ai-toggle';
		  toggleButton.className = 'fixed rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none';
		  toggleButton.style.width = `${config.bubbleSize}px`;
		  toggleButton.style.height = `${config.bubbleSize}px`;
		  toggleButton.style.backgroundColor = config.primaryColor;
		  toggleButton.style.color = 'white';
		  
		  // 设置按钮位置
		  if(config.position.includes('right')) {
		    toggleButton.style.right = '24px';
		  } else {
		    toggleButton.style.left = '24px';
		  }
		  
		  if(config.position.includes('bottom')) {
		    toggleButton.style.bottom = '24px';
		  } else {
		    toggleButton.style.top = '24px';
		  }
		  
		  // 添加图标
		  const icon = document.createElement('i');
		  icon.className = 'fa fa-comments-o text-xl';
		  toggleButton.appendChild(icon);
		  
		  // 创建对话框
		  const chatBox = document.createElement('div');
		  chatBox.id = 'ai-chat';
		  chatBox.className = 'bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300';
		  chatBox.style.width = config.width;
		  chatBox.style.height = config.height;
		  chatBox.style.transform = 'translateX(100%)';
		  chatBox.style.visibility = 'hidden';
		  chatBox.style.opacity = '0';
		  
		  // 设置对话框位置
		  if(config.position.includes('left')) {
		    chatBox.style.transform = 'translateX(-100%)';
		  }
		  
		  // 对话框头部
		  const header = document.createElement('div');
		  header.className = 'px-4 py-3 flex items-center justify-between';
		  header.style.backgroundColor = config.primaryColor;
		  header.style.color = 'white';
		  
		  const headerIcon = document.createElement('i');
		  headerIcon.className = 'fa fa-robot text-xl';
		  
		  const headerTitle = document.createElement('h3');
		  headerTitle.className = 'font-medium ml-2';
		  headerTitle.textContent = 'AI助手';
		  
		  const headerClose = document.createElement('button');
		  headerClose.id = 'ai-close';
		  headerClose.className = 'text-white hover:text-gray-200 focus:outline-none';
		  headerClose.innerHTML = '<i class="fa fa-times"></i>';
		  
		  const headerLeft = document.createElement('div');
		  headerLeft.className = 'flex items-center';
		  headerLeft.appendChild(headerIcon);
		  headerLeft.appendChild(headerTitle);
		  
		  header.appendChild(headerLeft);
		  header.appendChild(headerClose);
		  
		  // 消息区域
		  const messages = document.createElement('div');
		  messages.id = 'ai-messages';
		  messages.className = 'flex-1 p-4 overflow-y-auto bg-gray-50';
		  messages.style.overflowY = 'auto';
		  
		  // 添加初始消息
		  const initialMessage = document.createElement('div');
		  initialMessage.className = 'flex items-start mb-4';
		  initialMessage.innerHTML = `
		    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style="background-color: ${config.primaryColor}">
		      <i class="fa fa-robot"></i>
		    </div>
		    <div class="ml-2 bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
		      <p class="text-gray-800">你好！我是AI助手，有什么可以帮助你的吗？</p>
		    </div>
		  `;
		  messages.appendChild(initialMessage);
		  
		  // 输入区域
		  const inputArea = document.createElement('div');
		  inputArea.className = 'p-3 border-t border-gray-200 bg-white';
		  
		  const inputContainer = document.createElement('div');
		  inputContainer.className = 'flex items-center space-x-2';
		  
		  const inputField = document.createElement('input');
		  inputField.id = 'ai-input';
		  inputField.type = 'text';
		  inputField.placeholder = '输入问题...';
		  inputField.className = 'flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none';
		  
		  const sendButton = document.createElement('button');
		  sendButton.id = 'ai-send';
		  sendButton.className = 'rounded-lg p-2 transition-colors';
		  sendButton.style.backgroundColor = config.primaryColor;
		  sendButton.style.color = 'white';
		  sendButton.innerHTML = '<i class="fa fa-paper-plane"></i>';
		  
		  inputContainer.appendChild(inputField);
		  inputContainer.appendChild(sendButton);
		  inputArea.appendChild(inputContainer);
		  
		  // 组装对话框
		  chatBox.appendChild(header);
		  chatBox.appendChild(messages);
		  chatBox.appendChild(inputArea);
		  
		  // 添加到容器
		  container.appendChild(toggleButton);
		  container.appendChild(chatBox);
		  
		  // 添加到文档
		  document.body.appendChild(container);
		  
		  // 添加交互功能
		  toggleButton.addEventListener('click', () => {
		    if(chatBox.style.visibility === 'hidden') {
		      chatBox.style.transform = config.position.includes('left') ? 'translateX(0)' : 'translateX(0)';
		      chatBox.style.visibility = 'visible';
		      chatBox.style.opacity = '1';
		      toggleButton.style.transform = 'scale(0)';
		    } else {
		      chatBox.style.transform = config.position.includes('left') ? 'translateX(-100%)' : 'translateX(100%)';
		      chatBox.style.visibility = 'hidden';
		      chatBox.style.opacity = '0';
		      toggleButton.style.transform = 'scale(1)';
		    }
		  });
		  
		  headerClose.addEventListener('click', () => {
		    chatBox.style.transform = config.position.includes('left') ? 'translateX(-100%)' : 'translateX(100%)';
		    chatBox.style.visibility = 'hidden';
		    chatBox.style.opacity = '0';
		    toggleButton.style.transform = 'scale(1)';
		  });
		  
		  sendButton.addEventListener('click', () => sendMessage());
		  inputField.addEventListener('keypress', (e) => {
		    if(e.key === 'Enter') sendMessage();
		  });
		  
		  // 发送消息函数
		  function sendMessage() {
		    const message = inputField.value.trim();
		    if(!message) return;
		    
		    // 添加用户消息
		    const userMessage = document.createElement('div');
		    userMessage.className = 'flex items-start justify-end mb-4';
		    userMessage.innerHTML = `
		      <div class="mr-2 rounded-lg rounded-tr-none p-3 shadow-sm max-w-[80%]" style="background-color: ${config.primaryColor}; color: white">
		        <p>${message}</p>
		      </div>
		      <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
		        <i class="fa fa-user"></i>
		      </div>
		    `;
		    messages.appendChild(userMessage);
		    
		    // 清空输入框
		    inputField.value = '';
		    
		    // 滚动到底部
		    messages.scrollTop = messages.scrollHeight;
		    
		    // 模拟AI回复
		    setTimeout(() => {
		      const aiResponse = document.createElement('div');
		      aiResponse.className = 'flex items-start mb-4';
		      aiResponse.innerHTML = `
		        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style="background-color: ${config.primaryColor}">
		          <i class="fa fa-robot"></i>
		        </div>
		        <div class="ml-2 bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
		          <p class="text-gray-800">感谢你的提问！我是一个演示用的AI助手，目前还不能真正理解你的问题。这是一个示例回答。</p>
		        </div>
		      `;
		      messages.appendChild(aiResponse);
		      messages.scrollTop = messages.scrollHeight;
		    }, 800);
		  }
		}
		
		// 初始化AI助手
		document.addEventListener('DOMContentLoaded', () => {
		  createAIWidget();
		});
