import Race from './Race';

export default class Halfling extends Race {
  static _racesInstances = 0;
  private _maxLifePoints: number;

  constructor(
    _name: string,
    _dexterity: number,
  ) {
    super(_name, _dexterity);
    this._maxLifePoints = 60;
    Halfling.addRace();
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

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