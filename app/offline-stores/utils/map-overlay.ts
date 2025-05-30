// utils/map-overlay.ts

/**
 * HTML 오버레이 콘텐츠 생성
 */
export function generateOverlayContent(store: {
  storeCategory: string;
  name: string;
  roadAddress: string;
  distance: number;
}): string {
  return `
    <div class="custom-overlay">
      <div class="overlay-content">
        <div class="overlay-category">${store.storeCategory}</div>
        <div class="overlay-name">${store.name}</div>
        <div class="overlay-address">${store.roadAddress}</div>
        <div class="overlay-distance">${(store.distance / 1000).toFixed(1)}km</div>
        <button class="overlay-close-btn">×</button>
        <div class="overlay-detail-btn" style="margin-top:8px;cursor:pointer;color:#4F6EF7;text-align:right;">상세보기</div>
      </div>
      <div class="overlay-arrow"></div>
    </div>
  `;
}

/**
 * 오버레이 스타일 삽입
 */
export function injectOverlayStyles(): void {
  const existing = document.getElementById("custom-overlay-style");
  if (existing) return;
  const style = document.createElement("style");
  style.id = "custom-overlay-style";
  style.textContent = `
    .custom-overlay {
      position: relative;
      bottom: 85px;
      border-radius: 8px;
      float: left;
      max-width: 330px;
      word-wrap: break-word;
    }
    .overlay-content {
      padding: 10px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
    .overlay-category {
      display: inline-block;
      font-size: 11px;
      color: #4F6EF7;
      background: rgba(79, 110, 247, 0.1);
      padding: 2px 6px;
      border-radius: 10px;
      margin-bottom: 4px;
    }
    .overlay-name {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .overlay-address {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 240px;
    }
    .overlay-distance {
      font-size: 12px;
      color: #4F6EF7;
      font-weight: bold;
    }
    .overlay-close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: #999;
    }
    .overlay-arrow {
      position: absolute;
      bottom: -8px;
      left: 50%;
      margin-left: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
    }
  `;
  document.head.appendChild(style);
}
