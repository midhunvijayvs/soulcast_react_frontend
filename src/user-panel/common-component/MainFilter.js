import React, { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import Slider from "@mui/material/Slider";


import './MainFilter.css';
const View = ({

    categoryList,
    categorySetterFunction,

    subCategorySetterFunction,

    liveTripsFilterList,

    filters,
    setFilters,
    setTripwiseAvailability,
    setMainFiterOpen,
    userData

}) => {

    let navigate = useNavigate();


    const [accordionOpen, setAccordionOpen] = useState([true, true, true, true, true]);
    const [priceState, setPriceState] = useState([0, 100])

    const toggleAccordion = (index) => {
        setAccordionOpen((prevOpen) => {
            const updatedOpen = [...prevOpen];
            updatedOpen[index] = !updatedOpen[index];
            return updatedOpen;
        });
    };

    useEffect(() => {
        console.log("priceState", priceState)
    }, [priceState])
    const localSetPriceRange = (event, newValue) => {

        subCategorySetterFunction(null);
        setFilters(prevFilters => ({
            ...prevFilters, // Copy the existing state object
            price_range: `${newValue[0]},${newValue[1]}`,
        }));

        setPriceState([newValue[0], newValue[1]])
    }


    const localSetCategory = (id) => {
        if (filters.category == id) {
            categorySetterFunction(null)
        }
        else {
            subCategorySetterFunction(null);
            categorySetterFunction(id)
        }

    }



    const localSetAvailability = (value) => {
        if (filters.tripwise_availability == value) {
            setTripwiseAvailability(null)
        }
        else {
           setTripwiseAvailability(value)
        }
    }



    const localSetQuantity = (direction) => {

        if (direction === "plus") {
            if (filters.quantity == null) {
                setFilters(prevFilters => ({
                    ...prevFilters, // Copy the existing state object
                    quantity: 1,
                }));
            }
            else {
                setFilters(prevFilters => ({
                    ...prevFilters, // Copy the existing state object
                    quantity: parseInt(filters.quantity) + 1,
                }));
            }
        }
        else {

            if (filters.quantity == null) {
                //do nothing
            }
            else if (filters.quantity == 1) {
                setFilters(prevFilters => ({
                    ...prevFilters, // Copy the existing state object
                    quantity: null,
                }));
            }

            else {
                setFilters(prevFilters => ({
                    ...prevFilters, // Copy the existing state object
                    quantity: parseInt(filters.quantity) - 1,
                }));
            }

        }
    }







    return (
        <div className="main-filter">

            <div className="filter-box">


                {/* {window.innerWidth<992&&<button onClick={() => setMainFiterOpen(false)} className="btn btn-borderless close-button d-lg-none"><svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="22.0806" cy="22.1475" rx="16.125" ry="16.5" stroke="#33363F" stroke-width="2" />
                    <path d="M16.7056 27.6467L27.4556 16.6467" stroke="#33363F" stroke-width="2" />
                    <path d="M27.4556 27.6475L16.7056 16.6475" stroke="#33363F" stroke-width="2" />
                </svg>
                </button>} */}



                <div className="accordion">
                    <button className="btn accordion-btn" onClick={() => toggleAccordion(0)}>
                        Price
                    </button>

                    {accordionOpen[0] && (<div className="accordion-body">
                        <Slider
                            sx={{
                                '& .MuiSlider-thumb': {
                                    color: "#E05A67"
                                },
                                '& .MuiSlider-track': {
                                    color: "#E05A67"
                                },
                                '& .MuiSlider-rail': {
                                    color: "#555555"
                                },
                                '& .MuiSlider-active': {
                                    color: "green"
                                }
                            }}
                            value={priceState} onChange={localSetPriceRange} valueLabelDisplay="auto" />
                        <p className="price-result">The selected Price range is £{priceState[0]} to {priceState[1]}</p>
                    </div>)}
                </div>

                <div className="accordion">
                    <button className="btn accordion-btn" onClick={() => toggleAccordion(1)}>
                        Categories
                    </button>

                    {accordionOpen[1] && (<div className="accordion-body">
                        {categoryList && categoryList.map((item, i) => {
                            return (
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => localSetCategory(item.id)} checked={item.id === filters.category}></input>
                                    <label class="form-check-label" htmlFor="flexCheckDefault">
                                        {item.category_name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>)}
                </div>






                <div className="accordion">
                    <button className="btn accordion-btn" onClick={() => toggleAccordion(2)}>
                        Availability
                    </button>

                    {accordionOpen[2] && (<div className="accordion-body">
                        {liveTripsFilterList && liveTripsFilterList.map((item, index) => {
                            return (
                                <div class="form-check" key={index}>
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                        onChange={() => localSetAvailability(item.trip_id)} checked={item.trip_id === filters.trip}></input>
                                    <label class={"form-check-label"} htmlFor="flexCheckDefault">
                                        {item.label} {item.trip_id!=0&&"at"}  {item.route_name}
                                    </label>
                                </div>
                            )
                        })}

                    </div>)}
                </div>


                {/* <div className="accordion">
                    <button className="btn accordion-btn" onClick={() => toggleAccordion(3)}>
                        Location
                    </button>

                    {accordionOpen[3] && (<div className="accordion-body">
                        <select className="w-100" >
                            <option>Select...</option>

                        </select>
                    </div>)}
                </div> */}



                <div className="accordion">
                    <button className="btn accordion-btn" onClick={() => toggleAccordion(4)}>
                        Quantity (Kg.)
                    </button>

                    {accordionOpen[4] && (<div className="accordion-body">
                        <div className="quantity-filter">
                            <button onClick={() => localSetQuantity("minus")}><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13.0527" cy="13.0529" r="9.78951" stroke="#E05A67" stroke-width="0.802893" />
                                <path d="M16.3159 13.0525L9.78958 13.0525" stroke="#E05A67" stroke-width="0.802893" stroke-linecap="square" />
                            </svg>
                            </button>
                            <input className="form-control" value={filters.quantity ? filters.quantity : ""} onChange={(e)=>{setFilters(prevFilters => ({
                    ...prevFilters, // Copy the existing state object
                    quantity: e.target.value,
                }));}}></input>
                            
                            <button onClick={() => localSetQuantity("plus")}>
                                <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="13.9638" cy="13.0529" r="9.78951" stroke="#E05A67" stroke-width="0.802893" />
                                    <path d="M13.9639 16.3159L13.9639 9.78958" stroke="#E05A67" stroke-width="0.802893" stroke-linecap="square" />
                                    <path d="M17.2271 13.0525L10.7007 13.0525" stroke="#E05A67" stroke-width="0.802893" stroke-linecap="square" />
                                </svg>

                            </button>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>



    )
}

export default View;