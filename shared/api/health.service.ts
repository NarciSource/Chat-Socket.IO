export class HealthService {
  private _healthy = false;

  set healthy(status: boolean) {
    this._healthy = status;
  }

  get healthy(): boolean {
    return this._healthy;
  }
}

export const healthService = new HealthService();
