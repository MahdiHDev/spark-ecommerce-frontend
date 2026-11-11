// "use client";

// import {
//     ArrowLeft,
//     CalendarDays,
//     CheckCircle2,
//     Clock3,
//     CreditCard,
//     MapPin,
//     Package,
//     RefreshCw,
//     ShoppingBag,
//     Truck,
//     XCircle,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// type OrderItem = {
//     id: string | number;
//     name: string;
//     image: string;
//     price: number;
//     quantity: number;
//     size?: string;
//     color?: string;
// };

// type Order = {
//     id: string;
//     orderNumber: string;
//     status: string;
//     paymentMethod: string;
//     paymentStatus: string;
//     customerName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     items: OrderItem[];
//     subtotal: number;
//     deliveryFee: number;
//     total: number;
//     createdAt: string;
//     updatedAt?: string;
// };

// const steps = [
//     { label: "Pending", value: "pending" },
//     { label: "Confirmed", value: "confirmed" },
//     { label: "Processing", value: "processing" },
//     { label: "Shipped", value: "shipped" },
//     { label: "Delivered", value: "delivered" },
// ];

// const formatPrice = (price: number) =>
//     `৳ ${Number(price || 0).toLocaleString("en-BD")}`;

// const formatDate = (date: string) => {
//     if (!date) return "—";

//     return new Date(date).toLocaleDateString("en-BD", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//     });
// };

// const statusStyles: Record<string, string> = {
//     pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
//     confirmed: "bg-blue-50 text-blue-700 border-blue-200",
//     processing: "bg-purple-50 text-purple-700 border-purple-200",
//     shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
//     delivered: "bg-green-50 text-green-700 border-green-200",
//     cancelled: "bg-red-50 text-red-700 border-red-200",
// };

// export default function OrderDetailsPage() {
//     const params = useParams();
//     const router = useRouter();

//     const orderId = params.id as string;

//     const [order, setOrder] = useState<Order | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!orderId) return;

//         const controller = new AbortController();

//         const fetchOrder = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const response = await fetch(
//                     `/api/orders/${encodeURIComponent(orderId)}`,
//                     {
//                         method: "GET",
//                         cache: "no-store",
//                         signal: controller.signal,
//                     },
//                 );

//                 const data = await response.json();

//                 if (!response.ok) {
//                     throw new Error(
//                         data.message || "Unable to load order details.",
//                     );
//                 }

//                 if (!data.order) {
//                     throw new Error("Order not found.");
//                 }

//                 setOrder(data.order);
//             } catch (err) {
//                 if (err instanceof Error && err.name === "AbortError") return;

//                 setError(
//                     err instanceof Error
//                         ? err.message
//                         : "Something went wrong.",
//                 );
//             } finally {
//                 if (!controller.signal.aborted) {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchOrder();

//         return () => controller.abort();
//     }, [orderId]);

//     const currentStatus = order?.status?.toLowerCase() || "pending";
//     const currentStep = steps.findIndex((step) => step.value === currentStatus);

//     const isCancelled = currentStatus === "cancelled";
//     const isDelivered = currentStatus === "delivered";

//     if (loading) {
//         return (
//             <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
//                 <div className="text-center">
//                     <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-500" />
//                     <p className="text-sm text-gray-500 mt-4">
//                         Loading order details...
//                     </p>
//                 </div>
//             </main>
//         );
//     }

//     if (error || !order) {
//         return (
//             <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
//                 <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md w-full text-center">
//                     <Package className="w-10 h-10 mx-auto text-gray-400 mb-4" />

//                     <h1 className="text-xl font-semibold text-gray-900">
//                         Order not found
//                     </h1>

//                     <p className="text-sm text-gray-500 mt-2">
//                         {error || "We couldn't find this order."}
//                     </p>

//                     <Link
//                         href="/account/orders"
//                         className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
//                     >
//                         <ArrowLeft size={16} />
//                         Back to My Orders
//                     </Link>
//                 </div>
//             </main>
//         );
//     }

//     return (
//         <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
//             <div className="max-w-5xl mx-auto px-4 sm:px-6">
//                 {/* Back navigation */}
//                 <Link
//                     href="/account/orders"
//                     className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition mb-6"
//                 >
//                     <ArrowLeft size={17} />
//                     Back to My Orders
//                 </Link>

