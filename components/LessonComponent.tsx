import { Elements } from "@kontent-ai/delivery-sdk"
import { RichTextElement } from "./RichTextComponent"

interface LessonsProps{
  header: string,
  subHeader:string,
  backgroundImage: string,
  content: Elements.RichTextElement,
  courseId: string | null
  lessonId: string
}

export default function LessonComponent({header, subHeader, backgroundImage, content, courseId,lessonId}:LessonsProps){
    return (
      <div className="mb-24" data-kontent-item-id={courseId}>
        <div
      data-kontent-component-id={lessonId}
      data-kontent-element-codename='lessons'
      data-kontent-add-button
      data-kontent-render-position='bottom'
      data-kontent-insert-position='end'
    >
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-4">
          <div className="w-full p-12">
            <h1 className="w-full lg:text-[4.2em] text-3xl font-bold leading-none text-black">
              {header}
            </h1>

            <div className="w-full mt-6 text-2xl font-semibold text-black border italic text-red-900">
              <h2>Objective:</h2>
            {subHeader}
            </div>
          
            
            <div className="mt-6 max-w-2xl text-2xl font-semibold text-[#404040] flex justify-center gap-8 mx-auto min-w-full">
              <RichTextElement element={content} isInsideTable={false} language={"default"}/>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}