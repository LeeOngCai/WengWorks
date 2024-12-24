// 访问计数器
function incrementVisitCount(pageType, itemId) {
    const storageKey = `visitCount_${pageType}_${itemId}`;
    let count = parseInt(localStorage.getItem(storageKey) || '0');
    count++;
    localStorage.setItem(storageKey, count.toString());
    updateHotContent();
}

// 更新热门内容
function updateHotContent() {
    const hotContent = {
        achievements: getHotItems('achievements'),
        projects: getHotItems('projects'),
        github: getHotItems('github')
    };
    localStorage.setItem('hotContent', JSON.stringify(hotContent));
}

// 获取某类型的热门项目
function getHotItems(pageType) {
    const items = [];
    // 从localStorage中获取所有访问计数
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`visitCount_${pageType}_`)) {
            const id = key.split('_')[2];
            const count = parseInt(localStorage.getItem(key));
            items.push({ id, count });
        }
    }
    
    // 按访问次数排序并返回前4个
    return items
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);
}

// 页面内容数据
const pageContent = {
    achievements: [
        { id: 'scholarship', title: "国家奖学金", description: "2023年获得国家奖学金" },
        { id: 'itsc', title: "ITSC国际会议最佳论文奖", description: "2023年在ITSC国际会议上获得最佳论文奖" },
        { id: 'phd', title: "同济大学优秀博士生", description: "2022年被评为同济大学优秀博士生" },
        { id: 'innovation', title: "学术创新奖", description: "2022年获得同济大学交通运输工程学院学术创新奖" }
    ],
    projects: [
        { id: 'microservice', title: "企业级微服务平台", description: "设计并实现了一个支持多租户的企业级微服务平台" },
        { id: 'realtime', title: "实时数据分析平台", description: "开发了一个高性能的实时数据分析平台" },
        { id: 'vue', title: "Vue组件库", description: "一个现代化的Vue3组件库，包含50+常用组件" },
        { id: 'react', title: "React Hooks工具集", description: "提供30+常用的自定义Hooks，提升开发效率" }
    ],
    github: [
        { id: 'website', title: "personal-website", description: "个人网站项目，使用HTML、TailwindCSS构建" },
        { id: 'notes', title: "study-notes", description: "学习笔记和代码示例集合" },
        { id: 'radar', title: "4D-Radar-3D-Detection-Survey", description: "自动驾驶中基于4D毫米波雷达的3D目标检测综述研究" },
        { id: 'calendar', title: "GitHub贡献日历", description: "查看GitHub上的贡献日历" }
    ]
}; 