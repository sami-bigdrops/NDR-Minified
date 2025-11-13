
'use client'

import React, { useRef           } from 'react'
import Image                     from 'next/image'
import { REVIEWS_CONTENT        } from '@/lib/constant'
import { Swiper, SwiperSlide    } from 'swiper/react'
import { Navigation             } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Review() {
  const swiperRef = useRef<SwiperType | null>(null)

  const StarIcon = (
    { className = '' }: { className?: string }
  ) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M11.8359 18.0871L19.1502 22.5L17.2154 14.1758L23.6719 8.57865L15.1601 7.8477L11.8359 0L8.51115 7.8477L0 8.57865L6.45656 14.1758L4.52115 22.5L11.8359 18.0871Z"
        fill="#F6BB06"
      />
    </svg>
  )

  const ArrowIcon = (
    { direction }: { direction: 'left' | 'right' }
  ) => (
    <svg
      width="11"
      height="20"
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === 'right' ? 'rotate-180' : ''}
    >
      <path
        d="M10 1L1 10L10 19"
        stroke="#1C1C1C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div
      id="review"
      className="
        review w-full h-full p-4 py-6 lg:py-13 lg:px-13  md:p-9 xl:px-40 xl:py-15
      "
      style={{ background: '#FAFAFA' }}
    >
      <div className="container mx-auto ">
        <div className="content flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-15 xl:gap-18 ">
        
          <div className="title-container text-center flex flex-col items-center justify-center  gap-4 md:gap-4">
            <div className="title">
              <h2
                className="title-text text-[1.75rem]  md:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.6rem]  md:max-w-full lg:max-w-[650px] xl:max-w-[650px] font-bold font-nunito text-center text-dark"
                style={{ lineHeight: 1.3 }}
              >
                {REVIEWS_CONTENT.headline}
              </h2>
            </div>
            <div className="description">
              <p
                className="description-text text-gray  text-center  text-sm md:text-sm lg:text-base xl:text-[1.15rem] md:max-w-[460px] lg:max-w-[550px] xl:max-w-[560px] mx-auto font-inter text-black"
                style={{ lineHeight: 1.5 }}
              >
                {REVIEWS_CONTENT.subheadline}
              </p>
            </div>
          </div>

          <div className="review-container w-full relative">
            {/* Mobile view - regular grid (below md) */}
            <div className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-5 gap-5 lg:gap-6 xl:gap-7 ">
              {REVIEWS_CONTENT.reviews.map((review) => (
                <div
                  key={review.name}
                  className="
                    bg-white flex flex-col
                    items-start justify-center gap-5 md:gap-5 xl:gap-6 p-6
                    rounded-[10px]
                    shadow-[4px_4px_4px_0_rgba(0,0,0,0.1)]
                  "
                >
                  <div className="flex items-center justify-start gap-0.5  ">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="23"
                        viewBox="0 0 24 23"
                        fill="none"
                        className="w-5 h-5 xl:w-6 xl:h-6 "
                      >
                        <path
                          d="
                            M12 18.3478L19.3143 22.7607L17.3794 14.4366
                            L23.8359 8.83939L15.3242 8.10844L12 0.260742
                            L8.67521 8.10844L0.164062 8.83939
                            L6.62063 14.4366L4.68521 22.7607L12 18.3478Z
                          "
                          fill="#F6BB06"
                        />
                      </svg>
                    ))}
                  </div>

                  <p
                    className="
                      text-dark font-medium text-[0.85rem] md:text-[0.8rem] lg:text-[0.93rem] xl:text-[1.05rem] xl:max-w-[330px]
                      font-inter
                    "
                    style={{ lineHeight: 1.6 }}
                  >
                    {review.testimonial}
                  </p>

                  <div className="flex items-center justify-start gap-2">
                    <div
                      className="
                        w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full overflow-hidden
                        flex-shrink-0 relative
                      "
                      
                    >
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover rounded-full w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="
                        font-medium text-[#333333] text-[14px] md:text-[13px] lg:text-[15px] xl:text-[16px]  font-inter
                      ">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

