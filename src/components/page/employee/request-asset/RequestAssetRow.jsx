import React, { useState } from 'react';

const RequestAssetRow = ({item,index,handleRequest}) => {
    const [assetQuantity, setAssetQuantity] = useState(1);

 
    const handleIncrement = () => {
        if(assetQuantity < item.quantity && assetQuantity < 5){
            setAssetQuantity(assetQuantity + 1);
        }
    }

    const handleDecrement =() => {
        if(assetQuantity > 1){
            setAssetQuantity(assetQuantity - 1);
        }
    }

    
    

    return (
        
             <tr key={item._id}>
                        <th>{index + 1}</th>
                        <td className="flex items-center justify-center">
                          <img className="w-20" src={item.image} alt="" />
                        </td>
                        <td>
                          <h2 className="font-semibold ">
                            {" "}
                            {item.productName}
                          </h2>
                        </td>
                        <td>
                          <h2 className="font-semibold "> {item.category}</h2>
                        </td>
                        <td>
                          {item.category === "non-returnable" ? (
                            <div className='flex items-center justify-center gap-2'>
                            <button
                              onClick={() => handleDecrement()}
                              className="text-2xl font-bold"
                            >
                              -
                            </button>
                            <input type="text"
                            className='w-10 h-8 border-2 border-gray-300 text-center rounded-lg outline-none' 
                            readOnly 
                            value={assetQuantity}
                            />
                            <button
                              onClick={() => handleIncrement()}
                              className="text-2xl font-bold"
                            >
                              +
                            </button>
                            </div>
                          ) : (
                            "Request this asset only 1 quantity"
                          )}
                        </td>

                        <td>
                          <p>
                            {item?.quantity > 0 ? (
                              <span>Available</span>
                            ) : (
                              <span>Out of stock</span>
                            )}
                          </p>
                        </td>
                        <th>
                          <button
                            onClick={() =>
                              handleRequest(
                                item.image,
                                item.productName,
                                item._id,
                                item.category,
                                assetQuantity
                              )
                            }
                            className={
                              item.quantity > 0
                                ? "btn btn-primary btn-sm"
                                : "btn btn-sm  btn-disabled"
                            }
                          >
                            Request
                          </button>
                        </th>
                      </tr>
        
    );
};

export default RequestAssetRow;