import { Elements } from "@kontent-ai/delivery-sdk"
import { RichTextElement } from "./RichTextComponent"

interface SectionProps{
  header:string,
  body:Elements.RichTextElement
}

export default function Section({header, body}:SectionProps){
    return (
        <div className="flex w-full flex-col text-left lg:text-center  bg-gray-300 rounded-2xl opacity-70">
        <h3 className="text-left bold mt-8 mb-8 text-2xl font-bold leading-tight text-gray-700 lg:text-3xl">
          {header}
        </h3>
        <div className="text-xl text-black text-left">
        <RichTextElement element={body} isInsideTable={false} language={"default"}/>
        </div>
      </div>
    )
}