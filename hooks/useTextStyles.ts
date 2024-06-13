import { textStyles } from '@/constants/TextStyles';
import { useScale } from './useScale';

export function useTextStyles() {
  // const linkColor = useThemeColor({}, 'link');
  const scale = useScale() ?? 1.0;
  return textStyles(scale, 'color-primary-active');
}
