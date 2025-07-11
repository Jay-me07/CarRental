import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../Components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Cars = () => {

  // getting serach params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars,axios} = useAppContext()

  const [input,setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars,setFilteredCars] = useState([])

  const applyFilter = async () => {
    if (input === '') {
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowwerCase().includes(input.toLowerCase())
      || car.model.toLowwerCase().includes(input.toLowerCase())
      || car.category.toLowwerCase().includes(input.toLowerCase())
      || car.transmission.toLowwerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    const {data} = await axios.post('/api/bookings/check-availability' , {location: pickupLocation, pickupDate, returnDate})

    if (data.success) {
      setFilteredCars(data.availableCars)
      if (data.availableCars.length === 0) {
        toast('No Cars Available')
        return null
      }
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  },[])

  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input,cars])



  return (
    <div>

      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut'}}
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for next adventures' />

        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2' />

          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search By Make, Orders or Features' className='w-full h-full outline-null text-gray-500'/>
         
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2' />
        </div>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3}}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=>(
            <div key={index}>
              <CarCard  car={car}/>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Cars