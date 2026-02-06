import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas'; 
import './App.css';

// ==========================================
// 1. 定义图案样式库 
// ==========================================
const PATTERNS = {
  'pat-1': { backgroundColor: '#fff', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Crect width='6' height='6' fill='white'/%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%234b5563'/%3E%3C/svg%3E")`, backgroundSize: '6px 6px' },
  'pat-2': { backgroundImage: 'linear-gradient(45deg, #9ca3af 25%, transparent 25%, transparent 75%, #9ca3af 75%, #9ca3af), linear-gradient(45deg, #9ca3af 25%, transparent 25%, transparent 75%, #9ca3af 75%, #9ca3af)', backgroundPosition: '0 0, 3px 3px', backgroundSize: '6px 6px', backgroundColor: '#fff' },
  'pat-3': { backgroundImage: 'linear-gradient(45deg, #6b7280 25%, transparent 25%, transparent 75%, #6b7280 75%, #6b7280), linear-gradient(45deg, #6b7280 25%, transparent 25%, transparent 75%, #6b7280 75%, #6b7280)', backgroundPosition: '0 0, 6px 6px', backgroundSize: '12px 12px', backgroundColor: '#fff' },
  'pat-4': { backgroundImage: 'linear-gradient(0deg, #6b7280 20%, transparent 20%)', backgroundSize: '100% 4px', backgroundColor: '#fff' },
  'pat-5': { backgroundImage: 'linear-gradient(90deg, #6b7280 20%, transparent 20%)', backgroundSize: '4px 100%', backgroundColor: '#fff' },
  'pat-6': { backgroundImage: 'linear-gradient(45deg, #6b7280 25%, transparent 25%, transparent 50%, #6b7280 50%, #6b7280 75%, transparent 75%, transparent)', backgroundSize: '6px 6px', backgroundColor: '#fff' },
  'pat-7': { backgroundImage: 'linear-gradient(-45deg, #6b7280 25%, transparent 25%, transparent 50%, #6b7280 50%, #6b7280 75%, transparent 75%, transparent)', backgroundSize: '6px 6px', backgroundColor: '#fff' },
  'pat-8': { backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)', backgroundSize: '6px 6px', backgroundColor: '#fff' },
  'pat-9': { backgroundImage: 'linear-gradient(45deg, #9ca3af 25%, transparent 25%, transparent 75%, #9ca3af 75%, #9ca3af), linear-gradient(-45deg, #9ca3af 25%, transparent 25%, transparent 75%, #9ca3af 75%, #9ca3af)', backgroundPosition: '0 0, 4px 0', backgroundSize: '8px 8px', backgroundColor: '#fff' },
  'pat-10': { backgroundImage: 'linear-gradient(45deg, #374151 25%, transparent 25%, transparent 50%, #374151 50%, #374151 75%, transparent 75%, transparent)', backgroundSize: '8px 8px', backgroundColor: '#fff' },
  'pat-11': { backgroundImage: 'linear-gradient(-45deg, #374151 25%, transparent 25%, transparent 50%, #374151 50%, #374151 75%, transparent 75%, transparent)', backgroundSize: '8px 8px', backgroundColor: '#fff' },
  'pat-12': { backgroundImage: 'linear-gradient(90deg, #374151 33%, transparent 33%)', backgroundSize: '6px 100%', backgroundColor: '#fff' },
  'pat-13': { backgroundImage: 'linear-gradient(0deg, #374151 33%, transparent 33%)', backgroundSize: '100% 6px', backgroundColor: '#fff' },
  'pat-14': { backgroundImage: 'linear-gradient(#4b5563 2px, transparent 2px), linear-gradient(90deg, #4b5563 2px, transparent 2px)', backgroundSize: '8px 8px', backgroundColor: '#fff' },
  'pat-15': { backgroundImage: `linear-gradient(45deg, #4b5563 25%, transparent 25%, transparent 50%, #4b5563 50%, #4b5563 75%, transparent 75%, transparent), linear-gradient(-45deg, #4b5563 25%, transparent 25%, transparent 50%, #4b5563 50%, #4b5563 75%, transparent 75%, transparent)`, backgroundSize: '8px 8px', backgroundColor: '#fff' },
  'pat-16': { backgroundColor: '#fff', backgroundImage: `linear-gradient(335deg, #374151 12px, transparent 12px), linear-gradient(155deg, #374151 12px, transparent 12px), linear-gradient(335deg, #374151 12px, transparent 12px), linear-gradient(155deg, #374151 12px, transparent 12px)`, backgroundSize: '30px 30px', backgroundPosition: '0px 2px, 2px 15px, 15px 15px, 17px 2px' },
  'pat-17': { backgroundImage: 'linear-gradient(0deg, #9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)', backgroundSize: '10px 5px', backgroundColor: '#f3f4f6' },
  'pat-18': { backgroundColor: '#fff', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M0 10 Q5 0 10 10 T20 10' fill='none' stroke='%234b5563' stroke-width='2'/%3E%3Cpath d='M0 20 Q5 10 10 20 T20 20' fill='none' stroke='%234b5563' stroke-width='2'/%3E%3C/svg%3E")`, backgroundSize: '12px 12px' },
  'pat-19': { backgroundColor: '#fff', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='8' height='8' fill='white'/%3E%3Ccircle cx='4' cy='4' r='3' fill='none' stroke='%23374151' stroke-width='1'/%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23374151'/%3E%3C/svg%3E")`, backgroundSize: '8px 8px' }
};

// ==========================================
// 2. 辅助函数
// ==========================================
const getWellStyle = (colorValue, isSelected = false) => {
  const baseStyle = { borderColor: '#d1d5db', color: '#4b5563' };
  if (isSelected) {
    return { ...baseStyle, backgroundColor: '#dbeafe', borderColor: '#3b82f6', transform: 'scale(0.9)' };
  }
  if (PATTERNS[colorValue]) {
    return { ...baseStyle, ...PATTERNS[colorValue], color: '#000', borderColor: '#666' };
  }
  return {
    ...baseStyle,
    backgroundColor: colorValue,
    color: (colorValue === '#000000') ? '#fff' : '#4b5563',
    borderColor: (colorValue !== '#ffffff') ? colorValue : '#d1d5db'
  };
};

const generateWellsForSize = (size) => {
  const rows = size === 96 ? 8 : (size === 48 ? 6 : (size === 24 ? 4 : (size === 12 ? 3 : 2)));
  const cols = size === 96 ? 12 : (size === 48 ? 8 : (size === 24 ? 6 : (size === 12 ? 4 : 3)));
  
  const newWells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rowLabel = String.fromCharCode(65 + r);
      const colLabel = c + 1;
      newWells.push({
        id: `${rowLabel}${colLabel}`,
        label: '', 
        color: '#ffffff', 
        status: 'empty' 
      });
    }
  }
  return newWells;
};

const loadInitialStore = () => {
  const savedData = localStorage.getItem('plateAssistantData');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error("读取存档失败，重置数据", e);
    }
  }
  return {
    6: generateWellsForSize(6),
    12: generateWellsForSize(12),
    24: generateWellsForSize(24),
    48: generateWellsForSize(48),
    96: generateWellsForSize(96),
  };
};

