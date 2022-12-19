import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  constructor(
    private _player: Fighter,
    private monsters: (Monster | Fighter | SimpleFighter)[],
  ) {
    super(_player);
  }

  fight(): number {
    if (
      this._player.lifePoints > 0
      && this.monsters.every((el) => el.lifePoints > 0)
    ) {
      this.monsters.forEach((mosnter) => {
        this._player.attack(mosnter);
        mosnter.attack(this._player);
      });
    }

    if (this._player.lifePoints === -1) {
      return -1;
    }

    return 1;
  }
}