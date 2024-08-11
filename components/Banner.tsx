interface BannerProps {
title: string,
summary:string,
backgroundImage:string
}

export default function Banner({title, summary,backgroundImage}:BannerProps){
    return (
        <div className="mt-0 bg-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="mx-auto">
            <div className="mx-auto px-5 py-24 lg:px-24">
              <div className="my-10 flex w-full flex-col text-center bg-gray-300 rounded-2xl p-12 opacity-70">
                <h2 className="mb-5 text-2xl font-bold text-black lg:text-3xl">
                  {title}
                </h2>
                <h3 className="text-xl font-extrabold">
                  {summary}
                </h3>
              </div>
            </div>
          </div>
          <div className="text-black">
            <div
              className="
              max-w-9xl
              mx-auto
              flex
              flex-col
              items-center
              justify-center
              px-5
            "
            >

              {/* <img
                className="
              mb-24
              inline-block
              w-5/6
              rounded
              object-cover object-center
              lg:hidden
              lg:w-4/6 
            "
                src={image}
                alt="img"
              /> */}
            </div>
          </div>
        </div>
    )
}