// ==========================================
// 3. 主组件 App
// ==========================================
function App() {
  const [format, setFormat] = useState(96);
  const [plateStore, setPlateStore] = useState(loadInitialStore);
  const currentWells = plateStore[format];
  
  const [isSelecting, setIsSelecting] = useState(false); 
  const [selectedWells, setSelectedWells] = useState([]); 
  const [showLegend, setShowLegend] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ name: '', color: '#3b82f6' });
  
  // 🔥 新增状态：记录正在编辑的分组名称（如果是 null，说明是普通的新建模式）
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem('plateAssistantData', JSON.stringify(plateStore));
  }, [plateStore]);

  const handleMouseDown = (id) => {
    setIsSelecting(true);
    setSelectedWells([id]);
  };

  const handleMouseEnter = (id) => {
    if (isSelecting && !selectedWells.includes(id)) {
      setSelectedWells(prev => [...prev, id]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (selectedWells.length > 0) {
      // 框选时，视为“新建标记”，清空编辑状态
      setEditingGroup(null);
      setModalData({ name: '', color: '#3b82f6' }); 
      setShowModal(true);
    }
  };

  // 🔥 方案一核心：点击“全局统计”或“图例”时触发
  const handleStatClick = (name, color) => {
    setEditingGroup(name); // 标记：我们正在编辑这个组
    setModalData({ name: name, color: color }); // 自动回填数据
    setShowModal(true);
  };

  const applySettings = () => {
    if (!modalData.name) {
      alert("请输入分组名称！");
      return;
    }

    const newWells = currentWells.map(well => {
      // 🟢 逻辑分支 A：正在编辑已有分组 (修改颜色或改名)
      if (editingGroup) {
        // 只要是属于这个组的孔，统统更新
        if (well.label === editingGroup && well.status === 'filled') {
          return {
            ...well,
            color: modalData.color,
            label: modalData.name // 允许改名
          };
        }
        return well;
      }
      
      // 🔵 逻辑分支 B：普通框选新标记
      if (selectedWells.includes(well.id)) {
        return { 
          ...well, 
          color: modalData.color, 
          label: modalData.name,
          status: 'filled'
        };
      }
      return well;
    });

    setPlateStore(prev => ({ ...prev, [format]: newWells }));
    setShowModal(false);
    setSelectedWells([]);
    setEditingGroup(null); // 操作完成后，退出编辑模式
  };

  const cancelSelection = () => {
    setShowModal(false);
    setSelectedWells([]);
    setEditingGroup(null);
  };

  const clearCurrentCanvas = () => {
    if(window.confirm(`确定要清空当前的 ${format} 孔板吗？`)) {
      setPlateStore(prev => ({
        ...prev,
        [format]: generateWellsForSize(format)
      }));
    }
  };

  const handleExportImage = async () => {
    const element = document.querySelector('.plate-card'); 
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 3, backgroundColor: '#ffffff' });
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `plate-${format}-layout.png`; 
      link.click();
    } catch (error) {
      console.error('导出失败:', error);
      alert('图片导出失败，请重试。');
    }
  };

  const getGridCols = () => {
    if (format === 96) return 12;
    if (format === 48) return 8;
    if (format === 24) return 6;
    if (format === 12) return 4;
    return 3; 
  };

  const getGlobalLegendData = () => {
    const stats = {};
    Object.values(plateStore).forEach(wells => {
      wells.forEach(well => {
        if (well.status === 'filled') {
          const key = well.label;
          if (!stats[key]) { 
            stats[key] = { color: well.color, count: 0 }; 
          }
          stats[key].count += 1;
        }
      });
    });
    return Object.entries(stats);
  };

  const legendList = getGlobalLegendData();
  let legendGridStyle = { gridTemplateColumns: 'repeat(4, 1fr)' }; 

  const colsCount = getGridCols();
  const rowsCount = currentWells.length / colsCount;
  const colLabels = Array.from({ length: colsCount }, (_, i) => i + 1);
  const rowLabels = Array.from({ length: rowsCount }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="app-container" onMouseUp={() => setIsSelecting(false)}>
      <header className="header">
        <h1>孔板标记小工具 (Microplate Marking Tool)</h1> 
        <div className="header-actions">
           <label className="checkbox-label">
             <input type="checkbox" checked={showLegend} onChange={(e) => setShowLegend(e.target.checked)} />
             导出含图例
           </label>
           <button className="btn btn-primary" onClick={handleExportImage}>
             📷 导出图片
           </button>
        </div>
      </header>

      <div className="main-area">
        <div className="canvas-wrapper">
          
          <div className="toolbar">
            {[6, 12, 24, 48, 96].map(size => (
              <button key={size} className={`seg-btn ${format === size ? 'active' : ''}`} onClick={() => setFormat(size)}>
                {size} 孔
              </button>
            ))}
          </div>

          <div className="plate-card">
            <div className="plate-header-info">
              <h3>{format} Well Plate</h3>
            </div>

            <div className="plate-outer-shell">
              <div className="plate-col-labels" style={{ gridTemplateColumns: `repeat(${colsCount}, 1fr)` }}>
                {colLabels.map(label => (
                  <div key={label} className="label-cell">{label}</div>
                ))}
              </div>

              <div className="plate-body-flex">
                <div className="plate-row-labels">
                  {rowLabels.map(label => (
                    <div key={label} className="label-cell">
                      {label}
                    </div>
                  ))}
                </div>

                <div className="plate-grid-container" style={{ 
                  gridTemplateColumns: `repeat(${colsCount}, 1fr)`,
                  gridTemplateRows: `repeat(${rowsCount}, 1fr)` 
                }}>
                  {currentWells.map((well) => {
                    const isSelected = selectedWells.includes(well.id);
                    const displayText = well.status === 'filled' ? well.label.slice(0, 3) : well.id;
                    const wellStyle = getWellStyle(well.color, isSelected);

                    return (
                      <div
                        key={well.id}
                        className={`well ${isSelected ? 'temp-selected' : ''}`}
                        style={wellStyle}
                        onMouseDown={() => handleMouseDown(well.id)}
                        onMouseEnter={() => handleMouseEnter(well.id)}
                        onMouseUp={handleMouseUp}
                        title={`孔位: ${well.id}\n名称: ${well.label || '未命名'}`}
                      >
                        <span className="well-text" style={{ 
                          color: (well.color === '#000000' && !PATTERNS[well.color]) ? '#fff' : '#000',
                          textShadow: PATTERNS[well.color] ? '0 0 2px #fff, 0 0 2px #fff' : 'none',
                          opacity: well.status === 'filled' ? 1 : 0.4
                        }}>
                          {displayText}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {showLegend && legendList.length > 0 && (
              <div className="plate-legend-wrapper">
                <div className="legend-title" style={{marginBottom: '10px', fontWeight: 'bold'}}>图例</div>
                <div className="legend-grid" style={legendGridStyle}>
                  {legendList.map(([name, data]) => {
                    const legendDotStyle = PATTERNS[data.color] 
                      ? { ...PATTERNS[data.color], border: '1px solid #999' } 
                      : { backgroundColor: data.color };

                    return (
                      // 🔥 新增：点击事件绑定
                      <div key={name} className="legend-item" 
                           onClick={() => handleStatClick(name, data.color)}
                           title="点击编辑此分组">
                        <div className="legend-left">
                          <span className="legend-dot" style={legendDotStyle}></span>
                          <span className="legend-label">{name}</span>
                        </div>
                        <span className="legend-count">{data.count} Wells</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{marginTop: '20px', textAlign: 'right', width: '100%', fontSize: '10px', color: '#e5e7eb'}}>
               Microplate Marking Tool
            </div>
          </div>
        </div>

        <div className="side-panel">
          <div className="panel-header">
            <h3>📊 全局统计</h3>
            <span className="badge">{legendList.length} 组</span>
          </div>

          <div className="stats-container">
            {legendList.length === 0 ? (
              <div className="empty-state">
                <p>暂无数据</p>
                <span>请框选左侧孔位进行标记</span>
              </div>
            ) : (
              <div className="stats-list-vertical">
                {legendList.map(([name, data]) => {
                   const legendDotStyle = PATTERNS[data.color] 
                      ? { ...PATTERNS[data.color], border: '1px solid #999' } 
                      : { backgroundColor: data.color };

                   return (
                    // 🔥 新增：点击事件绑定
                    <div key={name} className="stat-row" 
                         onClick={() => handleStatClick(name, data.color)}
                         title="点击编辑此分组">
                      <div className="stat-info">
                        <span className="stat-color-dot" style={legendDotStyle}></span>
                        <span className="stat-name">{name}</span>
                      </div>
                      <span className="stat-count">{data.count} 孔</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="panel-footer">
            <button className="btn-block btn-danger-outline" onClick={clearCurrentCanvas}>
              🗑️ 清空当前孔板
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '360px' }}>
            {/* 动态显示标题，提示用户当前是在编辑模式 */}
            <h3>{editingGroup ? '✏️ 编辑分组' : '📝 标记区域'}</h3>
            <p className="modal-desc">
              {editingGroup 
                ? <span>正在修改 <strong>{editingGroup}</strong> 组 (包含 {legendList.find(i => i[0]===editingGroup)?.[1].count || 0} 个孔)</span>
                : <span>已选中 <strong>{selectedWells.length}</strong> 个孔位</span>
              }
            </p>
            <div className="form-group">
              <label>分组名称</label>
              <input autoFocus type="text" placeholder="例如：Control" value={modalData.name} onChange={(e) => setModalData({...modalData, name: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && applySettings()} />
            </div>
            
            <div className="form-group">
              <label>标记样式</label>
              
              <div style={{fontSize:'12px', color:'#999', marginBottom:'6px'}}>🎨 常用纯色</div>
              <div className="color-palette" style={{marginBottom: '16px'}}>
                {['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#64748b', '#000000'].map(c => (
                  <div key={c} className={`color-dot ${modalData.color === c ? 'active' : ''}`} style={{ backgroundColor: c }} onClick={() => setModalData({...modalData, color: c})} />
                ))}
              </div>

              <div style={{fontSize:'12px', color:'#999', marginBottom:'6px'}}>🏁 黑白纹理 (19种)</div>
              <div className="color-palette" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {Object.keys(PATTERNS).map(patKey => (
                  <div 
                    key={patKey} 
                    className={`color-dot ${modalData.color === patKey ? 'active' : ''}`} 
                    style={{ ...PATTERNS[patKey], border: '1px solid #999', width: '30px', height: '30px' }} 
                    onClick={() => setModalData({...modalData, color: patKey})} 
                  />
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={cancelSelection}>取消</button>
              <button className="btn btn-primary" onClick={applySettings}>确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;