//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
//                     <div>
//                         <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
//                             Order Details
//                         </p>

//                         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                             {order.orderNumber}
//                         </h1>

//                         <p className="text-sm text-gray-500 mt-2">
//                             Placed on {formatDate(order.createdAt)}
//                         </p>
//                     </div>

//                     <span
//                         className={`inline-flex items-center w-fit px-4 py-2 rounded-full border text-xs font-semibold capitalize ${
//                             statusStyles[currentStatus] ||
//                             "bg-gray-100 text-gray-700 border-gray-200"
//                         }`}
//                     >
//                         {currentStatus}
//                     </span>
//                 </div>

//                 {/* Order progress */}
//                 <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-7 mb-6">
//                     <h2 className="font-semibold text-gray-900 mb-7">
//                         Order Progress
//                     </h2>

//                     {isCancelled ? (
//                         <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-100 rounded-lg p-4">
//                             <XCircle size={22} />
//                             <div>
//                                 <p className="font-semibold text-sm">
//                                     Order Cancelled
//                                 </p>
//                                 <p className="text-xs mt-1">
//                                     This order is no longer being processed.
//                                 </p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-5 gap-2">
//                             {steps.map((step, index) => {
//                                 const completed =
//                                     currentStep >= 0 && index <= currentStep;

//                                 return (
//                                     <div
//                                         key={step.value}
//                                         className="text-center"
//                                     >
//                                         <div className="flex items-center">
//                                             {index > 0 && (
//                                                 <div
//                                                     className={`h-1 flex-1 ${
//                                                         completed
//                                                             ? "bg-black"
//                                                             : "bg-gray-200"
//                                                     }`}
//                                                 />
//                                             )}

//                                             <div
//                                                 className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
//                                                     completed
//                                                         ? "bg-black text-white"
//                                                         : "bg-gray-100 text-gray-400"
//                                                 }`}
//                                             >
//                                                 {completed ? (
//                                                     <CheckCircle2 size={17} />
//                                                 ) : (
//                                                     <Clock3 size={16} />
//                                                 )}
//                                             </div>

//                                             {index < steps.length - 1 && (
//                                                 <div
//                                                     className={`h-1 flex-1 ${
//                                                         currentStep > index
//                                                             ? "bg-black"
//                                                             : "bg-gray-200"
//                                                     }`}
//                                                 />
//                                             )}
//                                         </div>

//                                         <p
//                                             className={`text-[10px] sm:text-xs mt-3 ${
//                                                 completed
//                                                     ? "text-black font-semibold"
//                                                     : "text-gray-400"
//                                             }`}
//                                         >
//                                             {step.label}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {isDelivered && (
//                         <p className="text-sm text-green-700 mt-5">
//                             Your order has been delivered successfully.
//                         </p>
//                     )}
//                 </section>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left column */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Products */}
//                         <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
//                             <div className="flex items-center gap-2 mb-5">
//                                 <ShoppingBag size={19} />
//                                 <h2 className="font-semibold text-gray-900">
//                                     Ordered Products
//                                 </h2>
//                             </div>

//                             <div className="divide-y divide-gray-100">
//                                 {order.items?.map((item) => (
//                                     <div
//                                         key={item.id}
//                                         className="flex gap-4 py-4 first:pt-0 last:pb-0"
//                                     >
//                                         <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                                             <Image
//                                                 src={
//                                                     item.image ||
//                                                     "/images/placeholder.jpg"
//                                                 }
//                                                 alt={item.name}
//                                                 fill
//                                                 sizes="96px"
//                                                 className="object-cover"
//                                             />
//                                         </div>

//                                         <div className="flex-1 min-w-0">
//                                             <h3 className="text-sm sm:text-base font-semibold text-gray-900">
//                                                 {item.name}
//                                             </h3>

//                                             {item.size && (
//                                                 <p className="text-xs text-gray-500 mt-2">
//                                                     Size: {item.size}
//                                                 </p>
//                                             )}

//                                             {item.color && (
//                                                 <p className="text-xs text-gray-500 mt-1">
//                                                     Color: {item.color}
//                                                 </p>
//                                             )}

//                                             <p className="text-xs text-gray-500 mt-1">
//                                                 Quantity: {item.quantity}
//                                             </p>

