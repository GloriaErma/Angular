export interface UsuarioSolicitudInicial{
    idTipoDocumento: number;
    numeroDocumento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: number;
    fechaExpedicionDocumento: number;
    codigo?: string;
}
