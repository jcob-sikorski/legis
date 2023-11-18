import { switchIcon } from "../../utils";

export default function LValues2({data} : any) {
    return <section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Our values 
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj max-w-md" style={{marginInline: 'auto'}}>
                {data?.description}
            </p>
        </div>
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
            {((data?.valuesList ?? []).map((value: any, i: number) => 
                <div>
                    <div className="relative flex items-center justify-center mx-auto">
                        <svg className="text-[var(--legis-color-1)]" width="100" height="100" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                        </svg>
                        <i className={switchIcon(value?.name ?? "") + " absolute text-[var(--legis-color-2)]"} style={{fontSize: 50}}></i>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold text-black">
                        {value?.name}
                    </h3>
                    <p className="mt-4 text-base text-gray-600">
                        {value?.description}
                    </p>
                </div>
            ))}
        </div>
    </div>
</section>

}