import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SectionTitle from '../../../../shared/sectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { Add, UpdateIcon } from '../../../../provider/IconProvider';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateAsset = ({item}) => {
    const assetData = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {productName,quantity,_id} = assetData;
    console.log(assetData);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
       const updateQuantity = parseInt(data.productQuantity);
       
        axiosSecure.put(`/assets/${_id}`, {updateQuantity})
        .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: `${productName} asset as update`,
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  navigate('/dashboard/asset-list');
            };
            
        })
      }

     
    
    
    return (
        <div>
        <SectionTitle header={"update an asset"} />
        <form onSubmit={handleSubmit(onSubmit)} className="m-32 mt-10 border-2 border-gray-300 p-5 rounded-lg">
          <section className="lg:flex items-center justify-between gap-5 my-5">
            <div className="w-1/2">
              <label className="font-bold pl-2" htmlFor="product-name">Product name</label> <br />
              <input
                className="w-full h-14 border-2 border-gray-400 rounded-xl pl-2 outline-none "
                type="text"
                {...register("productName", {required: true})}
                placeholder="Enter product name"
                defaultValue={productName}
                readOnly
              />
            </div>
  
            <div className="w-1/2">
              <label className="font-bold pl-2" htmlFor="product-name">Product quantity</label> <br />
              <input
                className="w-full h-14 border-2 border-gray-400 rounded-xl pl-2 outline-none "
                type="number"
                {...register("productQuantity", {required: true})}
                placeholder=" product quantity"
                defaultValue={quantity}
              />
            </div>
          </section>
  
     
  
          <div>
            <button
              className="btn btn-xs h-14 border-none text-lg bg-gradient-to-r from-[#e4cdcd] to-[#F2ECCA]"
              type="submit"
            >
              {" "}
              <UpdateIcon /> Update an asset
            </button>
          </div>
        </form>
      </div>
    );
};

export default UpdateAsset;