interface FactProps{
  title: string,
  body:string,
  Image: string

}

export default function FactComponent({title, body}:FactProps){ 
    return (
        <div className="w-96 bg-gray-400 rounded-2xl p-4 border-yellow-300 border-2">
            <h2 className="w-full text-6xl font-bold leading-none text-yellow-300 text-center">
              {title}
            </h2>

            <p className="mt-6 w-full max-w-2xl text-2xl font-semibold text-white">
            {body}
            </p>
        </div>
    )
}