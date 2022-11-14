import {BurgerApi} from './burger-api';

export class BurgerApiService implements IService {
  private initiated = false;

  burgerApi: BurgerApi;

  constructor() {
    this.burgerApi = new BurgerApi();
  }

  init = async (): Promise<void> => {
    if (!this.initiated) {
      // your code ...

      this.initiated = true;
    }
  };
}
