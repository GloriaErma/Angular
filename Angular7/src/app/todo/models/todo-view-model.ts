export interface TodoViewModel {
  error: number;
  mensaje: string;
  data:
  {id: number;
  title: string;
  descripcion: Text;
  done: boolean;
  createdDate: Date;
  updatedDate: Date;}
}
