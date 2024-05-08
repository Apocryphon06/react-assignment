import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'

const ShowPostDetails = ({ data, handleClose }) => {
  useEffect(() => {
    console.log('child rendered')
  }, [data])

  return (
    <div className="w-full absolute h-full bg-black/20 flex flex-col items-center justify-center lg:p-10 p-4">
      <div className="lg:w-6/12 w-full mx-auto bg-white h-[650px]">
        <div className="h-12 bg-[#171717] w-full text-white px-3 flex items-center justify-between">
          <div>
            <p>Post Details</p>
          </div>
          <button onClick={handleClose}>
            <Image
              priority={false}
              src="close.svg"
              alt="close"
              width={22}
              height={22}
              className="invert"
            />
          </button>
        </div>

        <div className="lg:p-10 p-4">
          <div className="flex flex-col lg:p-10 p-4 gap-4 border">
            <div className="grid grid-cols-2 items-center">
              <h1 className="text-sm uppercase opacity-50 font-medium">id</h1>
              <p>{data?.id ?? '--'}</p>
            </div>

            <div className="grid grid-cols-2 items-center">
              <h1 className="text-sm uppercase opacity-50 font-medium">
                title
              </h1>
              <p>{data?.title ?? '--'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowPostDetails
