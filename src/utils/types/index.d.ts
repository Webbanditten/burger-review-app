// `stores` layer
interface IStore {
  hydrate?: () => Promise<void>;
}

type StoreDefaultKeys = 'set' | 'setMany' | 'hydrate';
type StoreKeysOf<S> = keyof Omit<S, StoreDefaultKeys>;

// `services` layer
interface IService {
  init: () => Promise<void>;
}

// Design system
type ThemeColors = {
  textColor: string;
  bgColor: string;
  bg2Color: string;
  buttonTextColor: string;
};
