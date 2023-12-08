import Image from 'next/image'
import AddTask from './components/AddTask'
import { PrismaClient } from '@prisma/client'
import type { Brand } from '@prisma/client'
import DeleteTask from './components/DeleteTask'
import EditTask from './components/EditTask'

const prisma = new PrismaClient()

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      brandId: true,
      brand: true
    }
  })
  return res
}

const getBrand = async () => {
  const res = await prisma.brand.findMany()
  return res
}



export default async function Home() {
  const [products, brands] = await Promise.all([
    getProducts(),
    getBrand()
  ])

  return (
    <main>
      <div className='w-full px-20 py-10'>
        <AddTask brands={brands} />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className='bg-gray-200 text-black'>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>price</th>
                <th>brand</th>
                <th className='flex justify-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.brand.name}</td>
                  <td className='flex justify-center gap-2' >
                    <EditTask brands={brands} product={product} />
                    <DeleteTask product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  )
}
