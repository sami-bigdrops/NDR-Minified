import React from 'react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white p-6 md:p-9  lg:py-13 lg:pb-11 lg:px-13 xl:p-10  xl:px-35 xl:py-18 xl:pb-12  bg-white">
      <div className="container mx-auto">
        <div className="content flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-12 ">

          <div className="footer-main w-full flex flex-col justify-center items-center gap-4 md:flex-row md:items-start md:justify-between">
            <div className="footer-logo md:w-[30%] ">
              <Image
                src="/logo.svg"
                alt="Platinum Window Expert"
                width={150}
                height={30}
                className="h-10 lg:h-13 xl:h-14.5 w-auto"
              />
            </div>
            <div className="footer-text md:w-[70%]">
              <p className="text-[0.65rem] md:text-[0.75rem] lg:text-[0.9rem] xl:text-[0.95rem] font-inter text-justify font-normal lg:text-sm xl:text-base text-[#1E1E1E] " style={{ lineHeight: 1.5 }}>
                Please note that all calls with the company may be recorded or monitored for quality assurance and training purposes. *Clients who are able to stay with the program and get all their debt settled realize approximate savings of 46% before fees, or 25% including our fees, over 24 to 48 months. All claims are based on enrolled debts. Not all debts are eligible for enrollment. Not all clients complete our program for various reasons, including their ability to save sufficient funds. Estimates based on prior results, which will vary based on specific circumstances. We do not guarantee that your debts will be lowered by a specific amount or percentage or that you will be debt-free within a specific period of time. We do not assume consumer debt, make monthly payments to creditors or provide tax, bankruptcy, accounting or legal advice or credit repair services. Not available in all states. Please contact a tax professional to discuss tax consequences of settlement. Please consult with a bankruptcy attorney for more information on bankruptcy. Depending on your state, we may be available to recommend a local tax professional and/or bankruptcy attorney. Read and understand all program materials prior to enrollment, including potential adverse impact on credit rating.
              </p>
            </div>
          </div>

          <div className="line w-full h-[0.5px] bg-[#BBBBBB] mt-1 mb-1"></div>
          
          
          <div className="footer-links-container flex flex-col justify-center gap-4 items-center md:flex-row md:items-start md:justify-between w-full ">
            <div className="copyright text-center ">
              <p className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem] font-inter font-medium lg:text-sm xl:text-base text-[#333333] " >
                &copy; {currentYear}  Nation One Debt Relief. All Rights Reserved.
              </p>
            </div>

            <div className="footer-links flex flex-row items-center justify-center mb-1 gap-2 lg:gap-3 ">
              <a 
                href="/privacy-policy" 
                className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem] font-inter font-medium lg:text-sm xl:text-base text-[#333333] hover:text-blue transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-[#333333] text-[0.75rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem]">|</span>
              <a 
                href="/terms-of-use" 
                className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem] font-inter font-medium lg:text-sm xl:text-base text-[#333333] hover:text-blue transition-colors duration-300"
              >
                 Terms of Service
              </a>
              <span className="text-[#333333] text-[0.75rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem]">|</span>
              <a 
                href="#" 
                className="text-[0.7rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.1rem] font-inter font-medium lg:text-sm xl:text-base text-[#333333] hover:text-blue transition-colors duration-300"
              >
                Disclosures
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
