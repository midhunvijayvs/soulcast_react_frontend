import React, { Component } from 'react'
import './FAQContact.scss'

import $ from 'jquery';


export class Faq extends Component {

  show1() {
    var content1 = document.getElementById('faq');
    var content2 = document.getElementById('contactus');
    content1.style.display = "block";
    content2.style.display = "none";

    document.getElementById('tab-btn1').classList.add("active");
    document.getElementById('tab-btn2').classList.remove("active");
  }
  show2() {
    var content1 = document.getElementById('faq');
    var content2 = document.getElementById('contactus');
    content1.style.display = "none";
    content2.style.display = "block";
    document.getElementById('tab-btn2').classList.add("active");
    document.getElementById('tab-btn1').classList.remove("active");
  }
  componentDidMount() {
    $(window).scrollTop(0);
  }

  render() {

    return (
     <></>
    )
  }
}

export default Faq