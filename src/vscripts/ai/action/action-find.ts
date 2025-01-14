export class ActionFind {
  // Find Enemy
  static FindEnemyHeroes(self: CDOTA_BaseNPC_Hero, radius: number): CDOTA_BaseNPC[] {
    const enemies = this.FindEnemies(self, radius, UnitTargetType.HERO);

    return enemies;
  }

  static FindEnemyCreeps(self: CDOTA_BaseNPC_Hero, radius: number): CDOTA_BaseNPC[] {
    const enemies = this.FindEnemies(self, radius, UnitTargetType.CREEP);

    return enemies;
  }

  static FindEnemyBuildings(self: CDOTA_BaseNPC_Hero, radius: number): CDOTA_BaseNPC[] {
    const enemies = this.FindEnemies(self, radius, UnitTargetType.BUILDING);

    return enemies;
  }

  static FindEnemyBuildingsInvulnerable(self: CDOTA_BaseNPC_Hero, radius: number): CDOTA_BaseNPC[] {
    const enemies = this.FindEnemies(
      self,
      radius,
      UnitTargetType.BUILDING,
      UnitTargetFlags.INVULNERABLE, // 无敌
    );

    return enemies;
  }

  static FindEnemies(
    self: CDOTA_BaseNPC_Hero,
    radius: number,
    typeFilter: UnitTargetType,
    flagFilterExtra?: UnitTargetFlags,
    order = FindOrder.CLOSEST,
  ): CDOTA_BaseNPC[] {
    let flagFilter =
      UnitTargetFlags.FOW_VISIBLE + // 战争迷雾
      UnitTargetFlags.NO_INVIS; // 非隐身

    if (flagFilterExtra) {
      flagFilter = flagFilter + flagFilterExtra;
    }
    const enemies = this.Find(self, radius, UnitTargetTeam.ENEMY, typeFilter, flagFilter, order);

    return enemies;
  }

  // Find Team
  static FindTeamBuildingsInvulnerable(self: CDOTA_BaseNPC_Hero, radius: number): CDOTA_BaseNPC[] {
    const teams = this.FindTeams(
      self,
      radius,
      UnitTargetType.BUILDING,
      UnitTargetFlags.INVULNERABLE, // 无敌
    );

    return teams;
  }

  static FindTeams(
    self: CDOTA_BaseNPC_Hero,
    radius: number,
    typeFilter: UnitTargetType,
    flagFilterExtra?: UnitTargetFlags,
  ): CDOTA_BaseNPC[] {
    let flagFilter = UnitTargetFlags.NONE;

    if (flagFilterExtra) {
      flagFilter = flagFilter + flagFilterExtra;
    }
    const teams = this.Find(self, radius, UnitTargetTeam.FRIENDLY, typeFilter, flagFilter);

    return teams;
  }

  // Find base
  static Find(
    self: CDOTA_BaseNPC_Hero,
    radius: number,
    teamFilter: UnitTargetTeam,
    typeFilter: UnitTargetType,
    flagFilterExtra?: UnitTargetFlags,
    order = FindOrder.CLOSEST,
  ): CDOTA_BaseNPC[] {
    let flagFilter = UnitTargetFlags.NOT_ILLUSIONS; // 非幻象

    if (flagFilterExtra) {
      flagFilter = flagFilter + flagFilterExtra;
    }
    const enemies = FindUnitsInRadius(
      self.GetTeamNumber(),
      self.GetAbsOrigin(),
      undefined,
      radius,
      teamFilter,
      typeFilter,
      flagFilter,
      order,
      false,
    );

    return enemies;
  }
}
