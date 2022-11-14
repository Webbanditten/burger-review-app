import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import Restaurant from '../utils/types/data/Restaurant';

export class RestaurantsStore implements IStore {
  restaurants: Restaurant[] = [];


  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: RestaurantsStore.name,
      properties: ['restaurants'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<RestaurantsStore>>(what: T, value: RestaurantsStore[T]) {
    (this as RestaurantsStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<RestaurantsStore>>(obj: Record<T, RestaurantsStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as RestaurantsStore[T]);
    }
  }

  // Hydration
  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
  };
}
