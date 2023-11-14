import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { switchIcon } from "../../utils";

export default function TValues2({data} : any) {

    // alert(JSON.stringify(data))

    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font">
      <div className="container mx-auto">
        <div className="flex flex-col md:gap-10 gap-10 lg:py-14 md:py-14 py-14">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
            <div className="lg:col-span-8">
              <Eyebrow label="OUR VALUES" />
              <h2 className="font-display md:text-display-sm text-display-sm pt-5">
                {data?.description}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          {((data?.valuesList ?? []).map((area: any, i: number) => 
                <ServiceItem 
                    title={area?.name} 
                    description={area?.description} 
                    icon={switchIcon(area?.name)}
                    left={i % 2 == 0}
                />
            ))}
          </div>
        </div>
    </div>
  </section>);
}

const ServiceItem = ({ icon, title, description }: any) => {
    return (
      <div className="flex flex-col gap-10 md:p-10 p-8 border border-primary-100" style={{borderRadius: 16}}>
        {/* <img src={icon} width={48} height={48} alt={title} /> */}
        <i className={`${icon} text-primary-300 m-0 flex justify-center`} style={{fontSize: 48}}></i>
        <div className="flex flex-col gap-4 mt-0">
          <p className="font-display md:text-display-md text-center text-display-sm mt-0 p-0 font-normal">
            {title}
          </p>
          <p className="text-body-lg text-center font-light text-neutral-700">
            {description}
          </p>
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