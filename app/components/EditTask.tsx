"use client";

import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number,
  name: string,
  price: number,
  brandId: number
}

const EditTask = ({ brands, product }: { brands: Brand[]; product: Product }) => {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [brand, setBrand] = useState(product.brandId)

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  const handleEdit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put(`/api/${product.id}`, {
      name: name,
      price: Number(price),
      brandId: Number(brand)

    })
    router.refresh()
    setIsOpen(false)
  }


  return (
    <div>
      <button onClick={handleModal} className="btn btn-success btn-sm mb-5 text-white font-semibold">Edit Product</button>
      <div className={isOpen ? 'modal modal-open ' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Product {product.name}</h3>
          <form onSubmit={handleEdit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="product name" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Price</label>
              <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="product price" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Brand</label>
              <select className="select select-bordered" value={brand} onChange={(e) => setBrand(Number(e.target.value))}>

                {brands.map((brand) => (

                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>cancel</button>
              <button type="submit" className="btn text-white btn-success">save</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default EditTask