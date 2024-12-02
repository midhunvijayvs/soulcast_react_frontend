import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import API from '../../../API';
import LoadingSpinner from "../../../LoadingSpinner";
import ErrorModal from "../../../ErrorModal";
import PositiveModal from "../../../PositiveModal";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner"
import $ from 'jquery';
import './InvoiceConfirm.scss'
import InvoicePreview from '../../common-components/InvoicePreview/InvoicePreview';
import InvoiceSendPopup from '../../common-components/InvoiceSendPopup/InvoiceSendPopup';


const InvoiceConfirm = ( ) => {
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        $(function() {
      $(window).scrollTop(0);
      });
      }, []) 

    const { invoiceType,visibleFields } = location.state || {};
    const [formData, setFormData] = useState({
        bill_from: "",
        bill_to: "",
        invoice_number: "",
        due_date: '',
        payment_account: "", 
        currency: '',
        
      });

    const loadPage = () => {
        navigate(window.location.pathname);
    };


    const [message, setMessage] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvoiceSendModalOpen, setIsInvoiceSendModalOpen] = useState(false);


    return (
        <>
         
        <div className='px-0 px-md-4 py-3 full-screen-table-container invoice-confirm'>
            <div className='text-title'>
                <h3>Confirm {invoiceType} Invoice</h3>
                <div className='btns'>
                    <button>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 31H8C7.20435 31 6.44129 30.6839 5.87868 30.1213C5.31607 29.5587 5 28.7956 5 28V9C5 8.73478 5.10536 8.48043 5.29289 8.29289C5.48043 8.10536 5.73478 8 6 8C6.26522 8 6.51957 8.10536 6.70711 8.29289C6.89464 8.48043 7 8.73478 7 9V28C7 28.2652 7.10536 28.5196 7.29289 28.7071C7.48043 28.8946 7.73478 29 8 29H24C24.2652 29 24.5196 28.8946 24.7071 28.7071C24.8946 28.5196 25 28.2652 25 28V9C25 8.73478 25.1054 8.48043 25.2929 8.29289C25.4804 8.10536 25.7348 8 26 8C26.2652 8 26.5196 8.10536 26.7071 8.29289C26.8946 8.48043 27 8.73478 27 9V28C27 28.7956 26.6839 29.5587 26.1213 30.1213C25.5587 30.6839 24.7956 31 24 31Z" fill="#212429"/>
                        <path d="M28 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H28C28.2652 5 28.5196 5.10536 28.7071 5.29289C28.8946 5.48043 29 5.73478 29 6C29 6.26522 28.8946 6.51957 28.7071 6.70711C28.5196 6.89464 28.2652 7 28 7Z" fill="#212429"/>
                        <path d="M20 7C19.7348 7 19.4804 6.89464 19.2929 6.70711C19.1054 6.51957 19 6.26522 19 6V3H13V6C13 6.26522 12.8946 6.51957 12.7071 6.70711C12.5196 6.89464 12.2652 7 12 7C11.7348 7 11.4804 6.89464 11.2929 6.70711C11.1054 6.51957 11 6.26522 11 6V2C11 1.73478 11.1054 1.48043 11.2929 1.29289C11.4804 1.10536 11.7348 1 12 1H20C20.2652 1 20.5196 1.10536 20.7071 1.29289C20.8946 1.48043 21 1.73478 21 2V6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7Z" fill="#212429"/>
                        <path d="M16 26C15.7348 26 15.4804 25.8946 15.2929 25.7071C15.1054 25.5196 15 25.2652 15 25V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10C16.2652 10 16.5196 10.1054 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V25C17 25.2652 16.8946 25.5196 16.7071 25.7071C16.5196 25.8946 16.2652 26 16 26Z" fill="#212429"/>
                        <path d="M21 24C20.7348 24 20.4804 23.8946 20.2929 23.7071C20.1054 23.5196 20 23.2652 20 23V13C20 12.7348 20.1054 12.4804 20.2929 12.2929C20.4804 12.1054 20.7348 12 21 12C21.2652 12 21.5196 12.1054 21.7071 12.2929C21.8946 12.4804 22 12.7348 22 13V23C22 23.2652 21.8946 23.5196 21.7071 23.7071C21.5196 23.8946 21.2652 24 21 24Z" fill="#212429"/>
                        <path d="M11 24C10.7348 24 10.4804 23.8946 10.2929 23.7071C10.1054 23.5196 10 23.2652 10 23V13C10 12.7348 10.1054 12.4804 10.2929 12.2929C10.4804 12.1054 10.7348 12 11 12C11.2652 12 11.5196 12.1054 11.7071 12.2929C11.8946 12.4804 12 12.7348 12 13V23C12 23.2652 11.8946 23.5196 11.7071 23.7071C11.5196 23.8946 11.2652 24 11 24Z" fill="#212429"/>
                        </svg>
                    </button>
                  <button className='admin-blue-btn' onClick={()=> setIsInvoiceSendModalOpen(true)}>
                   Send Invoice
                  </button>
                  <button className='admin-black-btn'>
                   Edit Draft
                  </button>
                </div>
            </div>
            <div className='card'>
                <InvoicePreview visibleFields={visibleFields} />
                
            </div>
            
            
        </div>
        

        <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={loadPage} />
        {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={loadPage} />}
        {isInvoiceSendModalOpen && <InvoiceSendPopup message={message} setterFunction={setIsInvoiceSendModalOpen} okClickedFunction={loadPage} formData={formData} setFormData={setFormData} />}

        {isLoading && <FixedOverlayLoadingSpinner />} 
        </>

    )
}

export default InvoiceConfirm