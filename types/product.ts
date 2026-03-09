export interface Product {
  id: string;
  search_all: string;

  brand_name: string;
  category: string;
  product_type: string;

  user_level: string;

  product_code: string;
  product_name: string;
  description: string;

  material: string;
  variant: string;

  size: string;
  weight: string;
  color: string;

  quantity: number;
  price: number;
}




        
//           <Link key={p.id} href={`/product/${p.id}`}>
//             <div className="flex flex-col gap-2 relative">
//               <Image
//                 src={"/WR136011U2/WR136011U2-1.webp"}
//                 width={250}
//                 height={250}
//                 alt={p.product_code}
//                 className="w-full"
//               />
//               <p className="absolute bottom-25 right-5 bg-green-900 p-2 rounded-2xl text-white text-xs font-semibold">
//                 LKR {p.price}
//               </p>
//               <div>
//                 <h3>{p.product_name}</h3>
//                 <p className="text-xs opacity-70">{p.description}</p>
//                 <p className="text-[10px] opacity-70">{p.product_code}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>