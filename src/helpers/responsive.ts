import { Dimensions, Platform } from 'react-native';

export const { width, height } = Dimensions.get('screen');

// Iphone X/XS/11 Pro as base design
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const WIDTH = width > height ? height : width;
const HEIGHT = width > height ? width : height;

const scale = (size: number) => {
  const ratio = WIDTH / DESIGN_WIDTH;
  return size * ratio;
};

const verticalScale = (size: number) => {
  const ratio = HEIGHT / DESIGN_HEIGHT;
  return size * ratio;
};

const moderateScale = (size: number, factor: number = 0.5) => {
  return size + (scale(size) - size) * factor;
};

// Enhanced scaling for better cross-platform consistency
const platformScale = (size: number) => {
  const baseScale = scale(size);
  // Apply platform-specific adjustments
  if (Platform.OS === 'android') {
    // Slightly reduce size on Android for better visual consistency
    return baseScale * 0.95;
  }
  return baseScale;
};

const platformVerticalScale = (size: number) => {
  const baseScale = verticalScale(size);
  // Apply platform-specific adjustments
  if (Platform.OS === 'android') {
    // Slightly reduce vertical spacing on Android
    return baseScale * 0.9;
  }
  return baseScale;
};

/**
 *
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 * 
 * getSize.ps(10) Platform-aware responsive by width screen.
 * 
 * getSize.pv(10) Platform-aware responsive by height screen.
 * */
export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
  ps: platformScale,
  pv: platformVerticalScale,
};

export const isSmallDevice = () => {
  if (width <= 375) {
    return true;
  }
  return false;
};

export const isTablet = () => {
  return width >= 768;
};

export const getDeviceType = () => {
  if (isTablet()) return 'tablet';
  if (isSmallDevice()) return 'small';
  return 'normal';
};
