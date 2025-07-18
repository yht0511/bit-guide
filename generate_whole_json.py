#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
聚合docs目录下所有markdown文件到whole.json
"""

import os
import json
import re
from pathlib import Path
from urllib.parse import quote

def generate_github_pages_url(file_path, base_url="https://yht0511.github.io/bit-guide/"):
    """
    生成GitHub Pages的访问链接
    """
    # 移除docs/前缀，转换为相对路径
    relative_path = file_path.replace('docs/', '', 1)

    return base_url + relative_path

def extract_title_from_content(content):
    """
    从markdown内容中提取标题
    """
    lines = content.strip().split('\n')
    
    # 查找第一个h1标题
    for line in lines:
        line = line.strip()
        if line.startswith('# '):
            return line[2:].strip()
    
    return None

def process_markdown_files(docs_dir="docs"):
    """
    处理docs目录下的所有markdown文件
    """
    result = {}
    docs_path = Path(docs_dir)
    
    if not docs_path.exists():
        print(f"警告: {docs_dir} 目录不存在")
        return result
    
    # 遍历所有markdown文件
    for md_file in docs_path.rglob("*.md"):
        try:
            # 读取文件内容
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 获取相对于docs的路径
            relative_path = str(md_file.relative_to(docs_path.parent))
            
            # 生成GitHub Pages链接
            github_pages_url = generate_github_pages_url(relative_path)
            
            # 提取标题
            title = extract_title_from_content(content)
            
            # 创建文件信息
            file_info = {
                "title": title,
                "path": relative_path,
                # "url": github_pages_url,
                "content": content
            }
            
            # 使用相对路径作为key
            result[relative_path] = file_info
            
            print(f"✓ 处理文件: {relative_path}")
            
        except Exception as e:
            print(f"✗ 处理文件失败 {md_file}: {e}")
    
    return result

def generate_whole_json(output_file="whole.json", docs_dir="docs"):
    """
    生成whole.json文件
    """
    print("开始聚合markdown文件...")
    
    # 处理所有markdown文件
    files_data = process_markdown_files(docs_dir)
    
    # 创建最终的JSON结构
    whole_data = {
        "generated_at": "",  # 将由GitHub Actions填充时间戳
        "repository": "yht0511/bit-guide",
        "base_url": "https://yht0511.github.io/bit-guide/",
        "total_files": len(files_data),
        "files": files_data
    }
    
    # 写入JSON文件
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(whole_data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ 成功生成 {output_file}")
        print(f"✓ 共处理 {len(files_data)} 个markdown文件")
        
        return True
        
    except Exception as e:
        print(f"✗ 生成JSON文件失败: {e}")
        return False

if __name__ == "__main__":
    import sys
    from datetime import datetime, timezone
    
    # 获取命令行参数
    docs_dir = sys.argv[1] if len(sys.argv) > 1 else "docs"
    output_file = sys.argv[2] if len(sys.argv) > 2 else "whole.json"
    
    print(f"输入目录: {docs_dir}")
    print(f"输出文件: {output_file}")
    
    # 生成JSON文件
    success = generate_whole_json(output_file, docs_dir)
    
    if success:
        # 添加时间戳
        try:
            with open(output_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            data["generated_at"] = datetime.now(timezone.utc).isoformat()
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            print(f"✓ 已添加时间戳: {data['generated_at']}")
            
        except Exception as e:
            print(f"✗ 添加时间戳失败: {e}")
    
    sys.exit(0 if success else 1)
