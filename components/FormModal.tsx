'use client';

import { HERO_CONTENT } from '@/lib/constant';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TrustedForm from './TrustedForm';
import Image from 'next/image';
import Link from 'next/link';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');
  const [subid1, setSubid1] = useState('');
  const [subid2, setSubid2] = useState('');
  const [subid3, setSubid3] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zip: '',
      homeowner: 'yes',
      debtAmount: '',
    },
    mode: 'onChange',
  });

  // Handle TrustedForm certificate data
  const handleTrustedFormReady = (certUrl: string) => {
    setTrustedFormCertUrl(certUrl);
  };

  // UTM Parameter Detection with Cookie Fallback
  useEffect(() => {
    if (!isOpen) return;

    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Helper function to set cookie
    const setCookie = (name: string, value: string, days: number = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source') || '';
    let utmId = urlParams.get('utm_id') || '';
    let utmS1 = urlParams.get('utm_s1') || '';

    // If URL parameters exist, use them and save to cookies
    if (utmSource || utmId || utmS1) {
      if (utmSource) setCookie('subid1', utmSource);
      if (utmId) setCookie('subid2', utmId);
      if (utmS1) setCookie('subid3', utmS1);

      // Clean the URL by removing UTM parameters
      const cleanUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // If no URL parameters, try to read from cookies
      utmSource = getCookie('subid1') || '';
      utmId = getCookie('subid2') || '';
      utmS1 = getCookie('subid3') || '';
    }

    setSubid1(utmSource);
    setSubid2(utmId);
    setSubid3(utmS1);
  }, [isOpen]);

  // Phone Number Formatting
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    const limitedPhoneNumber = phoneNumber.slice(0, 10);

    if (limitedPhoneNumber.length === 0) {
      return '';
    }

    if (limitedPhoneNumber.length >= 6) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(
        3,
        6
      )}-${limitedPhoneNumber.slice(6)}`;
    } else if (limitedPhoneNumber.length >= 3) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3)}`;
    } else {
      return limitedPhoneNumber;
    }
  };

  // Zip Code Formatting
  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zip: string;
    homeowner: string;
    debtAmount: string;
  }) => {
    setIsSubmitting(true);

    try {
      // Strip phone formatting before sending (remove all non-digits)
      const cleanPhone = data.phone ? data.phone.replace(/\D/g, '') : '';
      
      const submissionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: cleanPhone,
        zipCode: data.zip, // Map zip to zipCode for API
        homeOwner: data.homeowner, // Map homeowner to homeOwner for API
        debtAmount: data.debtAmount,
        subid1,
        subid2,
        subid3,
        trustedformCertUrl: trustedFormCertUrl,
      };

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      // Store access token in localStorage for thank you page access
      if (result.accessToken && result.expiresAt) {
        localStorage.setItem('thankyou_token', result.accessToken);
        localStorage.setItem('thankyou_expires', result.expiresAt.toString());
      }

      // Store email for thank you page email sending
      localStorage.setItem(
        'form_data',
        JSON.stringify({
          email: data.email,
        })
      );

      form.reset();
      onClose();

      // Redirect immediately using the redirectUrl from API
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        window.location.href = '/thankyou';
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

      alert(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = form.getValues();

    const hasErrors =
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.zip ||
      !formData.homeowner ||
      !formData.debtAmount;

    if (hasErrors) {
      form.trigger();
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Background Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[9998] transition-opacity duration-200 ease-out"
        style={{
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow-2xl w-full max-w-[95vw] sm:max-w-[500px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[570px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto hide-scrollbar my-auto"
          style={{
            animation: 'modalSlideIn 0.25s ease-out',
            transformOrigin: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-1 right-1 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center  hover:bg-gray-200 rounded-full transition-colors duration-200 group "
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Form Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-9">
            <TrustedForm onCertUrlReady={handleTrustedFormReady} />

            <div className="title-group flex flex-col items-center justify-center gap-2 mb-6">
              <div className="hero-title">
                <h3
                  className="text-2xl max-w-[200px] md:max-w-[290px] lg:max-w-[300px] xl:max-w-[350px] md:text-3xl font-nunito text-blue font-bold text-center"
                  style={{ lineHeight: 1.3 }}
                >
                  {HERO_CONTENT.form.title}
                </h3>
              </div>
              <div className="title-description">
                <p className="text-sm md:text-[0.9rem] lg:text-[1rem] xl:max-w-[400px] font-inter text-black font-normal text-center">
                  {HERO_CONTENT.form.description}
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="mb-2">
                  <label
                    className="block text-left text-sm md:text-base font-semibold font-nunito text-black-700 mb-1"
                    htmlFor="firstName"
                  >
                    Personal Information
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: 'First name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            type="text"
                            className={`w-full text-sm md:text-base font-nunito px-3 py-3 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 ${
                              form.formState.errors.firstName
                                ? 'border-red-600'
                                : 'border-gray-300'
                            }`}
                            style={{
                              border: form.formState.errors.firstName
                                ? '2px solid #dc2626'
                                : '1px solid #BBBBBB',
                              outline: 'none',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--primary-color)';
                              e.target.style.boxShadow =
                                '0 0 0 2px rgba(0, 40, 104, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = form.formState.errors
                                .firstName
                                ? '#dc2626'
                                : 'rgba(153, 153, 153, 1)';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="First Name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: 'Last name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            type="text"
                            className={`w-full text-sm md:text-base font-nunito px-3 py-3 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 ${
                              form.formState.errors.lastName
                                ? 'border-red-600'
                                : 'border-gray-300'
                            }`}
                            style={{
                              border: form.formState.errors.lastName
                                ? '2px solid #dc2626'
                                : '1px solid #BBBBBB',
                              outline: 'none',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--primary-color)';
                              e.target.style.boxShadow =
                                '0 0 0 2px rgba(0, 40, 104, 0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = form.formState.errors
                                .lastName
                                ? '#dc2626'
                                : 'rgba(153, 153, 153, 1)';
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Last Name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: 'Phone number is required' }}
                  render={({ field }) => {
                    let inputElement: HTMLInputElement | null = null;
                    
                    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const input = e.target;
                      const cursorPosition = input.selectionStart || 0;
                      const oldValue = field.value || '';
                      const newValue = input.value;
                      
                      const oldDigits = oldValue.replace(/\D/g, '');
                      const newDigits = newValue.replace(/\D/g, '');
                      
                      if (newDigits.length < oldDigits.length) {
                        const deletedDigit = oldDigits.length - newDigits.length;
                        const digitsBeforeCursor = oldValue.slice(0, cursorPosition).replace(/\D/g, '').length;
                        
                        const formatted = formatPhoneNumber(newDigits);
                        
                        let newCursorPosition = 0;
                        if (formatted.length > 0) {
                          const targetDigitIndex = Math.max(0, digitsBeforeCursor - deletedDigit);
                          let digitCount = 0;
                          
                          for (let i = 0; i < formatted.length; i++) {
                            if (/\d/.test(formatted[i])) {
                              if (digitCount === targetDigitIndex) {
                                newCursorPosition = i + 1;
                                break;
                              }
                              digitCount++;
                            }
                          }
                          
                          if (newCursorPosition === 0 && targetDigitIndex > 0) {
                            newCursorPosition = formatted.length;
                          }
                        }
                        
                        field.onChange(formatted);
                        
                        setTimeout(() => {
                          if (inputElement) {
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                          }
                        }, 0);
                      } else {
                        const formatted = formatPhoneNumber(newDigits);
                        field.onChange(formatted);
                        
                        setTimeout(() => {
                          if (inputElement) {
                            const digitsBeforeCursor = newValue.slice(0, cursorPosition).replace(/\D/g, '').length;
                            let digitCount = 0;
                            let newCursorPosition = formatted.length;
                            
                            for (let i = 0; i < formatted.length; i++) {
                              if (/\d/.test(formatted[i])) {
                                digitCount++;
                                if (digitCount === digitsBeforeCursor) {
                                  newCursorPosition = i + 1;
                                  break;
                                }
                              }
                            }
                            
                            inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
                          }
                        }, 0);
                      }
                    };
                    
                    return (
                      <FormItem>
                        <FormControl>
                          <input
                            ref={(el) => { inputElement = el; }}
                            type="tel"
                            value={formatPhoneNumber(field.value || '')}
                            onChange={handlePhoneChange}
                            onBlur={(e) => {
                              e.target.style.borderColor = form.formState.errors
                                .phone
                                ? '#dc2626'
                                : 'rgba(153, 153, 153, 1)';
                              e.target.style.boxShadow = 'none';
                              field.onBlur();
                            }}
                            className={`w-full text-sm md:text-base font-nunito px-3 py-3 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 ${
                              form.formState.errors.phone
                                ? 'border-red-600'
                                : 'border-gray-300'
                            }`}
                            style={{
                              border: form.formState.errors.phone
                                ? '2px solid #dc2626'
                                : '1px solid #BBBBBB',
                              outline: 'none',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--primary-color)';
                              e.target.style.boxShadow =
                                '0 0 0 2px rgba(0, 40, 104, 0.1)';
                            }}
                            placeholder="Phone Number"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className={`w-full text-sm md:text-base font-nunito px-3 py-3 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 ${
                            form.formState.errors.email
                              ? 'border-red-600'
                              : 'border-gray-300'
                          }`}
                          style={{
                            border: form.formState.errors.email
                              ? '2px solid #dc2626'
                              : '1px solid #BBBBBB',
                            outline: 'none',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.boxShadow =
                              '0 0 0 2px rgba(0, 40, 104, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = form.formState.errors
                              .email
                              ? '#dc2626'
                              : 'rgba(153, 153, 153, 1)';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip"
                  rules={{ required: 'Zip code is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          onChange={(e) => {
                            const formatted = formatZipCode(e.target.value);
                            field.onChange(formatted);
                          }}
                          className={`w-full text-sm md:text-base font-nunito px-3 py-3 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 ${
                            form.formState.errors.zip
                              ? 'border-red-600'
                              : 'border-gray-300'
                          }`}
                          style={{
                            border: form.formState.errors.zip
                              ? '2px solid #dc2626'
                              : '1px solid #BBBBBB',
                            outline: 'none',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.boxShadow =
                              '0 0 0 2px rgba(0, 40, 104, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = form.formState.errors
                              .zip
                              ? '#dc2626'
                              : 'rgba(153, 153, 153, 1)';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Zip Code"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="homeowner"
                  rules={{ required: 'Please select homeowner status' }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-0">
                        <label className="block text-left text-sm md:text-base font-semibold font-nunito text-black-700 mb-2 ">
                          {HERO_CONTENT.form.labels.homeowner}
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => field.onChange('yes')}
                            className={`flex-1 px-4 py-2.5 rounded-[5px] text-sm md:text-base font-nunito transition-colors ${
                              field.value === 'yes'
                                ? 'bg-red text-white font-semibold'
                                : 'bg-white border border-[#BBBBBB]'
                            }`}
                            style={{
                              color: field.value === 'yes' ? 'white' : '#333333',
                            }}
                          >
                            {HERO_CONTENT.form.labels.homeownerYes}
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange('no')}
                            className={`flex-1 px-4 py-2.5 rounded-[5px] text-sm md:text-base font-nunito transition-colors ${
                              field.value === 'no'
                                ? 'bg-red text-white font-semibold'
                                : 'bg-white border border-[#BBBBBB]'
                            }`}
                            style={{
                              color: field.value === 'no' ? 'white' : '#333333',
                            }}
                          >
                            {HERO_CONTENT.form.labels.homeownerNo}
                          </button>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="debtAmount"
                  rules={{ required: 'Please select debt amount' }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-1">
                        <label className="block text-left text-sm md:text-base font-semibold font-nunito text-black mb-2 ">
                          {HERO_CONTENT.form.labels.debtAmount}
                        </label>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className={`w-full text-sm md:text-base font-nunito px-3 py-5.5 md:py-6 lg:py-6.5 xl:py-6.5 rounded-[5px] placeholder:text-[#999999] transition-colors duration-200 bg-white ${
                                form.formState.errors.debtAmount
                                  ? 'border-red-600'
                                  : 'border-gray-300'
                              }`}
                              style={{
                                border: form.formState.errors.debtAmount
                                  ? '2px solid #dc2626'
                                  : '1px solid #BBBBBB',
                                outline: 'none',
                              }}
                            >
                              <SelectValue placeholder="Select Debt Amount" />
                            </SelectTrigger>
                            <SelectContent position="popper" sideOffset={4}>
                              <SelectItem value="$0 - $4,999">$0 - $4,999</SelectItem>
                              <SelectItem value="$5,000 - $7,499">$5,000 - $7,499</SelectItem>
                              <SelectItem value="$7,500 - $9,999">$7,500 - $9,999</SelectItem>
                              <SelectItem value="$10,000 - $14,999">$10,000 - $14,999</SelectItem>
                              <SelectItem value="$15,000 - $19,999">$15,000 - $19,999</SelectItem>
                              <SelectItem value="$20,000 - $29,999">$20,000 - $29,999</SelectItem>
                              <SelectItem value="$30,000 - $39,999">$30,000 - $39,999</SelectItem>
                              <SelectItem value="$40,000 - $49,999">$40,000 - $49,999</SelectItem>
                              <SelectItem value="$50,000 - $59,999">$50,000 - $59,999</SelectItem>
                              <SelectItem value="$60,000 - $69,999">$60,000 - $69,999</SelectItem>
                              <SelectItem value="$70,000 - $79,999">$70,000 - $79,999</SelectItem>
                              <SelectItem value="$80,000 - $89,999">$80,000 - $89,999</SelectItem>
                              <SelectItem value="$90,000 - $99,999">$90,000 - $99,999</SelectItem>
                              <SelectItem value="Above $100,000+">Above $100,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full rounded-[6px] text-base md:text-lg font-semibold bg-red font-inter text-white px-5 py-6 md:py-6 relative overflow-hidden transition-all duration-300 ease-in-out z-10 hover:bg-blue cursor-pointer"
                >
                  <span>
                    {isSubmitting
                      ? 'Submitting...'
                      : HERO_CONTENT.form.submitButton}
                  </span>
                </Button>

                <div className="disclaimer mt-0 font-inter flex items-start justify-start gap-2">
                  <div className="icon">
                    <Image
                      src="/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    />
                  </div>
                  <div className="disclaimer-text font-inter text-justify text-[#333333]">
                    <p className="text-xs md:text-sm">
                    By submitting this form, I agree to the Nation One Debt
                      Relief <Link href="/terms-of-use" className="text-blue-500">Terms of Use</Link> and <Link href="/privacy-policy" className="text-blue-500">Privacy Policy</Link>. I authorize Nation
                      One Debt Relief and its partners to send me marketing text
                      messages or phone calls at the number provided, including
                      those made with an autodialer. Standard message and data
                      rates may apply. Message frequency varies. Opt-out anytime
                      by replying STOP or using the unsubscribe link.
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

