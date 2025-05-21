"use client"
import Navbar from './Navbar';
import Footer from './Footer';

const ExercisePage = () => {
    const logo = null;

    return (
        <div className="min-h-screen flex flex-col bg-black text-white font-afacad">
            <Navbar logo={logo} />

            <main className="flex-grow pt-48 px-4">
                {/* Centered Image */}
                <div className="flex flex-col justify-center items-center mb-8">
                    <img
                        src="/1.png"
                        alt="Eurovision Melody"
                        className="w-[1362px] h-[706px] object-contain"
                    />
                    <p
                        style={{
                            color: 'rgba(223, 182, 178, 0.73)', // #DFB6B2 with 73% opacity
                            fontSize: '98px',
                            fontFamily: 'Afacad, sans-serif',
                        }}
                        className="font-semibold"
                    >
                        Melody (Esa Diva) Level: A2-B1
                    </p>

                </div>


                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Intro Paragraph */}
                    <p className=" text-[rgba(251,229,216,0.68)] text-[30px]">
                        Español : Qué os parece la canción que envía España este año a Eurovisión? A mí no me va tanto el festival, pero cuando hay algo de calidad, apetece escucharlo  Aquí os dejo el videoclip de Melody y un par de ejercicios para que practiquéis vocabulario. Ya me decís qué os parece Buena semana, valientes!
                    </p>

                    {/* Exercise 1 */}
                    <div className="p-6">
                        <h2 className="text-[35px] font-bold mb-4 font-afacad">Ejercicio 1: Completa con los adjetivos correctos</h2>
                        <p className="mb-4 text-[30px] text-[rgba(255, 255, 255, 0.68)] font-afacad">
                            Instrucciones: Lee la letra de la canción "Diva". Algunos adjetivos han sido eliminados. Escucha la canción y
                            complétala con los adjetivos adecuados.
                        </p>
                        <div className="space-y-2 text-[20px] text-[rgba(255, 255, 255)] font-afacad">
                            Desde que era bien pequeña Antes de saber andar
                            Fui, del mundo, la rumbera
                            Para mí, era tan ________
                            Y descubrí a una suprema del teatro Despreciando a los demás del camerino
                            Pero la supuesta diva
                            Por el eco de una vida
                            Que no le pertenecía, se ________
                            Una diva es ________ como un simple mortal
                            Una diva no pisa a nadie para brillar Su voz le hace grande, ¿qué más da
                            Si ella es ________ cantando como un pez en el mar?
                            Una diva es ________, ________
                            Su vida es un jardín lleno de espinas y rosas
                            Resurge bailando
                            Con más fuerza que un huracán
                            Es la madre que madruga
                            Es la artista sin cartel
                            Con dinero o sin fortuna
                            <br />
                            <br />
                            <h2 className="text-[25px] font-bold mb-4">Ejercicio 2: Une los adjetivos con sus definiciones</h2>
                            <br />
                            Ellas son divas también
                            No es la fama tu grandeza
                            La igualdad es mi bandera
                            Y la música es mi única ilusión
                            Una diva es ________ como un simple mortal
                            Una diva no pisa a nadie para brillar
                            Su voz le hace grande, ¿qué más da
                            Si ella es ________ cantando como un pez en el mar?
                            Una diva es ________, ________
                            Su vida es un jardín lleno de espinas y rosas
                            Resurge bailando
                            Con más fuerza que un huracán
                            Ya verán
                            Diva, diva, diva, diva
                            Diva, diva, diva, diva
                            Oh-oh, oh-oh
                            Diva, diva, diva, diva
                            Diva, diva, diva, diva
                            Oh-oh, oh-oh
                            Somos divas, tú y yo, oh
                            Si ella es ________ cantando como un pez en el mar
                            Una diva es ________, ________
                            Su vida es un jardín lleno de espinas y rosas
                            Resurge bailando
                            Con más fuerza que un huracán
                            Ya verán, esa diva soy yo
                        </div>
                    </div>

                    {/* Exercise 2 */}
                    <div className="p-6">
                        <h2 className="text-[24px] md:text-[28px] font-bold mb-2 font-afacad text-white">
                            Ejercicio 2: Une los adjetivos con sus definiciones
                        </h2>

                        <p className="mb-4 text-[18px] md:text-[20px] text-[rgba(255,255,255,0.68)] font-afacad">
                            Instrucciones: Relaciona cada adjetivo de la canción con su definición correcta.
                        </p>

                        <div className="space-y-3 font-afacad text-[25px] md:text-[20px] text-white ">
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">1. Sencilla</span>
                                <span className="text-[rgba(255,255,255,0.68)]">a) Que no se deja vencer por el miedo.</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">2. Valiente</span>
                                <span className="text-[rgba(255,255,255,0.68)]">b) Que destaca por su gran fuerza o poder.</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">3. Poderosa</span>
                                <span className="text-[rgba(255,255,255,0.68)]">c) Que tiene humildad, no es arrogante.</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">4. Embrujada</span>
                                <span className="text-[rgba(255,255,255,0.68)]">d) Que se siente libre y sin ataduras.</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">5. Libre</span>
                                <span className="text-[rgba(255,255,255,0.68)]">e) Que está fascinada o hechizada por algo.</span>
                            </div>
                            <div className="flex gap-12">
                                <span className="font-semibold w-[150px]">6. Fuerte</span>
                                <span className="text-[rgba(255,255,255,0.68)]">f) Que posee resistencia y vigor.</span>
                            </div>
                        </div>
                    </div>





                    {/* Exercise 3 */}
                    <div className=" p-6">
                        <h2 className="text-[35px] font-bold mb-4 font-afacad">Ejercicio 3: Relaciona</h2>
                        <p className="mb-4 text-[30px] text-[rgba(255, 255, 255, 0.68)] font-afacad">
                            Relaciona las palabras y expresiones de la canción con su sinónimo o antónimo correcto.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-72px ">
                            <div>
                                <p className="font-bold text-[30px] mb-2 text-[#DFB6B2]">1. Sencilla</p>
                                <ul className="list-disc pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li>Humilde</li>
                                    <li>Arrogante</li>
                                    <li>Difícil</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[30px] mb-2 text-[#DFB6B2]">2. Valiente</p>
                                <ul className="list-disc  pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li>Miedoso</li>
                                    <li>Atrevida</li>
                                    <li>Débil</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[30px] mb-2 text-[#DFB6B2]">3. Poderosa</p>
                                <ul className="list-disc pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li>Fuerte</li>
                                    <li>Pequeña</li>
                                    <li>Tranquila</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[30px] mb-2 text-[#DFB6B2]">4. Frágil</p>
                                <ul className="list-disc pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li>Poderosa</li>
                                    <li>Igornal</li>
                                    <li>Tranquila</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold text-[30px] mb-2 text-[#DFB6B2]">5. Resurge</p>
                                <ul className="list-disc pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li>Desaparece</li>
                                    <li>Renace</li>
                                    <li>Cae</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-bold mb-2 text-[30px] text-[#DFB6B2] whitespace-nowrap">6. ¿Qué más da?</p>
                                <ul className="list-disc pl-8 space-y-1 text-[25px] text-[#BEBEBE]">
                                    <li className='whitespace-nowrap'>¿Por qué importa?</li>
                                    <li className='whitespace-nowrap'>¿Es muy importante!</li>
                                    <li className='whitespace-nowrap'>No lo sé.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Extra */}
                    <div className="p-6">
                        <h2 className="text-[35px] font-bold mb-4 font-afacad">Extra:</h2>
                        <p className="mb-4 text-[18px] md:text-[20px] text-[rgba(255,255,255,0.68)] font-afacad">
                            Elige tres palabras o expresiones de la lista y escribe una frase con cada una.
                        </p>
                    </div>
                </div>
            </main>

            <Footer logo={logo} />
        </div>
    );
};

export default ExercisePage;
