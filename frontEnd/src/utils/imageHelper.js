/**
 * 图片加载工具函数
 * 用于解决Vue项目中@/assets路径的问题
 */

/**
 * 获取正确的图片URL
 * @param {string} path - 图片路径，如 '@/assets/images/projects/hot-air-balloon.jpg'
 * @returns {string} - 返回正确的图片URL
 */
export function getImageUrl(path) {
  if (!path) return '';
  
  // 如果是以http开头的外部URL，直接返回
  if (path.startsWith('http')) {
    return path;
  }
  
  try {
    // 处理以@/assets开头的路径
    if (path.startsWith('@/assets/')) {
      return `/src/assets/${path.slice(9)}`;
    }
    
    // 处理以@assets开头的路径 (新增的别名)
    if (path.startsWith('@assets/')) {
      return `/src/assets/${path.slice(8)}`;
    }
    
    // 处理以@images开头的路径 (新增的别名)
    if (path.startsWith('@images/')) {
      return `/src/assets/images/${path.slice(8)}`;
    }
    
    // 处理以/src开头的路径
    if (path.startsWith('/src/assets/')) {
      return path;
    }
  } catch (error) {
    console.error('图片路径处理错误:', path, error);
    // 错误时返回原路径
    return path;
  }
  
  // 其他情况直接返回原路径
  return path;
}

/**
 * 处理给定对象中的所有图片路径
 * @param {Object} obj - 包含图片路径的对象
 * @param {Array} imageKeys - 需要处理的图片属性名称数组，如 ['coverImage', 'avatar']
 * @returns {Object} - 返回处理后的对象
 */
export function processImageUrls(obj, imageKeys) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result = { ...obj };
  
  for (const key of imageKeys) {
    if (result[key]) {
      result[key] = getImageUrl(result[key]);
    }
  }
  
  return result;
}

/**
 * 处理数组中所有对象的图片路径
 * @param {Array} array - 对象数组
 * @param {Array} imageKeys - 需要处理的图片属性名称数组
 * @returns {Array} - 返回处理后的数组
 */
export function processArrayImageUrls(array, imageKeys) {
  if (!Array.isArray(array)) return array;
  
  return array.map(item => processImageUrls(item, imageKeys));
}

/**
 * 获取预加载的图片
 * @param {string} path - 图片路径
 * @returns {Promise<HTMLImageElement>} - 返回图片加载的Promise
 */
export function preloadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = getImageUrl(path);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export default {
  getImageUrl,
  processImageUrls,
  processArrayImageUrls,
  preloadImage
}; 