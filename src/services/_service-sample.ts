export class ExampleService implements IService {
  private initiated = false;

  init = async (): Promise<void> => {
    if (!this.initiated) {
      // your code ...

      this.initiated = true;
    }
  };
}
