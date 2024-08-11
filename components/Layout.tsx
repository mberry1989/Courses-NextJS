/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";
import { Course } from "../models";
import Banner from "./Banner";
import CourseCard from "./CourseCard";
import Heading from "./Heading";
import Hero from "./Hero";
import Section from "./Section";

interface CoursesProps {
  courses:Array<Course>
}

export default function Main({courses}:CoursesProps) {
  return (
    <div className="grotesk max-w-8xl mx-auto">
      {courses.map(course => {
        return(
        <div key={course.system.id}>
          <Banner 
            title={course.elements.title.value}
            summary={course.elements.summary.value}
            backgroundImage = {course.elements.bannerBackground.value[0].url}
          />
          <section className="w-full text-black">
          <Hero 
            image={course.elements.image.value[0].url} 
            headline={course.elements.title.value}
            subtext={course.elements.summary.value.substring(0,200)}

            />
          <div className="mx-auto px-5 pt-32 pb-12 lg:px-24 bg-gray-300 rounded-2xl mb-24">
            <Heading />
            <CourseCard course={course}/>
            <Section header={course.elements.title.value} body={course.elements.description}/>
            <div className="flex justify-center p-4">
              <Link
              href={`/lessons/${course.system.codename}`}
              className="text-center bg-emerald-700 text-white p-4 mt-12 rounded">
              Start Course
              </Link>
            </div>
          </div>
            
          </section>
      </div>
        )
})}
    </div>
  );
}
