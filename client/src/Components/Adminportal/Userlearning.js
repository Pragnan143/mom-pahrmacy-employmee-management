import React from 'react'

const UserLearning = () => {
    const userLearning=[
        { id: 1, techLearnings: "hgfbvjh bvbvjhbvh hdjhsdvhd bhdvdv hbjhdbhjd bjhsdbjh bjhsdbjh dbjhdsb hbjhdsb",
             nonTechLearnings: "vsgvcg gfdxhgdvhj ghsdvfgvxgjh gvhgxfvh gdsfgfvghf gsdvfgsdvf dhgfsdvhgf gvfhsdvf gvhjbvdt",
             date: new Date().toLocaleDateString(),
        },

    ]

    console.log(userLearning)
  return (
    <div>
    <div className="p-6 sm:p-10 lg:p-16 max-w-4xl mx-auto bg-teal-50 rounded-lg shadow-lg my-16">
      <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">
            Technical Learnings 
          </h1>
          <p
            className="p-3 h-36 sm:h-40   rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500   transition duration-200 ease-in-out"
          >{userLearning[0].techLearnings}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-lg text-gray-800">
            Non-Technical Description 
          </h1>
          <p
            className="p-3 h-36 sm:h-40   rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500   transition duration-200 ease-in-out"
          >{userLearning[0].nonTechLearnings}</p>
        </div>
      </div>

      <div className='w-full px-10 flex items-center justify-end gap-6 '>
      <button
          type="submit"
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Get Pdf
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out"
        >
          Review
        </button>
        <p className="text-lg  text-gray-900 ">{userLearning[0].date}</p>

    </div>
    </div>
    </div>
  )
}

export default UserLearning
