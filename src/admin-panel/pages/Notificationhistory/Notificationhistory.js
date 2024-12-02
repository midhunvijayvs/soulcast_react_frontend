import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import $ from 'jquery';

export class Notificationhistory extends Component {
    componentDidMount() {
        $("#search").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#table tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            return true
          });
        });
      }
  render() {
    return (
        <div className='px-0 px-md-4 py-3 coupon customer'>
        <div className='fw-600 f-xs'>
        Notification History
            {/* <button className='lightbrick-btn f-xs px-4'>Add Product</button> */}
            {/* <Link to='/Layout2/Maintanance' className='lightbrick-btn f-xs px-4 add-prod-link'>Notification History</Link> */}
        </div>

        <div className='d-flex align-items-center w-100 my-3'>
            <div className='relative w-50'>
                <input className='nav-search-inp w-100 fw-600' placeholder='Start typing search for Notification' id='search'></input>
                <div className='search-i-position'><i className="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div className='w-50 text-end mx-2'>
                        <input type='text' className='w-100 nav-search-inp ps-2' placeholder='Notified date'
                        onChange={(e) => console.log(e.target.value)}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        ></input>
                    </div>
        </div>

        <div className='w-100 product-table'>
          <table className="rwd-table mb-2">
            <tbody id='table'>
              <tr>
                  <th>Location</th>
                  <th>Product</th>
                  <th>Notified Date</th>
                  <th>Customers</th>
                  <th>Ordered</th>
                  <th>Total Qty</th>
                  <th>Total Price</th>
              </tr>
              <tr>
                  <td data-th="Location">
                  London
                  </td>
                  <td data-th="Product">
                  Beef
                  </td>
                  <td data-th="Notified Date"  className='lightbrick fw-600'>
                  23/05/2023
                  </td>
                  <td data-th="Customers">
                  15
                  </td>
                  <td data-th="Ordered" className='underline' data-toggle="modal" data-target="#exampleModal">
                  2 Customers
                  </td>
                  <td data-th="Total Qty" className='lightbrick fw-600'>
                  1 Kg                  
                  </td>
                  <td data-th="Total Price">
                  £ 450.02
                  </td>

              </tr>
              <tr>
                  <td data-th="Location">
                  London
                  </td>
                  <td data-th="Product">
                  Beef
                  </td>
                  <td data-th="Notified Date"  className='lightbrick fw-600'>
                  23/05/2023
                  </td>
                  <td data-th="Customers">
                  15
                  </td>
                  <td data-th="Ordered" className='underline' data-toggle="modal" data-target="#exampleModal">
                  2 Customers
                  </td>
                  <td data-th="Total Qty" className='lightbrick fw-600'>
                  1 Kg                  
                  </td>
                  <td data-th="Total Price">
                  £ 450.02
                  </td>

              </tr>
              <tr>
                  <td data-th="Location">
                  London
                  </td>
                  <td data-th="Product">
                  Beef
                  </td>
                  <td data-th="Notified Date"  className='lightbrick fw-600'>
                  23/05/2023
                  </td>
                  <td data-th="Customers">
                  15
                  </td>
                  <td data-th="Ordered" className='underline' data-toggle="modal" data-target="#exampleModal">
                  2 Customers
                  </td>
                  <td data-th="Total Qty" className='lightbrick fw-600'>
                  1 Kg                  
                  </td>
                  <td data-th="Total Price">
                  £ 450.02
                  </td>

              </tr>
              <tr>
                  <td data-th="Location">
                  London
                  </td>
                  <td data-th="Product">
                  Beef
                  </td>
                  <td data-th="Notified Date"  className='lightbrick fw-600'>
                  23/05/2023
                  </td>
                  <td data-th="Customers">
                  15
                  </td>
                  <td data-th="Ordered" className='underline' data-toggle="modal" data-target="#exampleModal">
                  2 Customers
                  </td>
                  <td data-th="Total Qty" className='lightbrick fw-600'>
                  1 Kg                  
                  </td>
                  <td data-th="Total Price">
                  £ 450.02
                  </td>

              </tr>
            
           
             
            </tbody>
          </table> 
        </div>

                {/* Popup Modal */}

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
     
      <div className="modal-body">
        <div className='d-flex justify-content-between w-100 mb-3 bg-extralightbrick align-items-center radius-11 p-2'>
            <div className='fw-600 f-xs'>Product Ordered Customers</div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i className="fa-regular fa-circle-xmark"></i></span>
            </button>
        </div>
        <div>
          <div className='border-bottom-dashed py-2'>
            <div className='fw-600 mb-3 f-xs'>Customer 1</div>
            <div className='fw-500 f-13 mb-2'><span >Customer Name : </span><span>Alex Taylor</span></div>
            <div className='w-100 d-flex'>
                <div className='w-25 fw-500 f-13'>Location</div>
                <div className='w-75 fw-500 f-13'>
                123 Main Street ,Manchester M1 1AB,United Kingdom
                </div>
            </div>
            <div className='w-100 d-flex'>
                <div className='w-25 fw-500 f-13'>Phone</div>
                <div className='w-75 fw-500 f-13'>
                0123 4567890
                </div>
            </div>
          </div>
          <div className='border-bottom-dashed py-2'>
            <div className='fw-600 mb-3 f-xs'>Customer 2</div>
            <div className='fw-500 f-13 mb-2'><span >Customer Name : </span><span>Alex Taylor</span></div>
            <div className='w-100 d-flex'>
                <div className='w-25 fw-500 f-13'>Location</div>
                <div className='w-75 fw-500 f-13'>
                123 Main Street ,Manchester M1 1AB,United Kingdom
                </div>
            </div>
            <div className='w-100 d-flex'>
                <div className='w-25 fw-500 f-13'>Phone</div>
                <div className='w-75 fw-500 f-13'>
                0123 4567890
                </div>
            </div>
          </div>
        
        </div>
        
      <div>

        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    )
  }
}

export default Notificationhistory
