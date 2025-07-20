// AI助手配置
const githubRepoUrl = "https://github.com/yht0511/bit-guide/tree/main/docs";
const githubPagesUrl = "https://yht0511.github.io/bit-guide/";
const aiApiUrl ="http://101.200.185.84:8000/v1/chat/completions"; 
const wholeJsonUrl = "https://yht0511.github.io/bit-guide/whole.json"; // whole.json的URL
const timeout = 50000;

const config = {
  position: 'bottom-right',
  primaryColor: '#165DFF',
  bubbleSize: '50',
  width: '380px',
  height: '480px'
};

// 创建AI助手
function createAIWidget() {
  // 确保移动端视口设置正确
  if (isMobileDevice() && !document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }

  // 创建图标按钮
  const toggleButton = document.createElement('button');
  toggleButton.id = 'ai-toggle';
  toggleButton.className = `ai-toggle ${config.position}`;
  toggleButton.style.setProperty('--bubble-size', config.bubbleSize + 'px');
  toggleButton.style.setProperty('--primary-color', config.primaryColor);
  toggleButton.innerHTML = '<i class="fa fa-comments-o"></i>';
  
  // 创建对话框
  const chatBox = document.createElement('div');
  chatBox.id = 'ai-chat';
  chatBox.className = `ai-chat ${config.position}`;
  chatBox.style.setProperty('--chat-width', config.width);
  chatBox.style.setProperty('--chat-height', config.height);
  chatBox.style.setProperty('--primary-color', config.primaryColor);
  
  // 对话框头部
  const header = document.createElement('div');
  header.className = 'ai-header';
  header.innerHTML = `
    <div class="ai-header-left">
      <i class="fa fa-robot"></i>
      <h3>AI助手</h3>
    </div>
    <div class="ai-header-right">
      <button id="ai-fullscreen" class="ai-fullscreen" title="全屏">
        <i class="fa fa-expand"></i>
      </button>
      <button id="ai-close" class="ai-close" title="关闭">
        <i class="fa fa-times"></i>
      </button>
    </div>
  `;
  
  // 消息区域
  const messages = document.createElement('div');
  messages.id = 'ai-messages';
  messages.className = 'ai-messages';
  
  // 添加初始消息
  const initialMessage = document.createElement('div');
  initialMessage.className = 'ai-message ai-message-bot';
  initialMessage.innerHTML = `
    <div class="ai-avatar ai-avatar-bot">
      <i class="fa fa-robot"></i>
    </div>
    <div class="ai-message-content">
      <p>你好！我是AI助手，关于文档里的问题可以问我，我会尽力回答。有什么可以帮助你的吗？</p>
    </div>
  `;
  messages.appendChild(initialMessage);
  
  // 输入区域
  const inputArea = document.createElement('div');
  inputArea.className = 'ai-input-area';
  inputArea.innerHTML = `
    <div class="ai-input-container">
      <input id="ai-input" type="text" placeholder="输入问题..." class="ai-input">
      <button id="ai-send" class="ai-send">
        <i class="fa fa-paper-plane"></i>
      </button>
    </div>
  `;
  
  // 组装对话框
  chatBox.appendChild(header);
  chatBox.appendChild(messages);
  chatBox.appendChild(inputArea);
  
  document.body.appendChild(toggleButton);
  document.body.appendChild(chatBox);
  
  // 事件监听
  const inputField = document.getElementById('ai-input');
  const sendButton = document.getElementById('ai-send');
  const closeButton = document.getElementById('ai-close');
  const fullscreenButton = document.getElementById('ai-fullscreen');
  
  let isFullscreen = false;
  
  toggleButton.addEventListener('click', () => {
    chatBox.classList.toggle('ai-chat-visible');
    toggleButton.classList.toggle('ai-toggle-hidden');
  });
  
  closeButton.addEventListener('click', () => {
    if (isFullscreen) {
      exitFullscreen();
    }
    chatBox.classList.remove('ai-chat-visible');
    toggleButton.classList.remove('ai-toggle-hidden');
  });
  
  fullscreenButton.addEventListener('click', () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  });

  // 检测是否为移动设备
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  }
  
  // 检测是否为移动设备
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  }

  // 全屏功能
  function enterFullscreen() {
    isFullscreen = true;
    chatBox.classList.add('ai-chat-fullscreen');
    fullscreenButton.innerHTML = '<i class="fa fa-compress"></i>';
    fullscreenButton.title = '退出全屏';
    document.body.classList.add('ai-fullscreen-mode');
    
    // 移动端额外处理
    if (isMobileDevice()) {
      // 隐藏地址栏
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 100);
      
      // 阻止页面滚动
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // 添加防止滚动的事件监听
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('scroll', preventScroll, { passive: false });
      
      // 存储监听器以便后续移除
      chatBox._preventScroll = preventScroll;
    }
  }
  
  function exitFullscreen() {
    isFullscreen = false;
    chatBox.classList.remove('ai-chat-fullscreen');
    fullscreenButton.innerHTML = '<i class="fa fa-expand"></i>';
    fullscreenButton.title = '全屏';
    document.body.classList.remove('ai-fullscreen-mode');
    
    // 移动端恢复
    if (isMobileDevice()) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // 移除防止滚动的事件监听
      if (chatBox._preventScroll) {
        document.removeEventListener('touchmove', chatBox._preventScroll);
        document.removeEventListener('scroll', chatBox._preventScroll);
        delete chatBox._preventScroll;
      }
    }
  }
  
  // ESC键退出全屏
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      exitFullscreen();
    }
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
    userMessage.className = 'ai-message ai-message-user';
    userMessage.innerHTML = `
      <div class="ai-message-content">
        <p>${message}</p>
      </div>
      <div class="ai-avatar ai-avatar-user">
        <i class="fa fa-user"></i>
      </div>
    `;
    messages.appendChild(userMessage);
    
    inputField.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // 创建AI回复容器
    const aiResponse = document.createElement('div');
    aiResponse.className = 'ai-message ai-message-bot';
    aiResponse.innerHTML = `
      <div class="ai-avatar ai-avatar-bot">
        <i class="fa fa-robot"></i>
      </div>
      <div class="ai-message-content">
        <div class="ai-response-container">
          <div class="thinking-section">
            <div class="thinking-header">
              <i class="fa fa-brain"></i>
              <span>思考过程</span>
              <i class="fa fa-chevron-down thinking-toggle"></i>
            </div>
            <div class="thinking-content"></div>
          </div>
          <div class="ai-content">
            <div class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    messages.appendChild(aiResponse);
    messages.scrollTop = messages.scrollHeight;
    
    const contentDiv = aiResponse.querySelector('.ai-content');
    const thinkingSection = aiResponse.querySelector('.thinking-section');
    const thinkingContent = aiResponse.querySelector('.thinking-content');
    const thinkingHeader = aiResponse.querySelector('.thinking-header');
    const thinkingToggle = aiResponse.querySelector('.thinking-toggle');
    
    // 思考过程折叠/展开
    let isThinkingExpanded = true;
    thinkingHeader.addEventListener('click', () => {
      isThinkingExpanded = !isThinkingExpanded;
      thinkingSection.classList.toggle('thinking-collapsed', !isThinkingExpanded);
    });
    
    // 开始流式获取回答
    setTimeout(async () => {
      try {
        const typingIndicator = contentDiv.querySelector('.typing-indicator');
        if (typingIndicator) {
          typingIndicator.remove();
        }
        
        await answerwithtimeout(() => {
          return getAnswerWithLinksStreaming(message, githubRepoUrl, (data) => {
            try {
              if (data.type === 'reasoning') {
                thinkingSection.style.display = 'block';
                thinkingContent.textContent = data.content;
                thinkingContent.scrollTop = thinkingContent.scrollHeight;
                messages.scrollTop = messages.scrollHeight;
              } else if (data.type === 'content') {
                renderMarkdownContent(data.content, contentDiv);
                messages.scrollTop = messages.scrollHeight;
              }
            } catch (error) {
              console.warn('渲染内容失败:', error);
              if (data.type === 'content') {
                renderMarkdownContent(data.content, contentDiv);
              }
            }
          });
        });
        
      } catch (error) {
        console.error("流式获取回答失败：", error);
        contentDiv.innerHTML = `<p style="color: red;">出错了：${error.message}，请重试</p>`;
      }
    }, 300);
  }
}

// 设置回答超时函数 - 优化版
async function answerwithtimeout(asyncfunction) {
	const timeoutPromise = new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error("运行超时"));
		}, timeout);
	});
	try {
		const result = await Promise.race([asyncfunction(), timeoutPromise]);
		return result;
	} catch (error) {
		console.error("函数执行出错:", error);
		throw error;
	}
}

// 配置和渲染Markdown内容的函数
function renderMarkdownContent(content, targetElement) {
  if (typeof marked === 'undefined') {
    console.error('Marked库未加载，使用纯文本显示');
    targetElement.innerHTML = content.replace(/\n/g, '<br>');
    return;
  }

  try {
    // 配置marked选项
    marked.setOptions({
      gfm: true,           // 启用GitHub风格Markdown
      breaks: true,        // 支持换行
      sanitize: false,     // 允许HTML（小心XSS）
      smartLists: true,    // 智能列表
      smartypants: true,   // 智能标点
      tables: true,        // 启用表格支持
      headerIds: true,     // 自动生成标题ID
      mangle: false        // 不要混淆邮件地址
    });

    // 配置代码高亮（如果highlight.js可用）
    if (typeof hljs !== 'undefined') {
      marked.setOptions({
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
              console.warn('代码高亮失败:', err);
            }
          }
          return hljs.highlightAuto(code).value;
        }
      });
    }

    // 渲染markdown
    const html = marked.parse(content);
    targetElement.innerHTML = html;

    // 初始化代码高亮（如果还没有高亮）
    if (typeof hljs !== 'undefined') {
      targetElement.querySelectorAll('pre code').forEach((block) => {
        if (!block.classList.contains('hljs')) {
          hljs.highlightElement(block);
        }
      });
    }

    // 为外部链接添加target="_blank"
    targetElement.querySelectorAll('a[href^="http"]').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

  } catch (error) {
    console.error('Markdown渲染失败:', error);
    // 降级到纯文本
    targetElement.innerHTML = content.replace(/\n/g, '<br>');
  }
}

// 获取whole.json内容的函数
let wholeJsonCache = null;
async function getWholeJsonContent() {
  if (wholeJsonCache) {
    return wholeJsonCache;
  }
  
  try {
    const response = await fetch(wholeJsonUrl);
    if (!response.ok) {
      throw new Error(`获取whole.json失败: ${response.status}`);
    }
    const data = await response.json();
    wholeJsonCache = data;
    console.log(`✓ 已加载whole.json，包含${data.total_files}个文件`);
    return data;
  } catch (error) {
    console.error("获取whole.json失败:", error);
    throw error;
  }
}

// AI接口对接 - 流式版本 (支持思考过程和whole.json内容)
async function getAnswerWithLinksStreaming(userQuestion, githubRepoUrl, onChunk) {
  try {
    // 获取whole.json内容
    const wholeJsonData = await getWholeJsonContent();
    
    // 构建包含所有文档内容的上下文
    let documentContext = "以下是北理生活指南的所有文档内容：\n\n";
    
    Object.values(wholeJsonData.files).forEach(file => {
      documentContext += `## 文档：${file.title || file.path}\n`;
      if(file.url) documentContext += `链接：${file.url}\n`;
      documentContext += `内容：\n${file.content}\n\n---\n\n`;
    });
    
    const prompt = `你是北京理工大学生活指南的AI助手。基于以下完整的文档内容回答用户问题。

${documentContext}

用户问题：${userQuestion}

请根据上述文档内容准确回答用户的问题。回答要求：
1. 使用markdown格式
2. 基于文档内容给出准确、详细的回答
3. 在回答末尾列出相关的参考页面链接（格式：[页面标题](链接)）
4. 如果问题涉及多个方面，请综合相关文档内容回答
5. 如果文档中没有相关信息，请明确说明
6. 保持友好和有帮助的语调`;
    

    // 调用OpenAI API - 流式
    const response = await fetch(aiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-r1",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000,
        stream: true  // 启用流式响应
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API 错误:", errorData);
      throw new Error(`API 错误 (${response.status}): ${errorData}`);
    }

    // 处理流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullContent = '';
    let reasoningContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 保留不完整的行

        for (const line of lines) {
          const trimmedLine = line.trim();
          
          if (trimmedLine === '') continue;
          if (trimmedLine === 'data: [DONE]') break;
          if (!trimmedLine.startsWith('data: ')) continue;

          try {
            const jsonStr = trimmedLine.slice(6); // 移除 'data: ' 前缀
            const data = JSON.parse(jsonStr);
            
            const delta = data.choices?.[0]?.delta;
            
            // 处理思考过程
            if (delta?.reasoning_content) {
              reasoningContent += delta.reasoning_content;
              // 调用回调函数，更新思考过程
              if (onChunk) {
                onChunk({
                  type: 'reasoning',
                  content: reasoningContent,
                  fullContent: fullContent
                });
              }
            }
            
            // 处理正式回答
            if (delta?.content) {
              fullContent += delta.content;
              // 调用回调函数，更新正式回答
              if (onChunk) {
                onChunk({
                  type: 'content',
                  content: fullContent,
                  reasoning: reasoningContent
                });
              }
            }
          } catch (parseError) {
            console.warn('解析SSE数据失败:', parseError, trimmedLine);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return {
      content: fullContent,
      reasoning: reasoningContent
    };

  } catch (error) {
    console.error("获取回答失败：", error);
    throw error;
  }
}

