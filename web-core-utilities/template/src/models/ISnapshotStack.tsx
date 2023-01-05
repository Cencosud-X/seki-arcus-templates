export enum SnapshotTypesEnum {
  'GPS_LOCATION',
  'DEVICE_INFO'
}
export type SnapshotTypes = keyof typeof SnapshotTypesEnum;

export default interface ISnapshotStack {
  type: SnapshotTypes;
  executor: {
    id: string;
    name: string;
  };
  created_at: Date;
  data: any;
}
