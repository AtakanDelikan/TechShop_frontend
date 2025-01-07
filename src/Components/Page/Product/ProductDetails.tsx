import React from "react";

interface Props {
  product: any;
}

function ProductDetails(props: Props) {
  return (
    <div>
      <div className="m-3">{props.product.description}</div>
      <div className="container m-3">
        <h3>Technical Details</h3>
        <table className="table table-bordered">
          <tbody>
            {props.product.productAttributes.map((productAttribute: any) => (
              <tr>
                <td style={{ width: "30%" }}>{productAttribute.name}</td>
                <td style={{ width: "70%" }}>{productAttribute.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDetails;
