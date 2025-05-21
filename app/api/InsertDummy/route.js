import connectDB from '/lib/db';
import Blog from '/models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('API called: /api/insert-dummy-blogs');
  await connectDB();

  const blogs = [
    {
      image: "/1.png",
      title: "Melody (Esa Diva) Level: A2-B1",
      description: "Español : Qué os parece la canción que envía España este año a Eurovisión? A mí no me va tanto el festival, pero cuando hay algo de calidad, apetece escucharlo  Aquí os dejo el videoclip de Melody y un par de ejercicios para que practiquéis vocabulario. Ya me decís qué os parece Buena semana, valientes!",
    },
    {
      image: "/2.png",
      title: "Práctica de Condicionales con Rap (Level B2-C1)",
      description: "Aquí os dejo una canción de rap del cantante Juancho Marqués y unos ejercicios de español avanzado para valientes...",
    },
    {
      image: "/3.png",
      title: "Apagón eléctrico en España (Multilevel)",
      description: "Hace un tiempo hubo un apagón eléctrico en España sin precedentes. Aún no se saben las causas...",
    },
    {
      image: "/4.png",
      title: "Elige tres palabras o expresiones de la lista...",
      description: "¡Os paso un clásico entre los clásicos para empezar la semana! la lucha de este par de estudiantes...",
    },
    {
      image: "/5.png",
      title: "Definite and indefinite articles in Spanish",
      description: "When to use definite and indefinite articles in Spanish? Sometimes they are mandatory, sometimes not...",
    },
    {
      image: "/6.png",
      title: "Parts of the body in Spanish: vocabulary",
      description: "Talking about the parts of the body in Spanish becomes easier when you have the right vocabulary...",
    }
  ];

  try {
    await Blog.insertMany(blogs);
    return NextResponse.json({ success: true, message: 'Blogs inserted!' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
