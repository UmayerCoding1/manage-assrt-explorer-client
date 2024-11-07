import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EmployeeListTable = ({employee,i}) => {
  const axiosSecure = useAxiosSecure();
    const {_id,emImage,name,companyName,email,emCategory} = employee;

    const handleDeleteEm = (id,email) => {

      Swal.fire({
        title: "Are you sure?",
        text: "You delete this employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         axiosSecure.delete(`/employee/${id}?email=${email}`)
       .then(res => {
        if(res.data.deletedCount > 0){
          Swal.fire({
            title: "Deleted!",
            text: "Your employee has been deleted.",
            icon: "success"
          });
        }
        
       })
        }
      });
       
       
    }
    return (
        <tr key={_id}>
        <th>
          {i}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={emImage}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{companyName}</div>
            </div>
          </div>
        </td>
        <td>
         <p>{email}</p>
        </td>
        <td>{_id}</td>
        <td>{emCategory}</td>
        <th>
          <button onClick={() =>handleDeleteEm(_id,email)} className="btn btn-error btn-xs">delete</button>
        </th>
      </tr>
    );
};

export default EmployeeListTable;