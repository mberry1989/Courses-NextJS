import { Elements } from "@kontent-ai/delivery-sdk";
import Head from "next/head";
import { getItemByCodename, getItemsOfType } from "../../services/kontentClient";
import { Course } from "../../models";
import { RichTextElement } from "../../components/RichTextComponent";

interface LessonsProps{
    lessons: Elements.RichTextElement
}

export default function Lessons({lessons}:LessonsProps) {
  return (
    <>
      <Head>
        <title>Lesson</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <RichTextElement element={lessons} isInsideTable={false} language={"default"}/>
      </div>
    </>
  );
  }

  export async function getStaticPaths() {
    const courses = await getItemsOfType<Course>('course', 5)
    const coursesLessonsUrls = courses.map((item) => {
      return {
        params: {
          slug: item.system.codename
        },
      };
    });
  
    return {
      paths: coursesLessonsUrls,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {

    const course = await getItemByCodename<Course>(params.slug,5)
    const lessons = course.elements.lessons

  
    return {
      props: {
        lessons,
      },
    }
}
