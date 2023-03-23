export interface ISelect {
  options: IOptions[]
  defaultValue: string
  defaultName: string
  value: string
  title: string
  onChange: (a: string) => void
}

export interface IOptions {
  name: string
  value: string
}
