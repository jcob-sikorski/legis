import { switchIcon } from "../../../utils";

export default function LValues2({data, setContext} : any) {

    console.log(data?.valuesList)

    return <section id='our-values' className="py-10 bg-black sm:py-16 lg:py-24" style={{fontFamily: 'var(--legis-font-main)'}}>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
            <div
            style={{marginInline: data?.buttonVariant || 'auto auto'}}  
            onClick={() => setContext({key: 'superTitle', type: 'text', label: 'Super-Title'})} 
            className="inline-flex px-4 py-1.5 mx-autox rounded-full bg-gradient-to-r from-[var(--legis-color-2)] to-[var(--legis-color-3)]">
                <p 
                
                className="editable text-xs font-semibold tracking-widest text-white uppercase">
                    {data?.superTitle || "Find out about..."}
                </p>
            </div>
            <h2
            style={{textAlign: data?.titleVariant || 'center'}}
            onClick={() => setContext({key: 'title', type: 'text', label: 'Title', variantProperty: 'textAlign'})} 
            className="editable mt-6 text-3xl font-bold text-whitex text-gray-100 sm:text-4xl xl:text-5xl font-pj">
                {data?.title || "[Title]"}
            </h2>
            <p 
            style={{textAlign: data?.descriptionVariant || 'center'}}
            onClick={() => setContext({key: 'description', type: 'text', label: 'Description', variantProperty: 'textAlign'})} 
            className="editable mt-4 text-base leading-relaxed text-gray-400">
                {data?.description || "[Description]"}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-12 sm:grid-cols-1 md:grid-cols-3 lg:mt-20 lg:gap-x-12">
            
            {((typeof data?.valuesList === 'object' ? data?.valuesList : [])?.map((value: any, i: number) => 
                <div className="transition-all duration-200 bg-gray-950 hover:shadow-xl">
                <div className="py-10 px-9">
                <i className={switchIcon(value?.name ?? "")} style={{fontSize: 64, color: 'var(--legis-color-2)'}}></i>
                    <h3 
                    onClick={() => setContext({collection: 'valuesList', seriableLabel: 'value', key: 'name', label: 'Value name', type: 'text', index: i})} 
                    className="editable mt-8 text-lg font-semibold text-white">
                        {value?.name || "[Value name]"}
                    </h3>
                    <p 
                    onClick={() => setContext({ collection: 'valuesList', seriableLabel: 'value', key: 'description', label: 'Description', type: 'textarea', index: i})} 
                    className="editable mt-4 text-base text-gray-300">
                        {value?.description || "[Value description]"}
                    </p>
                </div>
            </div>
            ))}
            
        </div>
    </div>
</section>


}