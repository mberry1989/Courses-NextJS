import { Course } from "../models"
import { RichTextElement } from "./RichTextComponent"

interface CourseProps{
  course: Course
}

export default function CourseCard({course}:CourseProps){
    return(
        <>
        <div className="flex w-full flex-row justify-center text-center" data-kontent-element-codename='description'>
            <div
              className="underline-gray px-8 text-xl font-semibold text-black"
            >
              <h4>Course Level</h4>
              <div className="text-lg text-emerald-700">{course.elements.courseLevel.value[0].name}</div>
            </div>
            <div
              className="underline-gray px-8 text-xl font-semibold text-black"
            >
              <h4>Languages</h4>
              <div className="text-lg text-emerald-700">English</div>
            </div>
            <div
              className="underline-gray px-6 text-xl font-semibold text-gray-700"
            >
              <h4>Average completion time</h4>
              <div className="text-lg text-emerald-700">{course.elements.averageCompletionTime.value}</div>
            </div>
            
          </div>
          <div className="text-left text-xl px-6">
            <RichTextElement element={course.elements.topics} isInsideTable={false} language="default" />
            </div>
          
          </>
    )
}