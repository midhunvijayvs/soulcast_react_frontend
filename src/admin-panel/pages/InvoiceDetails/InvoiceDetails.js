import React from 'react';
import './InvoiceDetails.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import API from '../../../API';
import $ from 'jquery';

import { fetchInvoiceDataAndGeneratePdf } from '../../../GeneralFunctions'

function InvoiceDetails() {
  useEffect(() => {
    $(function () {
      $(window).scrollTop(0);
    });
  }, [])
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [orderItemsData, setOrderItemsData] = useState(null)
  const [units, setUnits] = useState(null)


  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    API.get("/units")
      .then((units) => {

        setUnits(units)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])


  useEffect(() => {
    setIsLoading(true)
    API.get(`/invoices/${localStorage.getItem("itemSelectedId")}`)
      .then((response) => {

        setData(response.data)
        API.get(`/orders/${response.data.order_id}`)
          .then((itemres) => {
            setOrderItemsData(itemres.data.order_items)
          })
          .catch((error) => {
            console.error(error);
          })


      })
      .catch((error) => {
        console.error(error);
      })
  }, [])



  const calculateTotal = () => {
    return data.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };


  return (
    <>
      {data &&
        <div className='px-4'>
          <div className='d-flex w-100 justify-content-between mb-5'>
            <div className='d-flex align-items-center'>
              <div className='fw-600 black-clr me-2'>Invoice</div>
              <div className='f-xs clr-898989 fw-500'>#{data.id}</div>
            </div>
            <div className='d-flex align-items-center'>
              <button className='plain-lightbrick-btn f-xs me-3 px-2'><i className="fa-solid fa-check-double me-2"></i>Invoice Sent</button>
              <button className='brick-btn f-xs px-3' onClick={() => fetchInvoiceDataAndGeneratePdf(data.order_id)}><i className="fa-solid fa-download me-2"></i>Download</button>
            </div>
          </div>
          <div className='d-flex w-100 justify-content-between'>
            <div className='w-50'>
              <div className='clr-898989 f-12 mb-3'>FROM</div>
              <div className='w-100 d-flex align-items-center'>
                <div>
                  <img src="/images/Invoice/From.svg" className='view-invoice-proimg' alt=''></img>
                </div>
                <div className='ms-3 black-clr'>
                  <div className='f-xs fw-600 mb-2'>SIBU FISH N’ MEAT</div>
                  <div className='f-12 fw-500'>18  Guild Street London, EC2V 5PX</div>
                  <div className='f-12 fw-600'>United Kingdom</div>
                  <div className='f-12 fw-500'><span className='me-2'>sibu@gmail.com</span><span>Ph: 9876543210</span></div>
                </div>
              </div>
            </div>
            <div className='w-50'>
              <div className='clr-898989 f-12 mb-3'>CUSTOMER</div>
              <div className='w-100 d-flex align-items-center'>
                <div>
                  <img src="/images/Invoice/Customer.svg" className='view-invoice-proimg' alt=''></img>
                </div>
                <div className='ms-3 black-clr'>
                  <div className='f-xs fw-600 mb-2'>{data.billing_first_name}&nbsp;{data.billing_last_name}</div>
                  <div className='f-12 fw-500'>{data.billing_number}&nbsp;{data.billing_address_line1}
                    {data.billing_premise && data.billing_premise}&nbsp;&nbsp; {data.billing_street && data.billing_street}
                    {data.billing_posttown}&nbsp;{data.billing_postcode}&nbsp;{data.billing_county}</div>
                  <div className='f-12 fw-600'>United Kingdom</div>
                  <div className='f-12 fw-500'><span className='me-2'>{data.email}</span><span>Ph:{data.phone}</span></div>
                </div>
              </div>

            </div>
          </div>
          <div className='gradientline'></div>
          <div className='d-flex w-100 justify-content-between mb-4'>
            <div className='w-50'>
              <div className='clr-898989 f-12 mb-2'>PROJECT NAME</div>
              <div className='fw-600 black-clr f-sm'>Lorem ipsum dolor sit amet</div>
            </div>
            <div className='w-50'>
              <div className='clr-898989 f-12 mb-2'>DUE DATE</div>
              <div className='brick-clr f-xs fw-500'>Saturday October 24th, 2020</div>
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered" aria-label="TABLE">
                  <thead>
                    <tr role="row" className='f-12 clr-565B67'>
                      <th role="columnheader" scope="col" tabIndex="0">ITEM DESCRIPTION</th>
                      <th role="columnheader" scope="col" tabIndex="0">QUANTITY</th>
                      <th role="columnheader" scope="col" tabIndex="0">RATE</th>
                      <th role="columnheader" scope="col" tabIndex="0">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orderItemsData && orderItemsData.map((item, index) => (
                      <tr role="row" className='black-clr f-12 fw-500'>
                        <td>{item.product_name}</td>
                        <td>{item.quantity} Kg. X {item.count}</td>
                        <td><i className="fa-solid fa-sterling-sign"></i>{item.price}</td>
                        <td><i className="fa-solid fa-sterling-sign"></i>{item.sub_total}</td>
                      </tr>
                    ))}



                    <tr role="row" className='black-clr f-12 fw-500'>
                      <td className='clr-898989 fw-600'>SUBTOTAL</td>
                      <td></td>
                      <td></td>
                      <td><i className="fa-solid fa-sterling-sign"></i>{data.total}</td>
                    </tr>
                    <tr role="row" className='black-clr f-12 fw-500'>
                      <td className='clr-898989 fw-600'>TAX</td>
                      <td></td>
                      <td></td>
                      <td>0<i className="fa-solid fa-percent ms-1"></i></td>
                    </tr>
                    <tr role="row" className='black-clr f-12 fw-500'>
                      <td className='clr-898989 fw-600'>TOTAL</td>
                      <td></td>
                      <td></td>
                      <td className='fw-600 f-sm'><i className="fa-solid fa-sterling-sign"></i>{data.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      }
    </>
  )

}

export default InvoiceDetails