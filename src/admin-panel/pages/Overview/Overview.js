import React, { Component } from 'react'
import './Overview.css'

import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import Chart from "react-apexcharts";


export class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        plotOptions: {
          bar: {
           borderRadius: 8,
           borderRadiusApplication: 'end',
           columnWidth: '75%',

          }
         },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov' , 'Dec']
        },
        fill: {
          colors: [function({ value, seriesIndex, w }) {
            if(value > 70) {
                return '#2ee656aa'
            } else {
                return '#E05A67'
            }
          }],
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 0.8,
            gradientToColors: '', // optional, if not defined - uses the shades of same color in series
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 50, 100]
            
          }
        }

      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 80, 45, 29, 90]
        }
      ]
    };
  }
  render() {
    return (
      <div className='overview d-none'>
        <div className='d-flex flex-column-reverse flex-lg-column'>
          <div className='d-flex w-100 justify-content-between flex-column flex-md-row mb-4'>
              <div className='bg-white box-shadow p-3 radius-7 d-flex  justify-content-between align-items-center w-100div3'>
                  <div className='text-start'>
                      <div className='clr-565B67'><b>Total User</b></div>
                      <div className='clr-565B67 f-xs'>Lorem ipsum dolor sit amet.</div>
                      <div className='f-xl black-clr mt-2 me-2'><b>1500</b></div>
                  </div>
                  <div>
                      <img src="/images/Overview/totaluser.svg'" alt='' className='total-img'></img>
                  </div>
              </div>
              <div className='bg-white box-shadow p-3 radius-7 d-flex justify-content-between align-items-center w-100div3 mx-0 mx-md-3 my-3 my-md-0'>
                <div className='text-start'>
                      <div className='clr-565B67'><b>Total Orders</b></div>
                      <div className='clr-565B67 f-xs'>Lorem ipsum dolor sit amet.</div>
                      <div className='f-xl black-clr me-2 mt-2'><b>1000</b></div>
                  </div>
                  <div>
                    <img src="/images/Overview/totalorder.svg" alt='' className='total-img'></img>
                  </div>
              </div>
              <div className='bg-white box-shadow p-3 radius-7 d-flex justify-content-between align-items-center w-100div3'>
                <div className='text-start'>
                      <div className='clr-565B67'><b>Total Sales</b></div>
                      <div className='clr-565B67 f-xs'>Lorem ipsum dolor sit amet.</div>
                      <div className='f-xl black-clr me-2 mt-2'><b>68</b></div>
                  </div>
                  <div>
                    <img src="/images/Overview/totalsale.svg'" alt='' className='total-img'></img>
                  </div>
              </div>
          </div>

          <div className='d-flex flex-column flex-md-row w-100 mb-4 mb-lg-0'>
              <div className='bg-lightbrick overflowhidden radius-11 px-4 py-4 white-clr d-flex w-60-resp me-3 mb-3 mb-mb-0'>
                <div className='text-start'>
                      <div className='f-sm'><b>Good morning, Raya!</b></div>
                      <div className='f-xs mb-4 d-none d-md-block'>If you are going to use a passage of Lorem <br></br> Ipsum, you need to be sure there isn't <br></br> anything.</div>
                      <div className='f-xs mb-4 d-block d-md-none'>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.</div>
                      <Link to="/Layout2/Location" className='white-round-btn'>Today's Delivery</Link>
                </div>
                  <div className='relative'>
                      <img src= "/images/good-morning-msg-img.svg" alt='' className='delivery-img-position'></img>
                  </div>
              </div>
              <div className='w-40-resp'>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/Overview/Prawn.svg"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                    <div className='white-clr f-sm fw-600'>View Categories-Seafood
                      </div>
                      <div className='white-clr f-xxs fw-500'>Lorem Ipsum, you need to be sure there isn't anything.
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/Overview/Meat.svg"
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                    <div className='white-clr f-sm fw-600'>View Categories-Meat
                      </div>
                      <div className='white-clr f-xxs fw-500'>Lorem Ipsum, you need to be sure there isn't anything.
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/images/Overview/Fish.svg"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                    <div className='white-clr f-sm fw-600'>View Categories-Fish
                      </div>
                      <div className='white-clr f-xxs fw-500'>Lorem Ipsum, you need to be sure there isn't anything.
                      </div>

                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
          </div>
        </div>

        <div className='mt-2 mt-lg-5 w-100 d-flex flex-column  flex-md-row'>
          <div className='w-60-resp box-shadow bg-white radius-11 p-3 me-3 mb-4 mb-md-0'>
            <div className='mb-4 fw-600 black-clr'>Income Statistics</div>

            {/* <div className='w-60' style={{ maxWidth: "600px" }}> */}
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                // width="600"
              />
            </div>
          </div>
          <div className='w-40-resp box-shadow bg-white radius-11 py-3 px-4'>
            <div className='d-flex justify-content-between w-100 mb-4 borderbottomdashed pb-3'>
              <div className='fw-500 f-sm w-60'>Most Selled</div>
              <div className='d-flex w-40 justify-content-end'>
                <div className='fw-500 f-xs'>Login Date</div>
                <button><i className="fa-solid fa-rotate-right"></i></button>
              </div>
              <div>
              </div>
            </div>
            <div>
              <div className='w-100 d-flex justify-content-between align-items-center mb-3'>
                    <div className='w-60 d-flex align-items-center'>
                        <img src="/images/userimg.png" alt='' className='userimg'></img>
                        <div className='fw-500 f-xs ms-2'>Jessica Thomas</div>
                    </div>
                    <div className='w-40 fw-500 f-xs d-flex justify-content-end'>Dec 20 ,2023</div>
              </div>
              <div className='w-100 d-flex justify-content-between align-items-center mb-3'>
                    <div className='w-60 d-flex align-items-center'>
                        <img src="/images/userimg.png" alt='' className='userimg'></img>
                        <div className='fw-500 f-xs ms-2'>Jessica Thomas</div>
                    </div>
                    <div className='w-40 fw-500 f-xs d-flex justify-content-end'>Dec 20 ,2023</div>
              </div>
              <div className='w-100 d-flex justify-content-between align-items-center mb-3'>
                    <div className='w-60 d-flex align-items-center'>
                        <img src="/images/userimg.png" alt='' className='userimg'></img>
                        <div className='fw-500 f-xs ms-2'>Jessica Thomas</div>
                    </div>
                    <div className='w-40 fw-500 f-xs d-flex justify-content-end'>Dec 20 ,2023</div>
              </div>
              <div className='w-100 d-flex justify-content-between align-items-center mb-3'>
                    <div className='w-60 d-flex align-items-center'>
                        <img src="/images/userimg.png" alt='' className='userimg'></img>
                        <div className='fw-500 f-xs ms-2'>Jessica Thomas</div>
                    </div>
                    <div className='w-40 fw-500 f-xs d-flex justify-content-end'>Dec 20 ,2023</div>
              </div>
            </div>
            <div className='fw-500 f-sm mt-5 bordertopdashed pt-3' data-toggle="modal" data-target="#exampleModal">
              View List <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
     
      <div className="modal-body">
      <div>
          <div className='bb-dashed py-2'>
            <div className='brick-clr fw-500'>Notifications</div>
            <div className='f-xxs fw-600 clr-898989'>You have 2 unread messages</div>
          </div>
          <div className='bb-dashed py-2'>
            <div className='brick-clr fw-500 f-xs mb-2'>New</div>
            <div>
              <div className='w-100 d-flex justify-content-between align-items-center bg-extralightbrick radius-11 py-3 px-2 my-2'>
                      <div className='w-25 d-flex align-items-center'>
                          <img src="/images/userimg.png" alt='' className='userimg'></img>
                      </div>
                      <div className='w-75 fw-500 f-xs'>
                        <div className='fw-500 f-xs'>Jannetta Ortega </div>
                        <div className='f-xxs'>
                          I received my order today and I just wanted to say thank you for
                          the fast shipping and great customer service
                        </div>
                      </div>
              </div>
              <div className='w-100 d-flex justify-content-between align-items-center bg-extralightbrick  radius-11 py-3 px-2 my-2'>
                      <div className='w-25 d-flex align-items-center'>
                          <img src="/images/userimg.png" alt='' className='userimg'></img>
                      </div>
                      <div className='w-75 fw-500 f-xs'>
                        <div className='fw-500 f-xs'>Jannetta Ortega </div>
                        <div className='f-xxs'>
                          I received my order today and I just wanted to say thank you for
                          the fast shipping and great customer service
                        </div>
                      </div>
              </div>
            </div>
          </div>
          <div className='bb-dashed py-2'>
            <div className='brick-clr fw-500 f-xs mb-2'>Previous</div>
            <div>
              <div className='w-100 d-flex justify-content-between align-items-center bg-d5d5d5 radius-11 py-3 px-2 my-2'>
                      <div className='w-25 d-flex align-items-center'>
                          <img src="/images/userimg.png" alt='' className='userimg'></img>
                      </div>
                      <div className='w-75 fw-500 f-xs'>
                        <div className='fw-500 f-xs'>Jannetta Ortega </div>
                        <div className='f-xxs'>
                          I received my order today and I just wanted to say thank you for
                          the fast shipping and great customer service
                        </div>
                      </div>
              </div>
              <div className='w-100 d-flex justify-content-between align-items-center bg-d5d5d5 radius-11  py-3 px-2 my-2'>
                      <div className='w-25 d-flex align-items-center'>
                          <img src="/images/userimg.png" alt='' className='userimg'></img>
                      </div>
                      <div className='w-75 fw-500 f-xs'>
                        <div className='fw-500 f-xs'>Jannetta Ortega </div>
                        <div className='f-xxs'>
                          I received my order today and I just wanted to say thank you for
                          the fast shipping and great customer service
                        </div>
                      </div>
              </div>
            </div>
          </div>
        </div>
    
       
      </div>
    </div>
  </div>
</div>
      </div>
    )
  }
}

export default Overview