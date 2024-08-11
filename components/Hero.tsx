interface HeroProps {
  headline:string,
  subtext:string,
  image:string
  }

export default function Hero({headline, subtext,image}:HeroProps){
    return (
        <div className="max-w-8xl mx-auto inline-block items-center p-3 pt-0 lg:flex lg:flex-wrap lg:pt-4">
          <div className="lg:w-3/6">
            <h2 className="max-w-xl lg:text-[4.2em] text-3xl font-bold leading-none text-black inline-block">
              {headline}
            </h2>

            <p className="mt-6 max-w-2xl text-xl font-semibold text-[#404040]">
            {subtext}
            </p>
          </div>
          <div className="mb-20 mt-44 hidden w-full flex-col lg:mt-12 lg:inline-block lg:w-3/6">
            <img src={image} alt="Hero" />
          </div>
        </div>
    )
}