import {BurgerApi} from './burger-api';

export class BurgerApiService implements IService {
  private initiated = false;

  burgerApi: BurgerApi;

  constructor() {
    this.burgerApi = new BurgerApi();
  }

  init = async (): PVoid => {
    if (!this.initiated) {
      // your code ...

      this.initiated = true;
    }
  };
}
