import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

export default function TPracticeAreas2({data} : any) {

    // alert(JSON.stringify(data?.areasList))

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container mx-auto">
        <div className="flex flex-col md:gap-10 gap-10 py-14">
          <div className="grid">
            <div className="">
              <Eyebrow label="PRACTICE AREAS" />
            </div>
          </div>
          <div className="flex lg:flex-col flex-col gap-4">
          {((data?.areasList ?? []).map((area: any, i: number) => 
                <ServiceItem 
                    title={area?.practiceAreaName} 
                    description={area?.practiceDescription} 
                    icon={<EditFilled />}
                    left={i % 2 == 0}
                />
            ))}
          </div>
        </div>
      </div>
  </section>);
}

const ServiceItem = ({ icon, title, description, left } : any) => {
    return (
        <div className="flex">
            <div style={{width: '100%', borderRadius: '16px'}} className="col-span-4 flex flex-row md:gap-20 gap-6 border border-primary-100">
                {/* Left */}
                {left 
                ? <>
                    <div className="flex flex-col gap-0 p-10" style={{width: '60%'}}>
                    <p className="font-display md:text-display-md text-display-sm font-normal">
                    {title}
                    </p>
                    <p className="font-light mt-4 text-neutral-700 text-display-xs" style={{fontSize: 16}}>
                    {description}
                    </p>
                </div>
                <div className="bg-cover bg-no-repeat" style={{
                    backgroundPosition: '50%',
                    backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
                    height: '100%',
                    width: '40%',
                    borderRadius: '0 16px 16px 0'
                }} />
                </>
                : <>
                
            <div className="bg-cover bg-no-repeat" style={{
                backgroundPosition: '50%',
                backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
                height: '450px',
                width: '40%',
                borderRadius: '0 16px 16px 0'
            }} />
            <div className="flex flex-col gap-0 p-10 " style={{width: '60%'}}>
                <p className="font-display  md:text-display-md text-display-sm font-normal">
                {title}
                </p>
                <p className="font-light mt-4 text-neutral-700 text-display-xs" style={{fontSize: 16}}>
                {description}
                </p>
            </div>
            </>
            }
                
                
            </div>
            
    </div>
    );
};

const Eyebrow = ({ label } : any) => {
    return (
        <div className="flex flex-row items-center opacity-80">
        <hr className="w-16 text-primary-600"></hr>
        <p className="text-body-sm font-semibold tracking-widest text-primary-600 pl-4">
            {label}
        </p>
        </div>
    );
};