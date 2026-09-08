import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from '../ShowOrderProduct';


const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="card product-card auth-card-wrapper">
            <div className="card-body">
              <h1 className="text-center">
                {" "}
                Welcome <br />
                {user?.name}
              </h1>
              <h3 className="text-center">{user?.email}</h3>
              <h2 className="text-center">
                Total Order :- {userOrder?.length}
              </h2>
            </div>
          </div>
        </div>
      </div>


      <div className="container my-5">
        <div className="table-scroll">
          <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                OrderItems
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            {userOrder && (
              <>
                {userOrder?.map((product) => (
                  <tr key={product._id}>
                    <td className="bg-dark text-light">
                      <ShowOrderProduct items={product?.orderItems} />
                    </td>
                    <td className="bg-dark text-light">
                      <ul style={{ fontWeight: "bold" }}>
                        <li>OrderId : {product?.orderId}</li>
                        <li>PaymentId : {product?.paymentId}</li>
                        <li>PaymentStatus : {product?.payStatus}</li>
                        <li>Name : {product?.userShipping?.fullName}</li>
                        <li>Phone : {product?.userShipping?.phoneNumber}</li>
                        <li>Country : {product?.userShipping?.country}</li>
                        <li>State : {product?.userShipping?.state}</li>
                        <li>PinCode : {product?.userShipping?.pincode}</li>
                        <li>Near By : {product?.userShipping?.address}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
