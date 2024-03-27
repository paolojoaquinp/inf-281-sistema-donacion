import react from "react";
import { EventSection, EventDetails, EventImage } from './card-styled';

const CardPortal = (evento) => {
    return (
        <EventSection key={evento.id}>
            <EventDetails>
                <h3>{evento.titulo}</h3>
                <p>{evento.descripcion}</p>
                <p>Fecha: {evento.fecha}</p>
                <EventImage src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600" alt="imagen card portal"/>
                {/* Agrega más detalles según sea necesario */}
            </EventDetails>
        </EventSection>
    );
};

export default CardPortal;