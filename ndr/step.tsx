'use client';

import { STEP_SECTION } from '@/lib/constant';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import FormModal from '@/components/FormModal';

export default function Step() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className='info w-full h-full p-4 md:p-9  lg:py-13 lg:px-13 xl:p-10  xl:px-35 xl:py-15'
      style={{ background: '#ECF3FF' }}
    >
      <div className='container mx-auto'>
        <div className='content w-full flex flex-col items-center justify-center md:flex-row gap-8 md:gap-10 lg:gap-13 xl:gap-15'>
          <div className="title-container md:w-[50%] xl:w-[55%] text-center flex flex-col items-center justify-center md:items-start gap-4 md:gap-4">
            <div className="title">
              <h2
                className="title-text text-[1.75rem] md:text-left md:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.6rem] xl:max-w-full md:max-w-full lg:max-w-[650px] font-bold font-nunito text-center text-dark"
                style={{ lineHeight: 1.3 }}
              >
                {STEP_SECTION.headline}
              </h2>
            </div>
            <div className="description">
              <p
                className="description-text text-gray  text-center md:text-left text-sm md:text-sm lg:text-base xl:text-[1.15rem] md:max-w-[500px] lg:max-w-[650px] mx-auto font-inter text-black"
                style={{ lineHeight: 1.5 }}
              >
                {STEP_SECTION.bodyText}
              </p>
            </div>

            <div className="cta-button w-full md:mt-4 xl:mt-7 max-w-[170px] md:max-w-[170px] lg:max-w-[180px] xl:max-w-[210px] flex items-center justify-center">
                <button
                  ref={ctaButtonRef}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red w-full text-white px-4 py-3 xl:py-4 text-[0.9rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] rounded-sm font-semibold font-inter flex items-center justify-center gap-4 cursor-pointer hover:bg-blue transition-colors"
                >
                  {STEP_SECTION.ctaButton}
                </button>
            </div>


          </div>
          <div className="info-container w-full  mx-auto md:w-[50%] xl:w-[45%]">
            <div className="step-image rounded-[10px] w-full h-[260px] md:h-[245px] lg:h-[270px] xl:h-[315px] xl:w-[480px] overflow-hidden">
              <Image
                src={STEP_SECTION.image}
                alt="Step image"
                width={480}
                height={300}
                className="w-full h-full object-cover"
              />
              
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerElement={ctaButtonRef.current}
      />
    </div>
  );
}
