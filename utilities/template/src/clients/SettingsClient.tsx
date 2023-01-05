import WithBootedClient from "../lib/WithBootedClient";
import EventStreamer from "../lib/EventStreamer";

const storageName = "@settings";
interface IState {
  [key: string]: any;
}

enum SETTINGS_ENUM {
  "LANGUAGE",
  "FIRST_TIME"
}
export type SettingTypes = keyof typeof SETTINGS_ENUM;

class SettingsClient extends WithBootedClient {
  state: IState = {};

  async boot(): Promise<void>{
    const cached = await sessionStorage.getItem(storageName);
    if (cached) {
      const newState = JSON.parse(cached);
      this.setState(newState);
    }
  }

  get(name: SettingTypes, defaultValue: any = null): string {
    const setting = this.state[name];
    if (typeof setting == "undefined") {
      return defaultValue;
    }

    return setting;
  }

  async set(name: SettingTypes, value: any): Promise<void> {
    this.state[name] = value;

    await this.setState(this.state);

    await sessionStorage.setItem(
      storageName,
      JSON.stringify(this.state)
    )

    EventStreamer.emit("SETTINGS_CHANGED", [name, value]);
    return value;
  }

  async remove(name: SettingTypes): Promise<boolean> {
    delete this.state[name];

    await this.setState(this.state);

    await sessionStorage.setItem(
      storageName,
      JSON.stringify(this.state)
    )

    EventStreamer.emit("SETTINGS_REMOVED", [name]);
    return true;
  }

  private async setState(newState: IState): Promise<void> {
    this.state = newState;
  }

}

export default new SettingsClient();
