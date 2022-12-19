export default abstract class Race {
  static _racesInstances = 0;
  constructor(private _name: string, private _dexterity: number) {
    Race.addRace();
  }

  get name(): string {
    return this._name;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  abstract get maxLifePoints(): number;

  static createdRacesInstances() {
    if (this._racesInstances === 0) {
      throw new Error('Not implemented');
    } else {
      return this._racesInstances;
    }
  }

  static addRace(): void {
    this._racesInstances += 1;
  }
}
