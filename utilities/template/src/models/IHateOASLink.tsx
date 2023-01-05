export default interface IHateOASLink {
  href: string;
  rel: string;
  method: 'POST' | 'PUT' | 'REDIRECT' | 'GET' | 'DELETE';
}