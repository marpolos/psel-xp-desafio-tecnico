export default interface IService<T> {
  statusCode: number;
  message?: string;
  data?: T | T[];
}