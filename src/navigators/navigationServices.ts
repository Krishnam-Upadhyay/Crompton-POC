import {
  NavigationContainerRefWithCurrent,
  ParamListBase,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef: NavigationContainerRefWithCurrent<ParamListBase> =
  createNavigationContainerRef();

export function globalNavigation(name: string, params: any = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
