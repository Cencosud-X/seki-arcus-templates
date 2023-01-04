export interface IWidget {
  name: string,
  description: string,
  type: string,
  url: string,
  permission: Array<string>,
  disabled: boolean,
  order: number,
  meta_data: Record<string, string>
}