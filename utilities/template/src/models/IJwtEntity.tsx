export default interface IJwtEntity {
  primarysid: string;
  unique_name: string;
  email: string;
  groupsid: string;
  iss: string;
  aud: string;
  scope: string;
  iat: number;
  exp: number;
}