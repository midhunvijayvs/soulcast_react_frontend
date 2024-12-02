import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Notification extends Component {
       
    

  render() {
    return (
      <div>
        <div className='d-flex justify-content-between w-100'>
            <div className='fw-600 f-14 mb-3'>Notification Centre</div>
            <Link to='/Layout2/Notificationhistory' className='lightbrick-btn f-xs px-4 add-prod-link me-2'>View History</Link>
        </div>
        <div className='radius-11 box-shadow p-3 w-100' id="add_to_me">
            <div className='d-flex flex-column flex-lg-row justify-content-between w-100'>
                <div className='w-100div3 d-flex me-0 me-lg-3 align-items-center mb-2 mb-lg-0'>
                    <select name="cars" id="cars" className='f-13 px-2 fw-500 w-100 inp-EFEFEF'>
                        <option value="">Choose Location...</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Location2">Location2</option>
                        <option value="Location3">Location3</option>
                    </select>
                </div>
                <div className='w-100div3 mb-2 mb-lg-0 me-0 me-lg-3'>
                    <input type='text' className='f-13 px-2 fw-500 inp-EFEFEF w-100' placeholder='Notified date'
                        onChange={(e) => console.log(e.target.value)}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}></input>
                </div>
                <div className='w-100div3 mb-2 mb-lg-0'>
                    <select name="cars" id="cars" className='w-100 f-13 px-2 fw-500 inp-EFEFEF'>
                        <option value="">Choose Category...</option>
                        <option value="Meat">Meat</option>
                        <option value="Fish">Fish</option>
                        <option value="Seashell">Seashell</option>
                        <option value="All">All</option>
                    </select>
                </div>
            </div>
            
        </div>
        <div className='radius-11 box-shadow p-3 w-100'>
        <div className='region-table mt-3'>
                        <table className="rwd-table mb-2">
                            <tbody>
                            <tr>
                                <th>
                                <div className="comment-form-cookies-consent d-flex">
                                    <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                    <label for="wp-comment-cookies-consent" className='mb-0'>Product ID</label>
                                </div>
                                </th>
                                <th>Product Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td data-th="Product ID">
                                <div className="comment-form-cookies-consent d-flex">
                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                <label for="wp-comment-cookies-consent" className='mb-0'>#123SB</label>
                                </div>
                                </td>
                                <td data-th="Product Name">
                                Premium special beef
                                </td>
                                <td data-th="Qty">
                                5kg
                                </td>
                                <td data-th="Price">
                                £7560
                                </td>
                                <td data-th="Action">
                                <button ><i className="fa-solid fa-trash clr-33363F"></i></button>
                                <button data-toggle="modal" data-target="#exampleModal"><i className="fa-solid fa-pen clr-33363F"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td data-th="Product ID">
                                <div className="comment-form-cookies-consent d-flex">
                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                <label for="wp-comment-cookies-consent" className='mb-0'>#123SB</label>
                                </div>
                                </td>
                                <td data-th="Product Name">
                                Premium special beef
                                </td>
                                <td data-th="Qty">
                                5kg
                                </td>
                                <td data-th="Price">
                                £7560
                                </td>
                                <td data-th="Action">
                                <button><i className="fa-solid fa-trash clr-33363F"></i></button>
                                <button><i className="fa-solid fa-pen clr-33363F"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td data-th="Product ID">
                                <div className="comment-form-cookies-consent d-flex">
                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                <label for="wp-comment-cookies-consent" className='mb-0'>#123SB</label>
                                </div>
                                </td>
                                <td data-th="Product Name">
                                Premium special beef
                                </td>
                                <td data-th="Qty">
                                5kg
                                </td>
                                <td data-th="Price">
                                £7560
                                </td>
                                <td data-th="Action">
                                <button><i className="fa-solid fa-trash clr-33363F"></i></button>
                                <button><i className="fa-solid fa-pen clr-33363F"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td data-th="Product ID">
                                <div className="comment-form-cookies-consent d-flex">
                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                <label for="wp-comment-cookies-consent" className='mb-0'>#123SB</label>
                                </div>
                                </td>
                                <td data-th="Product Name">
                                Premium special beef
                                </td>
                                <td data-th="Qty">
                                5kg
                                </td>
                                <td data-th="Price">
                                £7560
                                </td>
                                <td data-th="Action">
                                <button><i className="fa-solid fa-trash clr-33363F"></i></button>
                                <button><i className="fa-solid fa-pen clr-33363F"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td data-th="Product ID">
                                <div className="comment-form-cookies-consent d-flex">
                                <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"></input>
                                <label for="wp-comment-cookies-consent" className='mb-0'>#123SB</label>
                                </div>
                                </td>
                                <td data-th="Product Name">
                                Premium special beef
                                </td>
                                <td data-th="Qty">
                                5kg
                                </td>
                                <td data-th="Price">
                                £7560
                                </td>
                                <td data-th="Action">
                                <button><i className="fa-solid fa-trash clr-33363F"></i></button>
                                <button><i className="fa-solid fa-pen clr-33363F"></i></button>
                                </td>
                            </tr>
                           
                            </tbody>
                        </table>
                    </div>
        </div>
        <div className='mt-3 d-flex justify-content-end '>
        <button className='brick-btn f-xs fw-500 px-2'><i className="fa-solid fa-paper-plane me-2"></i>Send Notification</button>

        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm" role="document">
    <div className="modal-content">
     
      <div className="modal-body">
        <div className='d-flex justify-content-between w-100 mb-3 bg-extralightbrick align-items-center radius-11 p-2'>
            <div className='fw-600 f-xs brick-clr'>Product ID <span className='black-clr'>#12345</span></div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i className="fa-regular fa-circle-xmark"></i></span>
            </button>
        </div>
        <div className='mb-2'>
            <div className='fw-500 f-xs mb-1'>QTY</div>
            <input className='inp-D9D9D9 h-33 w-100'></input>
        </div>
        <div>
            <div className='fw-500 f-xs mb-1'>Price</div>
            <input className='inp-D9D9D9 h-33 w-100'></input>
        </div>
        <div className='mt-3 w-100 d-flex'>
            <button className='fw-500 f-xs white-btn w-50 me-2'>Cancel</button>
            <button className='fw-500 f-xs lightbrick-btn w-50'>Save</button>
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

export default Notification
