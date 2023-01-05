interface IConfig {
  label: string;
}

class XConsole {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  private getDate(date: Date): string {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return ((hour < 10) ? '0' + hour : hour) +
      ':' +
      ((minutes < 10) ? '0' + minutes : minutes) +
      ':' +
      ((seconds < 10) ? '0' + seconds : seconds) +
      '.' +
      ('00' + milliseconds).slice(-3);
  }

  debug(message: string, ...optionalParams: any[]): void {
    const { label } = this.config;
    const timestamp = this.getDate(new Date());

    console.debug(`🐞[${timestamp} • ${label}] ${message}`, ...optionalParams)
  }

  log(message: string, ...optionalParams: any[]): void {
    const { label } = this.config;
    const timestamp = this.getDate(new Date());

    console.log(`👀[${timestamp} • ${label}] ${message}`, ...optionalParams)
  }

  error(message: string, ...optionalParams: any[]): void {
    const { label } = this.config;
    const timestamp = this.getDate(new Date());

    console.error(`😔[${timestamp} • ${label}] ${message}`, ...optionalParams)
  }

  warn(message: string, ...optionalParams: any[]): void {
    const { label } = this.config;
    const timestamp = this.getDate(new Date());

    console.warn(`🧐[${timestamp} • ${label}] ${message}`, ...optionalParams)
  }

  info(message: string, ...optionalParams: any[]): void {
    const { label } = this.config;
    const timestamp = this.getDate(new Date());

    console.info(`🤓[${timestamp} • ${label}] ${message}`, ...optionalParams)
  }
}

export default function (config: IConfig): Record<string, any> {
  return new XConsole(config)
};