// 初始化AI助手
(function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAIWidget);
  } else {
    createAIWidget();
  }
})();
		
		//动态加载link字体
		function loadNunitoFont() {
		            const link = document.createElement('link');
		            link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
		            link.rel = 'stylesheet';
		            link.type = 'text/css';
		            
		            // 字体加载完成后的回调
		            link.onload = function() {
		                console.log('Nunito字体加载完成');
		            };
		            
		            link.onerror = function() {
		                console.error('Nunito字体加载失败');
		            };
		            
		            document.head.appendChild(link);
		        }
		
		
		//AI助手样式
        const aiCssContent = `
		/* AI助手专用样式 */
		.typing-dot {
		    animation: typing 1.4s infinite ease-in-out;
		}
		
		.typing-dot:nth-child(1) { animation-delay: 0s; }
		.typing-dot:nth-child(2) { animation-delay: 0.2s; }
		.typing-dot:nth-child(3) { animation-delay: 0.4s; }
		
		@keyframes typing {
		    0%, 80%, 100% {
		        transform: scale(0.8);
		        opacity: 0.5;
		    }
		    40% {
		        transform: scale(1);
		        opacity: 1;
		    }
		}
		
		.ai-content {
		    animation: fadeIn 0.3s ease-in;
		}
		
		.thinking-content {
		    animation: fadeIn 0.3s ease-in;
		}
		
		.thinking-content::-webkit-scrollbar {
		    width: 6px;
		}
		
		.thinking-content::-webkit-scrollbar-track {
		    background: #f1f1f1;
		    border-radius: 3px;
		}
		
		.thinking-content::-webkit-scrollbar-thumb {
		    background: #c1c1c1;
		    border-radius: 3px;
		}
		
		.thinking-content::-webkit-scrollbar-thumb:hover {
		    background: #a8a8a8;
		}
		
		.thinking-toggle {
		    transition: transform 0.3s ease;
		}
		
		.thinking-header:hover {
		    background: linear-gradient(135deg, #f3f0ff 0%, #e8e3ff 100%) !important;
		    border-color: #d4c6ff !important;
		}
		
		@keyframes fadeIn {
		    from { opacity: 0; }
		    to { opacity: 1; }
		}
		
		/* 响应式调整 */
		@media (max-width: 480px) {
		    .thinking-content {
		        font-size: 0.8rem !important;
		        max-height: 150px !important;
		    }
		    
		    .thinking-header span {
		        font-size: 0.85rem !important;
		    }
		}
        `;

        //动态加载AI助手样式
        function loadAiCSS() {
            const style = document.createElement('style');
            style.textContent = aiCssContent;
            document.head.appendChild(style);
        }

        // 初始化AI助手
        (function init() {
            // 加载AI助手专用样式
            loadAiCSS();
            
            // 等待DOM加载完成后创建AI助手
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createAIWidget);
            } else {
                createAIWidget();
            }
        })();


		
		 
