export const generateUserErrorInfo = (user) =>{
    return `Una o más propiedades fueron incompletas o invalidas.
    Lista de propiedades requeridas:
    * first_name: necesita ser un tipo string, se recibió ${user.first_name}
    * last_name: necesita ser un tipo string, se recibió ${user.last_name}
    * email: necesita ser un tipo string, se recibió ${user.email}
    `
}