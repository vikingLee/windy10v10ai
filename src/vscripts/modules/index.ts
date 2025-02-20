import { AI } from "../ai/AI";
import { GameConfig } from "./GameConfig";
import { Debug } from "./debug/Debug";
import { Event } from "./event/event";
import { PropertyController } from "./property/property_controller";
import { XNetTable } from "./xnet-table";

declare global {
  interface CDOTAGameRules {
    // 声明所有的GameRules模块，这个主要是为了方便其他地方的引用（保证单例模式）
    XNetTable: XNetTable;
    AI: AI;
    GameConfig: GameConfig;
  }
}

/**
 * 这个方法会在game_mode实体生成之后调用，且仅调用一次
 * 因此在这里作为单例模式使用
 **/
export function ActivateModules() {
  // 初始化所有的GameRules模块

  if (GameRules.XNetTable == null) {
    GameRules.XNetTable = new XNetTable();
    // 如果某个模块不需要在其他地方使用，那么直接在这里使用即可
    new Debug();

    new Event();

    new PropertyController();
  }

  if (GameRules.AI == null) GameRules.AI = new AI();

  if (GameRules.GameConfig == null) GameRules.GameConfig = new GameConfig();
}
