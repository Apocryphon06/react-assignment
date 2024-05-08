import Image from 'next/image'
import React from 'react'
import { Fragment, useState, useMemo, useCallback } from 'react'
import ShowPostDetails from './components/ShowPostDetails'

let perPage = 10

const Home = () => {
  const [data, setData] = useState()
  const [page, setPage] = useState(1)
  const [dataById, setDataById] = useState()
  const [activeId, setActiveId] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleClose = () => {
    setShowDetails(false)
  }

  const incrementPage = () => {
    if (page === 10) {
      return
    }
    setPage((prevPage) => prevPage + 1)
  }
  const decrementPage = () => {
    if (page === 1) {
      return
    }
    setPage((prevPage) => prevPage - 1)
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          (page - 1) * perPage
        }&_limit=${perPage}`,
      )
      const posts = await response.json()
      setData(posts)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, perPage])

  useMemo(() => {
    fetchData()
  }, [fetchData])

  const fetchDataById = useCallback(async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${activeId}`,
      )
      const posts = await response.json()
      setDataById(posts)
    } catch (error) {
      console.log(error)
    } finally {
    }
  })

  useMemo(() => {
    if (typeof activeId !== 'undefined') {
      fetchDataById()
    }
  }, [activeId])

  return (
    <div className="flex flex-col w-full lg:items-center lg:justify-center min-h-screen bg-[#808080]/20 relative">
      <div className="flex flex-col lg:w-8/12 w-full mx-auto lg:p-10 p-4">
        <div className="h-12 top-0 w-full bg-[#171717] flex items-center px-3 text-start text-white">
          All Posts
        </div>
        <div className="w-full mx-auto bg-white flex flex-col gap-4 lg:h-[450px] h-[75vh] overflow-y-auto relative">
          <div className="grid grid-cols-5 gap-4 w-full border-b py-2 px-3 bg-white">
            <p className="uppercase opacity-50 font-medium text-sm">id</p>
            <p className="uppercase opacity-50 font-medium text-sm col-span-3">
              title
            </p>
            <p className="uppercase opacity-50 font-medium text-sm">action</p>
          </div>

          <Fragment>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 w-full h-[350px]">
                <Image
                  priority={false}
                  src="loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />

                <p className="text-sm text-center font-medium">Loading</p>
              </div>
            ) : (
              <Fragment>
                {typeof data !== undefined ? (
                  <Fragment>
                    {React.Children.toArray(
                      data?.map((item, index) => (
                        <div className="grid grid-cols-5 gap-4 w-full border-b py-2 px-3 items-start">
                          <p className="text-sm">{item.id}</p>
                          <p className="text-sm col-span-3">{item.title}</p>
                          <button
                            onClick={() => {
                              setActiveId(item.id)
                              setShowDetails(true)
                            }}
                          >
                            <Image
                              priority={false}
                              src="/eye.svg"
                              alt="view"
                              width={22}
                              height={22}
                              className="opacity-50 hover:opacity-100"
                            />
                          </button>
                        </div>
                      )),
                    )}
                  </Fragment>
                ) : (
                  <div>
                    <p className="flex items-center justify-center text-sm font-medium">
                      No Posts Found!
                    </p>
                  </div>
                )}
              </Fragment>
            )}
          </Fragment>
        </div>

        <div className="flex items-center justify-center w-full mt-6">
          <button
            onClick={decrementPage}
            className={`bg-[#171717] text-white select-none h-[46px] px-4 text-sm hover:opacity-50 ${
              page === 1 ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            &lt;
          </button>
          <button className="h-[46px] px-4 text-sm bg-white">{page}</button>
          <button
            onClick={incrementPage}
            className={`bg-[#171717] text-white select-none h-[46px] px-4 text-sm hover:opacity-50 ${
              page === 10 ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            &gt;
          </button>
        </div>
      </div>

      {showDetails ? (
        <ShowPostDetails handleClose={handleClose} data={dataById} />
      ) : (
        <Fragment />
      )}
    </div>
  )
}

export default Home
