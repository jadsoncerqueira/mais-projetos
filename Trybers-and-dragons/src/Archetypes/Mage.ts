import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _archetypeInstances = 0;
  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage.addArchetype();
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances() {
    return this._archetypeInstances;
  }

  static addArchetype(): void {
    this._archetypeInstances += 1;
  }
}