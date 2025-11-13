import { HELP_CONTENT} from '@/lib/constant'
import React from 'react'
import Image from 'next/image'

 

export default function Step() {
    return (
      <div
        className='info w-full h-full p-4 md:p-9 md:pt-16  lg:py-13 lg:px-13 lg:pt-15 xl:p-10  xl:px-35 xl:py-18 bg-white'
      >
        <div className='container mx-auto'>
          <div className='content w-full flex flex-col items-center justify-center md:items-start md:justify-start gap-8 md:gap-15 lg:gap-10 xl:gap-22'>
            <div className="title-container md:mt-3 xl:mt-0 text-center flex flex-col items-center justify-center md:items-start md:justify-start  gap-4 md:gap-4">
              <div className="title">
                <h2
                  className="title-text text-[1.75rem] md:text-left md:text-[1.9rem] lg:text-[2.3rem] xl:text-[2.6rem] xl:max-w-[500px] md:max-w-[400px] lg:max-w-[450px] font-bold font-nunito text-center md:text-left text-dark"
                  style={{ lineHeight: 1.3 }}
                >
                    {HELP_CONTENT.title}
                </h2>
              </div>
              <div className="description">
                <p
                  className="description-text text-gray  text-center md:text-left text-sm md:text-sm lg:text-[1.1rem] xl:text-[1.15rem] md:max-w-[600px] lg:max-w-[650px] font-inter text-black"
                  style={{ lineHeight: 1.5 }}
                >
                  {HELP_CONTENT.subheadline}
                </p>
              </div>
            </div>

            {/* Mobile View */}
            <div className="mobile-view block md:hidden w-full">
                <div className="features-container w-full flex flex-col items-center justify-center gap-6">
                    {HELP_CONTENT.features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="feature-card w-full bg-[#EEF4FF] rounded-[10px] p-7 flex flex-col items-center justify-center gap-3"
                            style={{ boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)' }}
                        >
                            <div className="icon-container w-full h-full flex items-center justify-center">
                                <Image 
                                    src={feature.icon} 
                                    alt={feature.title} 
                                    width={100} 
                                    height={100} 
                                    className="w-23 h-23 object-contain"
                                />
                            </div>
                            <div className="feature-title text-center text-dark max-w-[180px] font-nunito text-[1rem] font-semibold">{feature.title}</div>
                        </div>
                    ))}
                </div>
            </div>



            {/* Desktop View */}
            <div className="desktop-view hidden md:block w-full mt-12 lg:mt-14 xl:mt-5">
                <div 
                    className="features-grid w-full "
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(3, 1fr)',
                        gridColumnGap: '22px',
                        gridRowGap: '22px'
                    }}
                >
                    

                    {/* div2: grid-area: 1 / 1 / 3 / 2 - Large card spanning 2 rows (Negotiations) */}
                    <div 
                        className="feature-card-large relative bg-[#EEF4FF]  rounded-[10px] p-6 lg:p-8 xl:p-10 flex flex-col-reverse items-center justify-start gap-4 lg:gap-6"
                        style={{ 
                            gridArea: '1 / 1 / 3 / 2',
                            boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)' 
                        }}
                    >
                        <div className="icon-container absolute bottom-2 left-17 lg:left-30 xl:left-41 2xl:left-50 2xl:bottom-1 flex items-center justify-center mb-2">
                            <Image 
                                src={HELP_CONTENT.features[0].icon} 
                                alt={HELP_CONTENT.features[0].title} 
                                width={150} 
                                height={150} 
                                className="w-33 h-33 lg:w-39 lg:h-39 xl:w-46 xl:h-46 object-contain "
                            />
                        </div>
                        <div className="feature-title absolute top-6 left-4 text-left text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] xl:max-w-[290px] font-semibold px-2">
                            {HELP_CONTENT.features[0].title}
                        </div>
                    </div>

                    {/* div3: grid-area: 1 / 2 / 2 / 3 - Lower Balances */}
                    <div 
                        className="feature-card bg-[#EEF4FF] rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-row items-center justify-start gap-4 lg:gap-5"
                        style={{ 
                            gridArea: '1 / 2 / 2 / 3',
                            boxShadow: 'none' 
                        }}
                    >
                        <div className="icon-container flex-shrink-0">
                            <Image 
                                src={HELP_CONTENT.features[1].icon} 
                                alt={HELP_CONTENT.features[1].title} 
                                width={80} 
                                height={80} 
                                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                            />
                        </div>
                      
                    </div>

                    {/* div4: grid-area: 1 / 2 / 2 / 4 - Lower Balances, Reduced Interest (spans 2 columns) */}
                    <div 
                        className="feature-card bg-[#EEF4FF] relative rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-col items-center justify-center gap-3 lg:gap-4"
                        style={{ 
                            gridArea: '1 / 2 / 2 / 4',
                            boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)',
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        <div className="icon-container absolute bottom-2 left-78 lg:left-111 lg:bottom-7 xl:bottom-3 xl:left-145 2xl:bottom-4 2xl:left-160 xl:bottom-1 flex items-center justify-center mb-2">
                            <Image 
                                src={HELP_CONTENT.features[1].icon} 
                                alt={HELP_CONTENT.features[1].title} 
                                width={150} 
                                height={150} 
                                className="w-30 h-30 lg:w-38 lg:h-38 xl:w-40 xl:h-40 object-contain"
                            />
                        </div>
                        <div className="feature-title absolute bottom-6 xl:bottom-7 xl:left-6 max-w-[180px] lg:max-w-full xl:max-w-full left-5 text-left text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] font-semibold px-2">
                            {HELP_CONTENT.features[1].title}
                        </div>
                    </div>

                    {/* div5: grid-area: 3 / 1 / 4 / 2 - Covers Credit Cards */}
                    <div 
                        className="feature-card bg-[#EEF4FF] rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-row items-center justify-start gap-4 lg:gap-5"
                        style={{ 
                            gridArea: '3 / 1 / 4 / 2',
                            boxShadow: 'none' 
                        }}
                    >
                        <div className="icon-container flex-shrink-0">
                            <Image 
                                src={HELP_CONTENT.features[4].icon} 
                                alt={HELP_CONTENT.features[4].title} 
                                width={80} 
                                height={80} 
                                className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
                            />
                        </div>
                        <div className="feature-title text-left text-dark font-nunito text-sm lg:text-[1.3rem] xl:text-[1.4rem] xl:max-w-[200px] font-semibold">
                            {HELP_CONTENT.features[4].title}
                        </div>
                    </div>

                    {/* div6: grid-area: 3 / 1 / 4 / 3 - Empty or hidden (overlaps with div5) */}
                    <div className='bg-[#EEF4FF] rounded-[10px] relative p-5 lg:p-6 xl:p-7 flex flex-col items-center justify-center gap-3 lg:gap-4' style={{ gridArea: '3 / 1 / 4 / 3' , boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)', position: 'relative', zIndex: 10 }}>
                    <div className="icon-container absolute bottom-1 right-3 lg:right-8 xl:bottom-2 xl:right-8 flex items-center justify-center mb-2">
                        <Image 
                            src={HELP_CONTENT.features[4].icon} 
                            alt={HELP_CONTENT.features[4].title} 
                            width={150} 
                            height={150} 
                            className="w-32 h-32 lg:w-38 lg:h-38 xl:w-42 xl:h-42 object-contain"
                        />
                    </div>
                    <div className="feature-title absolute bottom-6 max-w-[225px] lg:max-w-[290px] xl:max-w-[312px] left-5 text-left text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] font-semibold px-2">
                        {HELP_CONTENT.features[4].title}
                    </div>
                    </div>

                    {/* div7: grid-area: 2 / 2 / 3 / 3 - No Credit Score Impact */}
                    <div 
                        className="feature-card bg-[#EEF4FF] relative rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-col items-center justify-center gap-3 lg:gap-4"
                        style={{ 
                            gridArea: '2 / 2 / 3 / 3',
                            boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)' 
                        }}
                    >
                        <div className="icon-container absolute bottom-1 right-3 flex items-center justify-center mb-2">
                            <Image 
                                src={HELP_CONTENT.features[2].icon} 
                                alt={HELP_CONTENT.features[2].title} 
                                width={150} 
                                height={150} 
                                className="w-18 h-18 lg:w-24 lg:h-24 xl:w-26 xl:h-26 object-contain"
                            />
                        </div>
                        <div className="feature-title absolute  max-w-[130px] lg:max-w-[180px] xl:max-w-[200px] left-3 top-4 xl:top-5 xl:left-4 text-left text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] font-semibold px-2">
                            {HELP_CONTENT.features[2].title}
                        </div>
                    </div>

                    {/* div8: grid-area: 2 / 3 / 3 / 4 */}
                    <div
                        className="bg-[#EEF4FF]  rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-col items-center justify-center gap-3 "
                        style={{
                            gridArea: '2 / 3 / 3 / 4',
                            boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)',
                        }}
                    >
                        <div className="icon-container flex items-center justify-center">
                            <Image
                                src={HELP_CONTENT.features[3].icon}
                                alt={HELP_CONTENT.features[3].title}
                                width={150}
                                height={150}
                                className="w-19 h-19 lg:w-24 lg:h-24 xl:w-26 xl:h-26 object-contain"
                            />
                        </div>
                        <div className="feature-title text-center text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] font-semibold px-2">
                            {HELP_CONTENT.features[3].title}
                        </div>
                    </div>

                    {/* div9: grid-area: 3 / 3 / 4 / 4 - Realistic Repayment Plans */}
                    <div 
                        className="feature-card bg-[#EEF4FF] relative rounded-[10px] p-5 lg:p-6 xl:p-7 flex flex-col items-center justify-center gap-3 lg:gap-4"
                        style={{ 
                            gridArea: '3 / 3 / 4 / 4',
                            boxShadow: '4px 4px 4px 0px rgba(0, 40, 104, 0.15)' 
                        }}
                    >
                        <div className="icon-container absolute top-3 right-3 lg:right-4 flex items-center justify-center mb-2">
                            <Image 
                                src={HELP_CONTENT.features[5].icon} 
                                alt={HELP_CONTENT.features[5].title} 
                                width={150} 
                                height={150} 
                                className="w-24 h-24 lg:w-28 lg:h-28 xl:w-30 xl:h-30 object-contain"
                            />
                        </div>
                        <div className="feature-title absolute bottom-4 lg:bottom-5 max-w-[155px] lg:max-w-[200px] xl:max-w-[200px] left-4 xl:left-5 xl:bottom-6 text-left text-dark font-nunito text-base lg:text-[1.3rem] xl:text-[1.4rem] font-semibold px-2">
                            {HELP_CONTENT.features[5].title}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  );
  }