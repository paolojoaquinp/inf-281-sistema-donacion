"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="home__container">
      <h2 style={{ fontSize: '3rem' }}>Transforma Vidas con Cada Donación</h2>
          
          {/* Sección de Imágenes y Descripción General */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div className="image__container">
              <img src="https://picsum.photos/id/237/200/300" alt="Imagen 1" style={{ width: "70%", height: "auto" }}/>
            </div>
            <div className="image__container">
              <img src="https://picsum.photos/id/238/200/300" alt="Imagen 2" style={{ width: "70%", height: "auto" }}/>
            </div>
            <div className="image__container">
              <img src="https://picsum.photos/id/239/200/300" alt="Imagen 3" style={{ width: "70%", height: "auto" }}/>
            </div>
            {/* Agrega más imágenes aquí si es necesario */}
          </div>
          <p style={{ fontSize: '1.5rem' }}>En el Sistema de Donación, unimos a personas de buen corazón con causas que hacen una diferencia tangible en la comunidad. Cada contribución ayuda a fortalecer y empoderar a aquellos en necesidad, promoviendo la educación, salud, y bienestar para un futuro mejor.</p>
          
          {/* Sección de Educación */}
            <div className="section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className="icon__img" src="https://cdn-icons-png.flaticon.com/512/3142/3142780.png" alt="Educación" />
                <div>
                  <h3>Educación</h3>
                  <p>Apoya programas educativos que empoderan a jóvenes y adultos, abriendo puertas a nuevas oportunidades y fomentando un cambio positivo en la comunidad.</p>
                </div>
              </div>
            </div>
          
          {/* Sección de Salud */}
          <div className="section">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img className="icon__img" src="https://cdn-icons-png.flaticon.com/512/3142/3142784.png" alt="Salud" />
              <div>
                <h3>Salud</h3>
                <p>Contribuye a mejorar la calidad de vida de personas enfermas o en situaciones de vulnerabilidad, promoviendo el acceso a servicios de salud y atención médica.</p>
              </div>
            </div>
          </div>
          
          {/* Sección de Desarrollo Comunitario */}
          <div className="section">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img className="icon__img" src="https://cdn-icons-png.flaticon.com/512/3142/3142786.png" alt="Desarrollo Comunitario" />
              <div>
                <h3>Desarrollo Comunitario</h3>
                <p>Participa en proyectos que fortalezcan y mejoren la infraestructura, economía y calidad de vida en comunidades locales, impulsando el desarrollo sostenible.</p>
              </div>
            </div>
          </div>
          
          {/* Agrega más secciones según sea necesario */}
          
        </div>
    </main>
  );
}