//                                             <p className="font-semibold text-sm mt-3">
//                                                 {formatPrice(
//                                                     item.price * item.quantity,
//                                                 )}
//                                             </p>
//                                         </div>

//                                         <div className="text-right shrink-0">
//                                             <p className="text-xs text-gray-400">
//                                                 Unit price
//                                             </p>
//                                             <p className="text-sm text-gray-700 mt-1">
//                                                 {formatPrice(item.price)}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Delivery information */}
//                         <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
//                             <div className="flex items-center gap-2 mb-5">
//                                 <MapPin size={19} />
//                                 <h2 className="font-semibold text-gray-900">
//                                     Delivery Information
//                                 </h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Customer Name
//                                     </p>
//                                     <p className="text-sm font-medium text-gray-900">
//                                         {order.customerName}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Phone Number
//                                     </p>
//                                     <p className="text-sm text-gray-800">
//                                         {order.phone}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Email Address
//                                     </p>
//                                     <p className="text-sm text-gray-800 break-all">
//                                         {order.email}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Delivery Address
//                                     </p>
//                                     <p className="text-sm text-gray-800">
//                                         {order.address}
//                                         {order.city ? `, ${order.city}` : ""}
//                                     </p>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>

//                     {/* Right column */}
//                     <div className="space-y-6">
//                         {/* Price summary */}
//                         <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
//                             <h2 className="font-semibold text-gray-900 mb-5">
//                                 Order Summary
//                             </h2>

//                             <div className="space-y-3 text-sm">
//                                 <div className="flex justify-between gap-3 text-gray-600">
//                                     <span>Subtotal</span>
//                                     <span>{formatPrice(order.subtotal)}</span>
//                                 </div>

//                                 <div className="flex justify-between gap-3 text-gray-600">
//                                     <span>Delivery Fee</span>
//                                     <span>
//                                         {formatPrice(order.deliveryFee)}
//                                     </span>
//                                 </div>

//                                 <div className="border-t border-gray-200 pt-4 flex justify-between gap-3">
//                                     <span className="font-semibold text-gray-900">
//                                         Total
//                                     </span>
//                                     <span className="font-bold text-lg text-gray-900">
//                                         {formatPrice(order.total)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Payment */}
//                         <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
//                             <div className="flex items-center gap-2 mb-5">
//                                 <CreditCard size={19} />
//                                 <h2 className="font-semibold text-gray-900">
//                                     Payment Information
//                                 </h2>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Payment Method
//                                     </p>
//                                     <p className="text-sm font-medium text-gray-900 capitalize">
//                                         {order.paymentMethod?.replaceAll(
//                                             "_",
//                                             " ",
//                                         ) || "—"}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Payment Status
//                                     </p>
//                                     <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium capitalize">
//                                         {order.paymentStatus || "Pending"}
//                                     </span>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Additional information */}
//                         <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <CalendarDays size={19} />
//                                 <h2 className="font-semibold text-gray-900">
//                                     Order Information
//                                 </h2>
//                             </div>

//                             <div className="space-y-3 text-sm">
//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Order Number
//                                     </p>
//                                     <p className="font-medium text-gray-900 break-all">
//                                         {order.orderNumber}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="text-xs text-gray-400 mb-1">
//                                         Order Date
//                                     </p>
//                                     <p className="text-gray-700">
//                                         {formatDate(order.createdAt)}
//                                     </p>
//                                 </div>

//                                 {order.updatedAt && (
//                                     <div>
//                                         <p className="text-xs text-gray-400 mb-1">
//                                             Last Updated
//                                         </p>
//                                         <p className="text-gray-700">
//                                             {formatDate(order.updatedAt)}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </section>

//                         {/* Actions */}
//                         <Link
//                             href={`/track-order?orderId=${encodeURIComponent(order.id)}`}
//                             className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-gray-800 transition"
//                         >
//                             <Truck size={17} />
//                             Track This Order
//                         </Link>

//                         <Link
//                             href="/products"
//                             className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-900 rounded-lg py-3 px-4 text-sm font-medium hover:bg-gray-100 transition"
//                         >
//                             Continue Shopping
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

const page = () => {
    return <div>page</div>;
};

export default page;
