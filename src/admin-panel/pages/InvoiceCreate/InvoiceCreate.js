import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import API from '../../../API';
import LoadingSpinner from "../../../LoadingSpinner";
import ErrorModal from "../../../ErrorModal";
import PositiveModal from "../../../PositiveModal";
import DeleteConfirmModal from "../../../DeleteConfirmModal";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner"
import $ from 'jquery';
import './InvoiceCreate.scss'
import CustomDatePicker from '../../common-components/CustomDatePicker/CustomDatePicker';
import AddressInput from '../../common-components/AddressInput/AddressInput'
import InvoiceSendPopup from '../../common-components/InvoiceSendPopup/InvoiceSendPopup';


const InvoiceCreate = ( {invoiceType} ) => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        $(function() {
      $(window).scrollTop(0);
      });
      }, [invoiceType]) 

    const loadPage = () => {
        navigate(window.location.pathname);
    };


    const [message, setMessage] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInvoiceSendModalOpen, setIsInvoiceSendModalOpen] = useState(false);

    const  [totalFields, setTotalFields]  = useState([]);
    const  [visibleFields, setVisibleFields]  = useState([]);
    const [columnCheckedState, setColumnCheckedState] = useState({});

    const [showAddRow, setShowAddRow] = useState(false);
    const [newRow, setNewRow] = useState({});

    // change Column names as Invoice Type
    useEffect(() => {
      let fieldList = [{label:"Sl No.", key_name:"sl_no"}, {label:"Item", key_name:"item"},
                        {label:"Duration", key_name:"duration"}, {label:"Amount", key_name:"amount"},]
      if (invoiceType === 'service' ) {
        fieldList = [
          {label:"Sl No.", key_name:"sl_no"}, 
          {label:"Service", key_name:"item"},
          {label:"Duration", key_name:"duration"},
          {label:"Amount", key_name:"amount"},
        ]
      }
      else if (invoiceType === 'contract') {
        fieldList = [
          {label:"Sl No.", key_name:"sl_no"}, 
          {label:"Employee Name", key_name:"item"},
          {label:"Duration", key_name:"duration"},
          {label: "Days Worked", key_name: 'days_worked'},
          {label:"Amount", key_name:"amount"},
        ]
      } 
      else if (invoiceType === 'product') {
        fieldList = [
          {label:"Sl No.", key_name:"sl_no"}, 
          {label:"Product", key_name:"item"},
          {label:"Duration", key_name:"duration"},
          {label:"Amount", key_name:"amount"},
        ]
        }
      setTotalFields(fieldList);
      setVisibleFields(fieldList);
      // Initialize checked state based on fieldList
      const initialCheckedState = fieldList.reduce((acc, field) => {
        acc[field.key_name] = true;
        return acc;
      }, {});
      setColumnCheckedState(initialCheckedState);
    }, [invoiceType]);
  
  const handleColumnCheckboxChange = (key_name) => {
    setColumnCheckedState((prevState) => {
      const newCheckedState = { ...prevState, [key_name]: !prevState[key_name] };

      const newVisibleFields = totalFields.filter(field => newCheckedState[field.key_name]);
      setVisibleFields(newVisibleFields);

      return newCheckedState;
    });
  };



    
    const [manageColumnOpened, setManageColumn] = useState(false);
    useEffect(() => {
      const $OptionDropList = $("#manage_column .option-list");
      if (manageColumnOpened) {
          const height = $OptionDropList[0].scrollHeight;
          $OptionDropList.animate({ height: height + "px" }, 400);
          $OptionDropList.css("opacity", "1");
      } else {
          $OptionDropList.animate({ height: "0px" }, 400);
          $OptionDropList.css("opacity", "0");
      }
  }, [manageColumnOpened]);

    // Address 
    const AddressList = [
        {
            id: 1,
            title: 'ZOG Global Ltd Suite V3',
            address: "ZOG Global Ltd Suite V3, 4 Woodland Road,  Darlington, DL3 7PJ"
        },
        {
            id: 2,
            title: 'Mango. Inc',
            address: "Mango. Inc Apto. 761 13975 Santos Travessa,  Câmara de Lobos, UT 4431"
        }
    ]
    // Payment Accounts
    const AccountList = [
      {
          id: 1,
          title: 'Account 1',
      },
      {
          id: 2,
          title: 'Account 2',
      }
    ]
    // Currency List
    const CurrencyList = [
      {
          id: 1,
          name: '£ Pound Sterling',
      },
      {
          id: 2,
          name: '₹ Indian Rupee',
      },
      {
        id: 3,
        name: '$ US Dollar',
      }
    ]
    // Invoice Items
    const [InvoiceItemList,setInvoiceItemList] = useState([
      {
        id: 1,
        item: 'Digital Engineering',
        duration_from: '01-06-2024',
        duration_to: '23-06-2024',
        amount: '£450.62',
      },
      {
        id: 2,
        item: 'Cybersecurity',
        duration_from: '01-06-2024',
        duration_to: '23-06-2024',
        amount: '£450.62',
      },
      {
        id: 3,
        item: 'Cybersecurity',
        duration_from: '01-06-2024',
        duration_to: '23-06-2024',
        amount: '£450.62',
      }
    ]) 

    
    const [formData, setFormData] = useState({
        bill_from: "",
        bill_to: "",
        invoice_number: "",
        due_date: '',
        payment_account: "", 
        currency: '',
        
      });


    const validateForm = (data) => { 
        const errors = {};

        if (!data.title.trim()) {
            errors.title = "Title is required.";
        }
        if (!data.type) {
            errors.job_type = "Select job type";
        }
        if (!data.department) {
          errors.department = "Select department";
        }
        if (!data.location) {
            errors.location = "Select job location";
        }
        if (!data.salary_currency) {
          errors.salary_currency = "Select currency";
        }
        if (data.skills.length === 0) {
          errors.skills = "Add skills";
        }
        

        return errors;
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

  
  


    // Bill From
    const [billFromListOpened, toggleBillFromList] = useState(false);
    const selectBillFrom = (value) => {
        setFormData((formData) => ({
          ...formData,
          bill_from: value
        }));
      }
    useEffect(() => {
        const $OptionDropList = $("#bill_from .option-list");
        if (billFromListOpened) {
            const height = $OptionDropList[0].scrollHeight;
            $OptionDropList.animate({ height: height + "px" }, 400);
            $OptionDropList.css("opacity", "1");
        } else {
            $OptionDropList.animate({ height: "0px" }, 400);
            $OptionDropList.css("opacity", "0");
        }
    }, [billFromListOpened,invoiceType]);
    // Bill To
    const [billToListOpened, toggleBillToList] = useState(false);
    const selectBillTo = (value) => {
        setFormData((formData) => ({
          ...formData,
          bill_to: value
        }));
      }
    useEffect(() => {
        const $OptionDropList = $("#bill_to .option-list");
        if (billToListOpened) {
            const height = $OptionDropList[0].scrollHeight;
            $OptionDropList.animate({ height: height + "px" }, 400);
            $OptionDropList.css("opacity", "1");
        } else {
            $OptionDropList.animate({ height: "0px" }, 400);
            $OptionDropList.css("opacity", "0");
        }
    }, [billToListOpened,invoiceType]);

    // Due Date
    const handleDueDateChange = (date) =>{
      const formattedDate = date.toISOString().slice(0, 10);
      setFormData((formData) => ({
        ...formData,
        due_date: formattedDate
      }));
    }

    // Payment Account
    const [paymentAccountListOpened, toggleAccountList] = useState(false);
    const selectPaymentAccount = (value) => {
        setFormData((formData) => ({
          ...formData,
          payment_account: value
        }));
      }
    useEffect(() => {
        const $OptionDropList = $("#payment_account .option-list");
        if (paymentAccountListOpened) {
            const height = $OptionDropList[0].scrollHeight;
            $OptionDropList.animate({ height: height + "px" }, 400);
            $OptionDropList.css("opacity", "1");
        } else {
            $OptionDropList.animate({ height: "0px" }, 400);
            $OptionDropList.css("opacity", "0");
        }
    }, [paymentAccountListOpened]);

    // Currency
    const [currencyListOpened, toggleCurrencyList] = useState(false)
    const selectCurrency = (value) => {
      setFormData((formData) => ({
        ...formData,
        currency: value
      }));
    }
    useEffect(() => {
        const $OptionDropList = $("#currency .option-list");
        if (currencyListOpened) {
            const height = $OptionDropList[0].scrollHeight;
            $OptionDropList.animate({ height: height + "px" }, 400);
            $OptionDropList.css("opacity", "1");
        } else {
            $OptionDropList.animate({ height: "0px" }, 400);
            $OptionDropList.css("opacity", "0");
        }
    }, [currencyListOpened]);
    

    // Invoice Item Rows
    const handleAddRowChange = (e) => {
      const { name, value } = e.target;
      setNewRow((prevRow) => ({
        ...prevRow,
        [name]: value,
      }));
    };

    // Invoice Item Edit
    const [expandedRows, setExpandedRows] = useState({});

    const handleToggle = (index) => {
      setExpandedRows((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
    

    const handleSaveAsDraft = (type,formData,visibleFields) => {
      navigate(`/admin/invoice/confirm`, { state: { invoiceType: type ,formData:formData, visibleFields:visibleFields} });
    };
    

    return (
        <>
         
        <div className='px-0 px-md-4 py-3 full-screen-table-container invoice-create'>
            <div className='text-title'>
                <h3>Create {invoiceType} Invoice</h3>
                <div className='btns' onClick={()=> setIsInvoiceSendModalOpen(true)}>
                  <button className='admin-blue-btn' >
                   Send Invoice
                  </button>
                  <button className='admin-black-btn' onClick={() => handleSaveAsDraft(invoiceType,formData,visibleFields)}>
                   Save as Draft
                  </button>
                </div>
            </div>
            <form className='form-card' >

              <div className='description'>
                <div className='card'>
                  <div className='sec-1'>
                    <div className='lhs'>
                      <div className='title'>Bill From</div>
                      {/* Check Invoice type */}
                      { invoiceType === 'custom' ? ( 
                        <div className='text-input form-row'>
                          <input type='text' className='form-control' id='organisation_name' placeholder='Organisation Name' />
                          {/* <input type='text' className='form-control' placeholder='Organisation Address' /> */}
                          <AddressInput id={'bill_from'} formData={formData} setFormData={setFormData}/>
                        </div>
                      
                      ) : (
                        <div className='bill-from-select form-row'>
                          <div className="custom-select form-control form-select" id="bill_from" name="bill_from"
                            onClick={() => toggleBillFromList(!billFromListOpened)}>
                            <div className="selected-value">{formData.bill_from ? formData.bill_from : "Select"}
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                              <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                              </mask>
                              <g mask="url(#mask0_3764_11686)">
                              <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              </svg>
                            </div>
                            <div className='option-list'>
                              {AddressList.map(option => (
                                  <div 
                                      key={option.id} 
                                      className='option' 
                                      onClick={() => selectBillFrom(option.address)}
                                  >
                                  {option.address}
                              </div>
                              ))}
                            </div>
                          </div>

                          {formData.bill_from && 
                              <div className='selected-address'>
                                  {formData.bill_from}
                              </div>
                            }
                          {errors.bill_from && <div className="invalid-feedback">{errors.bill_from}</div>}
                        </div>
                      
                      ) }
                      

                      <div className='title'>Bill To</div>
                      {/* Check Invoice type */}
                      { invoiceType === 'custom' ? ( 
                        <div className='text-input form-row'>
                          <input type='text' className='form-control' id='organisation_name' placeholder='Organisation Name' />
                          {/* <input type='text' className='form-control' placeholder='Organisation Address' /> */}
                          <AddressInput formData={formData} setFormData={setFormData}/>
                        </div>
                        
                      
                      ) : (
                        <div className='bill-to-select  form-row'>
                          <div className="custom-select form-control form-select" id="bill_to" name="bill_to"
                            onClick={() => toggleBillToList(!billToListOpened)}>
                            <div className="selected-value">{formData.bill_to ? formData.bill_to : "Select"}
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                              <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                              </mask>
                              <g mask="url(#mask0_3764_11686)">
                              <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              </svg>
                            </div>
                            <div className='option-list'>
                              {AddressList.map(option => (
                                  <div 
                                      key={option.id} 
                                      className='option' 
                                      onClick={() => selectBillTo(option.address)}
                                  >
                                  {option.address}
                              </div>
                              ))}
                            </div>
                          </div>

                          {formData.bill_to && 
                              <div className='selected-address'>
                                  {formData.bill_to}
                              </div>
                            }
                          {errors.bill_to && <div className="invalid-feedback">{errors.bill_to}</div>}
                        </div>
                      )}

                      { invoiceType === 'custom' && 
                        <div className='client-inputs'>
                          <label>Client Name <span>(optional)</span></label>
                          <div className='text-input'>
                            <input type='text' className='form-control' id='first_name' placeholder='First Name' />
                            <input type='text' className='form-control' id='last_name' placeholder='Last Name' />
                          </div>
                          
                          
                        </div>
                      }

                    </div>
                    <div className='rhs'>
                        <div className='title'>Invoice Details</div>
                        <div className=' text-input  form-row'>
                            <label>Invoice Number</label>
                            <input type='text' value={'ZGUKS15201'} id='jobid' className='form-control' disabled={true} />
                        </div>

                        <div className='form-row due-select'>
                          <label>Payment Due Date</label>
                          <CustomDatePicker
                            selected={formData.due_date}
                            dateFormat={"dd/MM/yyyy"} placeholder={'DD/MM/YYYY'} 
                            // showMonthYearPicker={showMonthYearPicker}
                            // showYearPicker={showYearPicker} 
                            onChange={(date)=>handleDueDateChange(date)}
                            minDate={new Date()}
                            />
                            {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}
                        </div>

                        <div className='payment-select  form-row'>
                          <label>Payment Account</label>
                          <div className="custom-select form-control form-select" id="payment_account" name="payment_account"
                            onClick={() => toggleAccountList(!paymentAccountListOpened)}>
                            <div className="selected-value">{formData.payment_account ? formData.payment_account : "Select"}
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                              <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                              </mask>
                              <g mask="url(#mask0_3764_11686)">
                              <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              </svg>
                            </div>
                            <div className='option-list'>
                              {AccountList.map(option => (
                                  <div 
                                      key={option.id} 
                                      className='option' 
                                      onClick={() => selectPaymentAccount(option.title)}
                                  >
                                  {option.title}
                              </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className='payment-select  form-row'>
                          <label>Currency</label>
                          <div className="custom-select form-control form-select" id="currency" name="currency"
                            onClick={() => toggleCurrencyList(!currencyListOpened)}>
                            <div className="selected-value">{formData.currency ? formData.currency : "Select"}
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                              <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                              </mask>
                              <g mask="url(#mask0_3764_11686)">
                              <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              </svg>
                            </div>
                            <div className='option-list'>
                              {CurrencyList.map(option => (
                                  <div 
                                      key={option.id} 
                                      className='option' 
                                      onClick={() => selectCurrency(option.name)}
                                  >
                                  {option.name}
                              </div>
                              ))}
                            </div>
                          </div>
                        </div>

                    </div>
                    
                  </div>
                  <div className='sec-2'>
                    <div className='table-section'>
                      <div className='title'>
                        <span>Items</span>
                        <div className='manage-column' id='manage_column'>
                          <button type='button' onClick={()=> setManageColumn(!manageColumnOpened)}>
                            <span>Manage Columns</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_289_3764)">
                              <path d="M18.0157 -1L7.01575 10L-3.98425 -1" stroke="#0587DB" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              <defs>
                              <clipPath id="clip0_289_3764">
                              <rect width="14" height="14" fill="white"/>
                              </clipPath>
                              </defs>
                            </svg>
                          </button>
                          {manageColumnOpened && 
                            <div className='option-list'>
                              {totalFields.map((option, index) => (
                                <div className='option'>
                                  <label className="custom-select-box" >
                                    <input type="checkbox"
                                      checked={columnCheckedState[option.key_name] || false}
                                      onChange={() => handleColumnCheckboxChange(option.key_name)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className=''></span>{option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          }
                          
                        </div>
                        

                      </div>
                      <table>
                        <thead>
                          <tr>
                            {visibleFields.map((field, index) => (
                              <th key={index}>{field.label}</th>
                            ))}
                              
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {InvoiceItemList.map((item, index) => (
                            <>
                            
                            <tr className={`accordion-toggle ${expandedRows[index] ? '' : 'collapsed'}`}>
                              
                              {visibleFields.map((field, fieldIndex) => (
                                <td key={fieldIndex}>
                                  {field.key_name === 'sl_no' ? index + 1 :
                                    field.key_name === 'duration' ? `${item.duration_from} - ${item.duration_to}` :
                                      item[field.key_name]}
                                </td>
                              ))}
                              <td className='text-center'>
                                <img 
                                  src='/images/admin-panel/icon-arrow-down.svg' 
                                  alt='' 
                                  className={`toggle-icon ${expandedRows[index] ? 'rotate' : ''}`}
                                  onClick={() => handleToggle(index)}
                                />
                              </td>
                            </tr>
                            {expandedRows[index] && (
                            <tr className="hide-table-padding">
                              <td colSpan={visibleFields.length + 1}>
                                <div className='add-row-section'>
                                  {visibleFields.map((field, index) => (
                                    field.key_name !== 'sl_no' && (
                                      <div key={index}>
                                        <label>{field.label}</label>
                                        {field.key_name === 'item' ? (
                                          <div className='payment-select  form-row'>
                                          <div className="custom-select form-control form-select" id="currency" name="currency">
                                            <div className="selected-value">Select  {field.label}
                                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                                              <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                                              </mask>
                                              <g mask="url(#mask0_3764_11686)">
                                              <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                              </g>
                                              </svg>
                                            </div>
                                          
                                          </div>
                                        </div>
                                        ) : field.key_name === 'duration' ? (
                                          <div className='duration'>
                                            <CustomDatePicker
                                              selected={formData.due_date}
                                              dateFormat={"dd/MM/yyyy"} placeholder={'From'} 
                                              minDate={new Date()}
                                              />
                                            <CustomDatePicker
                                              selected={formData.due_date}
                                              dateFormat={"dd/MM/yyyy"} placeholder={'To'} 
                                              minDate={new Date()}
                                              />
                                          </div>
                                        ) : (
                                          <div className={`text-input ${field.key_name}`}>
                                            <input type='text' className='form-control' />
                                        </div>
                                        )}
                                      </div>
                                    )
                                  ))}
                                  <button className='del-button'>
                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.25 12.4502H13.75V24.4502H12.25V12.4502Z" fill="#646B77"/>
                                      <path d="M15.25 12.4502H16.75V24.4502H15.25V12.4502Z" fill="#646B77"/>
                                      <path d="M18.25 12.4502H19.75V24.4502H18.25V12.4502Z" fill="#646B77"/>
                                      <path d="M6.25 7.9502H25.75V9.4502H6.25V7.9502Z" fill="#646B77"/>
                                      <path d="M19.7 8.7H18.3V7.2C18.3 6.75 17.95 6.4 17.5 6.4H14.5C14.05 6.4 13.7 6.75 13.7 7.2V8.7H12.3V7.2C12.3 6 13.3 5 14.5 5H17.5C18.7 5 19.7 6 19.7 7.2V8.7Z" fill="#646B77"/>
                                      <path d="M20.5 28.9499H11.5C10.3 28.9499 9.25 27.9499 9.15 26.7499L7.75 8.7499L9.25 8.6499L10.65 26.6499C10.7 27.0999 11.1 27.4499 11.5 27.4499H20.5C20.95 27.4499 21.35 27.0499 21.35 26.6499L22.75 8.6499L24.25 8.7499L22.85 26.7499C22.75 27.9999 21.7 28.9499 20.5 28.9499Z" fill="#646B77"/>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}

                            </>
                            ))}
                        </tbody>
                        
                      </table>

                      {showAddRow && (
                        <div className='add-row-section'>
                        {visibleFields.map((field, index) => (
                          field.key_name !== 'sl_no' && (
                            <div key={index}>
                              <label>{field.label}</label>
                              {field.key_name === 'item' ? (
                                <div className='payment-select  form-row'>
                                <div className="custom-select form-control form-select" id="currency" name="currency">
                                  <div className="selected-value">Select  {field.label}
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_3764_11686" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                                    <path d="M24.5 24V0L0.5 0V24H24.5Z" fill="white"/>
                                    </mask>
                                    <g mask="url(#mask0_3764_11686)">
                                    <path d="M23.5 6.5L12.5 17.5L1.5 6.5" stroke="#757F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    </svg>
                                  </div>
                                 
                                </div>
                              </div>
                              ) : field.key_name === 'duration' ? (
                                <div className='duration'>
                                  <CustomDatePicker
                                    selected={formData.due_date}
                                    dateFormat={"dd/MM/yyyy"} placeholder={'From'} 
                                    minDate={new Date()}
                                    />
                                  <CustomDatePicker
                                    selected={formData.due_date}
                                    dateFormat={"dd/MM/yyyy"} placeholder={'To'} 
                                    minDate={new Date()}
                                    />
                                </div>
                              ) : (
                                <div className={`text-input ${field.key_name}`}>
                                  <input type='text' className='form-control' />
                              </div>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                      )}
                      <div className='add-item'>
                        <button type='button' onClick={() => setShowAddRow(!showAddRow)}>
                          <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5121 2.08337C13.3729 2.08337 14.0823 2.78562 14.0823 3.64856L14.0827 10.9466H21.358C22.2188 10.9466 22.9166 11.6462 22.9166 12.5091C22.9166 13.3721 22.2188 14.0716 21.358 14.0716H14.0827L14.0825 21.3497C14.0825 22.2127 13.3848 22.9122 12.524 22.9122C11.6632 22.9122 10.9654 22.2127 10.9654 21.3497L10.9656 14.0716H3.66261C2.80184 14.0716 2.08325 13.3505 2.08325 12.4876C2.08325 11.6246 2.80184 10.9466 3.66261 10.9466H10.9656L10.9652 3.64856C10.9652 2.78562 11.6513 2.08337 12.5121 2.08337Z" fill="#0587DB"/>
                          </svg>
                          <span>New Invoice Line</span>
                        </button>
                        

                        <button type='button'  className='admin-black-btn'>
                          <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5121 2.08337C13.3729 2.08337 14.0823 2.78562 14.0823 3.64856L14.0827 10.9466H21.358C22.2188 10.9466 22.9166 11.6462 22.9166 12.5091C22.9166 13.3721 22.2188 14.0716 21.358 14.0716H14.0827L14.0825 21.3497C14.0825 22.2127 13.3848 22.9122 12.524 22.9122C11.6632 22.9122 10.9654 22.2127 10.9654 21.3497L10.9656 14.0716H3.66261C2.80184 14.0716 2.08325 13.3505 2.08325 12.4876C2.08325 11.6246 2.80184 10.9466 3.66261 10.9466H10.9656L10.9652 3.64856C10.9652 2.78562 11.6513 2.08337 12.5121 2.08337Z" fill="#0587DB"/>
                          </svg>
                            Apply Coupons
                        </button>
                      </div>
                      
                      <div className='total'>
                          <div className='data-row'>
                            <span className='key'>Sub Total</span>
                            <span className='value'>£ 200.00</span>
                          </div>
                          <div className='data-row'>
                            <span className='key'>Admin Fee</span>
                            <span className='value'>£ 200.00</span>
                          </div>
                          <div className='data-row'>
                            <span className='key'>VAT</span>
                            <span className='value'>£ 200.00</span>
                          </div>
                          {(invoiceType === 'service' || invoiceType === 'product') && (
                            <div className='data-row'>
                              <span className='key'>Coupon Applied</span>
                              <span className='value'>£ 200.00</span>
                            </div>
                          )}
                          <div className='data-row grand-total'>
                            <span className='key'>Grand Total</span>
                            <span className='value'>£ 800.00</span>
                          </div>
                      </div>
                      
                     
                    </div>
                  </div>
                  
                
                        
                </div>
              </div>
                  

              {/* Preview */}
              <div className='continue-sec'>
                  {/* <button type='button' onClick={handleDoneButton}  className='admin-blue-btn'>Done!</button> */}
              </div>

            </form>
            
        </div>
        

        <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={loadPage} />
        {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={loadPage} />}
        {isInvoiceSendModalOpen && <InvoiceSendPopup message={message} setterFunction={setIsInvoiceSendModalOpen} okClickedFunction={loadPage} formData={formData} setFormData={setFormData} />}
        
        {isLoading && <FixedOverlayLoadingSpinner />} 
        </>

    )
}

export default InvoiceCreate