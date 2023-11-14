import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

export default function TReviews2({data} : any) {

    // alert(JSON.stringify(data?.areasList))

    const list = Array.from({ length: 3 }, () => ({
        clientName: faker.name.fullName(),
        testimonial: faker.lorem.sentence(40),
      }));

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
    <div className="container mx-auto">
        <div className="flex flex-col md:gap-10 gap-10 py-14">
          <div className="grid">
            <div className="">
              <Eyebrow label="TESTIMONIALS" />
              
            </div>
          </div>
          <div className="flex lg:flex-col flex-col gap-4">
          {((list ?? []).map((area: any, i: number) => 
                <ServiceItem 
                    title={area?.clientName} 
                    description={area?.testimonial} 
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
            
            <div style={{width: '100%', borderRadius: '16px'}} className="col-span-4 flex flex-row md:gap-20 gap-6">
                {/* Left */}
                {left 
                ? <>
                    <div className="flex flex-col gap-0 p-10" style={{width: '80%'}}>
                        <p className="font-light mt-4 text-neutral-700 text-display-xs  borderx border-primary-100x p-10x pb-5" style={{fontSize: 16}}>
                        <span><i className={`bi bi-quote text-primary-600 m-0`} style={{fontSize: 30}} /></span>
                            {description?.replaceAll("\"", "")}
                        <span><i className={`bi bi-quote text-primary-600 m-0`} style={{fontSize: 30}} /></span>
                        </p>
                        <p className="font-display md:text-display-sm text-display-sm font-normal">
                        ~ {title}
                        </p>
                    </div>
                </>
                : <div className="flex w-100 justify-end">
                <div className="flex flex-col gap-0 p-10 justify-end bg-primary-600 text-white" style={{width: '80%', borderRadius: 16}}>
                    <p className="font-light mt-4 text-white text-display-xs  borderx border-primary-100x p-10x pb-5" style={{fontSize: 16}}>
                    <span><i className={`bi bi-quote text-primary-100 m-0`} style={{fontSize: 30}} /></span>
                        {description?.replaceAll("\"", "")}
                    <span><i className={`bi bi-quote text-primary-100 m-0`} style={{fontSize: 30}} /></span>
                    </p>
                    <p className="font-display md:text-display-sm text-white text-display-sm font-normal text-end">
                    ~ {title}
                    </p>
                </div>
            </div>
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