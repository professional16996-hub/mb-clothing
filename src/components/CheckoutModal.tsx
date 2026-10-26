import React, { useState } from 'react';
import { CartItem, Currency, OrderData } from '../types';
import { formatPrice } from '../utils/format';
import { X, CheckCircle, ShieldCheck, Lock, Truck, CreditCard, DollarSign } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentCurrency: Currency;
  discountPercent: number;
  onOrderComplete: (order: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  discountPercent,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmation'>('shipping');
  
  // Shipping form state
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@atelier-archive.com',
    phone: '+1 (555) 234-8900',
    address: '740 Park Avenue, Apt 14B',
    city: 'New York',
    postalCode: '10021',
    country: 'United States',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'priority' | 'whiteglove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  
  const shippingFee = deliveryMethod === 'priority' ? 45 : deliveryMethod === 'whiteglove' ? 85 : (subtotal >= 500 ? 0 : 25);
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderData = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      customer: formData,
      deliveryMethod: deliveryMethod === 'whiteglove' ? 'White-Glove Private Courier' : deliveryMethod === 'priority' ? 'Priority Air Express' : 'Complimentary Atelier Standard',
      paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'applepay' ? 'Apple Pay / Google Pay' : 'Pay Upon Arrival (COD)',
      items: [...items],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      currency: currentCurrency,
      estimatedDelivery: '3 to 5 business days',
    };

    setConfirmedOrder(newOrder);
    setStep('confirmation');
    onOrderComplete(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (step !== 'confirmation') onClose();
        }}
      />

      <div className="relative bg-[#FAF8F5] w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-stone-300 shadow-2xl z-10 flex flex-col my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl font-medium tracking-wider text-stone-900 uppercase">
              VELORA
            </span>
            <span className="text-stone-400">/</span>
            <span className="text-xs uppercase tracking-widest text-stone-600 font-medium">
              Private Client Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step Content */}
        <div className="p-6 sm:p-8">
          
          {step === 'confirmation' && confirmedOrder ? (
            /* Order Confirmation View */
            <div className="text-center py-6 space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-1">
                  Atelier Dispatch Registered
                </span>
                <h3 className="font-serif-luxury text-3xl font-medium text-stone-900">
                  Thank You, {confirmedOrder.customer.firstName}
                </h3>
                <p className="text-xs text-stone-600 mt-2">
                  Order <span className="font-mono font-bold text-stone-900">{confirmedOrder.orderId}</span> has been confirmed and queued for private hand-finishing.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#F5F1EB] p-5 border border-stone-300 text-left text-xs space-y-3 font-light">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider">Estimated Delivery</span>
                  <span className="font-medium text-stone-900">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider">Delivery Destination</span>
                  <span className="text-stone-700 text-right">{confirmedOrder.customer.address}, {confirmedOrder.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider">Payment Method</span>
                  <span className="text-stone-700">{confirmedOrder.paymentMethod}</span>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider block mb-2">Creations</span>
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between py-1 text-stone-600">
                      <span>{it.quantity}x {it.product.name} ({it.selectedColor}, {it.selectedSize})</span>
                      <span className="font-mono">{formatPrice(it.product.price * it.quantity, currentCurrency)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-300 pt-3 flex justify-between text-sm font-semibold text-stone-900 font-mono">
                  <span>TOTAL SETTLED</span>
                  <span>{formatPrice(confirmedOrder.total, currentCurrency)}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-6 py-3 border border-stone-400 text-xs uppercase tracking-wider font-medium text-stone-800 hover:border-black"
                >
                  Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                >
                  Continue Exploring
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form Steps */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Input Columns */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Steps Navigation indicator */}
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 border-b border-stone-200 pb-3">
                  <span className={step === 'shipping' ? 'font-bold text-stone-950' : ''}>
                    1. Destination
                  </span>
                  <span>&gt;</span>
                  <span className={step === 'delivery' ? 'font-bold text-stone-950' : ''}>
                    2. Delivery
                  </span>
                  <span>&gt;</span>
                  <span className={step === 'payment' ? 'font-bold text-stone-950' : ''}>
                    3. Payment
                  </span>
                </div>

                {/* Step 1: Destination Form */}
                {step === 'shipping' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep('delivery');
                    }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif-luxury text-xl font-medium text-stone-900">
                      Shipping & Private Client Details
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Phone (Courier SMS)</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                    >
                      Continue to Delivery Options
                    </button>
                  </form>
                )}

                {/* Step 2: Delivery Method */}
                {step === 'delivery' && (
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury text-xl font-medium text-stone-900">
                      Select Courier Protocol
                    </h4>

                    <div className="space-y-3">
                      <label
                        className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                          deliveryMethod === 'standard' ? 'border-stone-900 bg-white' : 'border-stone-300 bg-stone-100/50'
                        }`}
                        onClick={() => setDeliveryMethod('standard')}
                      >
                        <div className="flex gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'standard'}
                            onChange={() => setDeliveryMethod('standard')}
                            className="mt-1 accent-stone-900"
                          />
                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                              Atelier Standard Express (3-5 Days)
                            </div>
                            <p className="text-xs text-stone-500 font-light mt-0.5">
                              Carbon-neutral air transport with signature upon delivery
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium">
                          {subtotal >= 500 ? 'Complimentary' : formatPrice(25, currentCurrency)}
                        </span>
                      </label>

                      <label
                        className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                          deliveryMethod === 'priority' ? 'border-stone-900 bg-white' : 'border-stone-300 bg-stone-100/50'
                        }`}
                        onClick={() => setDeliveryMethod('priority')}
                      >
                        <div className="flex gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'priority'}
                            onChange={() => setDeliveryMethod('priority')}
                            className="mt-1 accent-stone-900"
                          />
                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                              Priority Air Courier (1-2 Days)
                            </div>
                            <p className="text-xs text-stone-500 font-light mt-0.5">
                              Expedited direct dispatch from our Milan/Paris hubs
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium">
                          {formatPrice(45, currentCurrency)}
                        </span>
                      </label>

                      <label
                        className={`flex items-start justify-between p-4 border cursor-pointer transition-colors ${
                          deliveryMethod === 'whiteglove' ? 'border-stone-900 bg-white' : 'border-stone-300 bg-stone-100/50'
                        }`}
                        onClick={() => setDeliveryMethod('whiteglove')}
                      >
                        <div className="flex gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'whiteglove'}
                            onChange={() => setDeliveryMethod('whiteglove')}
                            className="mt-1 accent-stone-900"
                          />
                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                              White-Glove Private Valet (Same/Next Day)
                            </div>
                            <p className="text-xs text-stone-500 font-light mt-0.5">
                              Hand-carried in garment bags, unboxing & fit consultation
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium">
                          {formatPrice(85, currentCurrency)}
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep('shipping')}
                        className="py-3 px-6 border border-stone-300 text-xs uppercase tracking-wider font-medium text-stone-700"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep('payment')}
                        className="flex-1 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {step === 'payment' && (
                  <form onSubmit={handleCompleteOrder} className="space-y-4">
                    <h4 className="font-serif-luxury text-xl font-medium text-stone-900">
                      Payment Method
                    </h4>

                    {/* Method Toggles */}
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                          paymentMethod === 'card' ? 'border-stone-900 bg-white font-bold' : 'border-stone-300 bg-stone-100'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('applepay')}
                        className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                          paymentMethod === 'applepay' ? 'border-stone-900 bg-white font-bold' : 'border-stone-300 bg-stone-100'
                        }`}
                      >
                        <Lock className="w-4 h-4" />
                        <span>Apple / Google Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                          paymentMethod === 'cod' ? 'border-stone-900 bg-white font-bold' : 'border-stone-300 bg-stone-100'
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Pay on Arrival</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-3 bg-white p-4 border border-stone-200">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="4242 •••• •••• 4242"
                            defaultValue="4242 8891 0023 4242"
                            className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">Expiry</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              defaultValue="12/28"
                              className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1">CVC / CVV</label>
                            <input
                              type="text"
                              placeholder="CVC"
                              defaultValue="889"
                              className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'applepay' && (
                      <div className="bg-stone-900 text-white p-4 text-center text-xs space-y-2">
                        <p>One-touch instant authorization enabled.</p>
                        <p className="text-stone-400 text-[11px]">Clicking Place Order below will initiate biometric signature.</p>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="bg-[#F4EFEA] border border-stone-300 p-4 text-xs space-y-2 text-stone-700">
                        <p className="font-semibold text-stone-900">White-Glove Pay Upon Arrival</p>
                        <p>You can inspect and try on the creations with our courier before executing payment via card terminal or cash.</p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="py-3 px-6 border border-stone-300 text-xs uppercase tracking-wider font-medium text-stone-700"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                      >
                        Authorize & Place Order ({formatPrice(finalTotal, currentCurrency)})
                      </button>
                    </div>

                  </form>
                )}

              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-5 bg-[#F5F1EB] p-6 border border-stone-300/80 space-y-4">
                <h4 className="font-serif-luxury text-lg font-medium text-stone-900 border-b border-stone-200 pb-2">
                  Ensemble Summary ({items.length})
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-stone-200">
                  {items.map((it) => (
                    <div key={it.id} className="pt-2 first:pt-0 flex gap-3 text-xs">
                      <img
                        src={it.product.primaryImage}
                        alt={it.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-stone-900">{it.product.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {it.selectedColor} · Size {it.selectedSize} · Qty {it.quantity}
                        </div>
                      </div>
                      <span className="font-mono tabular-nums text-stone-900 font-medium">
                        {formatPrice(it.product.price * it.quantity, currentCurrency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">{formatPrice(subtotal, currentCurrency)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>VIP Savings</span>
                      <span className="font-mono tabular-nums">-{formatPrice(discountAmount, currentCurrency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums text-stone-900 font-medium">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, currentCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-300">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="font-mono tabular-nums text-base">
                      {formatPrice(finalTotal, currentCurrency)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-500 space-y-1 font-light">
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
                    Complimentary 30-day atelier exchange
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-800" />
                    Discreet security packaging & tracked insurance
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
