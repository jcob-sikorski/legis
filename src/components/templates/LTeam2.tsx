import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LTeam2({data} : any) {

    const list = data?.lawyerDetails ?? [];
    console.log("TTeam: ", JSON.stringify(data), " list: ", list);

    return <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {((list ?? []).map((person: any, i: number) => 
                <div className="flex flex-col sm:flex-row sm:items-center">
                <img 
                    className={`object-cover w-48 rounded-2xl ${i % 2 == 1 ? '-':''}rotate-2`}  
                    src={data?.cdnUUID ? getUrl(data.cdnUUID) : "https://ucarecdn.com/8aea75a1-4036-48d7-8924-cfbe9375de7f/"}
                    alt="" 
                />

                <div className="mt-8 sm:mt-0 sm:ml-10">
                    <p className="text-4xl font-semibold tracking-tight text-gray-900">{person?.name}</p>
                    <p className="mt-3 text-xs font-semibold tracking-widest text-gray-900 uppercase">TEAM MEMBER</p>
                    <p className="mt-8 text-base font-normal text-gray-600">{person?.description}</p>
                </div>
            </div>
            ))}

        </div>
    </div>
</section>


}