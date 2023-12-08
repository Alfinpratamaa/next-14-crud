"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number,
  name: string,
  price: number,
  brandId: number
}


const DeleteTask = ({ product }: { product: Product }) => {


  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/${productId}`)
    router.refresh()
    setIsOpen(false)
  }


  return (
    <div>
      <button onClick={handleModal} className="btn btn-error btn-sm mb-5 text-white font-semibold">delete</button>
      <div className={isOpen ? 'modal modal-open ' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">are you sure to delete {product.name}</h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>cancel</button>
            <button type="button" onClick={() => { handleDelete(product.id) }} className="btn text-white btn-success">yes</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DeleteTask