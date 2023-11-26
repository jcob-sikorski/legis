import { switchIcon } from "../../../utils";

export default function LValues2({data} : any) {
    return <section id='our-values' className="py-10 bg-black sm:py-16 lg:py-24" style={{fontFamily: 'var(--legis-font-main)'}}>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-[var(--legis-color-2)] to-[var(--legis-color-3)]">
                <p className="text-xs font-semibold tracking-widest text-white uppercase">Find out about...</p>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-whitex text-gray-100 sm:text-4xl xl:text-5xl font-pj">
                Our values
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400">
                {data?.description ?? ""}
            </p>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
            
            {((data?.valuesList ?? []).map((value: any, i: number) => 
                <div className="transition-all duration-200 bg-gray-950 hover:shadow-xl">
                <div className="py-10 px-9">
                <i className={switchIcon(value?.name ?? "")} style={{fontSize: 64, color: 'var(--legis-color-2)'}}></i>
                    <h3 className="mt-8 text-lg font-semibold text-white">{value?.name ?? ""}</h3>
                    <p className="mt-4 text-base text-gray-300">
                        {value?.description ?? ""}
                    </p>
                </div>
            </div>
            ))}
            
        </div>
    </div>
</section>


}