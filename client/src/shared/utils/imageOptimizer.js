/**
 * Optimizes Cloudinary URLs by adding auto-format, auto-quality, and specific width.
 * @param {string} url - The original Cloudinary URL.
 * @param {number} width - The desired width for the image.
 * @returns {string} - The optimized URL.
 */
export const optimizeCloudinaryUrl = (url, width = 800) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Check if it's already optimized
  if (url.includes('f_auto,q_auto')) return url;
  
  // Insert optimization parameters after '/upload/'
  const optimizationParams = `f_auto,q_auto,w_${width}/`;
  return url.replace('/upload/', `/upload/${optimizationParams}`);
};
