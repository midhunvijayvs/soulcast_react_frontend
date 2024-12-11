import React from "react";
import { useEffect, useState } from "react";
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import "./InvoiceList.scss"
import "../../common-components/AdminListPage.scss"

import API from '../../../API';
import LoadingSpinner from "../../../LoadingSpinner";
import ErrorModal from "../../../ErrorModal";
import PositiveModal from "../../../PositiveModal";
import DeleteConfirmModal from "../../../DeleteConfirmModal";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner"


import Pagination from "../../common-components/Pagination";
import InvoiceTypePopup from "../../common-components/InvoiceTypePopup/InvoiceTypePopup";
import InvoiceFilter from "../../common-components/InvoiceFilter/InvoiceFilter";


const InvoiceList = () => {

    const invoiceData = [
        {
            id: 1,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'pending',
        },
        {
            id: 2,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'paid',
        },
        {
            id: 3,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'overdue',
        },
        {
            id: 4,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'sent',
        },
        {
            id: 5,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'pending',
        },
        {
            id: 6,
            invoice_id: '#10126',
            invoice_type: 'services',
            due_date: '25/05/2024',
            client_name: 'Thomas Jackson',
            amount: '450.62',
            invoice_status: 'pending',
        },
        
    ]

    let navigate = useNavigate();

    const [data, setData] = useState(null);
    const [searchKey, setSearchKey] = useState(null);

    const [selectedOptions, setSelectedOptions] = useState({location:null, department:null});
    const [filters, setFilters] = useState({
        invoice_status: null,
        invoice_type: null,
        from_date: null, 
        to_date: null,
        search_key: null,
        sort_order:null,
        period:'By Month'
    });
    const [page, setPage] = useState(1);
    const [pageSize, selectPageSize] = useState(10);

    const [message, setMessage] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [isDeleteConfModalOpen, setIsDeleteConfModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isCreateTypePopupOpen, setIsCreateTypePopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');
    const [idSelected, setIdSelected] = useState(0);

    

    const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);
    
    const [sortBy, setSortBy] = useState('');
    const handleSortChange = (value) => {
        setSortBy(value);
        setFilters({ ...filters, sort_order: value });
        setIsSortDropDownOpen(false);
    };

    // select
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allItemIds = invoiceData.map(item => item.id);
            setSelectedItems(allItemIds);
        } else {
            setSelectedItems([]);
        }
    };

    const handleCheckboxChange = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };


    useEffect(() => {
        localStorage.removeItem('itemSelectedId')
        $(function() {
      $(window).scrollTop(0);
      });
      }, []) 

    useEffect(() => {
        loadTableData();
    }, [page, pageSize, searchKey,selectedTab,sortBy,filters]);

    // sort dropdown
    useEffect(() => {
      const optionList = $("#sortby .option-list");
      const contentHeight = optionList.prop('scrollHeight');
      
      if (isSortDropDownOpen) {
        optionList.animate({ height: contentHeight }, 400);
        optionList.css("opacity", "1");
      } else {
        optionList.animate({ height: 0 }, 400);
        optionList.css("opacity", "0");
      }
    }, [isSortDropDownOpen]);

    // Action dropdown
    const [isActionListOpen, setActionListOpen] = useState([]);
    const toggleAction = (index) => {
        const updatedDropDownState = [...isActionListOpen];
        updatedDropDownState[index] = !updatedDropDownState[index];
        setActionListOpen(updatedDropDownState);
    };


    

    const loadTableData = () => {
        // setIsLoading(true)
        setData(null);
        setIsMessageModalOpen(false);

        let apiUrl = `/invoice/?page=${page}&page_size=${pageSize}`;

        // setting search key as a parameter

        if (searchKey !== null) {
            apiUrl += `&search_key=${searchKey}`;
        }
        for (let filter in filters) {
            if (filters[filter] !== null) {
                apiUrl += `&${filter}=${filters[filter]}`;
            }
        }
        if (selectedTab !== 'all') {
            if (selectedTab === 'draft') {
                apiUrl += '&is_published=False';
            } else {
                apiUrl += `&${selectedTab}=True`;
            }
        }

        console.log(apiUrl);
        API.get(apiUrl)
            .then(response => {
                setData(response.data);
                setActionListOpen(Array(response.data.results.length).fill(false));
                console.log(response.data);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error);
                setMessage(error.message);
                setIsErrorModalOpen(true);
                setIsLoading(false)
            });
    }


    const Search = (key) => {

        if (key === "Enter") {

            const searchKEY = document.getElementById("search-input").value
            console.log("searchKey from layout", searchKEY);

            setSearchKey(searchKEY);
        }

    }

    const editItem = (id) => {
        localStorage.setItem("itemSelectedId",id)
        // navigate("/admin/job/update");
    };

 
    const deleteItem = (itemIds) => {
        setIsLoading(true);
        console.log('to-delete:',itemIds);
        Promise.all(itemIds.map(itemId => {
            let requestPromise;
            if (selectedTab === 'is_trash') {
                requestPromise = API.delete(`/invoice/${itemId}/`, );
            } else {
                requestPromise = API.put(`/invoice/${itemId}/`, { is_deleted: true });
            }
            // console.log(requestPromise);
            return requestPromise
                .then(() => console.log(`Item ${itemId} deleted successfully`))
                .catch(error => {
                    console.error(`Error deleting item ${itemId}:`, error.message);
                    throw error;
                });
        }))
        .then(() => {
            setMessage("Items deleted successfully");
            setIsLoading(false);
            setIsMessageModalOpen(true);
            setSelectedItems([]);
            loadTableData();
            setSelectAll(false);
        }).catch(error => {
            setMessage(error.message);
            setIsLoading(false);
            setIsErrorModalOpen(true);
            
        });
    };
  

    


 
    
    return (
        <div className='px-0 px-md-4 py-3 full-screen-table-container invoice'>
            <div className='text-title'>
                <h3>Invoice Library</h3>
            </div>
            <div className="filter-tabs">
                <div className="tabs">
                  <button className={selectedTab === 'all' ? 'active' : ''} onClick={() => setSelectedTab('all')}>All</button>
                  <button className={selectedTab === 'service' ? 'active' : ''} onClick={() => setSelectedTab('service')}>Service</button>
                  <button className={selectedTab === 'contract' ? 'active' : ''} onClick={() => setSelectedTab('contract')}>Contract</button>
                  <button className={selectedTab === 'product' ? 'active' : ''} onClick={() => setSelectedTab('product')}>Product</button>
                  <button className={selectedTab === 'others' ? 'active' : ''} onClick={() => setSelectedTab('others')}>Others</button>
                  <button className={selectedTab === 'draft' ? 'active' : ''} onClick={() => setSelectedTab('draft')}>Drafts</button>
                </div>
                <div className="btns">
                  <div className="sort-container">
                    <button className="sort-btn custom-select" id="sortby" onClick={() => setIsSortDropDownOpen(!isSortDropDownOpen)}>
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_337_5310)">
                          <path d="M3.25 19.5H9.75V17.3333H3.25V19.5ZM3.25 6.5V8.66667H22.75V6.5H3.25ZM3.25 14.0833H16.25V11.9167H3.25V14.0833Z" fill="#212429"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_337_5310">
                          <rect width="26" height="26" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                          <span>Sort</span>
                          <div className='option-list sort-by'>
                              <div className='option' onClick={() => handleSortChange('invoice_type')}>Type</div>
                              <div className='option' onClick={() => handleSortChange("due_date")}>Due Date</div>
                              <div className='option' onClick={() => handleSortChange("amount_high_to_low")}>Amount High to Low</div>
                              <div className='option' onClick={() => handleSortChange("amount_low_to_high")}>Amount Low to High</div>
                          </div>
                    </button>
                  </div>
                  <button className="filter-btn" onClick={() => setIsFilterModalOpen(true)}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_337_5315)">
                      <path d="M21.3942 7.78363H9.56613C9.3816 7.78363 9.20463 7.71032 9.07415 7.57984C8.94367 7.44936 8.87036 7.27239 8.87036 7.08786C8.87036 6.90333 8.94367 6.72636 9.07415 6.59588C9.20463 6.46539 9.3816 6.39209 9.56613 6.39209H21.3942C21.5787 6.39209 21.7557 6.46539 21.8862 6.59588C22.0167 6.72636 22.09 6.90333 22.09 7.08786C22.09 7.27239 22.0167 7.44936 21.8862 7.57984C21.7557 7.71032 21.5787 7.78363 21.3942 7.78363Z" fill="#212429"/>
                      <path d="M6.78308 7.78363H4.69577C4.51124 7.78363 4.33427 7.71032 4.20379 7.57984C4.0733 7.44936 4 7.27239 4 7.08786C4 6.90333 4.0733 6.72636 4.20379 6.59588C4.33427 6.46539 4.51124 6.39209 4.69577 6.39209H6.78308C6.96761 6.39209 7.14458 6.46539 7.27506 6.59588C7.40554 6.72636 7.47885 6.90333 7.47885 7.08786C7.47885 7.27239 7.40554 7.44936 7.27506 7.57984C7.14458 7.71032 6.96761 7.78363 6.78308 7.78363Z" fill="#212429"/>
                      <path d="M16.5238 13.3491H4.69577C4.51124 13.3491 4.33427 13.2758 4.20379 13.1453C4.0733 13.0148 4 12.8378 4 12.6533C4 12.4688 4.0733 12.2918 4.20379 12.1613C4.33427 12.0308 4.51124 11.9575 4.69577 11.9575H16.5238C16.7084 11.9575 16.8853 12.0308 17.0158 12.1613C17.1463 12.2918 17.2196 12.4688 17.2196 12.6533C17.2196 12.8378 17.1463 13.0148 17.0158 13.1453C16.8853 13.2758 16.7084 13.3491 16.5238 13.3491Z" fill="#212429"/>
                      <path d="M9.56615 18.916H4.69577C4.51124 18.916 4.33427 18.8426 4.20379 18.7122C4.0733 18.5817 4 18.4047 4 18.2202C4 18.0357 4.0733 17.8587 4.20379 17.7282C4.33427 17.5977 4.51124 17.5244 4.69577 17.5244H9.56615C9.75068 17.5244 9.92765 17.5977 10.0581 17.7282C10.1886 17.8587 10.2619 18.0357 10.2619 18.2202C10.2619 18.4047 10.1886 18.5817 10.0581 18.7122C9.92765 18.8426 9.75068 18.916 9.56615 18.916Z" fill="#212429"/>
                      <path d="M8.17483 9.17461C7.762 9.17461 7.35844 9.0522 7.01519 8.82284C6.67193 8.59348 6.4044 8.26749 6.24641 7.88609C6.08843 7.50468 6.04709 7.08499 6.12763 6.68009C6.20817 6.2752 6.40697 5.90327 6.69888 5.61136C6.9908 5.31944 7.36272 5.12065 7.76762 5.04011C8.17252 4.95957 8.59221 5.0009 8.97361 5.15889C9.35502 5.31687 9.68101 5.58441 9.91037 5.92766C10.1397 6.27092 10.2621 6.67448 10.2621 7.08731C10.2621 7.6409 10.0422 8.17181 9.65078 8.56326C9.25934 8.9547 8.72842 9.17461 8.17483 9.17461ZM8.17483 6.39154C8.03722 6.39154 7.9027 6.43235 7.78828 6.5088C7.67387 6.58525 7.58469 6.69391 7.53203 6.82105C7.47936 6.94818 7.46559 7.08808 7.49243 7.22305C7.51928 7.35801 7.58554 7.48199 7.68285 7.57929C7.78015 7.6766 7.90413 7.74286 8.0391 7.76971C8.17406 7.79655 8.31396 7.78278 8.44109 7.73011C8.56823 7.67745 8.67689 7.58828 8.75334 7.47386C8.8298 7.35944 8.8706 7.22492 8.8706 7.08731C8.8706 6.90278 8.7973 6.72581 8.66682 6.59532C8.53633 6.46484 8.35936 6.39154 8.17483 6.39154Z" fill="#212429"/>
                      <path d="M17.9157 14.741C17.5028 14.741 17.0993 14.6186 16.756 14.3892C16.4128 14.1599 16.1452 13.8339 15.9873 13.4525C15.8293 13.0711 15.7879 12.6514 15.8685 12.2465C15.949 11.8416 16.1478 11.4697 16.4397 11.1778C16.7316 10.8859 17.1036 10.6871 17.5085 10.6065C17.9134 10.526 18.3331 10.5673 18.7145 10.7253C19.0959 10.8833 19.4219 11.1508 19.6512 11.4941C19.8806 11.8373 20.003 12.2409 20.003 12.6537C20.003 13.2073 19.7831 13.7382 19.3916 14.1297C19.0002 14.5211 18.4693 14.741 17.9157 14.741ZM17.9157 11.9579C17.7781 11.9579 17.6435 11.9988 17.5291 12.0752C17.4147 12.1517 17.3255 12.2603 17.2729 12.3875C17.2202 12.5146 17.2064 12.6545 17.2333 12.7895C17.2601 12.9244 17.3264 13.0484 17.4237 13.1457C17.521 13.243 17.645 13.3093 17.7799 13.3361C17.9149 13.363 18.0548 13.3492 18.1819 13.2965C18.3091 13.2439 18.4177 13.1547 18.4942 13.0403C18.5706 12.9258 18.6114 12.7913 18.6114 12.6537C18.6114 12.4692 18.5381 12.2922 18.4077 12.1617C18.2772 12.0312 18.1002 11.9579 17.9157 11.9579Z" fill="#212429"/>
                      <path d="M10.9577 20.3069C10.5448 20.3069 10.1413 20.1845 9.79802 19.9552C9.45477 19.7258 9.18723 19.3998 9.02925 19.0184C8.87127 18.637 8.82993 18.2173 8.91047 17.8124C8.99101 17.4075 9.18981 17.0356 9.48172 16.7437C9.77364 16.4518 10.1456 16.253 10.5505 16.1724C10.9554 16.0919 11.375 16.1332 11.7564 16.2912C12.1379 16.4492 12.4638 16.7167 12.6932 17.06C12.9226 17.4032 13.045 17.8068 13.045 18.2196C13.045 18.7732 12.8251 19.3041 12.4336 19.6956C12.0422 20.087 11.5113 20.3069 10.9577 20.3069ZM10.9577 17.5239C10.8201 17.5239 10.6855 17.5647 10.5711 17.6411C10.4567 17.7176 10.3675 17.8262 10.3149 17.9534C10.2622 18.0805 10.2484 18.2204 10.2753 18.3554C10.3021 18.4903 10.3684 18.6143 10.4657 18.7116C10.563 18.8089 10.687 18.8752 10.8219 18.902C10.9569 18.9289 11.0968 18.9151 11.2239 18.8624C11.3511 18.8098 11.4597 18.7206 11.5362 18.6062C11.6126 18.4918 11.6534 18.3572 11.6534 18.2196C11.6534 18.0351 11.5801 17.8581 11.4497 17.7276C11.3192 17.5972 11.1422 17.5239 10.9577 17.5239Z" fill="#212429"/>
                      <path d="M21.394 13.3491H19.3067C19.1222 13.3491 18.9452 13.2758 18.8147 13.1453C18.6843 13.0148 18.611 12.8378 18.611 12.6533C18.611 12.4688 18.6843 12.2918 18.8147 12.1613C18.9452 12.0308 19.1222 11.9575 19.3067 11.9575H21.394C21.5786 11.9575 21.7555 12.0308 21.886 12.1613C22.0165 12.2918 22.0898 12.4688 22.0898 12.6533C22.0898 12.8378 22.0165 13.0148 21.886 13.1453C21.7555 13.2758 21.5786 13.3491 21.394 13.3491Z" fill="#212429"/>
                      <path d="M21.3941 18.916H12.3491C12.1646 18.916 11.9876 18.8426 11.8571 18.7122C11.7266 18.5817 11.6533 18.4047 11.6533 18.2202C11.6533 18.0357 11.7266 17.8587 11.8571 17.7282C11.9876 17.5977 12.1646 17.5244 12.3491 17.5244H21.3941C21.5786 17.5244 21.7556 17.5977 21.8861 17.7282C22.0166 17.8587 22.0899 18.0357 22.0899 18.2202C22.0899 18.4047 22.0166 18.5817 21.8861 18.7122C21.7556 18.8426 21.5786 18.916 21.3941 18.916Z" fill="#212429"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_337_5315">
                      <rect width="26" height="26" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <span>Filter</span>
                  </button>
                </div>
            </div>

            <div className='options'>
                <div className='left-btns'>
                    
                    <button onClick={() => selectedItems.length > 0 && setIsDeleteConfModalOpen(true)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 31H8C7.20435 31 6.44129 30.6839 5.87868 30.1213C5.31607 29.5587 5 28.7956 5 28V9C5 8.73478 5.10536 8.48043 5.29289 8.29289C5.48043 8.10536 5.73478 8 6 8C6.26522 8 6.51957 8.10536 6.70711 8.29289C6.89464 8.48043 7 8.73478 7 9V28C7 28.2652 7.10536 28.5196 7.29289 28.7071C7.48043 28.8946 7.73478 29 8 29H24C24.2652 29 24.5196 28.8946 24.7071 28.7071C24.8946 28.5196 25 28.2652 25 28V9C25 8.73478 25.1054 8.48043 25.2929 8.29289C25.4804 8.10536 25.7348 8 26 8C26.2652 8 26.5196 8.10536 26.7071 8.29289C26.8946 8.48043 27 8.73478 27 9V28C27 28.7956 26.6839 29.5587 26.1213 30.1213C25.5587 30.6839 24.7956 31 24 31Z" fill="#212429"/>
                        <path d="M28 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H28C28.2652 5 28.5196 5.10536 28.7071 5.29289C28.8946 5.48043 29 5.73478 29 6C29 6.26522 28.8946 6.51957 28.7071 6.70711C28.5196 6.89464 28.2652 7 28 7Z" fill="#212429"/>
                        <path d="M20 7C19.7348 7 19.4804 6.89464 19.2929 6.70711C19.1054 6.51957 19 6.26522 19 6V3H13V6C13 6.26522 12.8946 6.51957 12.7071 6.70711C12.5196 6.89464 12.2652 7 12 7C11.7348 7 11.4804 6.89464 11.2929 6.70711C11.1054 6.51957 11 6.26522 11 6V2C11 1.73478 11.1054 1.48043 11.2929 1.29289C11.4804 1.10536 11.7348 1 12 1H20C20.2652 1 20.5196 1.10536 20.7071 1.29289C20.8946 1.48043 21 1.73478 21 2V6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7Z" fill="#212429"/>
                        <path d="M16 26C15.7348 26 15.4804 25.8946 15.2929 25.7071C15.1054 25.5196 15 25.2652 15 25V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10C16.2652 10 16.5196 10.1054 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V25C17 25.2652 16.8946 25.5196 16.7071 25.7071C16.5196 25.8946 16.2652 26 16 26Z" fill="#212429"/>
                        <path d="M21 24C20.7348 24 20.4804 23.8946 20.2929 23.7071C20.1054 23.5196 20 23.2652 20 23V13C20 12.7348 20.1054 12.4804 20.2929 12.2929C20.4804 12.1054 20.7348 12 21 12C21.2652 12 21.5196 12.1054 21.7071 12.2929C21.8946 12.4804 22 12.7348 22 13V23C22 23.2652 21.8946 23.5196 21.7071 23.7071C21.5196 23.8946 21.2652 24 21 24Z" fill="#212429"/>
                        <path d="M11 24C10.7348 24 10.4804 23.8946 10.2929 23.7071C10.1054 23.5196 10 23.2652 10 23V13C10 12.7348 10.1054 12.4804 10.2929 12.2929C10.4804 12.1054 10.7348 12 11 12C11.2652 12 11.5196 12.1054 11.7071 12.2929C11.8946 12.4804 12 12.7348 12 13V23C12 23.2652 11.8946 23.5196 11.7071 23.7071C11.5196 23.8946 11.2652 24 11 24Z" fill="#212429"/>
                        </svg>
                    </button>
                    <button className="refresh" onClick={loadTableData}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.41198 21.3389C6.23792 21.3391 6.06726 21.2907 5.91912 21.1993C5.77098 21.1079 5.65122 20.9771 5.57323 20.8214C4.46614 18.6188 4.08226 16.1229 4.47626 13.6893C4.87025 11.2558 6.02205 9.00854 7.76761 7.2677C12.3414 2.69332 19.7839 2.69332 24.3576 7.2677C24.5284 7.44451 24.6229 7.68132 24.6207 7.92713C24.6186 8.17294 24.52 8.40808 24.3462 8.5819C24.1724 8.75572 23.9372 8.85432 23.6914 8.85645C23.4456 8.85859 23.2088 8.76409 23.032 8.59332C19.1876 4.7502 12.9376 4.7502 9.09324 8.59332C7.62669 10.056 6.65904 11.944 6.32811 13.9887C5.99717 16.0333 6.31982 18.1302 7.25011 19.9808C7.32185 20.1237 7.35585 20.2826 7.34887 20.4424C7.3419 20.6021 7.29417 20.7574 7.21024 20.8935C7.12631 21.0296 7.00896 21.142 6.86935 21.22C6.72974 21.2979 6.57251 21.3389 6.41261 21.3389H6.41198Z" fill="#000"/>
                        <path d="M16.0627 27.2883C14.5223 27.2911 12.9965 26.9895 11.573 26.4009C10.1495 25.8123 8.85627 24.9482 7.76769 23.8583C7.6806 23.7713 7.61152 23.6679 7.56437 23.5542C7.51723 23.4404 7.49295 23.3185 7.49292 23.1954C7.49289 23.0723 7.51711 22.9503 7.5642 22.8366C7.6113 22.7228 7.68033 22.6194 7.76737 22.5324C7.85442 22.4453 7.95776 22.3762 8.0715 22.329C8.18524 22.2819 8.30715 22.2576 8.43028 22.2576C8.5534 22.2576 8.67533 22.2818 8.78909 22.3289C8.90285 22.376 9.00623 22.445 9.09331 22.532C12.9377 26.3752 19.1877 26.3752 23.0321 22.532C24.4986 21.0694 25.4663 19.1813 25.7972 17.1367C26.1281 15.092 25.8055 12.9951 24.8752 11.1445C24.7637 10.9223 24.7451 10.6648 24.8235 10.4288C24.9018 10.1928 25.0707 9.99758 25.293 9.88611C25.5153 9.77463 25.7727 9.75603 26.0088 9.83438C26.2448 9.91274 26.44 10.0816 26.5514 10.3039C27.4486 12.0923 27.8733 14.0804 27.785 16.0793C27.6968 18.0781 27.0985 20.0211 26.0473 21.7234C24.996 23.4258 23.5266 24.8308 21.7789 25.8048C20.0313 26.7789 18.0635 27.2896 16.0627 27.2883Z" fill="#000"/>
                        <path d="M19.7006 9.26558C19.4608 9.26437 19.2305 9.17128 19.0572 9.00545C18.8839 8.83962 18.7807 8.61367 18.769 8.3741C18.7572 8.13452 18.8377 7.89955 18.9939 7.71753C19.1501 7.53551 19.3702 7.42029 19.6087 7.39558L22.5731 7.09995L21.9787 4.12058C21.9334 3.87805 21.9855 3.62742 22.1237 3.42304C22.2619 3.21866 22.4751 3.07701 22.7171 3.02881C22.9591 2.98061 23.2103 3.02975 23.4163 3.16556C23.6223 3.30138 23.7665 3.51293 23.8175 3.75433L24.6137 7.74995C24.6393 7.87823 24.6378 8.01043 24.6092 8.13808C24.5807 8.26572 24.5257 8.38597 24.4479 8.49111C24.3701 8.59624 24.2711 8.68392 24.1574 8.74852C24.0436 8.81312 23.9176 8.85321 23.7875 8.8662L19.795 9.26433C19.7631 9.26433 19.7319 9.26558 19.7006 9.26558Z" fill="#000"/>
                        <path d="M9.22578 28.1248C9.00904 28.1247 8.79905 28.0494 8.63154 27.9119C8.46404 27.7744 8.34936 27.583 8.30703 27.3705L7.51078 23.378C7.48519 23.2496 7.48675 23.1174 7.51535 22.9897C7.54395 22.862 7.59896 22.7417 7.67685 22.6366C7.75473 22.5315 7.85376 22.4438 7.96757 22.3792C8.08138 22.3147 8.20744 22.2746 8.33765 22.2617L12.3302 21.8636C12.5775 21.8387 12.8247 21.9132 13.0172 22.0705C13.2097 22.2279 13.3318 22.4553 13.3567 22.7027C13.3816 22.95 13.3071 23.1972 13.1498 23.3897C12.9924 23.5822 12.765 23.7044 12.5177 23.7292L9.55328 24.0248L10.147 27.0042C10.1741 27.1403 10.1707 27.2808 10.1369 27.4154C10.1032 27.55 10.0399 27.6755 9.95178 27.7827C9.86364 27.8899 9.75279 27.9762 9.62724 28.0354C9.50169 28.0946 9.36457 28.1251 9.22578 28.1248Z" fill="#000"/>
                        </svg>
                    </button>
                    <button className="download">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 25.3334H28V28.0001H4V25.3334ZM17.3333 17.5627L25.428 9.46675L27.3133 11.3521L16 22.6667L4.68667 11.3534L6.572 9.46675L14.6667 17.5601V2.66675H17.3333V17.5627Z" fill="#212429"/>
                        </svg>
                    </button>
                    <button className="print">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 23H27C28.105 23 29 22.105 29 21V9C29 7.895 28.105 7 27 7H5C3.895 7 3 7.895 3 9V21C3 22.105 3.895 23 5 23H6" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M6 19H26" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M23 19H9V31H23V19Z" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M23 1H9V7H23V1Z" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M26 11H24" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M12 23H20" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        <path d="M12 27H20" stroke="#0587DB" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className='right-btns'>
                    
                    <button className="create-btn" onClick={()=>setIsCreateTypePopupOpen(true)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00971 0.666504C9.69832 0.666504 10.2659 1.2283 10.2659 1.91865L10.2662 7.7571H16.0864C16.7751 7.7571 17.3333 8.31674 17.3333 9.0071C17.3333 9.69746 16.7751 10.2571 16.0864 10.2571H10.2662L10.2661 16.0796C10.2661 16.7699 9.70783 17.3296 9.01921 17.3296C8.33059 17.3296 7.77236 16.7699 7.77236 16.0796L7.77248 10.2571H1.93011C1.24149 10.2571 0.666626 9.68022 0.666626 8.98986C0.666626 8.29951 1.24149 7.7571 1.93011 7.7571H7.77248L7.77216 1.91865C7.77216 1.2283 8.32109 0.666504 9.00971 0.666504Z" fill="white"/>
                        </svg>
                        Add Invoice
                    </button>
                </div>
            </div>

            <div className='invoice-table tbl_scroll table-box rwd-table'>
                <table>
                   
                    <tbody id='table'>
                        <tr className='bg-white heading'>
                            <th >
                                <div>
                                    <label className="custom-select-box all-select">
                                        <input type="checkbox" id="checkbox1"
                                            checked={selectAll} 
                                            onChange={toggleSelectAll}/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            
                            </th>
                            <th >ID Invoice</th>
                            <th >Invoice Type</th>
                            <th >Due Date</th>
                            <th >Client Name</th>
                            <th >Amount</th>
                            <th className="text-center" >Status</th>
                            <th >Action</th>
                        </tr>
                        {invoiceData.map((item, index) => {
                        // {data && data.results.length > 0 && data.results.map((item, index) => {
                            const isSelected = selectedItems.includes(item.id);
                            return (
                                <tr className={`table-row ${isSelected ? 'selected' : ''}`} key={item.id} >
                                    <td className="itemselect" onClick={(event) => event.stopPropagation()}>
                                        <label className="custom-select-box">
                                            <input type="checkbox" 
                                                checked={selectedItems.includes(item.id)} 
                                                onChange={() => handleCheckboxChange(item.id)}
                                                 />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    
                                    <td data-th=""  >
                                        <div className='item-details'>                                        
                                            {item.invoice_id}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='item-details type'>                                        
                                            {item.invoice_type}
                                        </div>
                                    </td>
                                    <td >
                                        <div className='item-details'>                                        
                                            {item.due_date}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='item-details'>                                        
                                            {item.client_name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='item-details'>                                        
                                            {item.amount}
                                        </div>
                                    </td>
                                    <td >
                                      <div className='status custom-select'>
                                        <div className={`status-btn ${item.invoice_status ? '' : 'grey'} 
                                                                ${item.invoice_status === 'sent' ? 'blue' : 
                                                                item.invoice_status === 'pending' ? 'orange' :
                                                                item.invoice_status === 'paid' ? 'green' :
                                                                item.invoice_status === 'overdue' ? 'red' : ''}`} 
                                           >
                                            <span>
                                                {item.invoice_status}
                                            </span>
                                           
                                        </div>


                                      </div>
                                    </td>
                                    <td>
                                        <button className="sort-btn custom-select" id="action" onClick={() => toggleAction(index)}>
                                            <img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/admin-panel/dots.svg`}  alt=""/>
                                            {isActionListOpen[index] && (
                                                <div className='option-list sort-by'>
                                                    <div className='option'>Edit Invoice</div>
                                                    <div className='option'>Download</div>
                                                    <div className='option'>Send Reminder</div>
                                                    <div className='option'>Print Invoice</div>
                                                    <div className='option'>Delete Invoice</div>
                                                </div>
                                            )}
                                        </button>
                                    </td>
                                   
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                {data &&
                    <Pagination
                        totalItems={data.count}
                        pageSize={pageSize}
                        currentPage={page}
                        setCurrentPage={setPage}
                        selectPageSize = {selectPageSize}
                        >
                        
                    </Pagination>
                }

                {data && data.results.length ===0 && <div className="no-data-message">No data available !</div> }

            </div>
            {/* <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={loadTableData} /> */}
            {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={loadTableData} />}
            {isDeleteConfModalOpen && <DeleteConfirmModal resourceName={'job'} setterFunction={setIsDeleteConfModalOpen} onDeleteFunction={() => deleteItem(selectedItems)}></DeleteConfirmModal>}
            {isFilterModalOpen && <InvoiceFilter message={message} filters={filters} setFilters={setFilters} setterFunction={setIsFilterModalOpen} okClickedFunction={loadTableData} setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions} />}
            {isCreateTypePopupOpen && <InvoiceTypePopup setterFunction={setIsCreateTypePopupOpen} okClickedFunction={setIsCreateTypePopupOpen} /> }
            {isLoading && <FixedOverlayLoadingSpinner />}
        </div>
    )

}


export default InvoiceList