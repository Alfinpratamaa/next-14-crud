"use client";

import { useState, SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTask = ({ brands }: { brands: Brand[] }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post(`/api`, {
            name: name,
            price: Number(price),
            brandId: Number(brand)

        })
        setName('')
        setPrice('')
        setBrand('')
        router.refresh()
        setIsOpen(false)
    }


    return (
        <div>
            <button onClick={handleModal} className="btn btn-neutral mb-5 text-white font-semibold">Add Task</button>
            <div className={isOpen ? 'modal modal-open ' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="product name" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="product price" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Brand</label>
                            <select className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="" disabled>seelect a brand</option>
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

export default AddTask