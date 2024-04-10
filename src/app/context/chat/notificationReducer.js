/* import { types } from '../../types/types'; */


export const types = {

    notificacionesCargadas: '[Notificacion] Notificaciones cargados',
    /* activarChat: '[Notificacion] Activar Chat', */
    nuevaNotificacion: '[Notificacion] Nueva Notificaion',
    /* cargarMensajes: '[Notificacion] Cargar Mensajes' */
}


// const initialState = {
//     uid: '',
//     chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
//     userId: null, // Todos los usuarios de la base datos
//     notificaciones: [], // El chat seleccionado
// }

export const NotificactionReducer = ( state, action ) => {


    switch ( action.type ) {
        
        case types.notificacionesCargadas:
            console.log("notificaciones cargadas: ", action.payload);
            return {
                ...state,
                notificaciones: [ ...action.payload ]
            }

        case types.nuevaNotificacion:
            if ( state.chatActivo === action.payload.de || 
                state.chatActivo === action.payload.para   
            ) {
                return {
                    ...state,
                    notificaciones: [ ...state.notificaciones, action.payload ]
                }
            }else { return state;}
            
    
        default:
            return state;
    }

}

